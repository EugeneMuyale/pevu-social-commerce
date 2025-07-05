package com.pevu.productservice.repository

import com.pevu.productservice.model.ReviewHelpfulness
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ReviewHelpfulnessRepository : JpaRepository<ReviewHelpfulness, Long> {
    fun findByReviewId(reviewId: Long): List<ReviewHelpfulness>
    fun findByReviewIdAndIsHelpful(reviewId: Long, isHelpful: Boolean): List<ReviewHelpfulness>
    fun countByReviewIdAndIsHelpful(reviewId: Long, isHelpful: Boolean): Long
    fun findByReviewIdAndUserId(reviewId: Long, userId: Long): ReviewHelpfulness?
    fun existsByReviewIdAndUserId(reviewId: Long, userId: Long): Boolean
} 