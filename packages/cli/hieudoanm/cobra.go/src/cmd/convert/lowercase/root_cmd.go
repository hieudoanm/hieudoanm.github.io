package lowercase

import (
	"strings"

	"github.com/hieudoanm/jack/src/cmd/convert/internal"
	"github.com/spf13/cobra"
)

type result struct {
	Text      string `json:"text"`
	Lowercase string `json:"lowercase"`
}

func NewCommand() *cobra.Command {
	return &cobra.Command{
		Use:   "lowercase <text>",
		Short: "Convert text to lowercase",
		Args:  cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			text, err := internal.ResolveText(args)
			if err != nil {
				return err
			}
			l := strings.ToLower(text)
			useJSON, _ := cmd.Flags().GetBool("json")
			if useJSON {
				return internal.WriteJSON(cmd, result{Text: text, Lowercase: l})
			}
			cmd.Println(l)
			return nil
		},
	}
}
