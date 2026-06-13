package file

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"

	"github.com/spf13/cobra"
)

func newWriteCmd() *cobra.Command {
	var appendMode bool
	var mkdir bool
	var permMode string

	cmd := &cobra.Command{
		Use:   "write <file> [content]",
		Short: "Write or append content to a file",
		Long: `Write content to a file. Content can be provided as an argument or piped via stdin.

Examples:
  file write hello.txt "Hello, World!"
  file write hello.txt           (reads from stdin)
  file write --append log.txt "new log entry"
  file write --mkdir newdir/file.txt "content"
  echo "data" | file write output.txt`,
		Args: cobra.RangeArgs(1, 2),
		RunE: func(cmd *cobra.Command, args []string) error {
			path := args[0]
			var content string

			if len(args) >= 2 {
				content = args[1]
			} else {
				data, err := readStdin()
				if err != nil {
					return fmt.Errorf("stdin: %w", err)
				}
				content = string(data)
			}

			if mkdir {
				dir := filepath.Dir(path)
				if dir != "." {
					if err := os.MkdirAll(dir, 0755); err != nil {
						return fmt.Errorf("mkdir: %w", err)
					}
				}
			}

			var mode os.FileMode = 0644
			if permMode != "" {
				m, err := parseMode(permMode)
				if err != nil {
					return err
				}
				mode = m
			}

			flag := os.O_CREATE | os.O_WRONLY
			if appendMode {
				flag |= os.O_APPEND
			} else {
				flag |= os.O_TRUNC
			}

			f, err := os.OpenFile(path, flag, mode)
			if err != nil {
				return err
			}
			defer f.Close()

			n, err := f.WriteString(content)
			if err != nil {
				return err
			}

			if jsonOutput {
				out, _ := json.MarshalIndent(map[string]interface{}{
					"file":   path,
					"bytes":  n,
					"append": appendMode,
				}, "", "  ")
				fmt.Println(string(out))
			} else {
				verb := "Written"
				if appendMode {
					verb = "Appended"
				}
				fmt.Printf("%s %d bytes to %s\n", verb, n, path)
			}
			return nil
		},
	}

	cmd.Flags().BoolVarP(&appendMode, "append", "a", false, "Append to file instead of overwriting")
	cmd.Flags().BoolVarP(&mkdir, "mkdir", "p", false, "Create parent directories if needed")
	cmd.Flags().StringVarP(&permMode, "mode", "m", "", "File permissions (octal, e.g. 644)")
	return cmd
}

func readStdin() ([]byte, error) {
	stat, err := os.Stdin.Stat()
	if err != nil {
		return nil, err
	}
	if (stat.Mode() & os.ModeCharDevice) != 0 {
		return nil, fmt.Errorf("no content provided (pipe content or pass as argument)")
	}
	data := make([]byte, 0, 4096)
	buf := make([]byte, 1024)
	for {
		n, err := os.Stdin.Read(buf)
		if n > 0 {
			data = append(data, buf[:n]...)
		}
		if err != nil {
			if err.Error() == "EOF" {
				break
			}
			return nil, err
		}
	}
	// Trim trailing newline if present (common from echo)
	if len(data) > 0 && data[len(data)-1] == '\n' {
		data = data[:len(data)-1]
	}
	// If the content has multiple lines, keep them all
	// Only trim a single trailing newline for cleanliness
	return data, nil
}

func isStdinPiped() bool {
	stat, _ := os.Stdin.Stat()
	return (stat.Mode() & os.ModeCharDevice) == 0
}
