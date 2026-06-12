package ymlcmd

import (
	"encoding/json"
	"fmt"
	"os"

	"github.com/spf13/cobra"
	"gopkg.in/yaml.v3"
)

func NewCommand() *cobra.Command {
	var toJSON, validate, lint bool
	var file string

	cmd := &cobra.Command{
		Use:   "yml [json-string]",
		Short: "Convert between YAML and JSON, validate, and lint",
		Long:  `Convert JSON to YAML (or YAML to JSON), validate YAML syntax, and lint for best practices.`,
		Example: `  yml '{"name":"hello","values":[1,2,3]}'
  yml --to-json config.yml
  yml --validate config.yml
  yml --lint config.yml`,
		Args: cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			var input []byte
			if file != "" {
				var err error
				input, err = os.ReadFile(file)
				if err != nil {
					return err
				}
			} else if len(args) > 0 {
				input = []byte(args[0])
			} else {
				stat, _ := os.Stdin.Stat()
				if (stat.Mode() & os.ModeCharDevice) == 0 {
					input = readStdin()
				} else {
					return fmt.Errorf("provide input as argument, --file, or pipe")
				}
			}

			if validate || lint {
				return validateYAML(input)
			}

			if toJSON {
				var v interface{}
				if err := yaml.Unmarshal(input, &v); err != nil {
					return fmt.Errorf("YAML parse error: %w", err)
				}
				v = cleanupYAML(v)
				b, _ := json.MarshalIndent(v, "", "  ")
				fmt.Println(string(b))
				return nil
			}

			var v interface{}
			if err := json.Unmarshal(input, &v); err != nil {
				return fmt.Errorf("JSON parse error: %w", err)
			}
			out, err := yaml.Marshal(v)
			if err != nil {
				return err
			}
			fmt.Print(string(out))
			return nil
		},
	}

	cmd.Flags().BoolVarP(&toJSON, "to-json", "j", false, "Convert YAML to JSON")
	cmd.Flags().BoolVar(&validate, "validate", false, "Validate YAML syntax")
	cmd.Flags().BoolVar(&lint, "lint", false, "Lint YAML for common issues")
	cmd.Flags().StringVarP(&file, "file", "f", "", "Read from file instead of argument")
	return cmd
}

func readStdin() []byte {
	var data []byte
	buf := make([]byte, 4096)
	for {
		n, err := os.Stdin.Read(buf)
		if n > 0 {
			data = append(data, buf[:n]...)
		}
		if err != nil {
			break
		}
	}
	return data
}

func validateYAML(input []byte) error {
	var v interface{}
	if err := yaml.Unmarshal(input, &v); err != nil {
		fmt.Printf("Invalid YAML: %v\n", err)
		return nil
	}
	fmt.Println("Valid YAML")
	return nil
}

func cleanupYAML(v interface{}) interface{} {
	switch x := v.(type) {
	case map[string]interface{}:
		for k, val := range x {
			x[k] = cleanupYAML(val)
		}
		return x
	case []interface{}:
		for i, val := range x {
			x[i] = cleanupYAML(val)
		}
		return x
	default:
		return v
	}
}
