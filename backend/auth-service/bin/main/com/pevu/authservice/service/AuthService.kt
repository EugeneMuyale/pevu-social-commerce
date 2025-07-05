package com.pevu.authservice.service

import com.pevu.authservice.dto.AuthResponse
import com.pevu.authservice.dto.LoginRequest
import com.pevu.authservice.dto.RegisterRequest
import com.pevu.authservice.model.BusinessDocStatus
import com.pevu.authservice.model.Role
import com.pevu.authservice.model.User
import com.pevu.authservice.repository.UserRepository
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.Instant
import java.time.temporal.ChronoUnit
import java.util.NoSuchElementException
import kotlin.random.Random

@Service
class AuthService(
    private val userRepository: UserRepository,
    private val passwordEncoder: BCryptPasswordEncoder,
    private val jwtUtil: JwtUtil,
    private val emailService: EmailService,
    private val smsService: SmsService
) {
    @Transactional
    fun register(request: RegisterRequest): AuthResponse {
        // At least one of email or phone must be provided
        if ((request.email.isNullOrBlank()) && (request.phone.isNullOrBlank())) {
            throw IllegalArgumentException("Either email or phone number must be provided.")
        }

        // Email format validation if present
        if (!request.email.isNullOrBlank()) {
            val emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$".toRegex()
            if (!request.email.matches(emailRegex)) {
                throw IllegalArgumentException("Invalid email format")
            }
            if (userRepository.existsByEmail(request.email)) {
                throw IllegalArgumentException("Such credentials exist, please login instead.")
            }
        }
        // Phone format validation if present
        if (!request.phone.isNullOrBlank()) {
            val phoneRegex = "^\\+?[1-9]\\d{1,14}$".toRegex()
            if (!request.phone.matches(phoneRegex)) {
                throw IllegalArgumentException("Invalid phone number format")
            }
            if (userRepository.existsByPhone(request.phone)) {
                throw IllegalArgumentException("Such credentials exist, please login instead.")
            }
        }

        // Password must be at least 8 characters
        val password = request.password ?: throw IllegalArgumentException("Password is required.")
        if (password.length < 8) {
            throw IllegalArgumentException("Password must be at least 8 characters.")
        }

        // Generate OTP
        val otp = Random.nextInt(100000, 999999).toString()
        val now = Instant.now()
        val otpExpiry = now.plus(5, ChronoUnit.MINUTES)

        // Send OTP to provided contacts
        if (!request.email.isNullOrBlank()) {
            emailService.sendOtpEmail(request.email, otp)
        }
        if (!request.phone.isNullOrBlank()) {
            smsService.sendOtpSms(request.phone, otp)
        }

        // Create new user (not yet verified)
        val user = User(
            name = request.name,
            email = request.email,
            phone = request.phone,
            password = passwordEncoder.encode(password),
            role = request.role,
            businessRegNo = request.businessRegNo,
            businessDocName = request.businessDocName,
            businessDocStatus = if (request.role == Role.SELLER) BusinessDocStatus.PENDING else null,
            isEmailVerified = false,
            otp = otp,
            otpExpiry = otpExpiry,
            otpRequestCount = 1,
            otpRequestWindowStart = now,
            otpAttemptCount = 0,
            otpAttemptWindowStart = null
        )
        val saved = userRepository.save(user)
        val token = jwtUtil.generateToken(saved)
        return AuthResponse(
            id = saved.id,
            name = saved.name,
            email = saved.email,
            phone = saved.phone,
            role = saved.role,
            jwtToken = token,
            businessRegNo = saved.businessRegNo,
            businessDocName = saved.businessDocName,
            businessDocStatus = saved.businessDocStatus
        )
    }

    fun login(request: LoginRequest): AuthResponse {
        val user = userRepository.findByEmail(request.emailOrPhone)
            .orElseGet {
                userRepository.findByPhone(request.emailOrPhone).orElseThrow {
                    IllegalArgumentException("Invalid credentials")
                }
            }
        if (!passwordEncoder.matches(request.password, user.password)) {
            throw IllegalArgumentException("Invalid credentials")
        }
        if (!user.isEmailVerified) {
            throw IllegalArgumentException("Email or phone not verified. Please verify your account with the OTP sent to you.")
        }
        val token = jwtUtil.generateToken(user)
        return AuthResponse(
            id = user.id,
            name = user.name,
            email = user.email,
            phone = user.phone,
            role = user.role,
            jwtToken = token,
            businessRegNo = user.businessRegNo,
            businessDocName = user.businessDocName,
            businessDocStatus = user.businessDocStatus
        )
    }

    @Transactional
    fun suspendUser(id: Long): User {
        val user = userRepository.findById(id).orElseThrow { NoSuchElementException("User not found") }
        val updated = user.copy(isSuspended = true, isActive = false)
        return userRepository.save(updated)
    }

    @Transactional
    fun unsuspendUser(id: Long): User {
        val user = userRepository.findById(id).orElseThrow { NoSuchElementException("User not found") }
        val updated = user.copy(isSuspended = false, isActive = true)
        return userRepository.save(updated)
    }

    @Transactional
    fun verifySeller(id: Long): User {
        val user = userRepository.findById(id).orElseThrow { NoSuchElementException("User not found") }
        val updated = user.copy(businessDocStatus = com.pevu.authservice.model.BusinessDocStatus.APPROVED)
        return userRepository.save(updated)
    }

    @Transactional
    fun rejectSeller(id: Long): User {
        val user = userRepository.findById(id).orElseThrow { NoSuchElementException("User not found") }
        val updated = user.copy(businessDocStatus = com.pevu.authservice.model.BusinessDocStatus.REJECTED)
        return userRepository.save(updated)
    }

    fun getUserFromToken(token: String): User {
        val userId = jwtUtil.getUserIdFromToken(token)
        return userRepository.findById(userId).orElseThrow { NoSuchElementException("User not found") }
    }

    @Transactional
    fun verifyOtp(emailOrPhone: String, otp: String): AuthResponse {
        val user = userRepository.findByEmail(emailOrPhone)
            .orElseGet {
                userRepository.findByPhone(emailOrPhone).orElseThrow {
                    IllegalArgumentException("User not found")
                }
            }
        if (user.otp == null || user.otpExpiry == null) {
            throw IllegalArgumentException("No OTP requested")
        }
        // Rate limit OTP verification attempts (max 5 per OTP)
        val now = Instant.now()
        val attemptWindowDuration = java.time.Duration.ofMinutes(5)
        if (user.otpAttemptWindowStart == null || user.otpAttemptWindowStart!!.plus(attemptWindowDuration).isBefore(now)) {
            user.otpAttemptCount = 0
            user.otpAttemptWindowStart = now
        }
        if (user.otpAttemptCount >= 5) {
            throw IllegalArgumentException("Maximum OTP verification attempts exceeded. Please request a new OTP.")
        }
        user.otpAttemptCount += 1
        if (user.otp != otp) {
            userRepository.save(user)
            throw IllegalArgumentException("Invalid OTP")
        }
        if (user.otpExpiry!!.isBefore(now)) {
            throw IllegalArgumentException("OTP expired")
        }
        user.otp = null
        user.otpExpiry = null
        user.otpAttemptCount = 0
        user.otpAttemptWindowStart = null
        val updated = user.copy(isEmailVerified = true)
        val saved = userRepository.save(updated)
        val token = jwtUtil.generateToken(saved)
        return com.pevu.authservice.dto.AuthResponse(
            id = saved.id,
            name = saved.name,
            email = saved.email,
            phone = saved.phone,
            role = saved.role,
            jwtToken = token,
            businessRegNo = saved.businessRegNo,
            businessDocName = saved.businessDocName,
            businessDocStatus = saved.businessDocStatus
        )
    }
} 