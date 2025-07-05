package com.pevu.cartwishlistservice.dto

data class CartItemRequest(
    val productId: Long,
    val quantity: Int = 1
) 