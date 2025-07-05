package com.pevu.orderservice.controller

import com.pevu.orderservice.repository.OrderItemRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/order-item")
class OrderItemController(
    private val orderItemRepository: OrderItemRepository
) {
    @GetMapping("/purchased")
    fun hasPurchased(
        @RequestParam userId: Long,
        @RequestParam productId: Long
    ): ResponseEntity<Boolean> =
        ResponseEntity.ok(orderItemRepository.existsByOrderUserIdAndProductId(userId, productId))
} 