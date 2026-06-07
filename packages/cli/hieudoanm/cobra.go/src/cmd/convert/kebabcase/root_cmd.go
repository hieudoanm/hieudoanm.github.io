package kebabcase

import (
	"github.com/hieudoanm/jack/src/cmd/convert/internal"
	"github.com/spf13/cobra"
)

type result struct {
	Text      string `json:"text"`
	KebabCase string `json:"kebab-case"`
}

func NewCommand() *cobra.Command {
	return &cobra.Command{
		Use:   "kebabcase <text>",
		Short: "Convert text to kebab-case",
		Args:  cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			text, err := internal.ResolveText(args)
			if err != nil {
				return err
			}
			k := internal.ToKebabCase(text)
			useJSON, _ := cmd.Flags().GetBool("json")
			if useJSON {
				return internal.WriteJSON(cmd, result{Text: text, KebabCase: k})
			}
			cmd.Println(k)
			return nil
		},
	}
}
