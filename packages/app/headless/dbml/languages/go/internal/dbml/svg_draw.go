package dbml

import (
	"fmt"
	"strings"
)

func writeSVGHead(sb *strings.Builder, width, height int) {
	sb.WriteString(`<?xml version="1.0" encoding="UTF-8"?>` + "\n")
	fmt.Fprintf(sb, `<svg xmlns="http://www.w3.org/2000/svg" width="%d" height="%d" viewBox="0 0 %d %d" font-family="ui-monospace, SFMono-Regular, Menlo, monospace">`+"\n", width, height, width, height)
	sb.WriteString(`<defs>
<marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="#7c3aed"/></marker>
<marker id="dot" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6"><circle cx="5" cy="5" r="3.2" fill="#6366f1"/></marker>
</defs>` + "\n")
	fmt.Fprintf(sb, `<rect width="%d" height="%d" fill="#ffffff"/>`+"\n", width, height)
}

func drawItem(sb *strings.Builder, it *svgItem) {
	fmt.Fprintf(sb, `<rect x="%d" y="%d" width="%d" height="%d" fill="#0f172a" rx="6"/>`+"\n", it.x, it.y, it.w, svgHeaderH)
	fmt.Fprintf(sb, `<text x="%d" y="%d" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">%s</text>`+"\n",
		it.x+it.w/2, it.y+21, escapeXML(it.title))

	rowY := it.y + svgHeaderH
	for i, row := range it.rows {
		fill := "#ffffff"
		if i%2 == 1 {
			fill = "#f8fafc"
		}
		if row.key == "PK" {
			fill = "#f5f3ff"
		}
		fmt.Fprintf(sb, `<rect x="%d" y="%d" width="%d" height="%d" fill="%s"/>`+"\n", it.x, rowY, it.w, svgRowH, fill)

		nameX := it.x + 8
		if row.key != "" {
			fmt.Fprintf(sb, `<text x="%d" y="%d" font-size="9" font-weight="bold" fill="#7c3aed">%s</text>`+"\n", nameX, rowY+17, row.key)
			nameX += 26
		}
		fmt.Fprintf(sb, `<text x="%d" y="%d" font-size="11" fill="#0f172a">%s</text>`+"\n", nameX, rowY+17, escapeXML(row.name))

		if row.typ != "" {
			fmt.Fprintf(sb, `<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="#e2e8f0"/>`+"\n", it.x+it.w/2, rowY, it.x+it.w/2, rowY+svgRowH)
			fmt.Fprintf(sb, `<text x="%d" y="%d" font-size="9" fill="#64748b" text-anchor="end">%s</text>`+"\n",
				it.x+it.w-8, rowY+17, escapeXML(row.typ))
		}
		rowY += svgRowH
	}

	fmt.Fprintf(sb, `<rect x="%d" y="%d" width="%d" height="%d" fill="none" stroke="#e2e8f0" rx="6"/>`+"\n", it.x, it.y, it.w, it.h)
}

func drawReference(sb *strings.Builder, boxes map[string]*svgItem, ref Reference) {
	src, ok1 := boxes[ref.Table2]
	dst, ok2 := boxes[ref.Table1]
	if !ok1 || !ok2 {
		return
	}
	sy := slotY(src, ref.Column2)
	ty := slotY(dst, ref.Column1)

	switch {
	case dst.x > src.x+src.w:
		drawLink(sb, src.x+src.w, sy, dst.x, ty)
	case dst.x+dst.w < src.x:
		drawLink(sb, src.x, sy, dst.x+dst.w, ty)
	default:
		drawLink(sb, src.x+src.w/2, src.y+src.h, dst.x+dst.w/2, dst.y)
	}
}

func slotY(it *svgItem, column string) int {
	for i, row := range it.rows {
		if row.name == column {
			return it.y + svgHeaderH + i*svgRowH + svgRowH/2
		}
	}
	return it.y + svgHeaderH/2
}

func drawLink(sb *strings.Builder, ex, ey, px, py int) {
	dx, dy := px-ex, py-ey
	if dx == 0 && dy == 0 {
		return
	}
	c1x, c1y, c2x, c2y := ex, ey, px, py
	if absInt(dx) >= absInt(dy) {
		k := clampInt(absInt(dx)/2, 24, 90)
		c1x, c2x = ex+signInt(dx)*k, px-signInt(dx)*k
	} else {
		k := clampInt(absInt(dy)/2, 24, 90)
		c1y, c2y = ey+signInt(dy)*k, py-signInt(dy)*k
	}
	fmt.Fprintf(sb, `<path d="M%d %d C%d %d %d %d %d %d" fill="none" stroke="#7c3aed" stroke-width="1.6" marker-start="url(#dot)" marker-end="url(#arrow)"/>`+"\n",
		ex, ey, c1x, c1y, c2x, c2y, px, py)
}

func absInt(n int) int {
	if n < 0 {
		return -n
	}
	return n
}

func signInt(n int) int {
	switch {
	case n < 0:
		return -1
	case n > 0:
		return 1
	}
	return 0
}

func clampInt(n, lo, hi int) int {
	if n < lo {
		return lo
	}
	if n > hi {
		return hi
	}
	return n
}
