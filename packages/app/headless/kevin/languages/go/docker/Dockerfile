# download stage: fetch the latest release binary via scripts/install.sh
# (FROM defaults to $TARGETPLATFORM, so `uname` reports the target arch)
FROM debian:trixie-slim AS download

ARG REPO=hieudoanm/hieudoanm.github.io
ARG INSTALL_SCRIPT_URL=https://raw.githubusercontent.com/${REPO}/master/packages/app/headless/kevin/languages/go/scripts/install.sh

RUN apt-get update && apt-get install -y --no-install-recommends \
        curl \
        ca-certificates \
    && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL "${INSTALL_SCRIPT_URL}" -o /install.sh \
    && chmod +x /install.sh \
    && INSTALL_DIR=/usr/local/bin REPO="${REPO}" /install.sh \
    && kevin -h

# runtime stage
FROM scratch

COPY --from=download /usr/local/bin/kevin /kevin

EXPOSE 6379

USER 65532:65532

ENTRYPOINT ["/kevin"]
CMD ["--port", "6379"]