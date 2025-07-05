package com.pevu.socialinteractionservice.repository

import com.pevu.socialinteractionservice.model.Share
import com.pevu.socialinteractionservice.model.SharePlatform
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ShareRepository : JpaRepository<Share, Long> {
    fun findByProductId(productId: Long): List<Share>
    fun findByUserId(userId: Long): List<Share>
    fun countByProductId(productId: Long): Long
    fun countByProductIdAndPlatform(productId: Long, platform: SharePlatform): Long
} 