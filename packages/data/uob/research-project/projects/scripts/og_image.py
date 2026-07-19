"""Generate the Open Graph card: a hand-built SVG rasterised to PNG.

Link previews need a raster image, so the SVG stays the source of truth and the
PNG is a build artefact beside it. `rsvg-convert` is preferred, with ImageMagick
and cairosvg as fallbacks; with none of them the page still ships, minus the
og:image tags, because a broken image card is worse than a text-only one.
"""

from __future__ import annotations

import shutil
import subprocess
from pathlib import Path

PUBLIC_DIR = Path(__file__).parent.parent / "public"
SVG_PATH = PUBLIC_DIR / "og.svg"
PNG_PATH = PUBLIC_DIR / "og.png"

WIDTH, HEIGHT = 1200, 630
FONT = "Helvetica Neue, Helvetica, Arial, sans-serif"
INK, MUTED, ACCENT, PAPER, LINE = "#18212b", "#5b6b7c", "#2463a6", "#f4f6f8", "#dfe6ee"

# Split by hand: a naive comma split leaves a double space after the break.
DESCRIPTION_LINES = ("Rank doctoral projects by your interests, methods,",
                     "supervisor research focus and programme.")

# Helvetica advance widths in em, grouped by width so the table stays short.
# The card is rendered with Helvetica Neue/Arial, which keep these metrics, so a
# label can be measured here and truncated instead of overflowing the panel.
_ADVANCE_GROUPS = ((0.191, "'"), (0.222, "ijl"), (0.260, "|"),
                   (0.278, " ,-./:;[]\\!ft"), (0.333, "()`r"), (0.334, "{}"),
                   (0.355, '"'), (0.389, "*"), (0.469, "^"),
                   (0.500, "Jcksvxyz"), (0.556, "#$0123456789=_abdeghnopqu"),
                   (0.584, "+<>~"), (0.611, "FTZ"), (0.667, "&ABEKRSXY"),
                   (0.722, "CDHNOVUw"), (0.778, "GPQ"), (0.833, "Mm"),
                   (0.889, "%"), (0.944, "W"), (1.015, "@"))
_ADVANCE = {char: em for em, group in _ADVANCE_GROUPS for char in group}
ELLIPSIS = "\u2026"


def text(x: int, y: int, size: int, fill: str, content: str,
         weight: str = "normal", spacing: int = 0) -> str:
    """One SVG text run."""
    return (f'<text x="{x}" y="{y}" font-family="{FONT}" font-size="{size}" '
            f'font-weight="{weight}" letter-spacing="{spacing}" fill="{fill}">{content}</text>')


def rect(x: int, y: int, w: int, h: int, fill: str, radius: int = 0, stroke: str = "") -> str:
    """One SVG rectangle, optionally outlined."""
    border = f' stroke="{stroke}" stroke-width="2"' if stroke else ""
    return (f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{radius}" '
            f'fill="{fill}"{border}/>')


def text_width(value: str, size: int) -> float:
    """How wide `value` renders at `size`, from the Helvetica advance table."""
    return size * sum(_ADVANCE.get(char, 0.556) for char in value)


def fit(value: str, size: int, width: int) -> str:
    """Shorten `value` to `width` pixels, marking the cut with an ellipsis."""
    if text_width(value, size) <= width:
        return value
    budget = width - text_width(ELLIPSIS, size)
    kept = ""
    for char in value:
        if text_width(kept + char, size) > budget:
            break
        kept += char
    return kept.rstrip(" ,;-") + ELLIPSIS


def stat(x: int, value: int, label: str) -> str:
    """A count in a rounded card, used for the totals along the bottom."""
    return (rect(x, 496, 190, 84, "#ffffff", 12, LINE)
            + text(x + 20, 540, 34, INK, str(value), "bold")
            + text(x + 20, 566, 18, MUTED, label))


def ranking_row(y: int, weight: int, cap: int, label: str, strongest: bool) -> str:
    """One ranked row: the weight badge, a fitted label and a bar scaled to the weight."""
    shade = ACCENT if strongest else "#7ea6d4"
    bar = int(240 * weight / cap) if cap else 0
    return (rect(792, y, 46, 46, shade, 10)
            + text(815, y + 31, 24, "#ffffff", str(weight), "bold")
            + text(854, y + 26, 23, INK, escape(fit(label, 23, 240)))
            + rect(854, y + 50, 240, 8, "#e9eff6", 4)
            + rect(854, y + 50, bar, 8, shade, 4))


def card(stats: tuple[int, int, int], ranked: list[str], cap: int) -> str:
    """The whole 1200x630 card, showing the first `cap` ranked categories."""
    rows = "".join(ranking_row(214 + index * 86, cap - index, cap, name, index == 0)
                   for index, name in enumerate(ranked[:cap]))
    return "\n".join([
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{WIDTH}" height="{HEIGHT}" '
        f'viewBox="0 0 {WIDTH} {HEIGHT}">',
        rect(0, 0, WIDTH, HEIGHT, PAPER),
        rect(0, 0, 12, HEIGHT, ACCENT),
        text(80, 150, 22, ACCENT, "UOB RESEARCH PROJECTS", "bold", 3),
        text(80, 232, 62, INK, "Research project", "bold"),
        text(80, 300, 62, INK, "explorer", "bold"),
        rect(80, 344, 96, 6, ACCENT),
        text(80, 404, 24, MUTED, escape(DESCRIPTION_LINES[0])),
        text(80, 438, 24, MUTED, escape(DESCRIPTION_LINES[1])),
        "".join(stat(80 + index * 206, value, label) for index, (value, label)
                in enumerate(zip(stats, ("projects", "supervisors", "subject areas")))),
        rect(760, 120, 360, 420, "#ffffff", 18, LINE),
        text(792, 172, 20, MUTED, "YOUR RANKING", "bold", 2),
        rows,
        text(80, 620, 16, MUTED, "hieudoanm.github.io/uob/research-projects"),
        "</svg>",
    ])


def escape(value: str) -> str:
    """Escape the characters XML cares about."""
    return (value.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;"))


def to_png() -> bool:
    """Rasterise the SVG, returning whether a PNG was produced."""
    for command in (["rsvg-convert", "-w", str(WIDTH), "-h", str(HEIGHT), str(SVG_PATH),
                     "-o", str(PNG_PATH)],
                    ["magick", "-background", "none", str(SVG_PATH), str(PNG_PATH)]):
        if not shutil.which(command[0]):
            continue
        if subprocess.run(command, capture_output=True).returncode == 0 and PNG_PATH.stat().st_size:
            return True
    return False


def build(stats: tuple[int, int, int] = (0, 0, 0), ranked: list[str] | None = None) -> bool:
    """Write og.svg and og.png; report whether the PNG is available."""
    PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
    import config

    SVG_PATH.write_text(card(stats, ranked or [], config.MAX_RANKED), encoding="utf-8")
    return to_png()


def from_store(connection) -> bool:
    """Build the card from the current store, the way `make dashboard` does."""
    import config
    import db

    counts = [db.scalar(connection, f"SELECT COUNT(*) FROM {table}") for table in
              ("project", "supervisor", "category WHERE dimension = 'subject'")]
    ranked = config.ranked_order(config.read_configuration(connection).interest)
    return build(tuple(counts), ranked)


if __name__ == "__main__":
    import db

    with db.session(read_only=True) as connection:
        ok = from_store(connection)
    print(f"PNG written to {PNG_PATH}" if ok else f"PNG unavailable; kept {SVG_PATH}")
