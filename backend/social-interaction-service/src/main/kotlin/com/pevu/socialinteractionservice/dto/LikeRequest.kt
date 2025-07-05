package com.pevu.socialinteractionservice.dto

import com.pevu.socialinteractionservice.model.LikeType

data class LikeRequest(
    val productId: Long,
    val userId: Long,
    val type: LikeType
) 