package com.pevu.productservice.controller

import com.pevu.productservice.dto.ReviewRequest
import com.pevu.productservice.dto.ReviewResponse
import com.pevu.productservice.service.ReviewService
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/review")
class ReviewController(
    private val reviewService: ReviewService
) {
    @PostMapping
    fun addReview(@RequestParam userId: Long, @RequestBody req: ReviewRequest): ResponseEntity<ReviewResponse> =
        ResponseEntity.ok(reviewService.addReview(userId, req))

    @PutMapping("/{id}")
    fun editReview(@PathVariable id: Long, @RequestParam userId: Long, @RequestBody req: ReviewRequest): ResponseEntity<ReviewResponse> =
        ResponseEntity.ok(reviewService.editReview(id, userId, req))

    @DeleteMapping("/{id}")
    fun deleteReview(@PathVariable id: Long, @RequestParam userId: Long): ResponseEntity<Void> {
        reviewService.deleteReview(id, userId)
        return ResponseEntity.noContent().build()
    }

    @GetMapping("/product/{productId}")
    fun listByProduct(@PathVariable productId: Long): ResponseEntity<List<ReviewResponse>> =
        ResponseEntity.ok(reviewService.listByProduct(productId))

    @GetMapping("/product/{productId}/average")
    fun averageRating(@PathVariable productId: Long): ResponseEntity<Double> =
        ResponseEntity.ok(reviewService.averageRating(productId))

    @DeleteMapping("/admin/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    fun adminDeleteReview(@PathVariable id: Long): ResponseEntity<Void> {
        reviewService.adminDeleteReview(id)
        return ResponseEntity.noContent().build()
    }
} 