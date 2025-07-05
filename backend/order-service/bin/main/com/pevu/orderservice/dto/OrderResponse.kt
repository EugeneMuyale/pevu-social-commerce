package com.pevu.orderservice.dto

import com.pevu.orderservice.model.OrderStatus
import java.time.Instant

data class OrderResponse(
    val id: Long,
    val userId: Long?,
    val guestEmail: String?,
    val guestName: String?,
    val items: List<OrderItemDto>,
    val shippingAddress: String,
    val total: Int,
    val paymentMethod: String,
    val status: OrderStatus,
    val createdAt: Instant
)

data class OrderItemDto(
    val productId: Long,
    val quantity: Int,
    val price: Int
) 