package uppercase

import (
	"fmt"
	"strings"

	"github.com/hieudoanm/jack/src/cmd/convert/internal"
	"github.com/spf13/cobra"
)

type result struct {
	Text      string `json:"text"`
	Uppercase string `json:"uppercase"`
}

func NewCommand() *cobra.Command {
	return &cobra.Command{
		Use:   "uppercase <text>",
		Short: "Convert text to uppercase",
		Args:  cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			text, err := internal.ResolveText(args)
			if err != nil {
				return err
			}
			u := strings.ToUpper(text)
			useJSON, _ := cmd.Flags().GetBool("json")
			if useJSON {
				return internal.WriteJSON(cmd, result{Text: text, Uppercase: u})
			}
			fmt.Fprintln(cmd.OutOrStdout(), u)
			return nil
		},
	}
}
