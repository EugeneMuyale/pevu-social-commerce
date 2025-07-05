package com.pevu.cartwishlistservice.repository

import com.pevu.cartwishlistservice.model.WishlistItem
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.Optional

@Repository
interface WishlistItemRepository : JpaRepository<WishlistItem, Long> {
    fun findByWishlistId(wishlistId: Long): List<WishlistItem>
    fun findByWishlistIdAndProductId(wishlistId: Long, productId: Long): Optional<WishlistItem>
    fun deleteByWishlistIdAndProductId(wishlistId: Long, productId: Long)
} 