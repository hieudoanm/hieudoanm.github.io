# download stage: fetch the latest release binary via scripts/install.sh
# (FROM defaults to $TARGETPLATFORM, so `uname` reports the target arch)
FROM debian:trixie-slim AS download

ARG REPO=hieudoanm/hieudoanm.github.io
ARG INSTALL_SCRIPT_URL=https://raw.githubusercontent.com/${REPO}/master/packages/app/headless/landify/languages/go/scripts/install.sh

RUN apt-get update && apt-get install -y --no-install-recommends \
        curl \
        ca-certificates \
    && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL "${INSTALL_SCRIPT_URL}" -o /install.sh \
    && chmod +x /install.sh \
    && INSTALL_DIR=/usr/local/bin REPO="${REPO}" /install.sh \
    && landify --help

# runtime stage
FROM scratch

COPY --from=download /usr/local/bin/landify /landify

# serve/build whatever the container owner mounts here (default: an empty dir)
WORKDIR /site

EXPOSE 8080

USER 65532:65532

# default bind is 127.0.0.1 for local use; the image exposes the site on all
# interfaces so Deploy platforms can reach it
ENTRYPOINT ["/landify"]
CMD ["serve", "--bind", "0.0.0.0", "-p", "8080"]