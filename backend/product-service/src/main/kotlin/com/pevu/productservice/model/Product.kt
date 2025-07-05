package com.pevu.productservice.model

import jakarta.persistence.*
import java.time.Instant

@Entity
@Table(name = "products")
data class Product @JvmOverloads constructor(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(length = 255)
    val title: String = "",
    
    @Column(columnDefinition = "TEXT")
    val details: String = "",
    
    @Column(columnDefinition = "TEXT")
    val specifications: String = "",
    
    val price: Int = 0,
    
    @Column(length = 255)
    val category: String = "",
    
    @Column(length = 255)
    val majorCategory: String = "",
    
    @Column(length = 255)
    val subcategory: String = "",
    
    @Column(length = 255)
    val brand: String = "",
    
    val productQuantity: Int = 0,
    
    val sellerId: Long = 0,

    @ElementCollection
    val images: List<String> = emptyList(),

    @ElementCollection
    val videos: List<String> = emptyList(),

    @Enumerated(EnumType.STRING)
    val videoType: VideoType? = null, // REEL or STORY
    val videoDuration: Int? = null, // seconds

    @Column(columnDefinition = "TEXT")
    val attributes: String = "{}",

    val isActive: Boolean = true,
    val isApproved: Boolean = false,

    val viewCount: Long = 0,
    val likeCount: Long = 0,
    val purchaseCount: Long = 0,

    val createdAt: Instant = Instant.now(),
    val updatedAt: Instant = Instant.now()
)

enum class VideoType { REEL, STORY, LIVE_STREAM } 