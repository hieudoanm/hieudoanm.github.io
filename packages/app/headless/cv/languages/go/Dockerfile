# Build stage
FROM golang:1.27-alpine AS builder

WORKDIR /app

RUN apk add --no-cache git

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 go build -o /cv .

# Runtime stage
FROM alpine:3.24

RUN apk add --no-cache ca-certificates

COPY --from=builder /cv /usr/local/bin/cv

EXPOSE 8080

ENV PORT=8080

ENTRYPOINT ["cv"]
CMD ["serve", "--port", "8080"]
