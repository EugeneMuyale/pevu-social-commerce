package com.pevu.socialinteractionservice.dto

import java.time.Instant

data class MessageRequest(
    val senderId: Long,
    val receiverId: Long,
    val content: String
)

data class MessageResponse(
    val id: Long,
    val senderId: Long,
    val receiverId: Long,
    val content: String,
    val isRead: Boolean,
    val createdAt: Instant
)

data class ConversationResponse(
    val messages: List<MessageResponse>,
    val unreadCount: Long
) 