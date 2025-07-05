package com.pevu.orderservice.controller

import com.pevu.orderservice.model.Notification
import com.pevu.orderservice.service.NotificationService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/notification")
class NotificationController(
    private val notificationService: NotificationService
) {
    @GetMapping
    fun getNotifications(@RequestParam userId: Long): ResponseEntity<List<Notification>> =
        ResponseEntity.ok(notificationService.getNotifications(userId))

    @PutMapping("/{id}/read")
    fun markAsRead(@PathVariable id: Long, @RequestParam userId: Long): ResponseEntity<Notification> =
        ResponseEntity.ok(notificationService.markAsRead(id, userId))
} 