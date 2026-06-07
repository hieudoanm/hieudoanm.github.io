package capitalise

import (
	"github.com/hieudoanm/jack/src/cmd/convert/internal"
	"github.com/spf13/cobra"
)

type result struct {
	Text       string `json:"text"`
	Capitalise string `json:"capitalise"`
}

func NewCommand() *cobra.Command {
	return &cobra.Command{
		Use:   "capitalise <text>",
		Short: "Capitalise text",
		Args:  cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			text, err := internal.ResolveText(args)
			if err != nil {
				return err
			}
			c := internal.Capitalise(text)
			useJSON, _ := cmd.Flags().GetBool("json")
			if useJSON {
				return internal.WriteJSON(cmd, result{Text: text, Capitalise: c})
			}
			cmd.Println(c)
			return nil
		},
	}
}
