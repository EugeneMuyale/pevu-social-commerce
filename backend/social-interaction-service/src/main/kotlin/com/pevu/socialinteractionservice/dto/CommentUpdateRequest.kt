package com.pevu.socialinteractionservice.dto

data class CommentUpdateRequest(
    val commentId: Long,
    val userId: Long,
    val content: String
) 