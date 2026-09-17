package markdown

import (
	"bytes"
	"fmt"

	"gopkg.in/yaml.v3"
)

// fence delimits a YAML frontmatter block at the very top of a file.
var fence = []byte("---")

// Frontmatter holds the page metadata read from a leading YAML block. Every
// field is optional; zero values mean "not set" and let the site builder fall
// back to conventions derived from the file path.
//
// For the index page, additional site-wide fields are supported:
//
//	---
//	title: My Documentation
//	language: en
//	basePath: /my-repo
//	theme: light
//	footer: "© 2024 Example"
//	---
type Frontmatter struct {
	Title       string `yaml:"title"`
	Description string `yaml:"description"`
	Order       *int   `yaml:"order"`
	Draft       bool   `yaml:"draft"`
	Label       string `yaml:"label"`

	// Site-wide fields (only read from the index page)
	Language string `yaml:"language"`
	BasePath string `yaml:"basePath"`
	Theme    string `yaml:"theme"`
	Footer   string `yaml:"footer"`
}

// TitleOr returns fm.Title when set, otherwise fallback.
func (fm Frontmatter) TitleOr(fallback string) string {
	if fm.Title != "" {
		return fm.Title
	}
	return fallback
}

// SplitFrontmatter separates a leading `---` delimited YAML block from the
// Markdown body. Input without frontmatter is returned unchanged with a zero
// Frontmatter and ok=false.
func SplitFrontmatter(src []byte) (Frontmatter, []byte, bool, error) {
	var fm Frontmatter

	rest, ok := bytes.CutPrefix(src, fence)
	if !ok {
		return fm, src, false, nil
	}
	closing := append([]byte("\n"), fence...)
	block, rest, found := bytes.Cut(rest, closing)
	if !found {
		// An opening fence with no closing fence is ordinary Markdown (a
		// thematic break or a setext heading), not malformed metadata.
		return fm, src, false, nil
	}
	if err := yaml.Unmarshal(block, &fm); err != nil {
		return fm, nil, false, fmt.Errorf("parse frontmatter: %w", err)
	}
	return fm, bytes.TrimLeft(rest, "\n"), true, nil
}

// EncodeFrontmatter renders fm as a `---` delimited YAML block followed by a
// blank line, for the scaffolded files written by `pagify init`.
func EncodeFrontmatter(fm Frontmatter) ([]byte, error) {
	var buf bytes.Buffer
	buf.Write(fence)
	buf.WriteByte('\n')
	if err := yaml.NewEncoder(&buf).Encode(fm); err != nil {
		return nil, fmt.Errorf("encode frontmatter: %w", err)
	}
	buf.Write(fence)
	buf.WriteString("\n\n")
	return buf.Bytes(), nil
}
