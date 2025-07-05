pluginManagement {
    repositories {
        gradlePluginPortal()
        mavenCentral()
        google()
    }
}

rootProject.name = "pevu-backend"

include(
  "auth-service",
  "product-service",
  "media-service",
  "user-profile-service",
  "order-service",
  "social-interaction-service",
  "cart-wishlist-service",
  "chatbot-service",
  "live-stream-service"
) 