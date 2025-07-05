package com.pevu.orderservice.model

import jakarta.persistence.*
import java.time.Instant

@Entity
@Table(name = "orders")
data class Order(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    val userId: Long? = null,
    val guestEmail: String? = null,
    val guestName: String? = null,
    @OneToMany(mappedBy = "order", cascade = [CascadeType.ALL], orphanRemoval = true)
    val items: List<OrderItem> = emptyList(),
    val shippingAddress: String,
    val total: Int,
    val paymentMethod: String,
    @Enumerated(EnumType.STRING)
    val status: OrderStatus = OrderStatus.PENDING,
    val createdAt: Instant = Instant.now()
)

@Entity
@Table(name = "order_items")
data class OrderItem(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    val order: Order,
    val productId: Long,
    val quantity: Int,
    val price: Int
)

enum class OrderStatus { PENDING, SHIPPED, DELIVERED, CANCELLED } 