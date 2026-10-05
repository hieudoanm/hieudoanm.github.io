"""LaTeX table rendering without pandas' optional Jinja2 backend.

`DataFrame.to_latex` needs jinja2 and does not escape LaTeX specials, so a
model called `resnet18_hybrid` produces a table that will not compile. These
helpers keep the report stage dependency-free and produce a stable format.
"""

from typing import Any, List, Sequence

SPECIALS = {
    "\\": r"\textbackslash{}",
    "&": r"\&",
    "%": r"\%",
    "$": r"\$",
    "#": r"\#",
    "_": r"\_",
    "{": r"\{",
    "}": r"\}",
    "~": r"\textasciitilde{}",
    "^": r"\textasciicircum{}",
}

EMPTY_CELL = "--"


def escape_latex(text: str) -> str:
    """Escape the characters that would break a LaTeX table cell."""
    return "".join(SPECIALS.get(character, character) for character in str(text))


def format_cell(value: Any, digits: int) -> str:
    """Render one cell: numbers to a fixed precision, missing values as `--`."""
    if value is None:
        return EMPTY_CELL
    if isinstance(value, bool):
        return "yes" if value else "no"
    if isinstance(value, float):
        if value != value:  # NaN
            return EMPTY_CELL
        return f"{value:.{digits}f}"
    return escape_latex(value)


def to_latex_table(
    headers: Sequence[str],
    rows: Sequence[Sequence[Any]],
    digits: int = 3,
    label: str | None = None,
) -> str:
    """Render a booktabs table with right-aligned numeric columns."""
    rendered = [[format_cell(value, digits) for value in row] for row in rows]
    width = max((len(row) for row in rendered), default=0)
    alignment = "".join(
        "r" if _is_numeric(rendered, column) else "l" for column in range(width)
    )
    column_spec = f"{{{alignment}}}"

    lines = [f"\\begin{{tabular}}{{{column_spec}}}", "\\toprule"]
    lines.append(" & ".join(escape_latex(header) for header in headers) + " \\\\")
    lines.append("\\midrule")
    lines.extend(" & ".join(row) + " \\\\" for row in rendered)
    lines.append("\\bottomrule")
    lines.append("\\end{tabular}")

    if label:
        lines.insert(1, f"\\label{{{label}}}")
    return "\n".join(lines)


def _is_numeric(rows: Sequence[Sequence[str]], column: int) -> bool:
    """A column is right-aligned when every filled cell in it looks numeric."""
    cells = [row[column] for row in rows if column < len(row)]
    if not cells or all(cell == EMPTY_CELL for cell in cells):
        return False
    return all(_looks_numeric(cell) for cell in cells)


def _looks_numeric(cell: str) -> bool:
    try:
        float(cell)
    except ValueError:
        return False
    return True