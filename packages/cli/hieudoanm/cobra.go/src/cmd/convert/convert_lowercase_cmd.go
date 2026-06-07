package convert

import (
	"encoding/json"
	"fmt"
	"strings"

	"github.com/spf13/cobra"
)

func newLowercaseCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "lowercase [text]",
		Short: "Convert a string to lowercase",
		Long:  `Convert all characters in the provided text to lowercase.`,
		Example: `  convert lowercase "HELLO WORLD"
  convert lowercase "The Quick Brown Fox"`,
		Args: cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			text, err := resolveText(args)
			if err != nil {
				return err
			}
			jsonOutput, _ := cmd.Flags().GetBool("json")
			r := strings.ToLower(text)
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
