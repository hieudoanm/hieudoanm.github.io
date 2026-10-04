# Contributing

Thanks for helping improve `pagify`.

## Getting set up

```bash
make all          # format, vet, test, build
./bin/pagify serve # preview your changes at localhost
```

Go 1.27 or newer is required. There is nothing to install beyond Go: the
default theme is embedded in the binary, so no Node.js, npm or frontend
toolchain is involved at any point.

## Before you open a pull request

```bash
make format   # go fmt ./...
make lint     # go vet ./...
make test     # go test ./...
make coverage # coverage/coverage.html
```

All four must be clean. Add a test alongside every change in behaviour: the
suite is the specification, and a change without one is a change nobody can
check later.

## Working on the code

Read [AGENTS.md](../AGENTS.md) first. It holds the rules that shaped the
codebase, and [ARCHITECTURE.md](./ARCHITECTURE.md) explains how a build flows.
Three of them are worth restating because they are easy to break by accident:

- **Keep the layers separate.** `internal/site` resolves content, `internal/markdown`
  renders it, `internal/build` joins them, `internal/theme` presents it. A
  package must not reach into another layer's concerns: no styling decisions in
  the parser, no URL knowledge in the Markdown package, no template logic in Go.
- **Keep the default experience zero-config.** A new feature that needs a
  `pagify.yaml` field to be useful is a feature that needs a better default
  first. Everything in the config file is optional.
- **Keep generated sites static.** No server-side rendering, no runtime
  dependency, no framework. The output must work on any static host.

## Working on the theme

The theme is the product. When you change the template, the stylesheet or the
scripts, build a real site and look at it:

```bash
./bin/pagify init /tmp/preview
./bin/pagify serve /tmp/preview/docs
```

Check at least a narrow and a wide viewport, light and dark mode, and the
keyboard path. Then confirm the page still works with JavaScript disabled: the
site must stay readable, navigable and printable without it, so any change to
`script.js` or `search.js` has to remain an enhancement.

## Commit messages

Imperative and specific: `Lift the leading heading out of the page body`.
Explain the why in the body when it is not obvious from the diff.

## Reporting bugs

Include the command you ran, the content that triggered it, what you expected
and what happened. A failing Markdown file is the most useful thing you can
attach.

## Licence

By contributing you agree that your work is licensed under GPL-3.0, the licence
this project uses.
