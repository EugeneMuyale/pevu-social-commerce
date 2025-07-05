package com.pevu.orderservice.repository

import com.pevu.orderservice.model.OrderItem
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface OrderItemRepository : JpaRepository<OrderItem, Long> {
    fun findByOrderId(orderId: Long): List<OrderItem>
    fun existsByOrderUserIdAndProductId(userId: Long, productId: Long): Boolean
} 