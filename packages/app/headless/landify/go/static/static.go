// Package static embeds the input assets that drive the generator:
// the per-type page templates, the shared partials, and the annotated
// example YAML.
package static

import "embed"

// FS holds the raw templates and example content as shipped with the module.
//
//go:embed templates partials examples
var FS embed.FS
