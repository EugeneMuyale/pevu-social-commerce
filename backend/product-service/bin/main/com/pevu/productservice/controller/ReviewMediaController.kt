package com.pevu.productservice.controller

import com.pevu.productservice.dto.*
import com.pevu.productservice.service.ReviewMediaService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/reviews/media")
class ReviewMediaController(private val reviewMediaService: ReviewMediaService) {

    @PostMapping
    fun addMedia(@RequestBody request: ReviewMediaRequest): ResponseEntity<ReviewMediaResponse> {
        val response = reviewMediaService.addMedia(request)
        return ResponseEntity.ok(response)
    }

    @GetMapping("/{reviewId}")
    fun getMedia(@PathVariable reviewId: Long): ResponseEntity<List<ReviewMediaResponse>> {
        val media = reviewMediaService.getMedia(reviewId)
        return ResponseEntity.ok(media)
    }
} 