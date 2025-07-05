package com.pevu.cartwishlistservice.service

import com.pevu.cartwishlistservice.dto.*
import com.pevu.cartwishlistservice.model.Cart
import com.pevu.cartwishlistservice.model.CartItem
import com.pevu.cartwishlistservice.model.Wishlist
import com.pevu.cartwishlistservice.model.WishlistItem
import com.pevu.cartwishlistservice.repository.*
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.Instant

@Service
class CartWishlistService(
    private val cartRepository: CartRepository,
    private val cartItemRepository: CartItemRepository,
    private val wishlistRepository: WishlistRepository,
    private val wishlistItemRepository: WishlistItemRepository
) {
    // CART
    fun getCart(userId: Long): List<CartItemResponse> {
        val cart = cartRepository.findByUserId(userId).orElseGet { cartRepository.save(Cart(userId = userId)) }
        return cartItemRepository.findByCartId(cart.id).map { it.toResponse() }
    }

    @Transactional
    fun addToCart(userId: Long, req: CartItemRequest): CartItemResponse {
        val cart = cartRepository.findByUserId(userId).orElseGet { cartRepository.save(Cart(userId = userId)) }
        val existing = cartItemRepository.findByCartIdAndProductId(cart.id, req.productId)
        return if (existing.isPresent) {
            val item = existing.get().copy(quantity = existing.get().quantity + req.quantity, updatedAt = Instant.now())
            cartItemRepository.save(item).toResponse()
        } else {
            cartItemRepository.save(CartItem(cart = cart, productId = req.productId, quantity = req.quantity)).toResponse()
        }
    }

    @Transactional
    fun updateCartItem(userId: Long, productId: Long, quantity: Int): CartItemResponse {
        val cart = cartRepository.findByUserId(userId).orElseThrow { NoSuchElementException("Cart not found") }
        val item = cartItemRepository.findByCartIdAndProductId(cart.id, productId).orElseThrow { NoSuchElementException("Item not found") }
        val updated = item.copy(quantity = quantity, updatedAt = Instant.now())
        return cartItemRepository.save(updated).toResponse()
    }

    @Transactional
    fun removeFromCart(userId: Long, productId: Long) {
        val cart = cartRepository.findByUserId(userId).orElseThrow { NoSuchElementException("Cart not found") }
        cartItemRepository.deleteByCartIdAndProductId(cart.id, productId)
    }

    @Transactional
    fun clearCart(userId: Long) {
        val cart = cartRepository.findByUserId(userId).orElseThrow { NoSuchElementException("Cart not found") }
        cartItemRepository.findByCartId(cart.id).forEach { cartItemRepository.delete(it) }
    }

    // WISHLIST
    fun getWishlist(userId: Long): List<WishlistItemResponse> {
        val wishlist = wishlistRepository.findByUserId(userId).orElseGet { wishlistRepository.save(Wishlist(userId = userId)) }
        return wishlistItemRepository.findByWishlistId(wishlist.id).map { it.toResponse() }
    }

    @Transactional
    fun addToWishlist(userId: Long, req: WishlistItemRequest): WishlistItemResponse {
        val wishlist = wishlistRepository.findByUserId(userId).orElseGet { wishlistRepository.save(Wishlist(userId = userId)) }
        val existing = wishlistItemRepository.findByWishlistIdAndProductId(wishlist.id, req.productId)
        return existing.orElseGet {
            wishlistItemRepository.save(WishlistItem(wishlist = wishlist, productId = req.productId))
        }.toResponse()
    }

    @Transactional
    fun removeFromWishlist(userId: Long, productId: Long) {
        val wishlist = wishlistRepository.findByUserId(userId).orElseThrow { NoSuchElementException("Wishlist not found") }
        wishlistItemRepository.deleteByWishlistIdAndProductId(wishlist.id, productId)
    }
}

private fun CartItem.toResponse() = CartItemResponse(id, productId, quantity, createdAt, updatedAt)
private fun WishlistItem.toResponse() = WishlistItemResponse(id, productId, createdAt, updatedAt) 