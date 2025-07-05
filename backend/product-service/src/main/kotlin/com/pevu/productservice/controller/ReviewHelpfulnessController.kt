package com.pevu.productservice.controller

import com.pevu.productservice.dto.*
import com.pevu.productservice.service.ReviewHelpfulnessService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/reviews/helpfulness")
class ReviewHelpfulnessController(private val reviewHelpfulnessService: ReviewHelpfulnessService) {

    @PostMapping
    fun voteHelpfulness(@RequestBody request: ReviewHelpfulnessRequest): ResponseEntity<ReviewHelpfulnessResponse> {
        val response = reviewHelpfulnessService.voteHelpfulness(request)
        return ResponseEntity.ok(response)
    }

    @GetMapping("/{reviewId}")
    fun getHelpfulnessStats(@PathVariable reviewId: Long): ResponseEntity<ReviewHelpfulnessStatsResponse> {
        val stats = reviewHelpfulnessService.getHelpfulnessStats(reviewId)
        return ResponseEntity.ok(stats)
    }
} 