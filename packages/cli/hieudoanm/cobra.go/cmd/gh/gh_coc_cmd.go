package gh

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/AlecAivazis/survey/v2"
	requests "github.com/hieudoanm/hieudoanm/libs/requests"
	"github.com/spf13/cobra"
)

type codeOfConduct struct {
	Key  string `json:"key"`
	Name string `json:"name"`
	URL  string `json:"url"`
	Body string `json:"body"`
}

func newCocCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "coc",
		Short: "Fetch a GitHub Code of Conduct",
		Long: `Fetch and save a GitHub Code of Conduct to a file.

Fetches the list of available codes of conduct from the GitHub API,
prompts the user to select one (or uses --key), then writes the body
to a file.`,
		Example: `  gh coc
  gh coc --key citizen_code_of_conduct
  gh coc --key contributor_covenant -o COC.md`,
		RunE: func(cmd *cobra.Command, args []string) error {
			key, _ := cmd.Flags().GetString("key")
			output, _ := cmd.Flags().GetString("output")

			body, err := requests.Get("https://api.github.com/codes_of_conduct", requests.Options{
				Header: http.Header{
					"Accept":     {"application/json"},
					"User-Agent": {"hieudoanm-cli"},
				},
			})
			if err != nil {
				return fmt.Errorf("error fetching codes of conduct: %w", err)
			}

			var codes []codeOfConduct
			if err := json.Unmarshal(body, &codes); err != nil {
				return fmt.Errorf("error parsing response: %w", err)
			}

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
					return fmt.Errorf("selection cancelled: %w", err)
				}
			}

			url := fmt.Sprintf("https://api.github.com/codes_of_conduct/%s", selectedKey)
			detailBody, err := requests.Get(url, requests.Options{
				Header: http.Header{
					"Accept":     {"application/json"},
					"User-Agent": {"hieudoanm-cli"},
				},
			})
			if err != nil {
				return fmt.Errorf("error fetching code of conduct: %w", err)
			}

			var coc codeOfConduct
			if err := json.Unmarshal(detailBody, &coc); err != nil {
				return fmt.Errorf("error parsing response: %w", err)
			}

			file, err := os.Create(output)
			if err != nil {
				return fmt.Errorf("error creating file: %w", err)
			}
			defer file.Close()

			if _, err := file.WriteString(coc.Body); err != nil {
				return fmt.Errorf("error writing file: %w", err)
			}

			fmt.Printf("Written %s (%s) to %s\n", coc.Name, coc.Key, output)
			return nil
		},
	}

	cmd.Flags().String("key", "", "Code of Conduct key (skip prompt)")
	cmd.Flags().StringP("output", "o", "CODE_OF_CONDUCT", "Output file path")
	return cmd
}
