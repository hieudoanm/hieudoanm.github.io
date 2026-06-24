package morse

import (
	"fmt"

	"github.com/hieudoanm/jack/src/cmd/convert/internal"
	"github.com/spf13/cobra"
)

type result struct {
	Text  string `json:"text"`
	Morse string `json:"morse"`
}

func NewCommand() *cobra.Command {
	return &cobra.Command{
		Use:   "morse <text>",
		Short: "Convert text to morse code",
		Args:  cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			text, err := internal.ResolveText(args)
			if err != nil {
				return err
			}
			m := internal.ToMorse(text)
			useJSON, _ := cmd.Flags().GetBool("json")
			if useJSON {
				return internal.WriteJSON(cmd, result{Text: text, Morse: m})
			}
			fmt.Fprintln(cmd.OutOrStdout(), m)
			return nil
		},
	}
}
