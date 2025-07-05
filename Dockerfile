FROM eclipse-temurin:21-jdk-alpine as build
WORKDIR /app
COPY backend/auth-service/ .
ENV GRADLE_USER_HOME=/tmp/gradle-home
RUN ./gradlew bootJar

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/build/libs/auth-service-0.1.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"] 