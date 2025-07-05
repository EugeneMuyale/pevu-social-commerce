package com.pevu.productservice.repository

import com.pevu.productservice.model.Review
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ReviewRepository : JpaRepository<Review, Long> {
    fun findByProductIdAndIsDeletedFalse(productId: Long): List<Review>
    fun findByUserIdAndIsDeletedFalse(userId: Long): List<Review>
    fun findByIsDeleted(isDeleted: Boolean): List<Review>
} 