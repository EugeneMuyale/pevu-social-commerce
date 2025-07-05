package com.pevu.socialinteractionservice.model

import jakarta.persistence.*
import java.time.Instant

@Entity
@Table(name = "likes", uniqueConstraints = [
    UniqueConstraint(columnNames = ["productId", "userId"])
])
data class Like(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    val productId: Long,
    val userId: Long,
    @Enumerated(EnumType.STRING)
    val type: LikeType,
    val createdAt: Instant = Instant.now()
)

enum class LikeType { LIKE, DISLIKE } 