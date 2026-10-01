# syntax=docker/dockerfile:1

# --- Build Stage ---
FROM golang:1.27.1-alpine AS builder

WORKDIR /app

# static/ is embedded with //go:embed, so it must be present at compile time.
COPY go.mod go.sum ./
COPY cmd/ cmd/
COPY internal/ internal/
COPY static/ static/
COPY main.go ./

RUN CGO_ENABLED=0 go build -o /app/landify .

# --- Final Stage ---
FROM alpine:3.22

RUN apk add --no-cache ca-certificates \
    && addgroup -S -g 10001 landify \
    && adduser -S -u 10001 -G landify -H landify \
    && mkdir -p /site \
    && chown landify:landify /site

COPY --from=builder /app/landify /usr/local/bin/landify

USER landify
WORKDIR /site

EXPOSE 8080

ENV PORT=8080

ENTRYPOINT ["landify"]
CMD ["serve", "--bind", "0.0.0.0", "--port", "8080", "--dir", "/site"]
