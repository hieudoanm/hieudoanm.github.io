package base64

import (
	"github.com/spf13/cobra"
)

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "base64",
		Short: "Base64 encode/decode",
		Long:  `Encode text/file to base64 or decode base64 back to text/file.`,
		RunE:  func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}

	cmd.AddCommand(newEncodeCmd())
	cmd.AddCommand(newDecodeCmd())
	return cmd
}
