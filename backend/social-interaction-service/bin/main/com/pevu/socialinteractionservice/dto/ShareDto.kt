package com.pevu.socialinteractionservice.dto

import com.pevu.socialinteractionservice.model.SharePlatform
import java.time.Instant

data class ShareRequest(
    val userId: Long,
    val productId: Long,
    val platform: SharePlatform,
    val shareUrl: String? = null
)

data class ShareResponse(
    val id: Long,
    val userId: Long,
    val productId: Long,
    val platform: SharePlatform,
    val shareUrl: String?,
    val createdAt: Instant
)

data class ShareStatsResponse(
    val productId: Long,
    val totalShares: Long,
    val sharesByPlatform: Map<SharePlatform, Long>
) 