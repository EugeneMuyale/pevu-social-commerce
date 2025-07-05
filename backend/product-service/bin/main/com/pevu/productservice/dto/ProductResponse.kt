package com.pevu.productservice.dto

import com.pevu.productservice.model.Product
import com.pevu.productservice.model.VideoType
import java.time.Instant

data class ProductResponse(
    val id: Long,
    val title: String,
    val details: String,
    val specifications: String,
    val price: Int,
    val category: String,
    val majorCategory: String,
    val subcategory: String,
    val brand: String,
    val productQuantity: Int,
    val sellerId: Long,
    val images: List<String>,
    val videos: List<String>,
    val videoType: VideoType?,
    val videoDuration: Int?,
    val attributes: String,
    val isActive: Boolean,
    val isApproved: Boolean,
    val viewCount: Long,
    val likeCount: Long,
    val purchaseCount: Long,
    val createdAt: Instant,
    val updatedAt: Instant
) {
    companion object {
        fun fromProduct(product: Product): ProductResponse {
            return ProductResponse(
                id = product.id,
                title = product.title,
                details = product.details,
                specifications = product.specifications,
                price = product.price,
                category = product.category,
                majorCategory = product.majorCategory,
                subcategory = product.subcategory,
                brand = product.brand,
                productQuantity = product.productQuantity,
                sellerId = product.sellerId,
                images = product.images,
                videos = product.videos,
                videoType = product.videoType,
                videoDuration = product.videoDuration,
                attributes = product.attributes,
                isActive = product.isActive,
                isApproved = product.isApproved,
                viewCount = product.viewCount,
                likeCount = product.likeCount,
                purchaseCount = product.purchaseCount,
                createdAt = product.createdAt,
                updatedAt = product.updatedAt
            )
        }
    }
} 