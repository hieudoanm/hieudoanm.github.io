FROM golang:1.26-alpine AS builder

WORKDIR /app

COPY go.mod go.sum* ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 go build -ldflags="-s -w" -o /app/kv .

FROM scratch

COPY --from=builder /app/kv /kv

EXPOSE 6379

ENTRYPOINT ["/kv"]
