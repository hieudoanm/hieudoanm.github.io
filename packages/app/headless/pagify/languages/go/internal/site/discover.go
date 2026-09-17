package site

import (
	"fmt"
	"io/fs"
	"os"
	"path"
	"path/filepath"
	"strings"

	"pagify/internal/markdown"
)

// skippedDirs are directory names never descended into: version-control
// metadata, dependency trees and previous build output.
var skippedDirs = map[string]bool{
	".git":         true,
	".github":      true,
	"node_modules": true,
	"vendor":       true,
	"dist":         true,
}

// skippedFiles are file names ignored wherever they appear.
var skippedFiles = map[string]bool{
	".DS_Store": true,
}

// backupSuffixes mark files an editor or sync tool left behind. They are not
// content and not assets, so copying them into the site would only publish
// stale copies of the author's writing.
var backupSuffixes = []string{"~", ".bak", ".backup", ".orig", ".swp", ".tmp"}

// isBackup reports whether a file name marks an editor or sync leftover.
func isBackup(name string) bool {
	for _, suffix := range backupSuffixes {
		if strings.HasSuffix(name, suffix) {
			return true
		}
	}
	return false
}

// partialNames are files that configure the site or its toolchain rather than
// appearing in its content. They are consumed by the build, never published.
var partialNames = map[string]bool{
	"pagify.yaml": true,
}

// Content is everything discovered below a content root: the Markdown pages and
// the assets that ship alongside them.
type Content struct {
	// Pages are the Markdown pages, sorted for navigation.
	Pages Pages
	// Assets maps a path relative to the content root to its bytes.
	Assets map[string][]byte
	// IndexFrontmatter holds site-wide config from the index page's frontmatter.
	IndexFrontmatter map[string]string
}

// Discover walks root and returns every Markdown page and asset below it. root
// must be a directory; symlinks are not followed. Hidden files and directories
// are skipped so editor and VCS scratch space never reaches the output.
func Discover(root string) (*Content, error) {
	info, err := os.Stat(root)
	if err != nil {
		return nil, fmt.Errorf("read content directory %s: %w", root, err)
	}
	if !info.IsDir() {
		return nil, fmt.Errorf("content path %s is not a directory", root)
	}

	content := &Content{Assets: map[string][]byte{}}
	walk := func(current string, entry fs.DirEntry, err error) error {
		if err != nil {
			return fmt.Errorf("walk %s: %w", current, err)
		}
		return content.collect(root, current, entry)
	}
	if err := filepath.WalkDir(root, walk); err != nil {
		return nil, err
	}
	if len(content.Pages) == 0 {
		return nil, fmt.Errorf("no Markdown files found in %s", root)
	}

	sortPages(content.Pages)
	return content, nil
}

// collect files one walked entry into the content, or skips it.
func (c *Content) collect(root, current string, entry fs.DirEntry) error {
	relative, err := filepath.Rel(root, current)
	if err != nil {
		return fmt.Errorf("resolve %s relative to %s: %w", current, root, err)
	}
	if relative == "." {
		return nil
	}
	if skipEntry(entry) {
		return skipDirOrNil(entry)
	}
	if entry.IsDir() {
		return nil
	}

	raw, err := os.ReadFile(current)
	if err != nil {
		return fmt.Errorf("read %s: %w", relative, err)
	}
	return c.file(path.Clean(filepath.ToSlash(relative)), filepath.Base(current), raw)
}

// file files one read file into the content, as a page or as a plain asset.
func (c *Content) file(source, name string, raw []byte) error {
	if isPartial(name) {
		return nil
	}
	if isMarkdown(name) {
		page, err := newPage(source, raw)
		if err != nil {
			return fmt.Errorf("parse %s: %w", source, err)
		}
		c.Pages = append(c.Pages, page)

		// If this is the site's index page, extract site-wide frontmatter
		if page.URL == "/" && c.IndexFrontmatter == nil {
			c.IndexFrontmatter = extractSiteFrontmatter(raw)
		}
		return nil
	}
	c.Assets[source] = raw
	return nil
}

// skipEntry reports whether a walked entry is excluded from the output.
// Hidden entries are skipped throughout: they hold editor state and VCS
// metadata that should never reach a published site.
func skipEntry(entry fs.DirEntry) bool {
	name := entry.Name()
	if entry.IsDir() {
		return strings.HasPrefix(name, ".") || skippedDirs[name]
	}
	return strings.HasPrefix(name, ".") || skippedFiles[name] || isBackup(name)
}

// skipDirOrNil turns a skipped directory into fs.SkipDir so the walk prunes
// the whole subtree, and a skipped file into nil so the walk continues.
func skipDirOrNil(entry fs.DirEntry) error {
	if entry.IsDir() {
		return fs.SkipDir
	}
	return nil
}

// isPartial reports whether name is a partial belonging to some toolchain
// rather than to the documentation, such as `_sidebar.md` or `pagify.yaml`.
func isPartial(name string) bool {
	return strings.HasPrefix(name, "_") || partialNames[name]
}

// extractSiteFrontmatter parses the frontmatter from the index page's raw
// content and returns site-wide fields as a map.
func extractSiteFrontmatter(raw []byte) map[string]string {
	fm, _, _, err := markdown.SplitFrontmatter(raw)
	if err != nil {
		return nil
	}
	result := make(map[string]string)
	if fm.Language != "" {
		result["language"] = fm.Language
	}
	if fm.BasePath != "" {
		result["basePath"] = fm.BasePath
	}
	if fm.Theme != "" {
		result["theme"] = fm.Theme
	}
	if fm.Footer != "" {
		result["footer"] = fm.Footer
	}
	if fm.Title != "" {
		result["title"] = fm.Title
	}
	return result
}
