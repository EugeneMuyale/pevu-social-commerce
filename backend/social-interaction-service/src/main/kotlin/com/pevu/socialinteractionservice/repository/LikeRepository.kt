package com.pevu.socialinteractionservice.repository

import com.pevu.socialinteractionservice.model.Like
import com.pevu.socialinteractionservice.model.LikeType
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.Optional

@Repository
interface LikeRepository : JpaRepository<Like, Long> {
    fun findByProductId(productId: Long): List<Like>
    fun countByProductIdAndType(productId: Long, type: LikeType): Long
    fun findByProductIdAndUserId(productId: Long, userId: Long): Optional<Like>
    fun deleteByProductIdAndUserId(productId: Long, userId: Long)
} 