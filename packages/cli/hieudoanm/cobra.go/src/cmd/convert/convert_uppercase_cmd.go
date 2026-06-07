package convert

import (
	"encoding/json"
	"fmt"
	"strings"

	"github.com/spf13/cobra"
)

func newUppercaseCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "uppercase [text]",
		Short: "Convert a string to uppercase",
		Long:  `Convert all characters in the provided text to uppercase.`,
		Example: `  convert uppercase "hello world"
  convert uppercase "the quick brown fox"`,
		Args: cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			text, err := resolveText(args)
			if err != nil {
				return err
			}
			jsonOutput, _ := cmd.Flags().GetBool("json")
			r := strings.ToUpper(text)
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
