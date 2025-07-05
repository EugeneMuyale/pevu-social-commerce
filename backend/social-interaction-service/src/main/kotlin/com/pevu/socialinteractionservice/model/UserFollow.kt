package com.pevu.socialinteractionservice.model

import jakarta.persistence.*
import java.time.Instant

@Entity
@Table(name = "user_follows", uniqueConstraints = [
    UniqueConstraint(columnNames = ["followerId", "followingId"])
])
data class UserFollow(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    val followerId: Long, // User who is following
    val followingId: Long, // User being followed
    val createdAt: Instant = Instant.now()
) 