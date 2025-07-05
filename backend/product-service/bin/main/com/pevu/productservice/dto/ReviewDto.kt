package com.pevu.productservice.dto

import java.time.Instant

data class ReviewRequest(
    val productId: Long,
    val userId: Long,
    val rating: Int,
    val comment: String
)

data class ReviewResponse(
    val id: Long,
    val productId: Long,
    val userId: Long,
    val rating: Int,
    val comment: String,
    val isVerified: Boolean,
    val isTopReviewer: Boolean,
    val helpfulCount: Int,
    val notHelpfulCount: Int,
    val createdAt: Instant
) 