package cmd

import (
	"github.com/spf13/cobra"

	"landify/internal/tui"
)

var tuiCmd = &cobra.Command{
	Use:   "tui [path]",
	Short: "Open the landify terminal editor",
	Long: `Opens the landify terminal editor: an editable YAML pane with a
:command line for save, reload, validate, build and generate — a portable
stand-in for the "studio" desktop app that ships in every build (no CGO).

An optional [path] opens that landify.yaml; without one the editor starts on
landify.yaml (creating it on save).

Keys: type to edit the YAML, Esc toggles the :command line, ctrl+c quits.
Commands:
  save                 write the buffer to disk
  reload               re-read the file, discarding unsaved edits
  validate             check the buffer against the schema
  build [file]         render the buffer (index.html by default)
  generate <type>      replace the buffer with a scaffold
  theme <name>         set the build theme override (yaml to clear)
  help, quit`,
	Args: cobra.MaximumNArgs(1),
	RunE: func(_ *cobra.Command, args []string) error {
		var path string
		if len(args) == 1 {
			path = args[0]
		}
		return tui.Run(path)
	},
}
