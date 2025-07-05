package com.pevu.authservice.model

import jakarta.persistence.*
import java.time.Instant

@Entity
@Table(name = "users", uniqueConstraints = [
    UniqueConstraint(columnNames = ["email"]),
    UniqueConstraint(columnNames = ["phone"])
])
data class User(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    val name: String? = null,
    val email: String? = null,
    val phone: String? = null,
    var password: String,

    @Enumerated(EnumType.STRING)
    val role: Role,

    var isEmailVerified: Boolean = false,
    var isActive: Boolean = true,
    var isSuspended: Boolean = false,

    // OTP fields
    var otp: String? = null,
    var otpExpiry: Instant? = null,
    // Rate limiting fields
    var otpRequestCount: Int = 0,
    var otpRequestWindowStart: Instant? = null,
    var otpAttemptCount: Int = 0,
    var otpAttemptWindowStart: Instant? = null,

    // Seller fields
    val businessRegNo: String? = null,
    val businessDocName: String? = null,
    @Enumerated(EnumType.STRING)
    val businessDocStatus: BusinessDocStatus? = null,

    val createdAt: Instant = Instant.now(),
    val updatedAt: Instant = Instant.now()
)

enum class Role { BUYER, SELLER, ADMIN }
enum class BusinessDocStatus { PENDING, APPROVED, REJECTED } 