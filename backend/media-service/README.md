# Media Service

Handles product image/video upload and classification for Pevu.

## Features
- Upload/store product images and videos
- Classify video as Reel or Story (by duration/orientation)
- Compress videos if needed
- MinIO integration

## Setup

- Build: `./gradlew bootJar`
- Run: `./gradlew bootRun` or via Docker

## Environment
- MinIO: see application.yml 