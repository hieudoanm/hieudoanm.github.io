package validate

import (
	"encoding/json"
	"fmt"

	"github.com/spf13/cobra"

	"github.com/hieudoanm/jack/src/cmd/semver/version"
)

func NewCmd() *cobra.Command {
	var versions []string
	cmd := &cobra.Command{
		Use:   "validate [--versions <v1,v2,...>]",
		Short: "Validate one or more semver strings",
		Long:  `Validate whether one or more comma-separated strings conform to semantic versioning (major.minor.patch, optionally with "v" prefix).`,
		Example: `  semver validate --versions 1.2.3
  semver validate --versions 1.2.3,2.0.0,abc
  semver validate --versions v1.0.0`,
		RunE: func(cmd *cobra.Command, args []string) error {
			if len(versions) == 0 {
				return fmt.Errorf("need at least one version: use --versions")
			}

			if ok, _ := cmd.Flags().GetBool("json"); ok {
				results := make([]map[string]interface{}, 0)
				for _, s := range versions {
					_, err := version.Parse(s)
					valid := err == nil
					entry := map[string]interface{}{
						"version": s,
						"valid":   valid,
					}
					if err != nil {
						entry["error"] = err.Error()
					}
					results = append(results, entry)
				}
				out, err := json.MarshalIndent(results, "", "  ")
				if err != nil {
					return err
				}
				fmt.Println(string(out))
			} else {
				for _, s := range versions {
					_, err := version.Parse(s)
					if err != nil {
						fmt.Printf("%s: invalid (%v)\n", s, err)
					} else {
						fmt.Printf("%s: valid\n", s)
					}
				}
			}
			return nil
		},
	}
	cmd.Flags().StringSliceVar(&versions, "versions", nil, "Comma-separated versions to validate")
	cmd.Flags().BoolP("json", "j", false, "Output in JSON format")
	return cmd
}
