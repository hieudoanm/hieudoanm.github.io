# download stage: fetch the latest release binary via scripts/install.sh
# (FROM defaults to $TARGETPLATFORM, so `uname` reports the target arch)
FROM debian:trixie-slim AS download

ARG REPO=hieudoanm/hieudoanm.github.io

# install.sh needs curl; bash, tr, mktemp, uname and mv ship with debian slim
RUN apt-get update && apt-get install -y --no-install-recommends \
        curl \
        ca-certificates \
    && rm -rf /var/lib/apt/lists/*

COPY scripts/install.sh /install.sh

ENV INSTALL_DIR=/usr/local/bin
ENV REPO=${REPO}

# install.sh detects os/arch from `uname` (matches the target platform under
# buildx), downloads the release asset and installs the binary
RUN chmod +x /install.sh \
    && /install.sh \
    && browserverless version

# runtime stage
FROM scratch

COPY --from=download /usr/local/bin/browserverless /browserverless

ENV PORT=8080

EXPOSE 8080

USER 65532:65532

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD ["/browserverless", "health", "--base", "http://127.0.0.1:8080"]

ENTRYPOINT ["/browserverless"]
CMD ["serve", "--bind", "0.0.0.0:8080"]
