package com.pevu.productservice.dto

import com.pevu.productservice.model.MediaType
import java.time.Instant

data class ReviewMediaRequest(
    val reviewId: Long,
    val mediaUrl: String,
    val mediaType: MediaType,
    val thumbnailUrl: String? = null
)

data class ReviewMediaResponse(
    val id: Long,
    val reviewId: Long,
    val mediaUrl: String,
    val mediaType: MediaType,
    val thumbnailUrl: String?,
    val createdAt: Instant
) 