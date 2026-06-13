package convert

import (
	"fmt"
	"strings"
	"unicode"

	"github.com/spf13/cobra"
	"golang.org/x/text/unicode/norm"
)

func Deburr(s string) string {
	t := norm.NFD.String(s)
	var sb strings.Builder
	for _, r := range t {
		if unicode.IsMark(r) {
			continue
		}
		sb.WriteRune(r)
	}
	return sb.String()
}

func newDeburrCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "deburr [text]",
		Short: "Remove diacritical marks (accents) from letters",
		Args:  cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			text, err := resolveText(args)
			if err != nil {
				return err
			}
			fmt.Println(Deburr(text))
			return nil
		},
	}
}
