package com.pevu.mediaservice.dto

import com.pevu.mediaservice.model.VideoType

data class MediaUploadResponse(
    val fileName: String,
    val url: String,
    val videoType: VideoType? = null,
    val duration: Int? = null,
    val thumbnailUrl: String? = null
) 