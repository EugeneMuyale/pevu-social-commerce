FROM eclipse-temurin:21-jdk-alpine as build
WORKDIR /app
COPY . .
COPY gradle-8.14.1-bin.zip /tmp/gradle-8.14.1-bin.zip
ENV GRADLE_USER_HOME=/tmp/gradle-home
RUN mkdir -p $GRADLE_USER_HOME/wrapper/dists/gradle-8.14.1-bin && \
    unzip /tmp/gradle-8.14.1-bin.zip -d $GRADLE_USER_HOME/wrapper/dists/gradle-8.14.1-bin/ && \
    ./gradlew bootJar

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY build/libs/*.jar app.jar
RUN apt-get update && apt-get install -y ffmpeg libstdc++6 libva2 libva-drm2 libva-x11-2 && rm -rf /var/lib/apt/lists/*
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"] 