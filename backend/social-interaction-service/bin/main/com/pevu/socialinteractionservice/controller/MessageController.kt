package com.pevu.socialinteractionservice.controller

import com.pevu.socialinteractionservice.dto.*
import com.pevu.socialinteractionservice.service.MessageService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/social/messages")
class MessageController(private val messageService: MessageService) {

    @PostMapping
    fun sendMessage(@RequestBody request: MessageRequest): ResponseEntity<MessageResponse> {
        val response = messageService.sendMessage(request)
        return ResponseEntity.ok(response)
    }

    @GetMapping("/conversation/{userId1}/{userId2}")
    fun getConversation(
        @PathVariable userId1: Long,
        @PathVariable userId2: Long
    ): ResponseEntity<ConversationResponse> {
        val conversation = messageService.getConversation(userId1, userId2)
        return ResponseEntity.ok(conversation)
    }

    @GetMapping("/unread/{userId}")
    fun getUnreadMessages(@PathVariable userId: Long): ResponseEntity<List<MessageResponse>> {
        val messages = messageService.getUnreadMessages(userId)
        return ResponseEntity.ok(messages)
    }

    @GetMapping("/unread-count/{userId}")
    fun getUnreadCount(@PathVariable userId: Long): ResponseEntity<Long> {
        val count = messageService.getUnreadCount(userId)
        return ResponseEntity.ok(count)
    }

    @PutMapping("/{messageId}/read")
    fun markAsRead(@PathVariable messageId: Long): ResponseEntity<Unit> {
        messageService.markAsRead(messageId)
        return ResponseEntity.ok().build()
    }

    @DeleteMapping("/{messageId}")
    fun deleteMessage(@PathVariable messageId: Long): ResponseEntity<Unit> {
        messageService.deleteMessage(messageId)
        return ResponseEntity.ok().build()
    }
} 