package com.pevu.productservice.service

import com.pevu.productservice.dto.ReviewRequest
import com.pevu.productservice.dto.ReviewResponse
import com.pevu.productservice.model.Review
import com.pevu.productservice.repository.ReviewRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.client.RestTemplate

@Service
class ReviewService(
    private val reviewRepository: ReviewRepository
) {
    private val orderServiceUrl = "http://order-service/api/order-item/purchased"
    private val restTemplate = RestTemplate()

    @Transactional
    fun addReview(userId: Long, req: ReviewRequest): ReviewResponse {
        // Check if user has purchased the product
        val purchased = restTemplate.getForObject("${orderServiceUrl}?userId=${'$'}userId&productId=${'$'}{req.productId}", Boolean::class.java) ?: false
        if (!purchased) throw IllegalArgumentException("You can only review products you have purchased.")
        val review = Review(
            productId = req.productId,
            userId = userId,
            rating = req.rating,
            comment = req.comment
        )
        return reviewRepository.save(review).toResponse()
    }

    @Transactional
    fun editReview(id: Long, userId: Long, req: ReviewRequest): ReviewResponse {
        val review = reviewRepository.findById(id).orElseThrow { NoSuchElementException("Review not found") }
        require(review.userId == userId) { "Not your review" }
        val updated = review.copy(rating = req.rating, comment = req.comment)
        return reviewRepository.save(updated).toResponse()
    }

    @Transactional
    fun deleteReview(id: Long, userId: Long) {
        val review = reviewRepository.findById(id).orElseThrow { NoSuchElementException("Review not found") }
        require(review.userId == userId) { "Not your review" }
        reviewRepository.save(review.copy(isDeleted = true))
    }

    @Transactional
    fun adminDeleteReview(id: Long) {
        val review = reviewRepository.findById(id).orElseThrow { NoSuchElementException("Review not found") }
        reviewRepository.save(review.copy(isDeleted = true))
    }

    fun listByProduct(productId: Long): List<ReviewResponse> =
        reviewRepository.findByProductIdAndIsDeletedFalse(productId).map { it.toResponse() }

    fun averageRating(productId: Long): Double =
        reviewRepository.findByProductIdAndIsDeletedFalse(productId).map { it.rating }.average()
}

private fun Review.toResponse() = ReviewResponse(
    id = id,
    productId = productId,
    userId = userId,
    rating = rating,
    comment = comment,
    isVerified = isVerified,
    isTopReviewer = isTopReviewer,
    helpfulCount = helpfulCount,
    notHelpfulCount = notHelpfulCount,
    createdAt = createdAt
) 