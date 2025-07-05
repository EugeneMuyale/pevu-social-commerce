package com.pevu.socialinteractionservice.model

import jakarta.persistence.*
import java.time.Instant

@Entity
@Table(name = "messages")
data class Message(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    val senderId: Long,
    val receiverId: Long,
    val content: String,
    val isRead: Boolean = false,
    val isDeleted: Boolean = false,
    val createdAt: Instant = Instant.now()
) 