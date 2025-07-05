package com.pevu.authservice.dto

data class LoginRequest(
    val emailOrPhone: String,
    val password: String
) 