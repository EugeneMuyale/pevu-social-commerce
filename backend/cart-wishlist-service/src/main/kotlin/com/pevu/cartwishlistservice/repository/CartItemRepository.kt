package com.pevu.cartwishlistservice.repository

import com.pevu.cartwishlistservice.model.CartItem
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.Optional

@Repository
interface CartItemRepository : JpaRepository<CartItem, Long> {
    fun findByCartId(cartId: Long): List<CartItem>
    fun findByCartIdAndProductId(cartId: Long, productId: Long): Optional<CartItem>
    fun deleteByCartIdAndProductId(cartId: Long, productId: Long)
} 