package landify

import (
	"fmt"
	"os"
	"strings"

	"landify/static"
)

// WritePlaceholder writes the annotated landify.yaml template for the given
// page type to path. An unknown type is rejected with the message validation
// uses; an empty type maps to the default "product" example.
func WritePlaceholder(path, typ string) error {
	typ = NormalizeType(typ)
	if !isKnownType(typ) {
		return fmt.Errorf("type %q is not supported (available: %s)", typ, strings.Join(KnownTypes(), ", "))
	}
	data, err := static.FS.ReadFile("examples/example-" + typ + ".yaml")
	if err != nil {
		return fmt.Errorf("read example: %w", err)
	}
	if err := os.WriteFile(path, data, 0o644); err != nil {
		return fmt.Errorf("write %s: %w", path, err)
	}
	return nil
}
