package com.pevu.productservice.model

import jakarta.persistence.*
import java.time.Instant

@Entity
@Table(name = "review_helpfulness", uniqueConstraints = [
    UniqueConstraint(columnNames = ["reviewId", "userId"])
])
data class ReviewHelpfulness(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    val reviewId: Long,
    val userId: Long,
    val isHelpful: Boolean, // true = helpful, false = not helpful
    val createdAt: Instant = Instant.now()
) 