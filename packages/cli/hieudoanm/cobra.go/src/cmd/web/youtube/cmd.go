package youtube

import "github.com/spf13/cobra"

func NewCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "youtube",
		Short: "YouTube transcript and thumbnail tools",
		Long:  `Fetch YouTube video transcripts and download thumbnails in various qualities.`,
		Example: `  web youtube fetch --url dQw4w9WgXcQ
  web youtube thumbnails --url dQw4w9WgXcQ`,
		RunE: func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}

	cmd.AddCommand(newYoutubeThumbnailsCmd())
	cmd.AddCommand(newYoutubeFetchCmd())

	return cmd
}
