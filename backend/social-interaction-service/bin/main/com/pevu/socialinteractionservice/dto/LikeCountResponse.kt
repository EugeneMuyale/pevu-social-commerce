package com.pevu.socialinteractionservice.dto

data class LikeCountResponse(
    val productId: Long,
    val likes: Long,
    val dislikes: Long
) 