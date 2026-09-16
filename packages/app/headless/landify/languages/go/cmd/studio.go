package cmd

import (
	"github.com/spf13/cobra"

	"landify/internal/gui"
)

var studioCmd = &cobra.Command{
	Use:   "studio [path]",
	Short: "Open the landify studio desktop app",
	Long: `Opens the optional desktop "landify studio": a live YAML editor with
inline validation and a split preview pane, a theme studio (the 64 presets,
color pickers, derived tokens and WCAG contrast), per-section forms with
collection editors (add / remove / reorder), page-type scaffolding, and
one-click build & preview.

An optional [path] opens that landify.yaml; without one the studio starts
with a new product scaffold. Requires a GUI build:

  make build-gui    # builds bin/landify-gui (CGO enabled)
  ./bin/landify-gui studio [path]`,
	Args: cobra.MaximumNArgs(1),
	RunE: func(_ *cobra.Command, args []string) error {
		var path string
		if len(args) == 1 {
			path = args[0]
		}
		return gui.Run(path)
	},
}
