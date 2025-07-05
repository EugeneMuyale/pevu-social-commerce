FROM eclipse-temurin:21-jdk as build
WORKDIR /app
COPY . .
ENV GRADLE_USER_HOME=/tmp/gradle-home
RUN ./gradlew bootJar

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"] 