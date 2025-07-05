package com.pevu.orderservice.dto

data class OrderItemRequest(
    val productId: Long,
    val quantity: Int,
    val price: Int
) 