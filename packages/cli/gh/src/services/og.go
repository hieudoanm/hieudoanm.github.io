package services

import (
	"fmt"
	"strings"
)

const (
	OGWidth      = 1280
	OGHeight     = 640
	Padding      = 100
	MaxDescWidth = 900
	LineHeight   = 44
)

// Repo metadata (from GitHub API)
type Repo struct {
	FullName    string `json:"full_name"`
	Description string `json:"description"`
	Stars       int    `json:"stargazers_count"`
	Forks       int    `json:"forks_count"`
	Language    string `json:"language"`
}

// Public API
func GenerateOpenGraph(repo Repo) string {
	svg := buildOpenGraphSVG(repo)
	return saveSVG("og.svg", svg)
}

// ------------------------
// MAIN SVG
// ------------------------

func buildOpenGraphSVG(repo Repo) string {
	title := escape(repo.FullName)
	descLines := wrapText(escape(repo.Description), 40)

	stats := fmt.Sprintf("⭐ %d    🍴 %d    %s", repo.Stars, repo.Forks, repo.Language)

	svg := fmt.Sprintf(
		`<svg width="%d" height="%d" viewBox="0 0 %d %d" xmlns="http://www.w3.org/2000/svg">`,
		OGWidth, OGHeight, OGWidth, OGHeight,
	)

	// Background gradient
	svg += `
	<defs>
		<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
			<stop offset="0%%" stop-color="#0d1117"/>
			<stop offset="100%%" stop-color="#161b22"/>
		</linearGradient>
	</defs>
	`

	svg += `<rect width="100%" height="100%" fill="url(#bg)"/>`

	// Styles
	svg += `
	<style>
		.title {
			font-family: system-ui, -apple-system, sans-serif;
			font-size: 72px;
			font-weight: 700;
			fill: #ffffff;
		}
		.desc {
			font-family: system-ui, -apple-system, sans-serif;
			font-size: 34px;
			fill: #8b949e;
		}
		.stats {
			font-family: system-ui, -apple-system, sans-serif;
			font-size: 30px;
			fill: #c9d1d9;
		}
		.footer {
			font-family: system-ui, -apple-system, sans-serif;
			font-size: 26px;
			fill: #6e7681;
		}
	</style>
	`

	// ---- Layout positions ----
	titleY := 220
	descY := 300

	// Title
	svg += fmt.Sprintf(
		`<text x="%d" y="%d" class="title">%s</text>`,
		Padding,
		titleY,
		title,
	)

	// Description (multi-line)
	for i, line := range descLines {
		svg += fmt.Sprintf(
			`<text x="%d" y="%d" class="desc">%s</text>`,
			Padding,
			descY+(i*LineHeight),
			line,
		)
	}

	// Stats (move up since no bar)
	statsY := descY + (len(descLines) * LineHeight) + 60

	svg += fmt.Sprintf(
		`<text x="%d" y="%d" class="stats">%s</text>`,
		Padding,
		statsY,
		stats,
	)

	// Footer
	owner := strings.Split(repo.FullName, "/")[0]

	svg += fmt.Sprintf(
		`<text x="%d" y="%d" class="footer">github.com/%s</text>`,
		Padding,
		OGHeight-80,
		owner,
	)

	svg += `</svg>`

	return svg
}

// ------------------------
// HELPERS
// ------------------------

func wrapText(text string, maxChars int) []string {
	words := strings.Fields(text)
	var lines []string
	var current string

	for _, w := range words {
		if len(current)+len(w)+1 > maxChars {
			lines = append(lines, current)
			current = w
		} else {
			if current == "" {
				current = w
			} else {
				current += " " + w
			}
		}
	}

	if current != "" {
		lines = append(lines, current)
	}

	return lines
}

func escape(s string) string {
	s = strings.ReplaceAll(s, "&", "&amp;")
	s = strings.ReplaceAll(s, "<", "&lt;")
	s = strings.ReplaceAll(s, ">", "&gt;")
	return s
}
