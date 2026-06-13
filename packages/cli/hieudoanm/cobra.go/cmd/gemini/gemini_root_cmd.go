package gemini

import (
	"github.com/spf13/cobra"
)

var jsonOutput bool

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "gemini",
		Short: "Interact with Google Gemini AI models",
	}
	cmd.PersistentFlags().BoolVarP(&jsonOutput, "json", "j", false, "Output in JSON format")
	cmd.AddCommand(newCodeCmd())
	return cmd
}
