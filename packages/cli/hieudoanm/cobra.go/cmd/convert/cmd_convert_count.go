package convert

import (
	"bufio"
	"encoding/json"
	"fmt"
	"os"
	"strings"

	"github.com/spf13/cobra"
)

var countJSON bool

func newCountCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "count <text>",
		Short: "Count characters, words, and lines in text",
		Long: `Count the number of characters, words, and lines in the provided text.
If no text is provided, reads from stdin.`,
		Example: `  convert count "hello world"
  convert count --json "the quick brown fox"
  echo "hello world" | convert count`,
		Args: cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			var input string
			if len(args) > 0 {
				input = args[0]
			} else {
				sc := bufio.NewScanner(os.Stdin)
				var lines []string
				for sc.Scan() {
					lines = append(lines, sc.Text())
				}
				if err := sc.Err(); err != nil {
					return err
				}
				input = strings.Join(lines, "\n")
			}

			chars := len([]rune(input))
			words := len(strings.Fields(input))
			lines := 1
			if input == "" {
				lines = 0
			} else {
				lines = strings.Count(input, "\n") + 1
			}

			if countJSON {
				b, _ := json.MarshalIndent(map[string]interface{}{
					"characters": chars,
					"words":      words,
					"lines":      lines,
				}, "", "  ")
				fmt.Println(string(b))
			} else {
				fmt.Printf("%8d %8d %8d\n", lines, words, chars)
			}
			return nil
		},
	}

	cmd.Flags().BoolVar(&countJSON, "json", false, "Output in JSON format")
	return cmd
}
