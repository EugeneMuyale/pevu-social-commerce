package com.pevu.socialinteractionservice.controller

import com.pevu.socialinteractionservice.dto.*
import com.pevu.socialinteractionservice.service.SocialService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/social")
class SocialController(
    private val socialService: SocialService
) {
    @PostMapping("/like")
    fun like(@RequestBody req: LikeRequest): ResponseEntity<Void> {
        socialService.like(req)
        return ResponseEntity.ok().build()
    }

    @GetMapping("/likes/{productId}")
    fun getLikeCounts(@PathVariable productId: Long): ResponseEntity<LikeCountResponse> =
        ResponseEntity.ok(socialService.getLikeCounts(productId))

    @PostMapping("/comment")
    fun comment(@RequestBody req: CommentRequest): ResponseEntity<CommentResponse> =
        ResponseEntity.ok(socialService.comment(req))

    @GetMapping("/comments/{productId}")
    fun getComments(@PathVariable productId: Long): ResponseEntity<List<CommentResponse>> =
        ResponseEntity.ok(socialService.getComments(productId))

    // Enhanced comment functionality
    @PostMapping("/comment/like")
    fun likeComment(@RequestBody req: CommentLikeRequest): ResponseEntity<Void> {
        socialService.likeComment(req.commentId, req.userId, req.type)
        return ResponseEntity.ok().build()
    }

    @GetMapping("/comment/{commentId}/likes")
    fun getCommentLikes(
        @PathVariable commentId: Long,
        @RequestParam userId: Long?
    ): ResponseEntity<Map<String, Any>> {
        val likes = socialService.getCommentLikes(commentId, userId)
        return ResponseEntity.ok(likes)
    }

    @PostMapping("/comment/reply")
    fun replyToComment(@RequestBody req: CommentRequest): ResponseEntity<CommentResponse> =
        ResponseEntity.ok(socialService.comment(req))

    @PutMapping("/comment/{commentId}")
    fun updateComment(
        @PathVariable commentId: Long,
        @RequestBody req: CommentUpdateRequest
    ): ResponseEntity<CommentResponse> {
        val updatedReq = req.copy(commentId = commentId)
        return ResponseEntity.ok(socialService.updateComment(updatedReq))
    }

    @DeleteMapping("/comment/{commentId}")
    fun deleteUserComment(
        @PathVariable commentId: Long,
        @RequestParam userId: Long
    ): ResponseEntity<Void> {
        socialService.deleteUserComment(commentId, userId)
        return ResponseEntity.ok().build()
    }

    // Admin functions
    @PutMapping("/comment/{id}/flag")
    fun flagComment(@PathVariable id: Long): ResponseEntity<CommentResponse> =
        ResponseEntity.ok(socialService.flagComment(id))

    @PutMapping("/comment/{id}/unflag")
    fun unflagComment(@PathVariable id: Long): ResponseEntity<CommentResponse> =
        ResponseEntity.ok(socialService.unflagComment(id))

    @PutMapping("/comment/{id}/delete")
    fun deleteComment(@PathVariable id: Long): ResponseEntity<CommentResponse> =
        ResponseEntity.ok(socialService.deleteComment(id))

    @PutMapping("/comment/{id}/restore")
    fun restoreComment(@PathVariable id: Long): ResponseEntity<CommentResponse> =
        ResponseEntity.ok(socialService.restoreComment(id))
} 