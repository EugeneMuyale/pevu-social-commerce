package com.pevu.socialinteractionservice.model

import jakarta.persistence.*
import java.time.Instant

@Entity
@Table(name = "shares")
data class Share(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    val userId: Long,
    val productId: Long,
    val platform: SharePlatform, // e.g., FACEBOOK, TWITTER, WHATSAPP
    val shareUrl: String? = null,
    val createdAt: Instant = Instant.now()
)

enum class SharePlatform {
    FACEBOOK, TWITTER, WHATSAPP, INSTAGRAM, TELEGRAM, EMAIL, COPY_LINK
} 