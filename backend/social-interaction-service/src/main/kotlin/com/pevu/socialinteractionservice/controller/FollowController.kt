package com.pevu.socialinteractionservice.controller

import com.pevu.socialinteractionservice.dto.*
import com.pevu.socialinteractionservice.service.FollowService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/social/follows")
class FollowController(private val followService: FollowService) {

    @PostMapping
    fun followUser(@RequestBody request: FollowRequest): ResponseEntity<FollowResponse> {
        val response = followService.followUser(request.followerId, request.followingId)
        return ResponseEntity.ok(response)
    }

    @DeleteMapping("/{followerId}/{followingId}")
    fun unfollowUser(
        @PathVariable followerId: Long,
        @PathVariable followingId: Long
    ): ResponseEntity<Unit> {
        followService.unfollowUser(followerId, followingId)
        return ResponseEntity.ok().build()
    }

    @GetMapping("/followers/{userId}")
    fun getFollowers(@PathVariable userId: Long): ResponseEntity<List<FollowResponse>> {
        val followers = followService.getFollowers(userId)
        return ResponseEntity.ok(followers)
    }

    @GetMapping("/following/{userId}")
    fun getFollowing(@PathVariable userId: Long): ResponseEntity<List<FollowResponse>> {
        val following = followService.getFollowing(userId)
        return ResponseEntity.ok(following)
    }

    @GetMapping("/stats/{userId}")
    fun getUserStats(@PathVariable userId: Long): ResponseEntity<UserStatsResponse> {
        val stats = followService.getUserStats(userId)
        return ResponseEntity.ok(stats)
    }

    @GetMapping("/check/{followerId}/{followingId}")
    fun isFollowing(
        @PathVariable followerId: Long,
        @PathVariable followingId: Long
    ): ResponseEntity<Boolean> {
        val isFollowing = followService.isFollowing(followerId, followingId)
        return ResponseEntity.ok(isFollowing)
    }
} 