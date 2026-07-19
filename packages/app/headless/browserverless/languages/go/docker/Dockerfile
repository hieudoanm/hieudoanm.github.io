# download stage: fetch the latest release binary via scripts/install.sh
# (FROM defaults to $TARGETPLATFORM, so `uname` reports the target arch)
FROM debian:trixie-slim AS download

ARG REPO=hieudoanm/hieudoanm.github.io
ARG INSTALL_SCRIPT_URL=https://raw.githubusercontent.com/${REPO}/master/packages/app/headless/browserverless/languages/go/scripts/install.sh

# install.sh needs curl; bash, tr, mktemp, uname and mv ship with debian slim
RUN apt-get update && apt-get install -y --no-install-recommends \
        curl \
        ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# self-contained: fetch install.sh from the repo so this image builds with any
# build context (e.g. just the docker/ directory, as deploy platforms do)
RUN curl -fsSL "${INSTALL_SCRIPT_URL}" -o /install.sh \
    && chmod +x /install.sh \
    && INSTALL_DIR=/usr/local/bin REPO="${REPO}" /install.sh \
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
