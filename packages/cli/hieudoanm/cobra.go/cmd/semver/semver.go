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
	patch, err := strconv.Atoi(parts[2])
	if err != nil {
		return version{}, fmt.Errorf("invalid patch version: %s", parts[2])
	}
	return version{major, minor, patch}, nil
}

func (v version) String() string {
	return fmt.Sprintf("%d.%d.%d", v.major, v.minor, v.patch)
}

func (a version) compare(b version) int {
	if a.major != b.major {
		return a.major - b.major
	}
	if a.minor != b.minor {
		return a.minor - b.minor
	}
	return a.patch - b.patch
}

func NewCommand() *cobra.Command {
	return &cobra.Command{
		Use:   "semver <command> [versions...]",
		Short: "Parse, compare, and sort semver strings",
		Long:  `Tools for working with semantic version strings (major.minor.patch).`,
		Example: `  semver validate 1.2.3
  semver compare 1.0.0 2.0.0
  semver sort 1.2.0 2.0.0 1.10.0`,
		Args: cobra.MinimumNArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
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
				return fmt.Errorf("unknown action: %s (use validate, compare, sort)", action)
			}
			return nil
		},
	}
}
