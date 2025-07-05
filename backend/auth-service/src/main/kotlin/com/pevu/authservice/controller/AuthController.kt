package com.pevu.authservice.controller

import com.pevu.authservice.dto.AuthResponse
import com.pevu.authservice.dto.LoginRequest
import com.pevu.authservice.dto.RegisterRequest
import com.pevu.authservice.service.AuthService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.http.HttpStatus

@RestController
@RequestMapping("/api/auth")
class AuthController(
    private val authService: AuthService
) {
    @PostMapping("/register")
    fun register(@RequestBody req: RegisterRequest): ResponseEntity<Any> {
        println("[DEBUG] Received register request: $req")
        return try {
            val result = authService.register(req)
            println("[DEBUG] Registration successful: $result")
            ResponseEntity.ok(result)
        } catch (ex: Exception) {
            println("[ERROR] Registration failed in controller: ${ex.message}")
            ex.printStackTrace()
            ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(mapOf("message" to (ex.message ?: "Registration failed")))
        }
    }

    @PostMapping("/login")
    fun login(@RequestBody req: LoginRequest): ResponseEntity<Any> {
        return try {
            ResponseEntity.ok(authService.login(req))
        } catch (ex: Exception) {
            ResponseEntity.status(org.springframework.http.HttpStatus.UNAUTHORIZED)
                .body(mapOf("message" to (ex.message ?: "Invalid credentials")))
        }
    }

    @PutMapping("/user/{id}/suspend")
    @PreAuthorize("hasRole('ADMIN')")
    fun suspendUser(@PathVariable id: Long): ResponseEntity<Any> =
        ResponseEntity.ok(authService.suspendUser(id))

    @PutMapping("/user/{id}/unsuspend")
    @PreAuthorize("hasRole('ADMIN')")
    fun unsuspendUser(@PathVariable id: Long): ResponseEntity<Any> =
        ResponseEntity.ok(authService.unsuspendUser(id))

    @PutMapping("/seller/{id}/verify")
    @PreAuthorize("hasRole('ADMIN')")
    fun verifySeller(@PathVariable id: Long): ResponseEntity<Any> =
        ResponseEntity.ok(authService.verifySeller(id))

    @PutMapping("/seller/{id}/reject")
    @PreAuthorize("hasRole('ADMIN')")
    fun rejectSeller(@PathVariable id: Long): ResponseEntity<Any> =
        ResponseEntity.ok(authService.rejectSeller(id))

    @GetMapping("/me")
    fun getCurrentUser(@RequestHeader("Authorization") authHeader: String): ResponseEntity<AuthResponse> {
        val token = authHeader.removePrefix("Bearer ").trim()
        val user = authService.getUserFromToken(token)
        val jwtToken = token // Optionally, you can generate a new token if needed
        return ResponseEntity.ok(
            AuthResponse(
                id = user.id,
                name = user.name,
                email = user.email,
                phone = user.phone,
                role = user.role,
                jwtToken = jwtToken,
                businessRegNo = user.businessRegNo,
                businessDocName = user.businessDocName,
                businessDocStatus = user.businessDocStatus
            )
        )
    }

    @PostMapping("/verify-otp")
    fun verifyOtp(@RequestBody req: Map<String, String>): ResponseEntity<Any> {
        val emailOrPhone = req["emailOrPhone"] ?: return ResponseEntity.badRequest().body(mapOf("message" to "Missing emailOrPhone"))
        val otp = req["otp"] ?: return ResponseEntity.badRequest().body(mapOf("message" to "Missing otp"))
        return try {
            val authResponse = authService.verifyOtp(emailOrPhone, otp)
            ResponseEntity.ok(authResponse)
        } catch (ex: Exception) {
            ResponseEntity.status(HttpStatus.BAD_REQUEST).body(mapOf("message" to (ex.message ?: "OTP verification failed")))
        }
    }

    @DeleteMapping("/user/by-email")
    fun deleteUserByEmail(@RequestBody body: Map<String, String>): ResponseEntity<Any> {
        val email = body["email"] ?: return ResponseEntity.badRequest().body(mapOf("message" to "Missing email"))
        return try {
            authService.deleteUserByEmail(email)
            ResponseEntity.ok(mapOf("message" to "User deleted"))
        } catch (ex: Exception) {
            ResponseEntity.status(HttpStatus.BAD_REQUEST).body(mapOf("message" to (ex.message ?: "User deletion failed")))
        }
    }
} 