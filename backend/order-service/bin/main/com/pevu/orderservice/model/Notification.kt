package com.pevu.orderservice.model

import jakarta.persistence.*
import java.time.Instant

@Entity
@Table(name = "notifications")
data class Notification(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    val userId: Long,
    val type: String,
    val message: String,
    val isRead: Boolean = false,
    val createdAt: Instant = Instant.now()
) 