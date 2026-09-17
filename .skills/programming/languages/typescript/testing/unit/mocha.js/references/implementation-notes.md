# Implementation notes

Focused reference for **mocha-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 4. Spies & Stubs

- **Sinon for spies/stubs/fakes (the defacto companion):**

```js
const stub = sinon.stub(api, "fetchUser").resolves(fixture);
expect(stub).to.have.been.calledOnce;
stub.restore();
```

- **`sinon.restore()` in `afterEach`** — spies left installed leak across tests.
- **Stub the boundary (client/fetch), not the unit's internals.**

---

## 5. Running & CI

- **`mocha` with a config (`spec`, `reporter`, `timeout`):**

```json
{ "spec": ["test/**/*.spec.js"], "reporter": "spec", "timeout": 10000 }
```
