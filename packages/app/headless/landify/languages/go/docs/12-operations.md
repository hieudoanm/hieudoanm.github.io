# Operations

## Running the preview server

`landify preview -p 8080` serves the current directory statically on
`127.0.0.1:8080` and shuts down gracefully on `SIGINT`/`SIGTERM`.

## Container

`Dockerfile` builds on `golang:1.27.1-alpine` and ships the binary on
`alpine:3.22` as user `landify` (uid 10001). Default command:
`serve --bind 0.0.0.0 --dir /site`.

```bash
docker run --rm -p 8080:8080 -v "$PWD/public:/site:ro" landify
```

## CI / publish

`.github/workflows/ci-app-headless-landify.yaml` runs `gofmt`, `make lint`,
`make test`, `make build-all`, uploads `bin/*`, and publishes a rolling GitHub
Release tagged `app-headless-landify-latest`.
