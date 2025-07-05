package com.pevu.userprofileservice.repository

import com.pevu.userprofileservice.model.UserProfile
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.Optional

@Repository
interface UserProfileRepository : JpaRepository<UserProfile, Long> {
    fun findByUserId(userId: Long): Optional<UserProfile>
    fun findByUsername(username: String): Optional<UserProfile>
} 