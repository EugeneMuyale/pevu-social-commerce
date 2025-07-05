package com.pevu.userprofileservice.dto

import com.pevu.userprofileservice.model.Role

data class UserProfileRequest(
    val userId: Long,
    val fullName: String? = null,
    val username: String? = null,
    val role: Role,
    val avatarUrl: String? = null,
    // Business fields for sellers
    val businessName: String? = null,
    val businessDocUrl: String? = null,
    val businessLocation: String? = null,
    val businessType: String? = null,
    val businessDescription: String? = null,
    val preferences: String? = null,
    val shippingAddress: String? = null
) 