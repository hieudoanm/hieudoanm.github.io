package convert

import (
	"encoding/json"
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
		Long:  `Remove diacritical marks (accents) from letters, converting accented characters to their ASCII equivalents.`,
		Example: `  convert deburr "héllo wörld"
  convert deburr "café résumé"`,
		Args: cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			text, err := resolveText(args)
			if err != nil {
				return err
			}
			jsonOutput, _ := cmd.Flags().GetBool("json")
			r := Deburr(text)
			if jsonOutput {
				b, _ := json.MarshalIndent(map[string]interface{}{"input": text, "output": r}, "", "  ")
				fmt.Println(string(b))
			} else {
				fmt.Println(r)
			}
			return nil
		},
	}
}
