FROM golang:1.27-alpine AS builder

WORKDIR /app

COPY . .

RUN CGO_ENABLED=0 go build -o /app/kv .

FROM scratch

COPY --from=builder /app/kv /kv

EXPOSE 6379

ENTRYPOINT ["/kv"]