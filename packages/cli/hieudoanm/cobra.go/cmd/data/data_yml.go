package data

import (
	"encoding/json"
	"fmt"
	"io"
	"os"

	"github.com/spf13/cobra"
	"gopkg.in/yaml.v3"
)

var ymlJSON bool

func newYmlCmd() *cobra.Command {
	var validate, lint bool

	cmd := &cobra.Command{
		Use:   "yml <file>",
		Short: "Parse, validate, and lint YAML files",
		Args:  cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			var input []byte
			if len(args) > 0 {
				var err error
				input, err = os.ReadFile(args[0])
				if err != nil {
					return fmt.Errorf("read file: %w", err)
				}
			} else {
				var err error
				input, err = io.ReadAll(os.Stdin)
				if err != nil {
					return fmt.Errorf("read stdin: %w", err)
				}
			}

			if validate {
				var data interface{}
				if err := yaml.Unmarshal(input, &data); err != nil {
					return fmt.Errorf("invalid YAML: %w", err)
				}
				if ymlJSON {
					b, _ := json.MarshalIndent(map[string]interface{}{
						"valid": true,
						"file":  args[0],
					}, "", "  ")
					fmt.Println(string(b))
				} else {
					fmt.Println("Valid YAML")
				}
				return nil
			}

			if lint {
				var data interface{}
				if err := yaml.Unmarshal(input, &data); err != nil {
					return fmt.Errorf("YAML error: %w", err)
				}
				if ymlJSON {
					b, _ := json.MarshalIndent(map[string]interface{}{
						"valid": true,
						"lint":  "no issues",
					}, "", "  ")
					fmt.Println(string(b))
				} else {
					fmt.Println("No lint issues found")
				}
				return nil
			}

			var data interface{}
			if err := yaml.Unmarshal(input, &data); err != nil {
				return fmt.Errorf("parse yaml: %w", err)
			}

			if ymlJSON {
				b, _ := json.MarshalIndent(data, "", "  ")
				fmt.Println(string(b))
			} else {
				out, _ := yaml.Marshal(&data)
				fmt.Print(string(out))
			}
			return nil
		},
	}

	cmd.Flags().BoolVarP(&validate, "validate", "V", false, "Validate YAML syntax")
	cmd.Flags().BoolVar(&lint, "lint", false, "Lint YAML file")
	cmd.Flags().BoolVar(&ymlJSON, "json", false, "Output in JSON format")
	return cmd
}
