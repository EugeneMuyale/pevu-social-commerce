package com.pevu.socialinteractionservice.service

import com.pevu.socialinteractionservice.dto.*
import com.pevu.socialinteractionservice.model.Share
import com.pevu.socialinteractionservice.model.SharePlatform
import com.pevu.socialinteractionservice.repository.ShareRepository
import org.springframework.stereotype.Service
import java.time.Instant

@Service
class ShareService(private val shareRepository: ShareRepository) {

    fun shareProduct(request: ShareRequest): ShareResponse {
        val share = Share(
            userId = request.userId,
            productId = request.productId,
            platform = request.platform,
            shareUrl = request.shareUrl
        )
        val savedShare = shareRepository.save(share)
        
        return ShareResponse(
            id = savedShare.id,
            userId = savedShare.userId,
            productId = savedShare.productId,
            platform = savedShare.platform,
            shareUrl = savedShare.shareUrl,
            createdAt = savedShare.createdAt
        )
    }

    fun getProductShares(productId: Long): List<ShareResponse> {
        return shareRepository.findByProductId(productId).map { share ->
            ShareResponse(
                id = share.id,
                userId = share.userId,
                productId = share.productId,
                platform = share.platform,
                shareUrl = share.shareUrl,
                createdAt = share.createdAt
            )
        }
    }

    fun getUserShares(userId: Long): List<ShareResponse> {
        return shareRepository.findByUserId(userId).map { share ->
            ShareResponse(
                id = share.id,
                userId = share.userId,
                productId = share.productId,
                platform = share.platform,
                shareUrl = share.shareUrl,
                createdAt = share.createdAt
            )
        }
    }

    fun getShareStats(productId: Long): ShareStatsResponse {
        val totalShares = shareRepository.countByProductId(productId)
        val sharesByPlatform = SharePlatform.values().associateWith { platform ->
            shareRepository.countByProductIdAndPlatform(productId, platform)
        }
        
        return ShareStatsResponse(
            productId = productId,
            totalShares = totalShares,
            sharesByPlatform = sharesByPlatform
        )
    }
} 