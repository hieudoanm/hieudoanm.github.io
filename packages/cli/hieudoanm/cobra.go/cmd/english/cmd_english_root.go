package english

import (
	"github.com/spf13/cobra"
)

var jsonOutput bool

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "english",
		Short: "English dictionary tools",
		Long:  `English dictionary lookup tool that fetches word definitions, synonyms, antonyms, and usage examples.`,
	}
	cmd.AddCommand(newDefineCmd())
	cmd.PersistentFlags().BoolVarP(&jsonOutput, "json", "j", false, "Output in JSON format")
	return cmd
}
