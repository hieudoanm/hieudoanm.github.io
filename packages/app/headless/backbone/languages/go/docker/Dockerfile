# download stage: fetch the latest release binary via scripts/install.sh
# (FROM defaults to $TARGETPLATFORM, so `uname` reports the target arch)
FROM debian:trixie-slim AS download

ARG REPO=hieudoanm/hieudoanm.github.io
ARG INSTALL_SCRIPT_URL=https://raw.githubusercontent.com/${REPO}/master/packages/app/headless/backbone/languages/go/scripts/install.sh

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
    && test "$(head -c4 /usr/local/bin/backbone)" = "$(printf '\177ELF')"

# writable data dir for the non-root runtime (SQLite + AES secrets key)
RUN mkdir -p /data && chown 65532:65532 /data

# runtime stage
FROM scratch

COPY --from=download /usr/local/bin/backbone /backbone
COPY --from=download /data /data

ENV PORT=8080
ENV BACKBONE_DATA=/data

EXPOSE 8080

VOLUME ["/data"]

USER 65532:65532

# no HEALTHCHECK: scratch ships no probe tool and backbone has no CLI probe;
# on Deploy platforms point the health check at GET /api/health
ENTRYPOINT ["/backbone"]