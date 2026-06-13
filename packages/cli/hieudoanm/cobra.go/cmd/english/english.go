package english

import (
	"github.com/spf13/cobra"
)

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "english",
		Short: "English dictionary tools",
		Long:  `English dictionary lookup tool that fetches word definitions, synonyms, antonyms, and usage examples.`,
	}
	cmd.AddCommand(newDefineCmd())
	return cmd
}
