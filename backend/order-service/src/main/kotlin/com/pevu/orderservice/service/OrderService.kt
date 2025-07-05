package com.pevu.orderservice.service

import com.pevu.orderservice.dto.*
import com.pevu.orderservice.model.Order
import com.pevu.orderservice.model.OrderItem
import com.pevu.orderservice.repository.OrderItemRepository
import com.pevu.orderservice.repository.OrderRepository
import com.pevu.orderservice.repository.NotificationRepository
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class OrderService(
    private val orderRepository: OrderRepository,
    private val orderItemRepository: OrderItemRepository,
    private val notificationRepository: NotificationRepository
) {
    private val logger = LoggerFactory.getLogger(OrderService::class.java)

    @Transactional
    fun placeOrder(request: OrderRequest): OrderResponse {
        logger.info("Received order request: $request")
        try {
            // Validate required fields
            require(request.userId != null || (request.guestEmail != null && request.guestName != null)) {
                "Either userId or guest info must be provided"
            }
            require(request.items.isNotEmpty()) { "Order must contain at least one item" }
            require(request.shippingAddress.isNotBlank()) { "Shipping address is required" }
            require(request.total > 0) { "Order total must be greater than 0" }
            require(request.paymentMethod.isNotBlank()) { "Payment method is required" }
            
            // Validate guest info if provided
            if (request.userId == null) {
                require(request.guestEmail?.isNotBlank() == true) { "Guest email is required" }
                require(request.guestName?.isNotBlank() == true) { "Guest name is required" }
            }
            
            val order = Order(
                userId = request.userId,
                guestEmail = request.guestEmail,
                guestName = request.guestName,
                shippingAddress = request.shippingAddress,
                total = request.total,
                paymentMethod = request.paymentMethod,
                items = emptyList() // will be set below
            )
            
            val savedOrder = orderRepository.save(order)
            
            // Create order items after order is saved
            val orderItems = request.items.map {
                OrderItem(
                    order = savedOrder,
                    productId = it.productId,
                    quantity = it.quantity,
                    price = it.price
                )
            }
            
            // Save order items
            orderItemRepository.saveAll(orderItems)
            
            // Notify user if logged in
            if (savedOrder.userId != null) {
                createNotification(savedOrder.userId!!, "ORDER_PLACED", "Your order #${savedOrder.id} has been placed.")
            }
            
            return savedOrder.copy(items = orderItems).toResponse()
        } catch (ex: Exception) {
            logger.error("Order placement failed: ${ex.message}", ex)
            throw ex
        }
    }

    fun getOrdersByUser(userId: Long): List<OrderResponse> =
        orderRepository.findByUserId(userId).map { it.toResponse() }

    fun getOrderById(orderId: Long): OrderResponse =
        orderRepository.findById(orderId).orElseThrow { NoSuchElementException("Order not found") }.toResponse()

    @Transactional
    fun cancelOrder(orderId: Long, userId: Long): OrderResponse {
        val order = orderRepository.findById(orderId).orElseThrow { NoSuchElementException("Order not found") }
        require(order.userId == userId) { "You can only cancel your own order" }
        require(order.status == com.pevu.orderservice.model.OrderStatus.PENDING) { "Only pending orders can be cancelled" }
        val cancelled = order.copy(status = com.pevu.orderservice.model.OrderStatus.CANCELLED)
        val saved = orderRepository.save(cancelled)
        // Notify user
        if (saved.userId != null) {
            createNotification(saved.userId!!, "ORDER_CANCELLED", "Your order #${saved.id} has been cancelled.")
        }
        return saved.toResponse()
    }

    private fun createNotification(userId: Long, type: String, message: String) {
        notificationRepository.save(
            com.pevu.orderservice.model.Notification(
                userId = userId,
                type = type,
                message = message
            )
        )
    }
}

private fun Order.toResponse() = OrderResponse(
    id, userId, guestEmail, guestName, items.map { OrderItemDto(it.productId, it.quantity, it.price) }, shippingAddress, total, paymentMethod, status, createdAt
) 