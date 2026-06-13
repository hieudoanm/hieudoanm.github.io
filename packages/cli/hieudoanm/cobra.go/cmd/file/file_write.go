package file

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"

	"github.com/spf13/cobra"
)

func getWriteContent(args []string) (string, error) {
	if len(args) >= 2 {
		return args[1], nil
	}
	data, err := readStdin()
	if err != nil {
		return "", fmt.Errorf("stdin: %w", err)
	}
	return string(data), nil
}

func openFileForWrite(path string, appendMode, mkdir bool, permMode string) (int, os.FileMode, error) {
	if mkdir {
		dir := filepath.Dir(path)
		if dir != "." {
			if err := os.MkdirAll(dir, 0755); err != nil {
				return 0, 0, fmt.Errorf("mkdir: %w", err)
			}
		}
	}

	mode := os.FileMode(0644)
	if permMode != "" {
		m, err := parseMode(permMode)
		if err != nil {
			return 0, 0, err
		}
		mode = m
	}

	flag := os.O_CREATE | os.O_WRONLY
	if appendMode {
		flag |= os.O_APPEND
	} else {
		flag |= os.O_TRUNC
	}
	return flag, mode, nil
}

func outputWriteResult(path string, n int, appendMode bool) {
	if jsonOutput {
		out, _ := json.MarshalIndent(map[string]interface{}{
			"file":   path,
			"bytes":  n,
			"append": appendMode,
		}, "", "  ")
		fmt.Println(string(out))
		return
	}

	verb := "Written"
	if appendMode {
		verb = "Appended"
	}
	fmt.Printf("%s %d bytes to %s\n", verb, n, path)
}

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

			content, err := getWriteContent(args)
			if err != nil {
				return err
			}

			flag, mode, err := openFileForWrite(path, appendMode, mkdir, permMode)
			if err != nil {
				return err
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

			outputWriteResult(path, n, appendMode)
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
	if len(data) > 0 && data[len(data)-1] == '\n' {
		data = data[:len(data)-1]
	}
	return data, nil
}

func isStdinPiped() bool {
	stat, _ := os.Stdin.Stat()
	return (stat.Mode() & os.ModeCharDevice) == 0
}
