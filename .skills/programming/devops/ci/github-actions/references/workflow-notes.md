# Workflow notes

Focused reference for **github-actions-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Configure jobs with appropriate runners:**

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@v4
      - name: Run tests
        run: npm test

  build:
    runs-on: ubuntu-latest
    needs: test
    steps:
      - uses: actions/checkout@v4
      - name: Build
        run: npm run build
```

- **Use appropriate runners (ubuntu-latest, windows-latest, macos-latest).**
- **Set timeout limits to prevent runaway jobs.**
- **Use job dependencies with `needs`.**

---

## 5. Caching

- **Use caching for dependencies:**

```yaml
steps:
  - name: Cache node modules
    uses: actions/cache@v4
    with:
      path: ~/.npm
      key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
      restore-keys: |
        ${{ runner.os }}-node-
```

- **Cache dependencies to speed up workflows.**
- **Use appropriate cache keys.**
- **Use restore-keys for cache fallbacks.**

---

## 6. Matrix Strategy

- **Use matrix for multiple configurations:**

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [16.x, 18.x, 20.x]
        os: [ubuntu-latest, windows-latest, macos-latest]
    steps:
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
```

- **Use matrix for testing across multiple configurations.**
- **Use exclude for specific combinations.**
- **Fail-fast to stop on first failure.**

---

## 7. Secrets Management

- **Use GitHub Secrets for sensitive data:**

```yaml
steps:
  - name: Deploy
    env:
      API_KEY: ${{ secrets.API_KEY }}
      DEPLOY_KEY: ${{ secrets.DEPLOY_KEY }}
    run: |
      deploy.sh
```
