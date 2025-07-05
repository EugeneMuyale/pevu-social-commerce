package com.pevu.socialinteractionservice.dto

import java.time.Instant

data class FollowRequest(
    val followerId: Long,
    val followingId: Long
)

data class FollowResponse(
    val id: Long,
    val followerId: Long,
    val followingId: Long,
    val createdAt: Instant
)

data class UserStatsResponse(
    val userId: Long,
    val followersCount: Long,
    val followingCount: Long
) 