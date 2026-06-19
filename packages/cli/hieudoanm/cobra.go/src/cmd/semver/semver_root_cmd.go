package semver

import (
	"encoding/json"
	"fmt"
	"strconv"
	"strings"

	"github.com/spf13/cobra"
)

var jsonOutput bool

type version struct {
	major, minor, patch int
	prerelease          string
}

func parseVersion(s string) (version, error) {
	s = strings.TrimPrefix(s, "v")
	parts := strings.SplitN(s, ".", 3)
	if len(parts) < 3 {
		return version{}, fmt.Errorf("invalid semver: %s (need major.minor.patch)", s)
	}
	major, err := strconv.Atoi(parts[0])
	if err != nil {
		return version{}, fmt.Errorf("invalid major version: %s", parts[0])
	}
	minor, err := strconv.Atoi(parts[1])
	if err != nil {
		return version{}, fmt.Errorf("invalid minor version: %s", parts[1])
	}

	patchStr := parts[2]
	var prerelease string
	if idx := strings.Index(patchStr, "-"); idx >= 0 {
		prerelease = patchStr[idx+1:]
		patchStr = patchStr[:idx]
	}

	patch, err := strconv.Atoi(patchStr)
	if err != nil {
		return version{}, fmt.Errorf("invalid patch version: %s", patchStr)
	}
	return version{major, minor, patch, prerelease}, nil
}

func (v version) String() string {
	s := fmt.Sprintf("%d.%d.%d", v.major, v.minor, v.patch)
	if v.prerelease != "" {
		s += "-" + v.prerelease
	}
	return s
}

func (a version) compare(b version) int {
	if a.major != b.major {
		return a.major - b.major
	}
	if a.minor != b.minor {
		return a.minor - b.minor
	}
	if a.patch != b.patch {
		return a.patch - b.patch
	}
	if a.prerelease != b.prerelease {
		if a.prerelease == "" {
			return 1
		}
		if b.prerelease == "" {
			return -1
		}
		if a.prerelease < b.prerelease {
			return -1
		}
		return 1
	}
	return 0
}

func (v version) bump(part string) version {
	switch part {
	case "major":
		return version{v.major + 1, 0, 0, ""}
	case "minor":
		return version{v.major, v.minor + 1, 0, ""}
	case "patch":
		return version{v.major, v.minor, v.patch + 1, ""}
	default:
		return v
	}
}

func NewCommand() *cobra.Command {
	var bumpPart, prerelease, rangeExpr, singleVersion string

	cmd := &cobra.Command{
		Use:   "semver <command> [flags]",
		Short: "Parse, compare, sort, and bump semver strings",
		Long:  `Tools for working with semantic version strings (major.minor.patch).`,
		Example: `  semver validate --versions 1.2.3
  semver compare --a 1.0.0 --b 2.0.0
  semver sort --versions 1.2.0,2.0.0,1.10.0
  semver --bump minor --version 1.2.3
  semver --bump patch --prerelease alpha --version 1.2.3
  semver --range ">=1.0.0 <2.0.0" --version 1.5.0`,
		RunE: func(cmd *cobra.Command, args []string) error {
			if bumpPart != "" {
				v, err := parseVersion(singleVersion)
				if err != nil {
					return err
				}
				result := v.bump(bumpPart)
				if prerelease != "" {
					result.prerelease = prerelease
				}
				if jsonOutput {
					out, err := json.MarshalIndent(map[string]interface{}{
						"input":      singleVersion,
						"result":     result.String(),
						"bump":       bumpPart,
						"prerelease": prerelease,
					}, "", "  ")
					if err != nil {
						return err
					}
					fmt.Println(string(out))
				} else {
					fmt.Println(result)
				}
				return nil
			}

			if rangeExpr != "" {
				if singleVersion == "" {
					return fmt.Errorf("need a version to check against range: use --version")
				}
				v, err := parseVersion(singleVersion)
				if err != nil {
					return err
				}
				matches, err := checkRange(v, rangeExpr)
				if err != nil {
					return err
				}
				if jsonOutput {
					out, err := json.MarshalIndent(map[string]interface{}{
						"version": singleVersion,
						"range":   rangeExpr,
						"matches": matches,
					}, "", "  ")
					if err != nil {
						return err
					}
					fmt.Println(string(out))
				} else {
					if matches {
						fmt.Printf("%s matches range %s\n", v, rangeExpr)
					} else {
						fmt.Printf("%s does NOT match range %s\n", v, rangeExpr)
					}
				}
				return nil
			}

			return cmd.Help()
		},
	}

	cmd.Flags().StringVar(&bumpPart, "bump", "", "Bump version part: major, minor, patch")
	cmd.Flags().StringVar(&prerelease, "prerelease", "", "Set prerelease label after bump")
	cmd.Flags().StringVar(&rangeExpr, "range", "", "Check if version matches a range (e.g. '>=1.0.0 <2.0.0')")
	cmd.Flags().StringVar(&singleVersion, "version", "", "Single version for --bump or --range")
	cmd.PersistentFlags().BoolVar(&jsonOutput, "json", false, "Output in JSON format")
	cmd.AddCommand(newValidateCmd(), newCompareCmd(), newSortCmd())
	return cmd
}

func checkRange(v version, rangeExpr string) (bool, error) {
	parts := strings.Fields(rangeExpr)
	if len(parts) == 0 {
		return false, fmt.Errorf("empty range expression")
	}

	for i := 0; i < len(parts); i += 2 {
		op := parts[i]
		if i+1 >= len(parts) {
			return false, fmt.Errorf("incomplete range: missing version after %s", op)
		}
		ver, err := parseVersion(parts[i+1])
		if err != nil {
			return false, fmt.Errorf("invalid version in range: %s", parts[i+1])
		}

		switch op {
		case ">":
			if v.compare(ver) <= 0 {
				return false, nil
			}
		case ">=":
			if v.compare(ver) < 0 {
				return false, nil
			}
		case "<":
			if v.compare(ver) >= 0 {
				return false, nil
			}
		case "<=":
			if v.compare(ver) > 0 {
				return false, nil
			}
		case "=", "==":
			if v.compare(ver) != 0 {
				return false, nil
			}
		default:
			return false, fmt.Errorf("unknown operator: %s", op)
		}
	}

	return true, nil
}
