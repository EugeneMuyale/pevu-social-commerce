package com.pevu.mediaservice.service

import com.pevu.mediaservice.dto.MediaUploadResponse
import com.pevu.mediaservice.model.VideoType
import io.minio.MinioClient
import io.minio.PutObjectArgs
import io.minio.GetObjectArgs
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import org.bytedeco.ffmpeg.global.avutil
import org.bytedeco.ffmpeg.global.avformat
import org.bytedeco.ffmpeg.avformat.AVFormatContext
import org.bytedeco.ffmpeg.avutil.AVDictionary
import org.bytedeco.javacpp.PointerPointer
import java.util.*
import java.awt.image.BufferedImage
import java.io.ByteArrayInputStream
import java.io.ByteArrayOutputStream
import javax.imageio.ImageIO
import java.awt.Graphics2D
import java.awt.RenderingHints
import org.bytedeco.ffmpeg.global.avcodec
import org.bytedeco.ffmpeg.global.swscale
import org.bytedeco.ffmpeg.avcodec.AVPacket
import org.bytedeco.ffmpeg.avutil.AVFrame
import org.bytedeco.ffmpeg.avformat.AVStream
import org.bytedeco.javacpp.BytePointer

@Service
class MediaService(
    @Value("\${minio.url}") private val minioUrl: String,
    @Value("\${minio.access-key}") private val minioAccessKey: String,
    @Value("\${minio.secret-key}") private val minioSecretKey: String
) {
    private val minioClient = MinioClient.builder()
        .endpoint(minioUrl)
        .credentials(minioAccessKey, minioSecretKey)
        .build()
    private val imageBucket = "images"
    private val videoBucket = "videos"

    private val allowedImageTypes = setOf("image/jpeg", "image/png", "image/webp")
    private val allowedVideoTypes = setOf("video/mp4", "video/quicktime", "video/webm")

    // Image optimization settings
    private val maxImageWidth = 1200
    private val maxImageHeight = 1200
    private val imageQuality = 0.85f

    fun uploadImages(files: List<MultipartFile>): List<MediaUploadResponse> {
        if (files.isEmpty()) throw IllegalArgumentException("No files uploaded")
        return files.map { file ->
            if (file.size > 5 * 1024 * 1024) throw IllegalArgumentException("Image too large (max 5MB)")
            val contentType = file.contentType ?: throw IllegalArgumentException("Content type is required")
            if (contentType !in allowedImageTypes) throw IllegalArgumentException("Invalid image type")
            
            // Optimize image before upload
            val optimizedImageData = optimizeImage(file)
            val fileName = UUID.randomUUID().toString() + getExtension(file.originalFilename)
            
            minioClient.putObject(
                PutObjectArgs.builder()
                    .bucket(imageBucket)
                    .`object`(fileName)
                    .stream(ByteArrayInputStream(optimizedImageData), optimizedImageData.size.toLong(), -1)
                    .contentType(contentType)
                    .build()
            )
            MediaUploadResponse(fileName, "/api/media/$fileName")
        }
    }

    private fun optimizeImage(file: MultipartFile): ByteArray {
        val originalImage = ImageIO.read(file.inputStream)
        
        // Calculate new dimensions while maintaining aspect ratio
        val originalWidth = originalImage.width
        val originalHeight = originalImage.height
        
        val (newWidth, newHeight) = if (originalWidth > maxImageWidth || originalHeight > maxImageHeight) {
            val ratio = minOf(maxImageWidth.toDouble() / originalWidth, maxImageHeight.toDouble() / originalHeight)
            Pair((originalWidth * ratio).toInt(), (originalHeight * ratio).toInt())
        } else {
            Pair(originalWidth, originalHeight)
        }
        
        // Create optimized image
        val optimizedImage = BufferedImage(newWidth, newHeight, BufferedImage.TYPE_INT_RGB)
        val graphics = optimizedImage.createGraphics()
        
        // Set high-quality rendering hints
        graphics.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BICUBIC)
        graphics.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY)
        graphics.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON)
        
        graphics.drawImage(originalImage, 0, 0, newWidth, newHeight, null)
        graphics.dispose()
        
        // Convert to byte array with compression
        val outputStream = ByteArrayOutputStream()
        val format = getImageFormat(file.originalFilename)
        val writer = ImageIO.getImageWritersByFormatName(format).next()
        val writeParam = writer.defaultWriteParam
        
        if (writeParam.canWriteCompressed()) {
            writeParam.compressionMode = javax.imageio.ImageWriteParam.MODE_EXPLICIT
            writeParam.compressionQuality = imageQuality
        }
        
        val imageOutputStream = ImageIO.createImageOutputStream(outputStream)
        writer.output = imageOutputStream
        writer.write(null, javax.imageio.IIOImage(optimizedImage, null, null), writeParam)
        writer.dispose()
        imageOutputStream.close()
        
        return outputStream.toByteArray()
    }

    private fun getImageFormat(filename: String?): String {
        return when (getExtension(filename).lowercase()) {
            ".jpg", ".jpeg" -> "jpeg"
            ".png" -> "png"
            ".webp" -> "webp"
            else -> "jpeg"
        }
    }

    fun uploadVideo(file: MultipartFile, uploadSource: String = "product"): MediaUploadResponse {
        println("[DEBUG] uploadVideo called with file: ${file.originalFilename}, uploadSource: $uploadSource")
        try {
            if (file.size > 100 * 1024 * 1024) throw IllegalArgumentException("Video too large (max 100MB)")
            val contentType = file.contentType ?: "application/octet-stream"
            val fileName = UUID.randomUUID().toString() + getExtension(file.originalFilename)
            val tempFile = kotlin.io.path.createTempFile(suffix = getExtension(file.originalFilename)).toFile()
            println("[DEBUG] Temp file created at: ${tempFile.absolutePath}")
            file.inputStream.use { input -> tempFile.outputStream().use { output -> input.copyTo(output) } }
            println("[DEBUG] File copied to temp file: ${tempFile.absolutePath}, size: ${tempFile.length()} bytes")
            val duration = getVideoDuration(tempFile.absolutePath)
            println("[DEBUG] Video duration: $duration seconds")
            // Validate duration based on video type
            val videoType = when {
                duration < 60 -> {
                    VideoType.STORY
                }
                duration <= 180 -> {
                    VideoType.REEL
                }
                else -> {
                    throw IllegalArgumentException("Video must be 30-180 seconds for products")
                }
            }
            println("[DEBUG] Video type determined: $videoType")
            minioClient.putObject(
                PutObjectArgs.builder()
                    .bucket(videoBucket)
                    .`object`(fileName)
                    .stream(file.inputStream, file.size, -1)
                    .contentType(contentType)
                    .build()
            )
            println("[DEBUG] Video uploaded to Minio: $fileName")
            // Extract thumbnail
            val thumbnailFileName = fileName.substringBeforeLast('.') + "_thumb.jpg"
            val thumbnailBytes = extractVideoThumbnail(tempFile.absolutePath)
            var thumbnailUrl: String? = null
            if (thumbnailBytes != null) {
                minioClient.putObject(
                    PutObjectArgs.builder()
                        .bucket(imageBucket)
                        .`object`(thumbnailFileName)
                        .stream(ByteArrayInputStream(thumbnailBytes), thumbnailBytes.size.toLong(), -1)
                        .contentType("image/jpeg")
                        .build()
                )
                thumbnailUrl = "/api/media/$thumbnailFileName"
                println("[DEBUG] Thumbnail uploaded to Minio: $thumbnailFileName")
            } else {
                println("[DEBUG] Thumbnail extraction failed for: ${tempFile.absolutePath}")
            }
            tempFile.delete()
            println("[DEBUG] Temp file deleted: ${tempFile.absolutePath}")
            println("[DEBUG] Returning MediaUploadResponse for $fileName")
            return MediaUploadResponse(fileName, "/api/media/$fileName", videoType, duration, thumbnailUrl)
        } catch (e: Exception) {
            println("[ERROR] Exception in uploadVideo: ${e.message}")
            e.printStackTrace()
            throw e
        }
    }

    // Extract a frame from the video as a JPEG byte array
    private fun extractVideoThumbnail(videoPath: String): ByteArray? {
        try {
            org.bytedeco.ffmpeg.global.avutil.av_log_set_level(org.bytedeco.ffmpeg.global.avutil.AV_LOG_QUIET)
            val fmtCtx = avformat.avformat_alloc_context()
            if (avformat.avformat_open_input(fmtCtx, videoPath, null, null) != 0) return null
            if (avformat.avformat_find_stream_info(fmtCtx, null as PointerPointer<*>?) < 0) return null
            var videoStreamIndex = -1
            for (i in 0 until fmtCtx.nb_streams()) {
                val stream = fmtCtx.streams(i)
                if (stream.codecpar().codec_type() == avutil.AVMEDIA_TYPE_VIDEO) {
                    videoStreamIndex = i
                    break
                }
            }
            if (videoStreamIndex == -1) return null
            val codecpar = fmtCtx.streams(videoStreamIndex).codecpar()
            val codec = avcodec.avcodec_find_decoder(codecpar.codec_id()) ?: return null
            val codecCtx = avcodec.avcodec_alloc_context3(codec)
            avcodec.avcodec_parameters_to_context(codecCtx, codecpar)
            if (avcodec.avcodec_open2(codecCtx, codec, null as org.bytedeco.ffmpeg.avutil.AVDictionary?) < 0) return null
            val frame = AVFrame()
            val packet = AVPacket()
            var gotFrame = false
            while (avformat.av_read_frame(fmtCtx, packet) >= 0) {
                if (packet.stream_index() == videoStreamIndex) {
                    val ret = avcodec.avcodec_send_packet(codecCtx, packet)
                    if (ret >= 0) {
                        if (avcodec.avcodec_receive_frame(codecCtx, frame) == 0) {
                            gotFrame = true
                            break
                        }
                    }
                }
                avcodec.av_packet_unref(packet)
            }
            avcodec.av_packet_unref(packet)
            if (!gotFrame) return null
            // Convert frame to BufferedImage
            val width = frame.width()
            val height = frame.height()
            val buffer = ByteArray(width * height * 3)
            val outImage = BufferedImage(width, height, BufferedImage.TYPE_3BYTE_BGR)
            frame.data(0).get(buffer)
            outImage.raster.setDataElements(0, 0, width, height, buffer)
            // Encode as JPEG
            val outputStream = ByteArrayOutputStream()
            ImageIO.write(outImage, "jpg", outputStream)
            avcodec.avcodec_free_context(codecCtx)
            avformat.avformat_close_input(fmtCtx)
            return outputStream.toByteArray()
        } catch (e: Exception) {
            e.printStackTrace()
            return null
        }
    }

    fun getMediaUrl(fileName: String): String = "/api/media/$fileName"

    fun getMinioUrl(fileName: String): String {
        // Determine bucket based on file extension
        val bucket = when (getExtension(fileName).lowercase()) {
            ".jpg", ".jpeg", ".png", ".webp" -> imageBucket
            ".mp4", ".mov", ".webm" -> videoBucket
            else -> imageBucket // default to images
        }
        return "$minioUrl/$bucket/$fileName"
    }

    fun getMediaStream(fileName: String): java.io.InputStream {
        // Determine bucket based on file extension
        val bucket = when (getExtension(fileName).lowercase()) {
            ".jpg", ".jpeg", ".png", ".webp" -> imageBucket
            ".mp4", ".mov", ".webm" -> videoBucket
            else -> imageBucket // default to images
        }
        return minioClient.getObject(
            GetObjectArgs.builder()
                .bucket(bucket)
                .`object`(fileName)
                .build()
        )
    }

    private fun getExtension(filename: String?): String =
        filename?.substringAfterLast('.', "")?.let { ".${it.lowercase()}" } ?: ""

    private fun getVideoDuration(path: String): Int {
        avutil.av_log_set_level(avutil.AV_LOG_QUIET)
        val fmtCtx = avformat.avformat_alloc_context()
        val dict = AVDictionary(null)
        if (avformat.avformat_open_input(fmtCtx, path, null, dict) != 0) return 0
        if (avformat.avformat_find_stream_info(fmtCtx, null as PointerPointer<*>?) < 0) return 0
        val duration = fmtCtx.duration() / avutil.AV_TIME_BASE
        avformat.avformat_close_input(fmtCtx)
        return duration.toInt()
    }
} 