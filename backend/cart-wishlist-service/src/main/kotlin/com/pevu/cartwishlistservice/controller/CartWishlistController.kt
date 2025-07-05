package com.pevu.cartwishlistservice.controller

import com.pevu.cartwishlistservice.dto.*
import com.pevu.cartwishlistservice.service.CartWishlistService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api")
class CartWishlistController(
    private val service: CartWishlistService
) {
    // CART
    @GetMapping("/cart/{userId}")
    fun getCart(@PathVariable userId: Long): ResponseEntity<List<CartItemResponse>> =
        ResponseEntity.ok(service.getCart(userId))

    @PostMapping("/cart/{userId}")
    fun addToCart(@PathVariable userId: Long, @RequestBody req: CartItemRequest): ResponseEntity<CartItemResponse> =
        ResponseEntity.ok(service.addToCart(userId, req))

    @PutMapping("/cart/{userId}/{productId}")
    fun updateCartItem(@PathVariable userId: Long, @PathVariable productId: Long, @RequestParam quantity: Int): ResponseEntity<CartItemResponse> =
        ResponseEntity.ok(service.updateCartItem(userId, productId, quantity))

    @DeleteMapping("/cart/{userId}/{productId}")
    fun removeFromCart(@PathVariable userId: Long, @PathVariable productId: Long): ResponseEntity<Void> {
        service.removeFromCart(userId, productId)
        return ResponseEntity.noContent().build()
    }

    @DeleteMapping("/cart/{userId}")
    fun clearCart(@PathVariable userId: Long): ResponseEntity<Void> {
        service.clearCart(userId)
        return ResponseEntity.noContent().build()
    }

    // WISHLIST
    @GetMapping("/wishlist/{userId}")
    fun getWishlist(@PathVariable userId: Long): ResponseEntity<List<WishlistItemResponse>> =
        ResponseEntity.ok(service.getWishlist(userId))

    @PostMapping("/wishlist/{userId}")
    fun addToWishlist(@PathVariable userId: Long, @RequestBody req: WishlistItemRequest): ResponseEntity<WishlistItemResponse> =
        ResponseEntity.ok(service.addToWishlist(userId, req))

    @DeleteMapping("/wishlist/{userId}/{productId}")
    fun removeFromWishlist(@PathVariable userId: Long, @PathVariable productId: Long): ResponseEntity<Void> {
        service.removeFromWishlist(userId, productId)
        return ResponseEntity.noContent().build()
    }
} 