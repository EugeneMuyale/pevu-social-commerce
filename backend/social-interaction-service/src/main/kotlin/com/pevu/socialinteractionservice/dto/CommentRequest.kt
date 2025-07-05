package com.pevu.socialinteractionservice.dto

data class CommentRequest(
    val productId: Long,
    val userId: Long,
    val content: String,
    val parentId: Long? = null // For replies
) 