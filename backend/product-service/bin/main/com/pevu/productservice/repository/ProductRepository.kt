package com.pevu.productservice.repository

import com.pevu.productservice.model.Product
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

@Repository
interface ProductRepository : JpaRepository<Product, Long> {
    @Query("""
        SELECT DISTINCT p FROM Product p 
        LEFT JOIN FETCH p.images 
        LEFT JOIN FETCH p.videos
    """)
    fun findAllWithImagesAndVideos(): List<Product>
    
    override fun findAll(pageable: Pageable): Page<Product>
    fun findByIsActiveTrueAndIsApprovedTrue(pageable: Pageable): Page<Product>
    
    fun findByCategory(category: String): List<Product>
    fun findByMajorCategory(majorCategory: String): List<Product>
    fun findByMajorCategoryAndSubcategory(majorCategory: String, subcategory: String): List<Product>
    fun findByMajorCategoryAndSubcategoryAndBrand(majorCategory: String, subcategory: String, brand: String): List<Product>
    fun findBySellerId(sellerId: Long): List<Product>
    fun findByIsApproved(isApproved: Boolean): List<Product>
    fun findByIsActive(isActive: Boolean): List<Product>
    fun findByIsActiveAndIsApproved(isActive: Boolean, isApproved: Boolean): List<Product>
    fun findTop10ByIsActiveTrueAndIsApprovedTrueOrderByViewCountDesc(): List<Product>
    fun findTop10ByIsActiveTrueAndIsApprovedTrueOrderByLikeCountDesc(): List<Product>
    fun findTop10ByIsActiveTrueAndIsApprovedTrueOrderByPurchaseCountDesc(): List<Product>
    fun findByTitleContainingIgnoreCaseOrCategoryContainingIgnoreCase(
        title: String, category: String
    ): List<Product>
    @Query("""
        SELECT p FROM Product p
        WHERE (
            LOWER(p.title) LIKE LOWER(CONCAT('%', :query, '%'))
            OR LOWER(p.category) LIKE LOWER(CONCAT('%', :query, '%'))
            OR LOWER(p.majorCategory) LIKE LOWER(CONCAT('%', :query, '%'))
            OR LOWER(p.subcategory) LIKE LOWER(CONCAT('%', :query, '%'))
            OR LOWER(p.brand) LIKE LOWER(CONCAT('%', :query, '%'))
        )
        AND (:category IS NULL OR LOWER(p.category) = LOWER(:category))
        AND (:majorCategory IS NULL OR LOWER(p.majorCategory) = LOWER(:majorCategory))
        AND (:subcategory IS NULL OR LOWER(p.subcategory) = LOWER(:subcategory))
        AND (:brand IS NULL OR LOWER(p.brand) = LOWER(:brand))
        AND (:minPrice IS NULL OR p.price >= :minPrice)
        AND (:maxPrice IS NULL OR p.price <= :maxPrice)
    """)
    fun searchWithFilters(
        @Param("query") query: String,
        @Param("category") category: String?,
        @Param("majorCategory") majorCategory: String?,
        @Param("subcategory") subcategory: String?,
        @Param("brand") brand: String?,
        @Param("minPrice") minPrice: Int?,
        @Param("maxPrice") maxPrice: Int?
    ): List<Product>
    fun findTop10ByCategoryAndIdNotAndIsActiveTrueAndIsApprovedTrueOrderByViewCountDesc(category: String, excludeId: Long): List<Product>
} 