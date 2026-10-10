# Review checklist

Focused reference for **argparse-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **`main(argv=[...])` is testable without subprocess — pass args directly:**

```python
def test_port_out_of_range(capsys):
    with pytest.raises(SystemExit):
        main(["--port", "99999", "file.txt"])
    out, err = capsys.readouterr()
    assert "out of range" in err
```

- **Parsing table-tests**: input args × expected `args` namespace / exit code.
- **Contract cases**: missing required, unknown option, bad type, `-h`/`--help` output shape.

---

## General Rules of Thumb

- **One parser per CLI; thin `main`; typed values with `type=` callables.**
- **`choices`/mutually-exclusive/`append` encode constraints at parse time.**
- **Subcommands = `add_subparsers` + dispatch dispatch**
- **Every arg documented (`help=`); defaults in help.**
- **`main(argv)` testable; exit codes by convention (error=2, help=0).**

---

## Quick-Start Checklist

- [ ] `prog`/`description` set; every arg has `help=` and a `default`
- [ ] `type=` callables parse+validate; `choices` for closed sets
- [ ] `main(argv)` thin; parse once; args handed to typed functions
- [ ] Subcommands via `add_subparsers` + dispatch
- [ ] `ArgumentDefaultsHelpFormatter`; epilog examples
- [ ] Table-tested parsing + `-h` shape; `main(argv)` tested directly
