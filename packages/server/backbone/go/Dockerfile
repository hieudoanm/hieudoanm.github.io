FROM golang:1.26-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./
COPY src/ src/
COPY public/ public/

RUN CGO_ENABLED=0 go build -o /app/backbone ./src

FROM scratch

COPY --from=builder /app/backbone /backbone
COPY --from=builder /app/public /public

ENV PORT=8080
ENV BACKBONE_DATA=/data

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 CMD wget --no-verbose --tries=1 --spider http://localhost:8080/api/health || exit 1

VOLUME ["/data"]

ENTRYPOINT ["/backbone"]
