package com.pevu.productservice.dto

data class ProductRequest(
    val title: String,
    val details: String = "",
    val specifications: String = "",
    val price: Int,
    val category: String? = null,
    val majorCategory: String = "",
    val subcategory: String = "",
    val brand: String = "",
    val productQuantity: Int = 0,
    val sellerId: Long,
    val images: List<String>? = emptyList(),
    val videos: List<String>? = emptyList(),
    val videoDuration: Int? = null,
    val videoType: String? = null,
    val attributes: Map<String, Any> = emptyMap()
) 