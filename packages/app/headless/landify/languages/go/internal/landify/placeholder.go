package landify

import (
	"fmt"
	"os"
	"strings"

	"landify/static"
)

// Placeholder returns the annotated landify.yaml template for the given page
// type. An unknown type is rejected with the message validation uses; an empty
// type maps to the default "product" example.
func Placeholder(typ string) ([]byte, error) {
	typ = NormalizeType(typ)
	if !isKnownType(typ) {
		return nil, fmt.Errorf("type %q is not supported (available: %s)", typ, strings.Join(KnownTypes(), ", "))
	}
	return static.FS.ReadFile("examples/example-" + typ + ".yaml")
}

// WritePlaceholder writes the annotated landify.yaml template for typ to path.
func WritePlaceholder(path, typ string) error {
	data, err := Placeholder(typ)
	if err != nil {
		return err
	}
	if err := os.WriteFile(path, data, 0o644); err != nil {
		return fmt.Errorf("write %s: %w", path, err)
	}
	return nil
}
