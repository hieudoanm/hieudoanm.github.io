package jsontool

import (
	"bytes"
	"encoding/json"
	"fmt"

	"github.com/spf13/cobra"
)

func NewCommand() *cobra.Command {
	var minify, validate bool
	var indent string

	cmd := &cobra.Command{
		Use:   "json [json-string]",
		Short: "Format, validate, and minify JSON",
		Long:  `Pretty-print, validate, or minify JSON strings from the command line.`,
		Example: `  json '{"a":1,"b":2}'
  json --minify '{"a": 1, "b": 2}'
  json --validate '{"a":1}'`,
		Args: cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			if len(args) == 0 {
				return fmt.Errorf("provide a JSON string as argument")
			}
			input := args[0]

			if validate {
				var v interface{}
				if err := json.Unmarshal([]byte(input), &v); err != nil {
					fmt.Printf("Invalid JSON: %v\n", err)
				} else {
					fmt.Println("Valid JSON")
				}
				return nil
			}

			var buf bytes.Buffer
			if err := json.Indent(&buf, []byte(input), "", indent); err != nil {
				return fmt.Errorf("invalid JSON: %w", err)
			}

			if minify {
				var v interface{}
				json.Unmarshal([]byte(input), &v)
				b, _ := json.Marshal(v)
				fmt.Println(string(b))
			} else {
				fmt.Println(buf.String())
			}
			return nil
		},
	}

	cmd.Flags().BoolVarP(&minify, "minify", "m", false, "Minify JSON output")
	cmd.Flags().BoolVarP(&validate, "validate", "v", false, "Validate JSON only")
	cmd.Flags().StringVarP(&indent, "indent", "i", "  ", "Indentation string")
	return cmd
}
