// Package youtube ...
package youtube

import (
	"github.com/spf13/cobra"
)

// NewCommand returns the youtube root cobra command.
func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "youtube",
		Short: "YouTube CLI application (devtools)",
		Long: `The youtube CLI application is a comprehensive backend utility belonging to the devtools suite of tools.

Use this root executable to manage configuring, running, and interacting with all youtube-related operations securely and efficiently from your terminal.`,
	}

	cmd.AddCommand(youtubeThumbnailsCmd)
	cmd.AddCommand(youtubeTranscriptCmd)

	return cmd
}
