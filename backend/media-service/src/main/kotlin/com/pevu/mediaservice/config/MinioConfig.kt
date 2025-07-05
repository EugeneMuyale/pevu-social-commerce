package com.pevu.mediaservice.config

import io.minio.MinioClient
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class MinioConfig {
    @Bean
    fun minioClient(
        @Value("\${MINIO_URL}") url: String,
        @Value("\${MINIO_ACCESS_KEY}") accessKey: String,
        @Value("\${MINIO_SECRET_KEY}") secretKey: String
    ): MinioClient = MinioClient.builder()
        .endpoint(url)
        .credentials(accessKey, secretKey)
        .build()
} 