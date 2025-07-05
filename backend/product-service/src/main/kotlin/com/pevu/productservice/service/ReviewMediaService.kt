package com.pevu.productservice.service

import com.pevu.productservice.dto.*
import com.pevu.productservice.model.ReviewMedia
import com.pevu.productservice.repository.ReviewMediaRepository
import org.springframework.stereotype.Service
import java.time.Instant

@Service
class ReviewMediaService(private val reviewMediaRepository: ReviewMediaRepository) {

    fun addMedia(request: ReviewMediaRequest): ReviewMediaResponse {
        val media = ReviewMedia(
            reviewId = request.reviewId,
            mediaUrl = request.mediaUrl,
            mediaType = request.mediaType,
            thumbnailUrl = request.thumbnailUrl
        )
        val saved = reviewMediaRepository.save(media)
        return ReviewMediaResponse(
            id = saved.id,
            reviewId = saved.reviewId,
            mediaUrl = saved.mediaUrl,
            mediaType = saved.mediaType,
            thumbnailUrl = saved.thumbnailUrl,
            createdAt = saved.createdAt
        )
    }

    fun getMedia(reviewId: Long): List<ReviewMediaResponse> {
        return reviewMediaRepository.findByReviewId(reviewId).map { media ->
            ReviewMediaResponse(
                id = media.id,
                reviewId = media.reviewId,
                mediaUrl = media.mediaUrl,
                mediaType = media.mediaType,
                thumbnailUrl = media.thumbnailUrl,
                createdAt = media.createdAt
            )
        }
    }
} 