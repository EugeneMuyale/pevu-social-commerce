package com.pevu.userprofileservice.model

import jakarta.persistence.*
import java.time.Instant

@Entity
@Table(name = "user_profiles")
data class UserProfile(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    val userId: Long = 0,
    val fullName: String? = null,
    val username: String? = null,
    @Enumerated(EnumType.STRING)
    val role: Role = Role.BUYER,
    val avatarUrl: String? = null,
    val dateJoined: Instant = Instant.now(),
    val createdAt: Instant = Instant.now(),
    val updatedAt: Instant = Instant.now(),
    // Business fields for sellers
    val businessName: String? = null,
    val businessDocUrl: String? = null,
    val businessLocation: String? = null,
    val businessType: String? = null,
    val businessDescription: String? = null,
    val preferences: String? = null,
    val shippingAddress: String? = null
)

enum class Role { BUYER, SELLER } 