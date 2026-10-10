# 1. Installation and Setup

Focused reference for **less**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 1. Installation and Setup

- Install: `npm install -g less` (CLI) or `less` as a devDependency for build pipelines.
- Compile: `lessc input.less output.css` (see `lessc --help` for all options).
- In-browser compile (development only): `<link rel="stylesheet/less" href="...">` + `<script src="less.min.js">`.
- Integrations: Webpack via `less-loader`, Vite via `vite-plugin-less`, or the `less` API in Node.

```bash
npm install -D less
npx lessc src/styles/index.less public/styles.css --source-map
```
