# Review checklist

Focused reference for **winter.js-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Observability: structured logs (`console.log(JSON.stringify(...))`), OpenTelemetry-adjacent when supported.**
- **Latency/startup measured under the deploy target; version runtime + adapter pinned.**

---

## General Rules of Thumb

- **WinterCG-first: `fetch`/`Response`/streams; no Node-process reliance.**
- **Handlers pure: `fetch(env, ctx)`; state via platform bindings.**
- **Deploy via `wasmer deploy` + `wasmer.toml`; secrets via the platform.**
- **Adapters chosen WinterCG-compatible; runtime versions pinned.**
- **Parity-tested across Workerd/LLRT/Node-with-adapters.**

---

## Quick-Start Checklist

- [ ] `fetch`-type entry (WinterCG); streams used ergonomically
- [ ] No unconditional `process.*`/`fs` in the public path
- [ ] `wasmer.toml` routes/env; secrets via platform store
- [ ] Stateless handlers; persistence through bindings
- [ ] Adapters WinterCG-only; bundle size kept lean
- [ ] Local-run parity tests + structured observability
