package com.pevu.socialinteractionservice.service

import com.pevu.socialinteractionservice.dto.*
import com.pevu.socialinteractionservice.model.UserFollow
import com.pevu.socialinteractionservice.repository.UserFollowRepository
import org.springframework.stereotype.Service
import java.time.Instant

@Service
class FollowService(private val userFollowRepository: UserFollowRepository) {

    fun followUser(followerId: Long, followingId: Long): FollowResponse {
        if (followerId == followingId) {
            throw IllegalArgumentException("User cannot follow themselves")
        }

        val existingFollow = userFollowRepository.findByFollowerIdAndFollowingId(followerId, followingId)
        if (existingFollow != null) {
            throw IllegalArgumentException("Already following this user")
        }

        val follow = UserFollow(
            followerId = followerId,
            followingId = followingId
        )
        val savedFollow = userFollowRepository.save(follow)
        
        return FollowResponse(
            id = savedFollow.id,
            followerId = savedFollow.followerId,
            followingId = savedFollow.followingId,
            createdAt = savedFollow.createdAt
        )
    }

    fun unfollowUser(followerId: Long, followingId: Long) {
        val follow = userFollowRepository.findByFollowerIdAndFollowingId(followerId, followingId)
        follow?.let { userFollowRepository.delete(it) }
    }

    fun getFollowers(userId: Long): List<FollowResponse> {
        return userFollowRepository.findByFollowingId(userId).map { follow ->
            FollowResponse(
                id = follow.id,
                followerId = follow.followerId,
                followingId = follow.followingId,
                createdAt = follow.createdAt
            )
        }
    }

    fun getFollowing(userId: Long): List<FollowResponse> {
        return userFollowRepository.findByFollowerId(userId).map { follow ->
            FollowResponse(
                id = follow.id,
                followerId = follow.followerId,
                followingId = follow.followingId,
                createdAt = follow.createdAt
            )
        }
    }

    fun getUserStats(userId: Long): UserStatsResponse {
        val followersCount = userFollowRepository.countByFollowingId(userId)
        val followingCount = userFollowRepository.countByFollowerId(userId)
        
        return UserStatsResponse(
            userId = userId,
            followersCount = followersCount,
            followingCount = followingCount
        )
    }

    fun isFollowing(followerId: Long, followingId: Long): Boolean {
        return userFollowRepository.existsByFollowerIdAndFollowingId(followerId, followingId)
    }
} 