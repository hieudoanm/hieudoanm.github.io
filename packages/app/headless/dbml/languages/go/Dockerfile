# Build stage
FROM golang:1.23-alpine AS builder

WORKDIR /app

RUN apk add --no-cache git

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 go build -o /dbml .

# Runtime stage
FROM alpine:3.20

RUN apk add --no-cache ca-certificates

COPY --from=builder /dbml /usr/local/bin/dbml

EXPOSE 8080

ENV PORT=8080

ENTRYPOINT ["dbml"]
CMD ["serve", "--port", "8080"]