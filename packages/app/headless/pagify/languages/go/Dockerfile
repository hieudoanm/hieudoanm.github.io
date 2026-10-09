# syntax=docker/dockerfile:1

# --- Build Stage ---
FROM golang:1.27.2-alpine AS builder

WORKDIR /app

# internal/theme/ is embedded with //go:embed, so it must exist at compile time.
COPY go.mod go.sum ./
COPY cmd/ cmd/
COPY internal/ internal/
COPY main.go ./

RUN CGO_ENABLED=0 go build -o /app/pagify .

# --- Final Stage ---
FROM alpine:3.24

RUN apk add --no-cache ca-certificates \
    && addgroup -S -g 10001 pagify \
    && adduser -S -u 10001 -G pagify -H pagify \
    && mkdir -p /site \
    && chown pagify:pagify /site

COPY --from=builder /app/pagify /usr/local/bin/pagify

USER pagify
WORKDIR /site

EXPOSE 8080

ENTRYPOINT ["pagify"]
CMD ["serve", "/site", "--host", "0.0.0.0", "--port", "8080"]
