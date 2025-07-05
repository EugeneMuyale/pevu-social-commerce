package com.pevu.socialinteractionservice.repository

import com.pevu.socialinteractionservice.model.Message
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

@Repository
interface MessageRepository : JpaRepository<Message, Long> {
    fun findBySenderIdAndReceiverIdOrderByCreatedAtDesc(senderId: Long, receiverId: Long): List<Message>
    fun findByReceiverIdAndIsReadFalse(receiverId: Long): List<Message>
    fun countByReceiverIdAndIsReadFalse(receiverId: Long): Long
    
    @Query("SELECT m FROM Message m WHERE m.senderId = :userId OR m.receiverId = :userId ORDER BY m.createdAt DESC")
    fun findBySenderIdOrReceiverIdOrderByCreatedAtDesc(@Param("userId") userId: Long): List<Message>
} 