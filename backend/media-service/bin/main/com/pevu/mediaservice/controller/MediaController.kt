package com.pevu.mediaservice.controller

import com.pevu.mediaservice.dto.MediaUploadResponse
import com.pevu.mediaservice.service.MediaService
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import java.io.IOException
import org.springframework.core.io.InputStreamResource
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.http.HttpStatus
import org.slf4j.LoggerFactory

@RestController
@RequestMapping("/api/media")
class MediaController(
    private val mediaService: MediaService
) {
    @PostMapping("/upload/image", consumes = [MediaType.MULTIPART_FORM_DATA_VALUE])
    fun uploadImages(@RequestParam("files") files: List<MultipartFile>): ResponseEntity<List<MediaUploadResponse>> =
        ResponseEntity.ok(mediaService.uploadImages(files))

    @PostMapping("/upload/video", consumes = [MediaType.MULTIPART_FORM_DATA_VALUE])
    fun uploadVideo(
        @RequestParam("file") file: MultipartFile,
        @RequestParam("uploadSource", defaultValue = "product") uploadSource: String
    ): ResponseEntity<MediaUploadResponse> =
        ResponseEntity.ok(mediaService.uploadVideo(file, uploadSource))

    @GetMapping("/{filename}")
    fun getMedia(@PathVariable filename: String): ResponseEntity<Any> {
        return try {
            val inputStream = mediaService.getMediaStream(filename)
            val contentType = getContentType(filename)
            
            ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CACHE_CONTROL, "public, max-age=31536000") // 1 year cache
                .body(InputStreamResource(inputStream))
        } catch (e: Exception) {
            // If file not found or error, return 404
            ResponseEntity.notFound().build()
        }
    }

    private fun getContentType(filename: String): String {
        return when (filename.substringAfterLast('.', "").lowercase()) {
            "jpg", "jpeg" -> "image/jpeg"
            "png" -> "image/png"
            "webp" -> "image/webp"
            "mp4" -> "video/mp4"
            "mov" -> "video/quicktime"
            "webm" -> "video/webm"
            else -> "application/octet-stream"
        }
    }
}

// Add global exception handler
@ControllerAdvice
class GlobalExceptionHandler {
    private val logger = LoggerFactory.getLogger(GlobalExceptionHandler::class.java)

    @ExceptionHandler(Exception::class)
    fun handleException(ex: Exception): ResponseEntity<Map<String, String>> {
        logger.error("Exception occurred: ", ex)
        val message = ex.message ?: "Internal server error"
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(mapOf("error" to message))
    }
} 