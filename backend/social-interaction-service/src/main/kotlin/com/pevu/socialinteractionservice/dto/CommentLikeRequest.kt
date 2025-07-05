package com.pevu.socialinteractionservice.dto

import com.pevu.socialinteractionservice.model.CommentLikeType

data class CommentLikeRequest(
    val commentId: Long,
    val userId: Long,
    val type: CommentLikeType
) 