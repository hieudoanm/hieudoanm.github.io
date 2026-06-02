FROM golang:1.26-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./
COPY src/ src/
COPY public/ public/

RUN CGO_ENABLED=0 go build -o /app/simple ./src

FROM scratch

COPY --from=builder /app/simple /simple
COPY --from=builder /app/public /public

EXPOSE 8080

ENV SIMPLE_DATA=/data

VOLUME ["/data"]

ENTRYPOINT ["/simple"]
