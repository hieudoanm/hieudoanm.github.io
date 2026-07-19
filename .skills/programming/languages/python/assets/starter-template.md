# Python Best Practices: Starter Template

A reusable starting point derived from the **9. Testing** section of [Python Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```python
@pytest.fixture
def db(tmp_path: Path) -> Database:
    return Database(tmp_path / "test.db")

def test_load_saved_key(db: Database) -> None:
    db.put("k", "v")
    assert db.get("k") == "v"
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
