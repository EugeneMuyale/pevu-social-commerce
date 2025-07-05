package com.pevu.socialinteractionservice.controller

import com.pevu.socialinteractionservice.dto.*
import com.pevu.socialinteractionservice.service.ShareService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/social/shares")
class ShareController(private val shareService: ShareService) {

    @PostMapping
    fun shareProduct(@RequestBody request: ShareRequest): ResponseEntity<ShareResponse> {
        val response = shareService.shareProduct(request)
        return ResponseEntity.ok(response)
    }

    @GetMapping("/product/{productId}")
    fun getProductShares(@PathVariable productId: Long): ResponseEntity<List<ShareResponse>> {
        val shares = shareService.getProductShares(productId)
        return ResponseEntity.ok(shares)
    }

    @GetMapping("/user/{userId}")
    fun getUserShares(@PathVariable userId: Long): ResponseEntity<List<ShareResponse>> {
        val shares = shareService.getUserShares(userId)
        return ResponseEntity.ok(shares)
    }

    @GetMapping("/stats/{productId}")
    fun getShareStats(@PathVariable productId: Long): ResponseEntity<ShareStatsResponse> {
        val stats = shareService.getShareStats(productId)
        return ResponseEntity.ok(stats)
    }
} 