package com.pevu.authservice

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class AuthServiceApplication

fun main(args: Array<String>) {
    println("DATABASE_URL env: " + System.getenv("DATABASE_URL"))
    runApplication<AuthServiceApplication>(*args)
} 