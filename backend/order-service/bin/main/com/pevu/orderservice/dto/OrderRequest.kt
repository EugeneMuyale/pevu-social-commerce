package com.pevu.orderservice.dto

import com.pevu.orderservice.dto.OrderItemRequest

data class OrderRequest(
    val userId: Long? = null,
    val guestEmail: String? = null,
    val guestName: String? = null,
    val items: List<OrderItemRequest>,
    val shippingAddress: String,
    val total: Int,
    val paymentMethod: String
) 