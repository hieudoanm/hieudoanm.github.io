package instagram

import (
	"github.com/spf13/cobra"
)

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "instagram",
		Short: "Instagram related tools",
		Long:  `Instagram related tools like downloading images and reels.`,
	}

	cmd.AddCommand(NewDownloadCommand())

	return cmd
}
