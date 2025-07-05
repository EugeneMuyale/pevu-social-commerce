package com.pevu.userprofileservice.dto

import java.time.Instant

data class ShippingAddressResponse(
    val id: Long,
    val street: String,
    val city: String,
    val state: String,
    val postalCode: String,
    val country: String,
    val isDefault: Boolean,
    val createdAt: Instant,
    val updatedAt: Instant
) 