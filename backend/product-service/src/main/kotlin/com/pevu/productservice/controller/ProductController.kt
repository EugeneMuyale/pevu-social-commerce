package com.pevu.productservice.controller

import com.pevu.productservice.dto.ProductRequest
import com.pevu.productservice.dto.ProductResponse
import com.pevu.productservice.service.ProductService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.security.access.prepost.PreAuthorize

@RestController
@RequestMapping("/api/product")
class ProductController(
    private val productService: ProductService
) {
    @PostMapping
    fun create(@RequestBody req: ProductRequest): ResponseEntity<ProductResponse> =
        ResponseEntity.ok(productService.create(req))

    @GetMapping("/{id}")
    fun get(@PathVariable id: Long): ResponseEntity<ProductResponse> =
        ResponseEntity.ok(productService.get(id))

    @PutMapping("/{id}")
    fun update(@PathVariable id: Long, @RequestBody req: ProductRequest): ResponseEntity<ProductResponse> =
        ResponseEntity.ok(productService.update(id, req))

    @DeleteMapping("/{id}")
    fun delete(@PathVariable id: Long): ResponseEntity<Void> {
        productService.delete(id)
        return ResponseEntity.noContent().build()
    }

    @GetMapping
    fun list(): ResponseEntity<List<ProductResponse>> =
        ResponseEntity.ok(productService.list())

    @GetMapping("/category/{category}")
    fun listByCategory(@PathVariable category: String): ResponseEntity<List<ProductResponse>> =
        ResponseEntity.ok(productService.listByCategory(category))

    @GetMapping("/major-category/{majorCategory}")
    fun listByMajorCategory(@PathVariable majorCategory: String): ResponseEntity<List<ProductResponse>> =
        ResponseEntity.ok(productService.listByMajorCategory(majorCategory))

    @GetMapping("/major-category/{majorCategory}/subcategory/{subcategory}")
    fun listByMajorCategoryAndSubcategory(
        @PathVariable majorCategory: String,
        @PathVariable subcategory: String
    ): ResponseEntity<List<ProductResponse>> =
        ResponseEntity.ok(productService.listByMajorCategoryAndSubcategory(majorCategory, subcategory))

    @GetMapping("/major-category/{majorCategory}/subcategory/{subcategory}/brand/{brand}")
    fun listByMajorCategoryAndSubcategoryAndBrand(
        @PathVariable majorCategory: String,
        @PathVariable subcategory: String,
        @PathVariable brand: String
    ): ResponseEntity<List<ProductResponse>> =
        ResponseEntity.ok(productService.listByMajorCategoryAndSubcategoryAndBrand(majorCategory, subcategory, brand))

    @PutMapping("/{id}/approve")
    @PreAuthorize("hasRole('ADMIN')")
    fun approve(@PathVariable id: Long): ResponseEntity<ProductResponse> =
        ResponseEntity.ok(productService.approveProduct(id))

    @PutMapping("/{id}/reject")
    @PreAuthorize("hasRole('ADMIN')")
    fun reject(@PathVariable id: Long): ResponseEntity<ProductResponse> =
        ResponseEntity.ok(productService.rejectProduct(id))

    @PutMapping("/{id}/remove")
    @PreAuthorize("hasRole('ADMIN')")
    fun remove(@PathVariable id: Long): ResponseEntity<ProductResponse> =
        ResponseEntity.ok(productService.removeProduct(id))

    @PostMapping("/{id}/view")
    fun incrementView(@PathVariable id: Long): ResponseEntity<Void> {
        productService.incrementViewCount(id)
        return ResponseEntity.ok().build()
    }

    @PostMapping("/{id}/like")
    fun incrementLike(@PathVariable id: Long): ResponseEntity<Void> {
        productService.incrementLikeCount(id)
        return ResponseEntity.ok().build()
    }

    @PostMapping("/{id}/purchase")
    fun incrementPurchase(@PathVariable id: Long): ResponseEntity<Void> {
        productService.incrementPurchaseCount(id)
        return ResponseEntity.ok().build()
    }

    @GetMapping("/trending/views")
    fun trendingByViews(): ResponseEntity<List<ProductResponse>> =
        ResponseEntity.ok(productService.trendingByViews())

    @GetMapping("/trending/likes")
    fun trendingByLikes(): ResponseEntity<List<ProductResponse>> =
        ResponseEntity.ok(productService.trendingByLikes())

    @GetMapping("/trending/purchases")
    fun trendingByPurchases(): ResponseEntity<List<ProductResponse>> =
        ResponseEntity.ok(productService.trendingByPurchases())

    @GetMapping("/search")
    fun search(
        @RequestParam query: String,
        @RequestParam(required = false) category: String?,
        @RequestParam(required = false) majorCategory: String?,
        @RequestParam(required = false) subcategory: String?,
        @RequestParam(required = false) brand: String?,
        @RequestParam(required = false) minPrice: Int?,
        @RequestParam(required = false) maxPrice: Int?,
        @RequestParam(required = false) minRating: Double?
    ): ResponseEntity<List<ProductResponse>> =
        ResponseEntity.ok(productService.searchProductsWithFilters(query, category, majorCategory, subcategory, brand, minPrice, maxPrice, minRating))

    @GetMapping("/{id}/recommendations")
    fun similarProducts(@PathVariable id: Long): ResponseEntity<List<ProductResponse>> =
        ResponseEntity.ok(productService.similarProducts(id))
} 