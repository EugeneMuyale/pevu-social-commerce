package com.pevu.userprofileservice.model

import jakarta.persistence.*
import java.time.Instant

@Entity
@Table(name = "shipping_addresses")
data class ShippingAddress(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_profile_id")
    val userProfile: UserProfile,

    val street: String,
    val city: String,
    val state: String,
    val postalCode: String,
    val country: String,
    val isDefault: Boolean = false,
    val createdAt: Instant = Instant.now(),
    val updatedAt: Instant = Instant.now()
) 