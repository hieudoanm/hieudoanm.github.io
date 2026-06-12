package semver

import (
	"fmt"
	"sort"
	"strconv"
	"strings"

	"github.com/spf13/cobra"
)

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
	prerelease := ""
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
	var bumpPart, prerelease, rangeExpr string

	cmd := &cobra.Command{
		Use:   "semver <command> [versions...]",
		Short: "Parse, compare, sort, and bump semver strings",
		Long:  `Tools for working with semantic version strings (major.minor.patch).`,
		Example: `  semver validate 1.2.3
  semver compare 1.0.0 2.0.0
  semver sort 1.2.0 2.0.0 1.10.0
  semver --bump minor 1.2.3
  semver --bump patch --prerelease alpha 1.2.3
  semver --range ">=1.0.0 <2.0.0" 1.5.0`,
		Args: cobra.MinimumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			if bumpPart != "" {
				v, err := parseVersion(args[0])
				if err != nil {
					return err
				}
				result := v.bump(bumpPart)
				if prerelease != "" {
					result.prerelease = prerelease
				}
				fmt.Println(result)
				return nil
			}

			if rangeExpr != "" {
				if len(args) < 1 {
					return fmt.Errorf("need a version to check against range")
				}
				v, err := parseVersion(args[0])
				if err != nil {
					return err
				}
				matches, err := checkRange(v, rangeExpr)
				if err != nil {
					return err
				}
				if matches {
					fmt.Printf("%s matches range %s\n", v, rangeExpr)
				} else {
					fmt.Printf("%s does NOT match range %s\n", v, rangeExpr)
				}
				return nil
			}

			if len(args) < 2 {
				return fmt.Errorf("need at least 2 arguments for validate|compare|sort")
			}

			action := args[0]
			versions := args[1:]

			switch action {
			case "validate":
				for _, s := range versions {
					_, err := parseVersion(s)
					if err != nil {
						fmt.Printf("%s: invalid (%v)\n", s, err)
					} else {
						fmt.Printf("%s: valid\n", s)
					}
				}

			case "compare":
				if len(versions) < 2 {
					return fmt.Errorf("compare needs 2 versions")
				}
				a, err := parseVersion(versions[0])
				if err != nil {
					return err
				}
				b, err := parseVersion(versions[1])
				if err != nil {
					return err
				}
				cmp := a.compare(b)
				var rel string
				switch {
				case cmp < 0:
					rel = "<"
				case cmp > 0:
					rel = ">"
				default:
					rel = "=="
				}
				fmt.Printf("%s %s %s\n", a, rel, b)

			case "sort":
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
				for _, v := range parsed {
					fmt.Println(v)
				}

			default:
				// If the first arg looks like a version, treat as bump
				if _, err := parseVersion(action); err == nil && len(versions) >= 0 {
					v, _ := parseVersion(action)
					result := v.bump(bumpPart)
					fmt.Println(result)
				} else {
					return fmt.Errorf("unknown action: %s (use validate, compare, sort)", action)
				}
			}
			return nil
		},
	}

	cmd.Flags().StringVar(&bumpPart, "bump", "", "Bump version part: major, minor, patch")
	cmd.Flags().StringVar(&prerelease, "prerelease", "", "Set prerelease label after bump")
	cmd.Flags().StringVar(&rangeExpr, "range", "", "Check if version matches a range (e.g. '>=1.0.0 <2.0.0')")
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
