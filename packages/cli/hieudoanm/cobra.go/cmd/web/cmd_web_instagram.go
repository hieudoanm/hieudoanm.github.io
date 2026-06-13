package web

import "github.com/spf13/cobra"

func newInstagramCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "instagram",
		Short: "Instagram related tools",
		Long:  `Instagram related tools like downloading images and reels.`,
	}
	cmd.AddCommand(newIGDownloadCmd())
	return cmd
}
