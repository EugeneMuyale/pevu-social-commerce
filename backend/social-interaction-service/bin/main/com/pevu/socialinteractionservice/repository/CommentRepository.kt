package com.pevu.socialinteractionservice.repository

import com.pevu.socialinteractionservice.model.Comment
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface CommentRepository : JpaRepository<Comment, Long> {
    fun findByProductIdAndIsDeletedFalse(productId: Long): List<Comment>
    fun findByParentIdAndIsDeletedFalse(parentId: Long): List<Comment>
    fun findByIsFlagged(isFlagged: Boolean): List<Comment>
    fun findByIsDeleted(isDeleted: Boolean): List<Comment>
    fun findByUserIdAndIsDeletedFalse(userId: Long): List<Comment>
} 