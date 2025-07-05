package com.pevu.productservice.dto

import java.time.Instant

data class ReviewHelpfulnessRequest(
    val reviewId: Long,
    val userId: Long,
    val isHelpful: Boolean
)

data class ReviewHelpfulnessResponse(
    val id: Long,
    val reviewId: Long,
    val userId: Long,
    val isHelpful: Boolean,
    val createdAt: Instant
)

data class ReviewHelpfulnessStatsResponse(
    val reviewId: Long,
    val helpfulCount: Long,
    val notHelpfulCount: Long,
    val totalVotes: Long
) 