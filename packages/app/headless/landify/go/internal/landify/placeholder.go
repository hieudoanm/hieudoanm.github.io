package landify

import (
	"fmt"
	"os"

	"landify/static"
)

// WritePlaceholder writes the annotated landify.yaml template to path.
func WritePlaceholder(path string) error {
	data, err := static.FS.ReadFile("example.yaml")
	if err != nil {
		return fmt.Errorf("read example: %w", err)
	}
	if err := os.WriteFile(path, data, 0o644); err != nil {
		return fmt.Errorf("write %s: %w", path, err)
	}
	return nil
}
