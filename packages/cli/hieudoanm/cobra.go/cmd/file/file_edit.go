package file

import (
	"encoding/json"
	"fmt"
	"os"
	"regexp"
	"strings"

	"github.com/spf13/cobra"
)

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
			content := string(data)

			var replaced string
			var matchCount int

			if useRegex {
				re, err := regexp.Compile(old)
				if err != nil {
					return fmt.Errorf("invalid regex %q: %w", old, err)
				}
				if count > 0 {
					replaced = re.ReplaceAllStringFunc(content, func(m string) string {
						if matchCount < count {
							matchCount++
							return newStr
						}
						return m
					})
					matchCount = strings.Count(content, old)
					if count < matchCount {
						matchCount = count
					}
				} else {
					matchCount = len(re.FindAllString(content, -1))
					replaced = re.ReplaceAllString(content, newStr)
				}
			} else {
				matchCount = strings.Count(content, old)
				if count > 0 && count < matchCount {
					matchCount = count
				}
				if count > 0 {
					replaced = strings.Replace(content, old, newStr, count)
				} else {
					replaced = strings.Replace(content, old, newStr, -1)
				}
			}

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
				return nil
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
				return nil
			}

			if err := os.WriteFile(path, []byte(replaced), info.Mode()); err != nil {
				return err
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
			return nil
		},
	}

	cmd.Flags().BoolVarP(&useRegex, "regex", "r", false, "Interpret old as a regex pattern")
	cmd.Flags().BoolVarP(&preview, "preview", "p", false, "Preview changes without modifying the file")
	cmd.Flags().IntVarP(&count, "count", "n", 0, "Number of occurrences to replace (0 = all)")
	return cmd
}

func pluralS(n int) string {
	if n == 1 {
		return ""
	}
	return "s"
}

func showDiff(before, after string) {
	beforeLines := splitLines(before)
	afterLines := splitLines(after)

	maxLen := len(beforeLines)
	if len(afterLines) > maxLen {
		maxLen = len(afterLines)
	}

	for i := 0; i < maxLen; i++ {
		var bLine, aLine string
		if i < len(beforeLines) {
			bLine = beforeLines[i]
		}
		if i < len(afterLines) {
			aLine = afterLines[i]
		}
		if bLine != aLine {
			fmt.Printf("- %s\n", bLine)
			fmt.Printf("+ %s\n", aLine)
		} else {
			fmt.Printf("  %s\n", bLine)
		}
	}
}

func buildDiff(before, after string) string {
	var b strings.Builder
	beforeLines := splitLines(before)
	afterLines := splitLines(after)

	maxLen := len(beforeLines)
	if len(afterLines) > maxLen {
		maxLen = len(afterLines)
	}

	for i := 0; i < maxLen; i++ {
		var bLine, aLine string
		if i < len(beforeLines) {
			bLine = beforeLines[i]
		}
		if i < len(afterLines) {
			aLine = afterLines[i]
		}
		if bLine != aLine {
			if bLine != "" {
				b.WriteString("- " + bLine + "\n")
			}
			if aLine != "" {
				b.WriteString("+ " + aLine + "\n")
			}
		}
	}
	return strings.TrimRight(b.String(), "\n")
}
