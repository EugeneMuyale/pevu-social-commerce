package com.pevu.cartwishlistservice.dto

import java.time.Instant

data class CartItemResponse(
    val id: Long,
    val productId: Long,
    val quantity: Int,
    val createdAt: Instant,
    val updatedAt: Instant
) 