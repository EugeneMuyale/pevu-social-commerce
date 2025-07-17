package com.pevu.authservice

import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component

@Component
class StartupLogger(
    @Value("\${spring.datasource.url:NOT_SET}") val datasourceUrl: String
) : CommandLineRunner {
    override fun run(vararg args: String?) {
        println("spring.datasource.url from @Value: $datasourceUrl")
    }
} 