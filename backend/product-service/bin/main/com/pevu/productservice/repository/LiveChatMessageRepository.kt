package com.pevu.productservice.repository

import com.pevu.productservice.model.LiveChatMessage
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface LiveChatMessageRepository : JpaRepository<LiveChatMessage, Long> {
    fun findByStreamKeyOrderByTimestampAsc(streamKey: String): List<LiveChatMessage>
} 