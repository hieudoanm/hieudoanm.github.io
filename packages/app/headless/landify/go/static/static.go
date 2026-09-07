// Package static embeds the input assets that drive the generator:
// the page template and the annotated example YAML.
package static

import "embed"

// FS holds the raw template and example content as shipped with the module.
//
//go:embed template.tmpl example.yaml
var FS embed.FS
