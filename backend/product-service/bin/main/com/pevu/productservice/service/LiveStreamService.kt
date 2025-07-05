package com.pevu.productservice.service

import com.pevu.productservice.model.LiveStream
import com.pevu.productservice.repository.LiveStreamRepository
import com.pevu.productservice.model.LiveChatMessage
import com.pevu.productservice.repository.LiveChatMessageRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.Instant
import java.util.*

@Service
class LiveStreamService(
    private val liveStreamRepository: LiveStreamRepository,
    private val liveChatMessageRepository: LiveChatMessageRepository
) {
    @Transactional
    fun startStream(sellerId: Long, title: String?): LiveStream {
        val streamKey = UUID.randomUUID().toString()
        val stream = LiveStream(sellerId = sellerId, streamKey = streamKey, isLive = true, startedAt = Instant.now(), title = title)
        return liveStreamRepository.save(stream)
    }

    @Transactional
    fun stopStream(sellerId: Long) {
        val streams = liveStreamRepository.findBySellerId(sellerId)
        streams.filter { it.isLive }.forEach {
            liveStreamRepository.save(it.copy(isLive = false))
        }
    }

    fun listLiveStreams(): List<LiveStream> = liveStreamRepository.findByIsLiveTrue()

    fun getStreamKeyForSeller(sellerId: Long): String? =
        liveStreamRepository.findBySellerId(sellerId).lastOrNull()?.streamKey

    @Transactional
    fun incrementViewerCount(streamKey: String) {
        val stream = liveStreamRepository.findAll().find { it.streamKey == streamKey && it.isLive } ?: return
        liveStreamRepository.save(stream.copy(viewerCount = stream.viewerCount + 1))
    }

    @Transactional
    fun decrementViewerCount(streamKey: String) {
        val stream = liveStreamRepository.findAll().find { it.streamKey == streamKey && it.isLive } ?: return
        liveStreamRepository.save(stream.copy(viewerCount = (stream.viewerCount - 1).coerceAtLeast(0)))
    }

    fun getViewerCount(streamKey: String): Int =
        liveStreamRepository.findAll().find { it.streamKey == streamKey && it.isLive }?.viewerCount ?: 0

    fun sendMessage(streamKey: String, userId: Long, userName: String, message: String): LiveChatMessage {
        val chatMessage = LiveChatMessage(
            streamKey = streamKey,
            userId = userId,
            userName = userName,
            message = message
        )
        return liveChatMessageRepository.save(chatMessage)
    }

    fun getMessages(streamKey: String): List<LiveChatMessage> {
        return liveChatMessageRepository.findByStreamKeyOrderByTimestampAsc(streamKey)
    }

    @Transactional
    fun registerFakeLivestream(sellerId: Long, title: String?, videoUrl: String, thumbnailUrl: String?): LiveStream {
        val streamKey = UUID.randomUUID().toString()
        val stream = LiveStream(
            sellerId = sellerId,
            streamKey = streamKey,
            isLive = true,
            startedAt = Instant.now(),
            title = title,
            videoUrl = videoUrl,
            thumbnailUrl = thumbnailUrl
        )
        return liveStreamRepository.save(stream)
    }
} 