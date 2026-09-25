# syntax=docker/dockerfile:1

# --- Build Stage ---
FROM eclipse-temurin:25-jdk-alpine AS builder

WORKDIR /app

# Copy the wrapper and manifests first so the Gradle dependency layer is only
# invalidated when the build files change.
COPY gradlew gradlew.bat settings.gradle.kts build.gradle.kts gradle.properties ./
COPY gradle ./gradle
RUN ./gradlew --no-daemon dependencies --configuration runtimeClasspath

COPY src ./src
RUN ./gradlew --no-daemon installDist -x test

# --- Final Stage ---
FROM eclipse-temurin:25-jre-alpine

RUN apk add --no-cache ca-certificates \
    && addgroup -S -g 10001 landify \
    && adduser -S -u 10001 -G landify -H landify \
    && mkdir -p /site \
    && chown landify:landify /site

# installDist lays out <dist>/bin/<name> + <dist>/lib, which is the layout the
# generated launcher expects when it derives APP_HOME.
COPY --from=builder --chown=landify:landify /app/build/install/landify /opt/landify

USER landify
WORKDIR /site

EXPOSE 8080

ENV PORT=8080

ENTRYPOINT ["/opt/landify/bin/landify"]
CMD ["serve", "--bind", "0.0.0.0", "--port", "8080", "--dir", "/site"]
