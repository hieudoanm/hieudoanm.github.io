package snakecase

import (
	"github.com/hieudoanm/jack/src/cmd/convert/internal"
	"github.com/spf13/cobra"
)

type result struct {
	Text      string `json:"text"`
	SnakeCase string `json:"snake_case"`
}

func NewCommand() *cobra.Command {
	return &cobra.Command{
		Use:   "snakecase <text>",
		Short: "Convert text to snake_case",
		Args:  cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			text, err := internal.ResolveText(args)
			if err != nil {
				return err
			}
			s := internal.ToSnakeCase(text)
			useJSON, _ := cmd.Flags().GetBool("json")
			if useJSON {
				return internal.WriteJSON(cmd, result{Text: text, SnakeCase: s})
			}
			cmd.Println(s)
			return nil
		},
	}
}
