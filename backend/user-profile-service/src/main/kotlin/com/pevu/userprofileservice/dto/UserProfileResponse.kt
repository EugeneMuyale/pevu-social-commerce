package com.pevu.userprofileservice.dto

import com.pevu.userprofileservice.model.Role
import java.time.Instant

data class UserProfileResponse(
    val id: Long,
    val userId: Long,
    val fullName: String? = null,
    val username: String? = null,
    val role: Role,
    val avatarUrl: String?,
    val dateJoined: Instant,
    val createdAt: Instant,
    val updatedAt: Instant,
    // Business fields for sellers
    val businessName: String? = null,
    val businessDocUrl: String? = null,
    val businessLocation: String? = null,
    val businessType: String? = null,
    val businessDescription: String? = null,
    val preferences: String? = null,
    val shippingAddress: String? = null
) 