package file

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"

	"github.com/spf13/cobra"
)

func newReadCmd() *cobra.Command {
	var lines int
	var offset int
	var showLineNumbers bool

	cmd := &cobra.Command{
		Use:   "read <file>",
		Short: "Read file content with line numbers",
		Long: `Read a file and display its content with optional line numbers, offset, and line limit.

Examples:
  file read main.go
  file read --lines 50 main.go
  file read --offset 10 --lines 20 main.go
  file read --no-numbers main.go`,
		Args: cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			path := args[0]
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

			if jsonOutput {
				content := string(data)
				if offset > 0 || lines > 0 {
					allLines := splitLines(content)
					start := offset
					if start < 0 {
						start = 0
					}
					if start > len(allLines) {
						start = len(allLines)
					}
					end := start + lines
					if end > len(allLines) {
						end = len(allLines)
					}
					content = joinLines(allLines[start:end])
				}
				out, _ := json.MarshalIndent(map[string]interface{}{
					"file":       path,
					"size":       info.Size(),
					"mode":       info.Mode().String(),
					"mime":       detectMIME(path),
					"totalLines": len(splitLines(string(data))),
					"content":    content,
				}, "", "  ")
				fmt.Println(string(out))
				return nil
			}

			abs, _ := filepath.Abs(path)
			fmt.Printf("── %s ──\n", abs)

			allLines := splitLines(string(data))
			totalLines := len(allLines)

			start := offset
			if start < 0 {
				start = 0
			}
			if start > totalLines {
				start = totalLines
			}
			end := start + lines
			if end > totalLines {
				end = totalLines
			}
			if end == 0 {
				end = totalLines
			}

			displayLines := allLines[start:end]
			if len(displayLines) == 0 {
				fmt.Println("(empty file)")
				return nil
			}

			lineWidth := len(fmt.Sprintf("%d", end))
			for i, line := range displayLines {
				num := start + i + 1
				if showLineNumbers {
					fmt.Printf("%*d | %s\n", lineWidth, num, line)
				} else {
					fmt.Println(line)
				}
			}

			if start > 0 || end < totalLines {
				fmt.Printf("── %d/%d lines (%d-%d) ──\n", end-start, totalLines, start+1, end)
			}
			return nil
		},
	}

	cmd.Flags().IntVarP(&lines, "lines", "n", 0, "Number of lines to show (0 = all)")
	cmd.Flags().IntVarP(&offset, "offset", "o", 0, "Starting line offset (0-based)")
	cmd.Flags().BoolVar(&showLineNumbers, "numbers", true, "Show line numbers")
	return cmd
}

func splitLines(s string) []string {
	var lines []string
	start := 0
	for i := 0; i < len(s); i++ {
		if s[i] == '\n' {
			lines = append(lines, s[start:i])
			start = i + 1
		}
	}
	if start <= len(s) {
		lines = append(lines, s[start:])
	}
	return lines
}

func joinLines(lines []string) string {
	if len(lines) == 0 {
		return ""
	}
	result := lines[0]
	for _, l := range lines[1:] {
		result += "\n" + l
	}
	return result
}
