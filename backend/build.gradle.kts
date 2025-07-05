plugins {
    id("org.springframework.boot") version "3.4.7" apply false
    id("io.spring.dependency-management") version "1.1.4" apply false
    kotlin("jvm") version "2.0.0" apply false
    kotlin("plugin.spring") version "2.0.0" apply false
}

allprojects {
    group = "com.pevu"
    version = "0.1.0"
}

subprojects {
    repositories {
        mavenCentral()
    }
}

// Add new service dependencies for live-stream-service and chatbot-service here if needed 