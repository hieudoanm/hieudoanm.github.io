package dbml

import "strings"

const (
	svgMargin  = 48
	svgGapX    = 90
	svgGapY    = 70
	svgCols    = 3
	svgTableW  = 230
	svgEnumW   = 170
	svgHeaderH = 34
	svgRowH    = 27
)

type svgItemRow struct {
	name string
	typ  string
	key  string
}

type svgItem struct {
	title string
	rows  []svgItemRow
	x, y  int
	w, h  int
}

func (p *Project) ToSVG() string {
	items := p.svgItems()
	placeItems(items)
	width, height := canvasSize(items)

	var sb strings.Builder
	writeSVGHead(&sb, width, height)

	boxes := make(map[string]*svgItem, len(items))
	for i := range items {
		boxes[items[i].title] = &items[i]
	}
	for _, ref := range p.References {
		drawReference(&sb, boxes, ref)
	}
	for i := range items {
		drawItem(&sb, &items[i])
	}
	sb.WriteString("</svg>\n")
	return sb.String()
}

func (p *Project) svgItems() []svgItem {
	items := make([]svgItem, 0, len(p.Tables)+len(p.Enums))
	for _, table := range p.Tables {
		rows := make([]svgItemRow, 0, len(table.Columns))
		for _, col := range table.Columns {
			key := ""
			switch {
			case col.IsPrimary:
				key = "PK"
			case col.IsUnique:
				key = "UK"
			}
			typ := col.SQLType()
			if col.IsNotNull {
				typ += " NOT NULL"
			}
			rows = append(rows, svgItemRow{name: col.Name, typ: typ, key: key})
		}
		items = append(items, svgItem{title: table.Name, rows: rows, w: svgTableW})
	}
	for _, enum := range p.Enums {
		rows := make([]svgItemRow, 0, len(enum.Values))
		for _, value := range enum.Values {
			rows = append(rows, svgItemRow{name: value})
		}
		items = append(items, svgItem{title: "enum " + enum.Name, rows: rows, w: svgEnumW})
	}
	return items
}

func placeItems(items []svgItem) {
	x, y, rowMax := svgMargin, svgMargin, 0
	for i := range items {
		items[i].h = svgHeaderH + len(items[i].rows)*svgRowH
		if i > 0 && i%svgCols == 0 {
			x = svgMargin
			y += rowMax + svgGapY
			rowMax = 0
		}
		items[i].x, items[i].y = x, y
		x += items[i].w + svgGapX
		if items[i].h > rowMax {
			rowMax = items[i].h
		}
	}
}

func canvasSize(items []svgItem) (int, int) {
	width, height := 0, 0
	for _, it := range items {
		if right := it.x + it.w + svgMargin; right > width {
			width = right
		}
		if bottom := it.y + it.h + svgMargin; bottom > height {
			height = bottom
		}
	}
	return width, height
}
