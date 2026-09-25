FROM golang:1.27.1-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 go build -o /app/kevin .

FROM scratch

COPY --from=builder /app/kevin /kevin

EXPOSE 6379

ENTRYPOINT ["/kevin", "serve"]
