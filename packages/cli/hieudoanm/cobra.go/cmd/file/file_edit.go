package file

import (
	"encoding/json"
	"fmt"
	"os"
	"regexp"
	"strings"

	"github.com/spf13/cobra"
)

func performEdit(content, old, newStr string, useRegex bool, count int) (string, int, error) {
	var matchCount int

	if useRegex {
		re, err := regexp.Compile(old)
		if err != nil {
			return "", 0, fmt.Errorf("invalid regex %q: %w", old, err)
		}
		if count > 0 {
			var replaced string
			matchCount = 0
			replaced = re.ReplaceAllStringFunc(content, func(m string) string {
				if matchCount < count {
					matchCount++
					return newStr
				}
				return m
			})
			return replaced, matchCount, nil
		}
		matchCount = len(re.FindAllString(content, -1))
		return re.ReplaceAllString(content, newStr), matchCount, nil
	}

	matchCount = strings.Count(content, old)
	if count > 0 && count < matchCount {
		matchCount = count
	}
	if count > 0 {
		return strings.Replace(content, old, newStr, count), matchCount, nil
	}
	return strings.Replace(content, old, newStr, -1), matchCount, nil
}

func outputEditResult(path, content, replaced string, matchCount int, preview bool, mode os.FileMode) {
	if matchCount == 0 {
		if jsonOutput {
			out, _ := json.MarshalIndent(map[string]interface{}{
				"file":    path,
				"matches": 0,
			}, "", "  ")
			fmt.Println(string(out))
		} else {
			fmt.Printf("No matches found in %s\n", path)
		}
		return
	}

	if preview {
		if jsonOutput {
			diff := buildDiff(content, replaced)
			out, _ := json.MarshalIndent(map[string]interface{}{
				"file":    path,
				"matches": matchCount,
				"diff":    diff,
			}, "", "  ")
			fmt.Println(string(out))
		} else {
			fmt.Printf("── Preview for %s (%d match%s) ──\n", path, matchCount, pluralS(matchCount))
			showDiff(content, replaced)
		}
		return
	}

	if err := os.WriteFile(path, []byte(replaced), mode); err != nil {
		fmt.Fprintf(os.Stderr, "error writing %s: %v\n", path, err)
		return
	}

	if jsonOutput {
		out, _ := json.MarshalIndent(map[string]interface{}{
			"file":    path,
			"matches": matchCount,
		}, "", "  ")
		fmt.Println(string(out))
	} else {
		fmt.Printf("Replaced %d occurrence%s in %s\n", matchCount, pluralS(matchCount), path)
	}
}

func newEditCmd() *cobra.Command {
	var useRegex bool
	var preview bool
	var count int

	cmd := &cobra.Command{
		Use:   "edit <file> <old> <new>",
		Short: "Find and replace text in a file",
		Long: `Replace occurrences of a string (or regex pattern) in a file.

Examples:
  file edit main.go "foo" "bar"
  file edit --regex main.go "foo.*" "bar"
  file edit --preview main.go "foo" "bar"
  file edit --count 1 main.go "foo" "bar"`,
		Args: cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) error {
			path := args[0]
			old := args[1]
			newStr := args[2]

			info, err := os.Stat(path)
			if err != nil {
				return err
			}
			if info.IsDir() {
				return fmt.Errorf("%q is a directory", path)
			}

			data, err := os.ReadFile(path)
			if err != nil {
				return err
			}

			replaced, matchCount, err := performEdit(string(data), old, newStr, useRegex, count)
			if err != nil {
				return err
			}

			outputEditResult(path, string(data), replaced, matchCount, preview, info.Mode())
			return nil
		},
	}

	cmd.Flags().BoolVarP(&useRegex, "regex", "r", false, "Interpret old as a regex pattern")
	cmd.Flags().BoolVarP(&preview, "preview", "p", false, "Preview changes without modifying the file")
	cmd.Flags().IntVarP(&count, "count", "n", 0, "Number of occurrences to replace (0 = all)")
	return cmd
}
