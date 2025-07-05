package com.pevu.socialinteractionservice.repository

import com.pevu.socialinteractionservice.model.CommentLike
import com.pevu.socialinteractionservice.model.CommentLikeType
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface CommentLikeRepository : JpaRepository<CommentLike, Long> {
    fun findByCommentIdAndUserId(commentId: Long, userId: Long): Optional<CommentLike>
    fun countByCommentIdAndType(commentId: Long, type: CommentLikeType): Long
    fun deleteByCommentIdAndUserId(commentId: Long, userId: Long)
} 