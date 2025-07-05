package com.pevu.socialinteractionservice.model

import jakarta.persistence.*
import java.time.Instant

@Entity
@Table(name = "comments")
data class Comment(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    val productId: Long = 0,
    val userId: Long = 0,
    val content: String = "",
    val parentId: Long? = null, // For replies
    val isFlagged: Boolean = false,
    val isDeleted: Boolean = false,
    val isEdited: Boolean = false,
    val updatedAt: Instant? = null,
    val createdAt: Instant = Instant.now()
) 