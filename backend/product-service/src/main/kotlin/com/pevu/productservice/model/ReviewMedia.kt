package com.pevu.productservice.model

import jakarta.persistence.*
import java.time.Instant

@Entity
@Table(name = "review_media")
data class ReviewMedia(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    val reviewId: Long,
    val mediaUrl: String,
    val mediaType: MediaType, // PHOTO, VIDEO
    val thumbnailUrl: String? = null,
    val createdAt: Instant = Instant.now()
)

enum class MediaType {
    PHOTO, VIDEO
} 