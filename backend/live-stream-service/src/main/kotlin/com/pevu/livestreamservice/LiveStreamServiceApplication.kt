package com.pevu.livestreamservice

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class LiveStreamServiceApplication

fun main(args: Array<String>) {
    runApplication<LiveStreamServiceApplication>(*args)
} 