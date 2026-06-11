package gh

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/AlecAivazis/survey/v2"
	requests "github.com/hieudoanm/hieudoanm/src/libs/requests"
	"github.com/spf13/cobra"
)

type codeOfConduct struct {
	Key  string `json:"key"`
	Name string `json:"name"`
	URL  string `json:"url"`
	Body string `json:"body"`
}

var ghCocCmd = &cobra.Command{
	Use:   "coc",
	Short: "Fetch a GitHub Code of Conduct",
	Long: `Fetch and save a GitHub Code of Conduct to a file.

Fetches the list of available codes of conduct from the GitHub API,
prompts the user to select one (or uses --key), then writes the body
to a file.`,
	Run: func(cmd *cobra.Command, args []string) {
		key, _ := cmd.Flags().GetString("key")
		output, _ := cmd.Flags().GetString("output")

		// Fetch all codes of conduct
		body, err := requests.Get("https://api.github.com/codes_of_conduct", requests.Options{
			Header: http.Header{
				"Accept":     {"application/json"},
				"User-Agent": {"hieudoanm-cli"},
			},
		})
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error fetching codes of conduct: %v\n", err)
			return
		}

		var codes []codeOfConduct
		if err := json.Unmarshal(body, &codes); err != nil {
			fmt.Fprintf(os.Stderr, "Error parsing response: %v\n", err)
			return
		}

		// Resolve key (prompt if not provided)
		selectedKey := key
		if selectedKey == "" {
			var keys []string
			for _, c := range codes {
				keys = append(keys, c.Key)
			}

			prompt := &survey.Select{
				Message: "Select a Code of Conduct:",
				Options: keys,
			}
			if err := survey.AskOne(prompt, &selectedKey); err != nil {
				fmt.Fprintf(os.Stderr, "Selection cancelled: %v\n", err)
				return
			}
		}

		// Fetch the selected code of conduct
		url := fmt.Sprintf("https://api.github.com/codes_of_conduct/%s", selectedKey)
		detailBody, err := requests.Get(url, requests.Options{
			Header: http.Header{
				"Accept":     {"application/json"},
				"User-Agent": {"hieudoanm-cli"},
			},
		})
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error fetching code of conduct: %v\n", err)
			return
		}

		var coc codeOfConduct
		if err := json.Unmarshal(detailBody, &coc); err != nil {
			fmt.Fprintf(os.Stderr, "Error parsing response: %v\n", err)
			return
		}

		// Write to file
		file, err := os.Create(output)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error creating file: %v\n", err)
			return
		}
		defer file.Close()

		if _, err := file.WriteString(coc.Body); err != nil {
			fmt.Fprintf(os.Stderr, "Error writing file: %v\n", err)
			return
		}

		fmt.Printf("Written %s (%s) to %s\n", coc.Name, coc.Key, output)
	},
}

func init() {
	ghCocCmd.Flags().String("key", "", "Code of Conduct key (skip prompt)")
	ghCocCmd.Flags().StringP("output", "o", "CODE_OF_CONDUCT", "Output file path")
}
