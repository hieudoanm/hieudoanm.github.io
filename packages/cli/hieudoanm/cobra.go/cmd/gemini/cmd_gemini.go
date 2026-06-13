package gemini

import (
	"github.com/spf13/cobra"
)

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "gemini",
		Short: "Interact with Google Gemini AI models",
	}
	cmd.AddCommand(geminiCodeCmd)
	return cmd
}
