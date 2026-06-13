package web

import "github.com/spf13/cobra"

func newYoutubeCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "youtube",
		Short: "YouTube CLI application (devtools)",
		Long: `The youtube CLI application is a comprehensive backend utility belonging to the devtools suite of tools.

Use this root executable to manage configuring, running, and interacting with all youtube-related operations securely and efficiently from your terminal.`,
	}

	cmd.AddCommand(newYoutubeThumbnailsCmd())
	cmd.AddCommand(newYoutubeFetchCmd())

	return cmd
}
