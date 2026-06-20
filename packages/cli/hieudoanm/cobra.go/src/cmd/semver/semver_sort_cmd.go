package semver

import (
	"encoding/json"
	"fmt"
	"sort"

	"github.com/spf13/cobra"
)

func newSortCmd() *cobra.Command {
	var versions []string
	cmd := &cobra.Command{
		Use:   "sort [--versions <v1,v2,...>]",
		Short: "Sort one or more semver strings",
		Long:  `Sort a list of comma-separated semantic version strings in ascending order. Versions may be prefixed with "v".`,
		Example: `  semver sort --versions 1.2.0,2.0.0,1.10.0
  semver sort --versions v3.0.0,v1.0.0,v2.0.0`,
		RunE: func(cmd *cobra.Command, args []string) error {
			if len(versions) == 0 {
				return fmt.Errorf("need at least one version: use --versions")
			}

			parsed := make([]version, len(versions))
			for i, s := range versions {
				v, err := parseVersion(s)
				if err != nil {
					return fmt.Errorf("%s: %w", s, err)
				}
				parsed[i] = v
			}
			sort.Slice(parsed, func(i, j int) bool {
				return parsed[i].compare(parsed[j]) < 0
			})
			if ok, _ := cmd.Flags().GetBool("json"); ok {
				sorted := make([]string, len(parsed))
				for i, v := range parsed {
					sorted[i] = v.String()
				}
				out, err := json.MarshalIndent(map[string]interface{}{
					"sorted": sorted,
				}, "", "  ")
				if err != nil {
					return err
				}
				fmt.Println(string(out))
			} else {
				for _, v := range parsed {
					fmt.Println(v)
				}
			}
			return nil
		},
	}
	cmd.Flags().StringSliceVar(&versions, "versions", nil, "Comma-separated versions to sort")
	cmd.Flags().BoolP("json", "j", false, "Output in JSON format")
	return cmd
}
