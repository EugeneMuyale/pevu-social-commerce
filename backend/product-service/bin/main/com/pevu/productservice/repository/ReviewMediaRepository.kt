package com.pevu.productservice.repository

import com.pevu.productservice.model.ReviewMedia
import com.pevu.productservice.model.MediaType
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ReviewMediaRepository : JpaRepository<ReviewMedia, Long> {
    fun findByReviewId(reviewId: Long): List<ReviewMedia>
    fun findByReviewIdAndMediaType(reviewId: Long, mediaType: MediaType): List<ReviewMedia>
} 