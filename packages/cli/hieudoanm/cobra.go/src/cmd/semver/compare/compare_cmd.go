package compare

import (
	"encoding/json"
	"fmt"

	"github.com/spf13/cobra"

	"github.com/hieudoanm/jack/src/cmd/semver/version"
)

func NewCmd() *cobra.Command {
	var aStr, bStr string
	cmd := &cobra.Command{
		Use:   "compare --a <version> --b <version>",
		Short: "Compare two semver strings",
		Long:  `Compare two semantic versions and output their relationship (less than, greater than, or equal). Versions may be prefixed with "v".`,
		Example: `  semver compare --a 1.0.0 --b 2.0.0
  semver compare --a v1.2.3 --b v1.2.3`,
		RunE: func(cmd *cobra.Command, args []string) error {
			if aStr == "" || bStr == "" {
				return fmt.Errorf("need both --a and --b versions")
			}
			a, err := version.Parse(aStr)
			if err != nil {
				return err
			}
			b, err := version.Parse(bStr)
			if err != nil {
				return err
			}
			cmp := a.Compare(b)
			var rel string
			switch {
			case cmp < 0:
				rel = "<"
			case cmp > 0:
				rel = ">"
			default:
				rel = "=="
			}
			if ok, _ := cmd.Flags().GetBool("json"); ok {
				out, err := json.MarshalIndent(map[string]interface{}{
					"a":        a.String(),
					"b":        b.String(),
					"relation": rel,
				}, "", "  ")
				if err != nil {
					return err
				}
				fmt.Println(string(out))
			} else {
				fmt.Printf("%s %s %s\n", a, rel, b)
			}
			return nil
		},
	}
	cmd.Flags().StringVar(&aStr, "a", "", "First version")
	cmd.Flags().StringVar(&bStr, "b", "", "Second version")
	cmd.Flags().BoolP("json", "j", false, "Output in JSON format")
	return cmd
}
