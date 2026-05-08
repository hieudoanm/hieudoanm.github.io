package services

import (
	"fmt"
	"os"
	"path/filepath"
	"sort"
)

const (
	DefaultWidth  = 600
	DefaultHeight = 12

	MinTextWidth = 40 // only show text if segment is wide enough
)

type segment struct {
	lang    string
	start   int
	width   int
	percent float64
	bytes   int
}

// Public API
func GenerateLanguagesBar(langs map[string]int, colors map[string]string) string {
	segments := computeSegments(langs, DefaultWidth)
	svg := buildSVG(segments, colors, DefaultWidth, DefaultHeight)
	return saveSVG("languages.svg", svg)
}

// ------------------------
// SEGMENTS
// ------------------------

func computeSegments(langs map[string]int, width int) []segment {
	sorted := sortLanguages(langs)
	total := sum(langs)

	var segments []segment
	x := 0

	for i, item := range sorted {
		isLast := i == len(sorted)-1

		w := proportionalWidth(item.bytes, total, width, x, isLast)
		if w <= 0 {
			continue
		}

		pct := float64(item.bytes) / float64(total) * 100

		segments = append(segments, segment{
			lang:    item.lang,
			start:   x,
			width:   w,
			percent: pct,
			bytes:   item.bytes,
		})

		x += w
	}

	return segments
}

type langItem struct {
	lang  string
	bytes int
}

func sortLanguages(langs map[string]int) []langItem {
	var items []langItem
	for k, v := range langs {
		items = append(items, langItem{k, v})
	}

	sort.Slice(items, func(i, j int) bool {
		return items[i].bytes > items[j].bytes
	})

	return items
}

func sum(m map[string]int) int {
	total := 0
	for _, v := range m {
		total += v
	}
	return total
}

func proportionalWidth(bytes, total, fullWidth, currentX int, isLast bool) int {
	if isLast {
		return fullWidth - currentX
	}
	return int(float64(bytes) / float64(total) * float64(fullWidth))
}

// ------------------------
// SVG RENDERING
// ------------------------

func buildSVG(segments []segment, colors map[string]string, w, h int) string {
	radius := h / 2

	svg := fmt.Sprintf(
		`<svg width="%d" height="%d" viewBox="0 0 %d %d" xmlns="http://www.w3.org/2000/svg">`,
		w, h, w, h,
	)

	// accessibility
	svg += `<desc>Language usage breakdown by percentage and size</desc>`

	// styles + animation
	svg += `
	<style>
		.rect {
			transition: opacity 0.2s ease;
		}
		.rect:hover {
			opacity: 0.8;
		}
		.label {
			font-family: system-ui, -apple-system, sans-serif;
			font-size: 8px;
			fill: white;
			pointer-events: none;
			dominant-baseline: middle;
			text-anchor: middle;
		}
	</style>
	`

	// rounded clip
	svg += fmt.Sprintf(
		`<defs>
			<clipPath id="clip">
				<rect x="0" y="0" width="%d" height="%d" rx="%d" ry="%d"/>
			</clipPath>
		</defs>`,
		w, h, radius, radius,
	)

	svg += `<g clip-path="url(#clip)">`

	for i, s := range segments {
		color := resolveColorHex(s.lang, colors)

		title := fmt.Sprintf(
			"%s %.1f%% (%s)",
			s.lang,
			s.percent,
			formatBytes(s.bytes),
		)

		// staggered animation delay
		delay := float64(i) * 0.05

		// rect with animation
		svg += fmt.Sprintf(
			`<rect class="rect" x="%d" y="0" width="%d" height="%d" fill="%s" opacity="0">
				<title>%s</title>
				<animate attributeName="opacity" from="0" to="1" dur="0.4s" begin="%.2fs" fill="freeze"/>
			</rect>`,
			s.start,
			s.width,
			h,
			color,
			title,
			delay,
		)

		// text inside (only if wide enough)
		if s.width >= MinTextWidth {
			label := fmt.Sprintf("%s %.0f%%", s.lang, s.percent)

			cx := s.start + s.width/2
			cy := h / 2

			svg += fmt.Sprintf(
				`<text class="label" x="%d" y="%d" opacity="0">
					%s
					<animate attributeName="opacity" from="0" to="1" dur="0.4s" begin="%.2fs" fill="freeze"/>
				</text>`,
				cx,
				cy,
				label,
				delay+0.1,
			)
		}
	}

	svg += `</g></svg>`

	return svg
}

func resolveColorHex(lang string, colors map[string]string) string {
	if hex, ok := colors[lang]; ok {
		return hex
	}
	return "#b4b4b4"
}

// ------------------------
// FORMAT BYTES
// ------------------------

func formatBytes(b int) string {
	if b >= 1_000_000 {
		return fmt.Sprintf("%.1f MB", float64(b)/1_000_000)
	}
	if b >= 1_000 {
		return fmt.Sprintf("%.1f KB", float64(b)/1_000)
	}
	return fmt.Sprintf("%d B", b)
}

// ------------------------
// SAVE
// ------------------------

func saveSVG(filename, content string) string {
	// Create file
	f, err := os.Create(filename)
	if err != nil {
		panic(err)
	}
	defer f.Close()

	// Write content
	_, err = f.WriteString(content)
	if err != nil {
		panic(err)
	}

	// Get absolute path
	absPath, err := filepath.Abs(filename)
	if err != nil {
		panic(err)
	}

	return absPath
}
