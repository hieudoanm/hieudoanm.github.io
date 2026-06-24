package pascalcase

import (
	"fmt"

	"github.com/hieudoanm/jack/src/cmd/convert/internal"
	"github.com/spf13/cobra"
)

type result struct {
	Text       string `json:"text"`
	PascalCase string `json:"PascalCase"`
}

func NewCommand() *cobra.Command {
	return &cobra.Command{
		Use:   "pascalcase <text>",
		Short: "Convert text to PascalCase",
		Args:  cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			text, err := internal.ResolveText(args)
			if err != nil {
				return err
			}
			p := internal.ToPascalCase(text)
			useJSON, _ := cmd.Flags().GetBool("json")
			if useJSON {
				return internal.WriteJSON(cmd, result{Text: text, PascalCase: p})
			}
			fmt.Fprintln(cmd.OutOrStdout(), p)
			return nil
		},
	}
}
