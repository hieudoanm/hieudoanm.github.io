package yml

import (
	"fmt"

	"github.com/hieudoanm/jack/src/cmd/data/internal"
	"github.com/spf13/cobra"
)

func NewCmd() *cobra.Command {
	var validate, lint, jsonOut bool

	cmd := &cobra.Command{
		Use:   "yml <file>",
		Short: "Parse, validate, and lint YAML files",
		Long:  `Parse, validate, lint, and convert YAML files. Can output as JSON or reformatted YAML.`,
		Example: `  data yml config.yml
  data yml config.yml --validate
  data yml config.yml --json`,
		Args: cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			input, err := internal.ReadInput(args)
			if err != nil {
				return err
			}

			if validate {
				if err := internal.ValidateYAML(input); err != nil {
					return fmt.Errorf("invalid YAML: %w", err)
				}
				if jsonOut {
					fmt.Printf("{\"valid\":true,\"file\":%q}\n", firstArg(args))
				} else {
					fmt.Println("Valid YAML")
				}
				return nil
			}

			if lint {
				if err := internal.ValidateYAML(input); err != nil {
					return fmt.Errorf("YAML error: %w", err)
				}
				if jsonOut {
					fmt.Println(`{"valid":true,"lint":"no issues"}`)
				} else {
					fmt.Println("No lint issues found")
				}
				return nil
			}

			data, err := internal.ParseYAML(input)
			if err != nil {
				return err
			}

			if jsonOut {
				fmt.Println(internal.ConvertYAMLToJSON(data))
			} else {
				out, err := internal.FormatYAML(data)
				if err != nil {
					return err
				}
				fmt.Print(out)
			}
			return nil
		},
	}

	cmd.Flags().BoolVarP(&validate, "validate", "V", false, "Validate YAML syntax")
	cmd.Flags().BoolVar(&lint, "lint", false, "Lint YAML file")
	cmd.Flags().BoolVar(&jsonOut, "json", false, "Output in JSON format")
	return cmd
}

func firstArg(args []string) string {
	if len(args) > 0 {
		return args[0]
	}
	return ""
}
