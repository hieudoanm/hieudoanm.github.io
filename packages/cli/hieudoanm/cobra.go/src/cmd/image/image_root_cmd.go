package image

import (
	"github.com/spf13/cobra"
)

var jsonOutput bool

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "image",
		Short: "Image inspection and conversion tools",
		Long:  `Get image metadata, convert between formats, and extract dominant colors.`,
		Example: `  image info --file photo.jpg
  image convert --file photo.jpg --format png
  image dominant --file photo.jpg`,
		RunE: func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}
	cmd.AddCommand(newInfoCmd())
	cmd.AddCommand(newConvertCmd())
	cmd.AddCommand(newDominantCmd())
	cmd.PersistentFlags().BoolVar(&jsonOutput, "json", false, "Output in JSON format")
	return cmd
}
