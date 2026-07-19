# Python Best Practices: 9. Testing

## Source guidance

This example applies the **9. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`pytest` + fixtures over unittest boilerplate** — `conftest.py` for shared setup; fixtures inject, don't global-setup:
- **`@pytest.mark.parametrize` for table-driven cases** — data and expectation in one readable declaration.
- **Name tests as sentences** — `def test_returns_404_when_user_not_found():` reads as a specification.
- **Tests import via the public API**, not internals — black-box tests catch design issues that white-box ones miss.
- **Keep tests isolated** — each test gets fresh fixtures; no ordering dependencies, no shared mutable state.

## Example

```python
@pytest.fixture
def db(tmp_path: Path) -> Database:
    return Database(tmp_path / "test.db")

def test_load_saved_key(db: Database) -> None:
    db.put("k", "v")
    assert db.get("k") == "v"
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for python-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
