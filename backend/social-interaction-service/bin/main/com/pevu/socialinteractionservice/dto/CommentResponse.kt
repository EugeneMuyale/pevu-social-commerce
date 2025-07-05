package com.pevu.socialinteractionservice.dto

import java.time.Instant

data class CommentResponse(
    val id: Long,
    val productId: Long,
    val userId: Long,
    val content: String,
    val parentId: Long? = null,
    val likes: Long = 0,
    val dislikes: Long = 0,
    val userLiked: Boolean = false,
    val userDisliked: Boolean = false,
    val isEdited: Boolean = false,
    val updatedAt: Instant? = null,
    val createdAt: Instant,
    val replies: List<CommentResponse> = emptyList()
) 