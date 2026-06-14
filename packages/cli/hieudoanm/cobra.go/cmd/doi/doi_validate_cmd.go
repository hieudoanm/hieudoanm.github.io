package doi

import (
	"fmt"
	"regexp"

	"github.com/spf13/cobra"
)

func newValidateCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "validate [doi]",
		Short: "Validate a DOI string format",
		Long:  `Checks whether a given string conforms to the DOI syntax (10.NNNN/...).`,
		Example: `  doi validate 10.1000/xyz123
  doi validate 10.1234/invalid`,
		Args: cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			var id string
			if len(args) > 0 {
				id = args[0]
			} else {
				fmt.Println("Usage: doi validate <doi>")
				return nil
			}

			matched, _ := regexp.MatchString(`^10\.\d{4,}/.+$`, id)
			if matched {
				fmt.Printf("✓ %s is a valid DOI\n", id)
			} else {
				fmt.Printf("✗ %s is not a valid DOI format\n", id)
			}
			return nil
		},
	}
}
