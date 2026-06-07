package slug

import (
	"github.com/hieudoanm/jack/src/cmd/convert/internal"
	"github.com/spf13/cobra"
)

type result struct {
	Text string `json:"text"`
	Slug string `json:"slug"`
}

func NewCommand() *cobra.Command {
	return &cobra.Command{
		Use:   "slug <text>",
		Short: "Convert text to URL-friendly slug",
		Args:  cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			text, err := internal.ResolveText(args)
			if err != nil {
				return err
			}
			s := internal.Slug(text)
			useJSON, _ := cmd.Flags().GetBool("json")
			if useJSON {
				return internal.WriteJSON(cmd, result{Text: text, Slug: s})
			}
			cmd.Println(s)
			return nil
		},
	}
}
