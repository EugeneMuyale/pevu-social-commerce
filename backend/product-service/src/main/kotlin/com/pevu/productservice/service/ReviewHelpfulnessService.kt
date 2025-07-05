package com.pevu.productservice.service

import com.pevu.productservice.dto.*
import com.pevu.productservice.model.ReviewHelpfulness
import com.pevu.productservice.repository.ReviewHelpfulnessRepository
import org.springframework.stereotype.Service
import java.time.Instant

@Service
class ReviewHelpfulnessService(private val reviewHelpfulnessRepository: ReviewHelpfulnessRepository) {

    fun voteHelpfulness(request: ReviewHelpfulnessRequest): ReviewHelpfulnessResponse {
        val existing = reviewHelpfulnessRepository.findByReviewIdAndUserId(request.reviewId, request.userId)
        val helpfulness = if (existing != null) {
            existing.copy(isHelpful = request.isHelpful, createdAt = Instant.now())
        } else {
            ReviewHelpfulness(
                reviewId = request.reviewId,
                userId = request.userId,
                isHelpful = request.isHelpful
            )
        }
        val saved = reviewHelpfulnessRepository.save(helpfulness)
        return ReviewHelpfulnessResponse(
            id = saved.id,
            reviewId = saved.reviewId,
            userId = saved.userId,
            isHelpful = saved.isHelpful,
            createdAt = saved.createdAt
        )
    }

    fun getHelpfulnessStats(reviewId: Long): ReviewHelpfulnessStatsResponse {
        val helpfulCount = reviewHelpfulnessRepository.countByReviewIdAndIsHelpful(reviewId, true)
        val notHelpfulCount = reviewHelpfulnessRepository.countByReviewIdAndIsHelpful(reviewId, false)
        val totalVotes = helpfulCount + notHelpfulCount
        return ReviewHelpfulnessStatsResponse(
            reviewId = reviewId,
            helpfulCount = helpfulCount,
            notHelpfulCount = notHelpfulCount,
            totalVotes = totalVotes
        )
    }
} 