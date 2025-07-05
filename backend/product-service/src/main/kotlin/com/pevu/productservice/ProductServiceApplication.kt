package com.pevu.productservice

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.slf4j.LoggerFactory

@SpringBootApplication
class ProductServiceApplication

fun main(args: Array<String>) {
    val logger = LoggerFactory.getLogger("ProductServiceApplication")
    logger.info("ProductServiceApplication main() starting up!")
    runApplication<ProductServiceApplication>(*args)
} 