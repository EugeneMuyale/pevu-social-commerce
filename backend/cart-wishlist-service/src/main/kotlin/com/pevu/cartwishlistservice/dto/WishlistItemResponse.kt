package com.pevu.cartwishlistservice.dto

import java.time.Instant

data class WishlistItemResponse(
    val id: Long,
    val productId: Long,
    val createdAt: Instant,
    val updatedAt: Instant
) 