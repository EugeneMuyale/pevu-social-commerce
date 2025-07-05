package com.pevu.cartwishlistservice.model

import jakarta.persistence.*
import java.time.Instant

@Entity
@Table(name = "wishlists", uniqueConstraints = [
    UniqueConstraint(columnNames = ["userId"])
])
data class Wishlist(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    val userId: Long,
    val createdAt: Instant = Instant.now(),
    val updatedAt: Instant = Instant.now()
)

@Entity
@Table(name = "wishlist_items")
data class WishlistItem(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "wishlist_id")
    val wishlist: Wishlist,
    val productId: Long,
    val createdAt: Instant = Instant.now(),
    val updatedAt: Instant = Instant.now()
) 