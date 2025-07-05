package com.pevu.authservice.dto

import com.pevu.authservice.model.Role
import com.pevu.authservice.model.BusinessDocStatus

data class AuthResponse(
    val id: Long,
    val name: String? = null,
    val email: String? = null,
    val phone: String? = null,
    val role: Role,
    val jwtToken: String,
    val businessRegNo: String? = null,
    val businessDocName: String? = null,
    val businessDocStatus: BusinessDocStatus? = null
) 