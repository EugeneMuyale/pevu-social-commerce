package com.pevu.productservice.model

import jakarta.persistence.*
import java.time.Instant

@Entity
@Table(name = "reviews")
data class Review @JvmOverloads constructor(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    val productId: Long = 0,
    val userId: Long = 0,
    val rating: Int = 0, // 1-5
    val comment: String = "",
    val isDeleted: Boolean = false,
    val isVerified: Boolean = false, // Verified purchase badge
    val isTopReviewer: Boolean = false, // Top reviewer badge
    val helpfulCount: Int = 0, // Count of helpful votes
    val notHelpfulCount: Int = 0, // Count of not helpful votes
    val createdAt: Instant = Instant.now()
) 