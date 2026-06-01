FROM golang:1.26-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./
COPY src/ src/
COPY public/ public/

RUN CGO_ENABLED=0 go build -o /app/simplebase ./src

FROM scratch

COPY --from=builder /app/simplebase /simplebase
COPY --from=builder /app/public /public

EXPOSE 8080

ENV SIMPLEBASE_DATA=/data

VOLUME ["/data"]

ENTRYPOINT ["/simplebase"]
