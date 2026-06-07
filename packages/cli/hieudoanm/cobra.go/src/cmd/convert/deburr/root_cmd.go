package deburr

import (
	"github.com/hieudoanm/jack/src/cmd/convert/internal"
	"github.com/spf13/cobra"
)

type result struct {
	Text   string `json:"text"`
	Deburr string `json:"deburr"`
}

func NewCommand() *cobra.Command {
	return &cobra.Command{
		Use:   "deburr <text>",
		Short: "Deburr text (remove diacritics)",
		Args:  cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			text, err := internal.ResolveText(args)
			if err != nil {
				return err
			}
			d := internal.Deburr(text)
			useJSON, _ := cmd.Flags().GetBool("json")
			if useJSON {
				return internal.WriteJSON(cmd, result{Text: text, Deburr: d})
			}
			cmd.Println(d)
			return nil
		},
	}
}
