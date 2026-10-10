# Workflow notes

Focused reference for **mocha-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Chai `expect` style — compose readable contracts:**

```js
expect(cart.total()).to.equal(5);
expect(spy).to.have.been.calledWith(42);          // with sinon-chai
expect(fn).to.throw(/required/);
expect(result).to.have.property("id", 1);
```

- **Pick one style (expect/should/assert) and standardize — mixing styles is its own bug.**
- **Deep equality: `eql` (not strict `.equal`) for objects:**

```js
expect(args).to.eql({ email: "ada@example.com" });
```

---

## 3. Async Tests

- **Async via async/await or explicit `done` — never silently ignore:**

```js
it("loads items", async () => {
  const items = await loader.load();
  expect(items.length).to.equal(3);
});

it("falls back on error", (done) => {
  loader.load().catch((err) => { expect(err.message).to.contain("x"); done(); });
});
```

- **A `done` that's never called = timeout — set `this.timeout(...)` realistically; always call `done` on every path.**
- **Rejected promises fail the spec — `await expect(p).to.be.rejected` (chai-as-promised).**
