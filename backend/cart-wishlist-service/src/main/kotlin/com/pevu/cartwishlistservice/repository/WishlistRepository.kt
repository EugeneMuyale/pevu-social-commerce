package com.pevu.cartwishlistservice.repository

import com.pevu.cartwishlistservice.model.Wishlist
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.Optional

@Repository
interface WishlistRepository : JpaRepository<Wishlist, Long> {
    fun findByUserId(userId: Long): Optional<Wishlist>
} 