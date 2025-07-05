package com.pevu.orderservice.service

import com.pevu.orderservice.model.Notification
import com.pevu.orderservice.repository.NotificationRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class NotificationService(
    private val notificationRepository: NotificationRepository
) {
    fun getNotifications(userId: Long): List<Notification> =
        notificationRepository.findByUserIdOrderByCreatedAtDesc(userId)

    @Transactional
    fun markAsRead(notificationId: Long, userId: Long): Notification {
        val notif = notificationRepository.findById(notificationId).orElseThrow { NoSuchElementException("Notification not found") }
        require(notif.userId == userId) { "Not your notification" }
        val updated = notif.copy(isRead = true)
        return notificationRepository.save(updated)
    }
} 