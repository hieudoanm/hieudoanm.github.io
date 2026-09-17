# Less: 1. Installation and Setup

## Source guidance

This example applies the **1. Installation and Setup** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- Install: `npm install -g less` (CLI) or `less` as a devDependency for build pipelines.
- Compile: `lessc input.less output.css` (see `lessc --help` for all options).
- In-browser compile (development only): `<link rel="stylesheet/less" href="...">` + `<script src="less.min.js">`.
- Integrations: Webpack via `less-loader`, Vite via `vite-plugin-less`, or the `less` API in Node.

## Example

```bash
npm install -D less
npx lessc src/styles/index.less public/styles.css --source-map
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for less.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
