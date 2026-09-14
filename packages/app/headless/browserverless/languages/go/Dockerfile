# build stage
ARG GO_VERSION=1.27-alpine

FROM golang:${GO_VERSION} AS builder

WORKDIR /app

# cache dependency layer
COPY go.mod go.sum ./
RUN go mod download

COPY . .

ARG VERSION=0.1.0
RUN CGO_ENABLED=0 go build -trimpath \
  -ldflags="-s -w -X github.com/hieudoanm/browserverless/internal/version.Version=${VERSION}" \
  -o /app/browserverless .

# runtime stage
FROM scratch

COPY --from=builder /app/browserverless /browserverless

ENV PORT=8080

EXPOSE 8080

USER 65532:65532

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD ["/browserverless", "health", "--base", "http://127.0.0.1:8080"]

ENTRYPOINT ["/browserverless"]
CMD ["serve", "--bind", "0.0.0.0:8080"]