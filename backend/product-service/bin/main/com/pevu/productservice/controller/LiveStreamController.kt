package com.pevu.productservice.controller

import com.pevu.productservice.model.LiveStream
import com.pevu.productservice.model.LiveChatMessage
import com.pevu.productservice.service.LiveStreamService
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.http.converter.HttpMessageNotReadableException
import org.springframework.web.bind.MethodArgumentNotValidException

@RestController
@RequestMapping("/api/livestream")
class LiveStreamController(
    private val liveStreamService: LiveStreamService
) {
    private val logger = LoggerFactory.getLogger(LiveStreamController::class.java)

    @PostMapping("/start")
    fun start(@RequestParam sellerId: Long, @RequestParam(required = false) title: String?): ResponseEntity<LiveStream> =
        ResponseEntity.ok(liveStreamService.startStream(sellerId, title))

    @PostMapping("/stop")
    fun stop(@RequestParam sellerId: Long): ResponseEntity<Void> {
        liveStreamService.stopStream(sellerId)
        return ResponseEntity.ok().build()
    }

    @GetMapping("/live")
    fun listLive(): ResponseEntity<List<LiveStream>> =
        ResponseEntity.ok(liveStreamService.listLiveStreams())

    @GetMapping("/key")
    fun getKey(@RequestParam sellerId: Long): ResponseEntity<String?> =
        ResponseEntity.ok(liveStreamService.getStreamKeyForSeller(sellerId))

    data class ChatMessageRequest(val userId: Long, val userName: String, val message: String)

    @GetMapping("/{streamKey}/chat")
    fun getChatMessages(@PathVariable streamKey: String): List<LiveChatMessage> =
        liveStreamService.getMessages(streamKey)

    @PostMapping("/{streamKey}/chat")
    fun sendChatMessage(
        @PathVariable streamKey: String,
        @RequestBody req: ChatMessageRequest
    ): LiveChatMessage =
        liveStreamService.sendMessage(streamKey, req.userId, req.userName, req.message)

    data class FakeLivestreamRequest(
        val sellerId: Long = 0,
        val title: String? = null,
        val videoUrl: String = "",
        val thumbnailUrl: String? = null
    )

    @PostMapping("/fake")
    fun registerFakeLivestream(@RequestBody req: FakeLivestreamRequest): ResponseEntity<Any> {
        logger.info("Received fake livestream request: {}", req)
        if (req.sellerId == 0L) {
            logger.warn("Missing or zero sellerId in request body")
            return ResponseEntity.badRequest().body(mapOf("error" to "Missing or zero sellerId"))
        }
        if (req.videoUrl.isBlank()) {
            logger.warn("Missing or blank videoUrl in request body")
            return ResponseEntity.badRequest().body(mapOf("error" to "Missing or blank videoUrl"))
        }
        return try {
            val result = liveStreamService.registerFakeLivestream(req.sellerId, req.title, req.videoUrl, req.thumbnailUrl)
            ResponseEntity.ok(result)
        } catch (e: Exception) {
            logger.error("Error in /fake endpoint", e)
            ResponseEntity.status(500).body(mapOf("error" to e.localizedMessage))
        }
    }

    @GetMapping("/ping")
    fun ping(): ResponseEntity<String> =
        ResponseEntity.ok("pong")
}

@RestController
class RootPingController {
    @GetMapping("/ping")
    fun rootPing(): ResponseEntity<String> = ResponseEntity.ok("pong-root")
} 