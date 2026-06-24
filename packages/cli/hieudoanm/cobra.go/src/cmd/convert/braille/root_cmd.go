package braille

import (
	"fmt"

	"github.com/hieudoanm/jack/src/cmd/convert/internal"
	"github.com/spf13/cobra"
)

type result struct {
	Text    string `json:"text"`
	Braille string `json:"braille"`
}

func NewCommand() *cobra.Command {
	return &cobra.Command{
		Use:   "braille <text>",
		Short: "Convert text to braille",
		Args:  cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			text, err := internal.ResolveText(args)
			if err != nil {
				return err
			}
			b := internal.ToBraille(text)
			useJSON, _ := cmd.Flags().GetBool("json")
			if useJSON {
				return internal.WriteJSON(cmd, result{Text: text, Braille: b})
			}
			fmt.Fprintln(cmd.OutOrStdout(), b)
			return nil
		},
	}
}
