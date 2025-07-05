package com.pevu.productservice.model

import jakarta.persistence.*
import java.time.Instant

@Entity
@Table(name = "live_streams")
data class LiveStream @JvmOverloads constructor(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    val sellerId: Long = 0,
    val streamKey: String = "",
    val isLive: Boolean = false,
    val startedAt: Instant? = null,
    val title: String? = null,
    val viewerCount: Int = 0,
    val videoUrl: String? = null,
    val thumbnailUrl: String? = null
) 