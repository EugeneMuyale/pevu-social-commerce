package com.pevu.socialinteractionservice.repository

import com.pevu.socialinteractionservice.model.UserFollow
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface UserFollowRepository : JpaRepository<UserFollow, Long> {
    fun findByFollowerId(followerId: Long): List<UserFollow>
    fun findByFollowingId(followingId: Long): List<UserFollow>
    fun findByFollowerIdAndFollowingId(followerId: Long, followingId: Long): UserFollow?
    fun countByFollowerId(followerId: Long): Long
    fun countByFollowingId(followingId: Long): Long
    fun existsByFollowerIdAndFollowingId(followerId: Long, followingId: Long): Boolean
} 