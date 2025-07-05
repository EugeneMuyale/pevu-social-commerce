package com.pevu.authservice.dto

import com.pevu.authservice.model.Role
import jakarta.validation.constraints.Pattern
import jakarta.validation.constraints.Size

// Custom validation will be handled in the service for at-least-one-of email/phone

data class RegisterRequest(
    val name: String? = null,
    @field:Pattern(regexp = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$", message = "Invalid email format")
    val email: String? = null,
    @field:Pattern(regexp = "^\\+?[1-9]\\d{1,14}$", message = "Invalid phone number format")
    val phone: String? = null,
    @field:Size(min = 8, max = 8, message = "Password must be exactly 8 characters.")
    val password: String? = null,
    val role: Role,
    val businessRegNo: String? = null,
    val businessDocName: String? = null
) 