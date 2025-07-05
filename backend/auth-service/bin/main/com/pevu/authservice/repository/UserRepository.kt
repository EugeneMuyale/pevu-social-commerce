package com.pevu.authservice.repository

import com.pevu.authservice.model.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.Optional

@Repository
interface UserRepository : JpaRepository<User, Long> {
    fun findByEmail(email: String): Optional<User>
    fun findByPhone(phone: String): Optional<User>
    fun existsByEmail(email: String): Boolean
    fun existsByPhone(phone: String): Boolean
    fun findByIsSuspended(isSuspended: Boolean): List<User>
    fun findByIsActive(isActive: Boolean): List<User>
    fun findByRole(role: com.pevu.authservice.model.Role): List<User>
} 