package com.pevu.productservice.service

import com.fasterxml.jackson.databind.ObjectMapper
import com.pevu.productservice.dto.ProductRequest
import com.pevu.productservice.dto.ProductResponse
import com.pevu.productservice.model.Product
import com.pevu.productservice.model.VideoType
import com.pevu.productservice.repository.ProductRepository
import org.slf4j.LoggerFactory
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.Instant

@Service
class ProductService(
    private val productRepository: ProductRepository,
    private val objectMapper: ObjectMapper
) {
    private val logger = LoggerFactory.getLogger(ProductService::class.java)

    @Transactional
    fun create(request: ProductRequest): ProductResponse {
        logger.info("Received product create request: title={}, majorCategory={}, subcategory={}, brand={}, price={}, quantity={}", 
                   request.title, request.majorCategory, request.subcategory, request.brand, request.price, request.productQuantity)
        
        try {
            val videoType = classifyVideo(request.videoDuration)
            
            // Generate category string from hierarchical fields if not provided
            val categoryString = request.category ?: buildCategoryString(request.majorCategory, request.subcategory, request.brand)
            
            val product = Product(
                title = request.title,
                details = request.details,
                specifications = request.specifications,
                price = request.price,
                category = categoryString,
                majorCategory = request.majorCategory,
                subcategory = request.subcategory,
                brand = request.brand,
                productQuantity = request.productQuantity,
                sellerId = request.sellerId,
                images = request.images ?: emptyList(),
                videos = request.videos ?: emptyList(),
                videoType = videoType,
                videoDuration = request.videoDuration,
                attributes = objectMapper.writeValueAsString(request.attributes)
            )
            val saved = productRepository.save(product)
            logger.info("Product created successfully: id={} title={}", saved.id, saved.title)
            return saved.toResponse()
        } catch (e: Exception) {
            logger.error("Error creating product: ${e.message}", e)
            when (e) {
                is IllegalArgumentException -> throw IllegalArgumentException("Invalid product data: ${e.message}")
                else -> throw RuntimeException("Failed to create product: ${e.message}")
            }
        }
    }

    fun get(id: Long): ProductResponse =
        productRepository.findById(id).orElseThrow { NoSuchElementException("Product not found") }.toResponse()

    @Transactional
    fun update(id: Long, request: ProductRequest): ProductResponse {
        val product = productRepository.findById(id).orElseThrow { NoSuchElementException("Product not found") }
        val videoType = classifyVideo(request.videoDuration)
        
        // Generate category string from hierarchical fields if not provided
        val categoryString = request.category ?: buildCategoryString(request.majorCategory, request.subcategory, request.brand)
        
        val updated = product.copy(
            title = request.title,
            details = request.details,
            specifications = request.specifications,
            price = request.price,
            category = categoryString,
            majorCategory = request.majorCategory,
            subcategory = request.subcategory,
            brand = request.brand,
            productQuantity = request.productQuantity,
            sellerId = request.sellerId,
            images = request.images ?: emptyList(),
            videos = request.videos ?: emptyList(),
            videoType = videoType,
            videoDuration = request.videoDuration,
            updatedAt = java.time.Instant.now(),
            attributes = objectMapper.writeValueAsString(request.attributes)
        )
        return productRepository.save(updated).toResponse()
    }

    @Transactional
    fun delete(id: Long) = productRepository.deleteById(id)

    fun list(): List<ProductResponse> {
        val products = productRepository.findByIsActiveAndIsApproved(true, true)
        logger.info("[DEBUG] ProductService.list() found {} products: {}", products.size, products.map { it.title })
        return products.map { it.toResponse() }
    }
    
    fun listByCategory(category: String): List<ProductResponse> = productRepository.findByCategory(category).map { it.toResponse() }
    fun listByMajorCategory(majorCategory: String): List<ProductResponse> = productRepository.findByMajorCategory(majorCategory).map { it.toResponse() }
    fun listByMajorCategoryAndSubcategory(majorCategory: String, subcategory: String): List<ProductResponse> = 
        productRepository.findByMajorCategoryAndSubcategory(majorCategory, subcategory).map { it.toResponse() }
    fun listByMajorCategoryAndSubcategoryAndBrand(majorCategory: String, subcategory: String, brand: String): List<ProductResponse> = 
        productRepository.findByMajorCategoryAndSubcategoryAndBrand(majorCategory, subcategory, brand).map { it.toResponse() }

    @Transactional
    fun approveProduct(id: Long): ProductResponse {
        val product = productRepository.findById(id).orElseThrow { NoSuchElementException("Product not found") }
        val updated = product.copy(isApproved = true, updatedAt = Instant.now())
        return productRepository.save(updated).toResponse()
    }

    @Transactional
    fun rejectProduct(id: Long): ProductResponse {
        val product = productRepository.findById(id).orElseThrow { NoSuchElementException("Product not found") }
        val updated = product.copy(isApproved = false, updatedAt = Instant.now())
        return productRepository.save(updated).toResponse()
    }

    @Transactional
    fun removeProduct(id: Long): ProductResponse {
        val product = productRepository.findById(id).orElseThrow { NoSuchElementException("Product not found") }
        val updated = product.copy(isActive = false, updatedAt = Instant.now())
        return productRepository.save(updated).toResponse()
    }

    @Transactional
    fun incrementViewCount(id: Long) {
        val product = productRepository.findById(id).orElseThrow { NoSuchElementException("Product not found") }
        productRepository.save(product.copy(viewCount = product.viewCount + 1, updatedAt = Instant.now()))
    }

    @Transactional
    fun incrementLikeCount(id: Long) {
        val product = productRepository.findById(id).orElseThrow { NoSuchElementException("Product not found") }
        productRepository.save(product.copy(likeCount = product.likeCount + 1, updatedAt = Instant.now()))
    }

    @Transactional
    fun incrementPurchaseCount(id: Long) {
        val product = productRepository.findById(id).orElseThrow { NoSuchElementException("Product not found") }
        productRepository.save(product.copy(purchaseCount = product.purchaseCount + 1, updatedAt = Instant.now()))
    }

    fun trendingByViews(): List<ProductResponse> = 
        productRepository.findTop10ByIsActiveTrueAndIsApprovedTrueOrderByViewCountDesc().map { it.toResponse() }
    
    fun trendingByLikes(): List<ProductResponse> = 
        productRepository.findTop10ByIsActiveTrueAndIsApprovedTrueOrderByLikeCountDesc().map { it.toResponse() }
    
    fun trendingByPurchases(): List<ProductResponse> = 
        productRepository.findTop10ByIsActiveTrueAndIsApprovedTrueOrderByPurchaseCountDesc().map { it.toResponse() }

    fun searchProductsWithFilters(
        query: String,
        category: String?,
        majorCategory: String?,
        subcategory: String?,
        brand: String?,
        minPrice: Int?,
        maxPrice: Int?,
        minRating: Double?
    ): List<ProductResponse> {
        // Note: minRating filtering would require joining with reviews table
        // For now, we'll implement basic search without rating filter
        return productRepository.searchWithFilters(query, category, majorCategory, subcategory, brand, minPrice, maxPrice).map { it.toResponse() }
    }

    fun similarProducts(productId: Long): List<ProductResponse> {
        val product = productRepository.findById(productId).orElseThrow { NoSuchElementException("Product not found") }
        return productRepository.findTop10ByCategoryAndIdNotAndIsActiveTrueAndIsApprovedTrueOrderByViewCountDesc(
            product.category, productId
        ).map { it.toResponse() }
    }

    private fun classifyVideo(duration: Int?): VideoType? {
        if (duration == null) return null
        return if (duration > 60) VideoType.REEL else VideoType.STORY
    }
    
    private fun buildCategoryString(majorCategory: String, subcategory: String, brand: String): String {
        return listOf(majorCategory, subcategory, brand)
            .filter { it.isNotBlank() }
            .joinToString(" - ")
    }
}

private fun Product.toResponse(): ProductResponse = ProductResponse.fromProduct(this) 