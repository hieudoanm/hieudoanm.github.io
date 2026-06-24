package camelcase

import (
	"fmt"

	"github.com/hieudoanm/jack/src/cmd/convert/internal"
	"github.com/spf13/cobra"
)

type result struct {
	Text      string `json:"text"`
	CamelCase string `json:"camelCase"`
}

func NewCommand() *cobra.Command {
	return &cobra.Command{
		Use:   "camelcase <text>",
		Short: "Convert text to camelCase",
		Args:  cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			text, err := internal.ResolveText(args)
			if err != nil {
				return err
			}
			c := internal.ToCamelCase(text)
			useJSON, _ := cmd.Flags().GetBool("json")
			if useJSON {
				return internal.WriteJSON(cmd, result{Text: text, CamelCase: c})
			}
			fmt.Fprintln(cmd.OutOrStdout(), c)
			return nil
		},
	}
}
