FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app
COPY . .
RUN chmod +x ./gradlew
RUN ./gradlew bootJar --no-daemon
RUN ls -la build/libs/
EXPOSE 8080
ENTRYPOINT ["sh", "-c", "java -jar build/libs/$(ls build/libs/*.jar | head -1)"] 