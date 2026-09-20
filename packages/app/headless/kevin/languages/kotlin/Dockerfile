# syntax=docker/dockerfile:1

# --- Build Stage ---
FROM eclipse-temurin:25-jdk-alpine AS builder

WORKDIR /app

# The wrapper and build scripts go first so the Gradle dependency layer is only
# invalidated when a build file changes, not on every source edit.
COPY gradlew gradlew.bat settings.gradle.kts build.gradle.kts gradle.properties ./
COPY gradle ./gradle
RUN ./gradlew --no-daemon dependencies --configuration runtimeClasspath

COPY src ./src

# `-x test` because the tests already ran in CI; a Docker build should not fail
# because of a test-only dependency. installDist lays out bin/ + lib/, which is
# the layout the generated launcher expects when it derives APP_HOME.
RUN ./gradlew --no-daemon installDist -x test

# --- Final Stage ---
FROM eclipse-temurin:25-jre-alpine

RUN apk add --no-cache ca-certificates \
    && addgroup -S -g 10001 kevin \
    && adduser -S -u 10001 -G kevin -H kevin \
    && mkdir -p /data \
    && chown kevin:kevin /data

COPY --from=builder --chown=kevin:kevin /app/build/install/kevin /opt/kevin

USER kevin
WORKDIR /data

EXPOSE 6379

ENV PORT=6379

# The health check speaks the server's own protocol over TCP, so it exercises the
# real listener rather than a sidecar or an HTTP status that does not exist here.
# PING is the cheapest request that still proves the store is serving.
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD printf 'PING\r\n' | nc -w 3 127.0.0.1 ${PORT} | grep -q PONG || exit 1

ENTRYPOINT ["/opt/kevin/bin/kevin"]
# `--gui` and `--tui` need a display, so the default command is the headless
# server. Attach a manager UI with `--tui` only where a terminal is attached.
CMD ["serve", "--bind", "0.0.0.0", "--port", "6379", "--data", "/data/kevin.json"]