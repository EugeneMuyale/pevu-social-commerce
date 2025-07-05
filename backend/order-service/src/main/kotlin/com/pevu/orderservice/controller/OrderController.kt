package com.pevu.orderservice.controller

import com.pevu.orderservice.dto.OrderRequest
import com.pevu.orderservice.dto.OrderResponse
import com.pevu.orderservice.service.OrderService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/order")
class OrderController(
    private val orderService: OrderService
) {
    @PostMapping("/create-guest-order")
    fun placeGuestOrder(@RequestBody req: OrderRequest): ResponseEntity<OrderResponse> =
        ResponseEntity.ok(orderService.placeOrder(req))

    @PostMapping("/checkout/guest")
    fun placeGuestOrderCheckout(@RequestBody req: OrderRequest): ResponseEntity<OrderResponse> =
        ResponseEntity.ok(orderService.placeOrder(req))

    @GetMapping("/details/{orderId}")
    fun getOrder(@PathVariable orderId: Long): ResponseEntity<OrderResponse> =
        ResponseEntity.ok(orderService.getOrderById(orderId))

    @PutMapping("/{orderId}/cancel")
    fun cancelOrder(@PathVariable orderId: Long, @RequestParam userId: Long): ResponseEntity<OrderResponse> =
        ResponseEntity.ok(orderService.cancelOrder(orderId, userId))

    @PostMapping("/{userId:\\d+}")
    fun placeOrder(@PathVariable userId: Long, @RequestBody req: OrderRequest): ResponseEntity<OrderResponse> =
        ResponseEntity.ok(orderService.placeOrder(req.copy(userId = userId)))

    @GetMapping("/{userId:\\d+}")
    fun getOrders(@PathVariable userId: Long): ResponseEntity<List<OrderResponse>> =
        ResponseEntity.ok(orderService.getOrdersByUser(userId))
}

@RestController
@RequestMapping("/api/checkout")
class CheckoutController(
    private val orderService: OrderService
) {
    @PostMapping("/guest")
    fun placeGuestOrder(@RequestBody req: OrderRequest): ResponseEntity<OrderResponse> =
        ResponseEntity.ok(orderService.placeOrder(req))
} 