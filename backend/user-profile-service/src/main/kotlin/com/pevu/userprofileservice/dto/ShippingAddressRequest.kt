package com.pevu.userprofileservice.dto

data class ShippingAddressRequest(
    val street: String,
    val city: String,
    val state: String,
    val postalCode: String,
    val country: String,
    val isDefault: Boolean = false
) 