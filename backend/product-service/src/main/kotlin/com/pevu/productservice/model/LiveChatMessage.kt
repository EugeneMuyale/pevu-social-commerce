package com.pevu.productservice.model

import jakarta.persistence.*
import java.time.Instant

@Entity
@Table(name = "live_chat_messages")
data class LiveChatMessage @JvmOverloads constructor(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    val streamKey: String = "",
    val userId: Long = 0,
    val userName: String = "",
    val message: String = "",
    val timestamp: Instant = Instant.now()
) 