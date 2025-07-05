FROM eclipse-temurin:21-jdk-alpine as build
WORKDIR /app
COPY . .
ENV GRADLE_USER_HOME=/tmp/gradle-home
RUN ./gradlew bootJar

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY build/libs/*.jar app.jar
RUN apt-get update && apt-get install -y ffmpeg libstdc++6 libva2 libva-drm2 libva-x11-2 && rm -rf /var/lib/apt/lists/*
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"] 