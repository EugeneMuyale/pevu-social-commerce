package com.pevu.socialinteractionservice.model

import jakarta.persistence.*
import java.time.Instant

@Entity
@Table(name = "comment_likes")
data class CommentLike(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    val commentId: Long = 0,
    val userId: Long = 0,
    @Enumerated(EnumType.STRING)
    val type: CommentLikeType = CommentLikeType.LIKE,
    val createdAt: Instant = Instant.now()
)

enum class CommentLikeType {
    LIKE, DISLIKE
} 