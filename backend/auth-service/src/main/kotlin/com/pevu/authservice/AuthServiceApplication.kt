package com.pevu.authservice

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class AuthServiceApplication

fun main(args: Array<String>) {
    println("DATABASE_URL env: " + System.getenv("DATABASE_URL"))
    val ctx = runApplication<AuthServiceApplication>(*args)
    val env = ctx.environment
    println("Active Spring profiles: " + env.activeProfiles.joinToString())
    println("Spring config location: " + env.getProperty("spring.config.location"))
    println("Spring config name: " + env.getProperty("spring.config.name"))
} 