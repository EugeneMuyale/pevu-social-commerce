package com.pevu.productservice.repository

import com.pevu.productservice.model.LiveStream
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface LiveStreamRepository : JpaRepository<LiveStream, Long> {
    fun findByIsLiveTrue(): List<LiveStream>
    fun findBySellerId(sellerId: Long): List<LiveStream>
} 