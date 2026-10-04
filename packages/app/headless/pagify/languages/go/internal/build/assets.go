package build

import (
	"fmt"
	"io/fs"
	"path"

	"pagify/internal/theme"
)

// writeAssets copies the theme assets and the content's own non-Markdown files
// into outputDir, and reports how many files were written.
func writeAssets(outputDir string, selected *theme.Theme, content map[string][]byte) (int, error) {
	written, err := copyTree(outputDir, selected.Assets(), theme.AssetDir)
	if err != nil {
		return 0, err
	}
	for name, data := range content {
		if err := writeFile(outputDir, path.Join(theme.AssetDir, name), data); err != nil {
			return 0, err
		}
		written++
	}
	return written, nil
}

// copyTree writes every file in src under dst inside outputDir.
func copyTree(outputDir string, src fs.FS, dst string) (int, error) {
	count := 0
	err := fs.WalkDir(src, ".", func(name string, entry fs.DirEntry, err error) error {
		if err != nil {
			return err
		}
		if entry.IsDir() {
			return nil
		}
		data, readErr := fs.ReadFile(src, name)
		if readErr != nil {
			return readErr
		}
		if writeErr := writeFile(outputDir, path.Join(dst, name), data); writeErr != nil {
			return writeErr
		}
		count++
		return nil
	})
	if err != nil {
		return 0, fmt.Errorf("copy theme assets: %w", err)
	}
	return count, nil
}
