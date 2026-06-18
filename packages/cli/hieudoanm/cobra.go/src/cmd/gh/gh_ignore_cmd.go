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

type gitignoreTemplate struct {
	Name   string `json:"name"`
	Source string `json:"source"`
}

func newIgnoreCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "ignore",
		Short: "Fetch a .gitignore template from GitHub",
		Long: `Fetch and save a .gitignore template from the GitHub gitignore API.

Fetches the list of available templates, prompts the user to select
one (or uses --name), then writes the template content to a file.`,
		Example: `  gh ignore
  gh ignore --name Go
  gh ignore --name Python -o .gitignore`,
		RunE: func(cmd *cobra.Command, args []string) error {
			name, _ := cmd.Flags().GetString("name")
			output, _ := cmd.Flags().GetString("output")

			body, err := requests.Get("https://api.github.com/gitignore/templates", requests.Options{
				Header: http.Header{
					"Accept":     {"application/json"},
					"User-Agent": {"hieudoanm-cli"},
				},
			})
			if err != nil {
				return fmt.Errorf("error fetching templates: %w", err)
			}

			var templates []string
			if err := json.Unmarshal(body, &templates); err != nil {
				return fmt.Errorf("error parsing response: %w", err)
			}

			selectedName := name
			if selectedName == "" {
				prompt := &survey.Select{
					Message: "Select a .gitignore template:",
					Options: templates,
				}
				if err := survey.AskOne(prompt, &selectedName); err != nil {
					return fmt.Errorf("selection cancelled: %w", err)
				}
			}

			url := fmt.Sprintf("https://api.github.com/gitignore/templates/%s", selectedName)
			detailBody, err := requests.Get(url, requests.Options{
				Header: http.Header{
					"Accept":     {"application/json"},
					"User-Agent": {"hieudoanm-cli"},
				},
			})
			if err != nil {
				return fmt.Errorf("error fetching template: %w", err)
			}

			var tmpl gitignoreTemplate
			if err := json.Unmarshal(detailBody, &tmpl); err != nil {
				return fmt.Errorf("error parsing response: %w", err)
			}

			file, err := os.Create(output)
			if err != nil {
				return fmt.Errorf("error creating file: %w", err)
			}
			defer file.Close()

			if _, err := file.WriteString(tmpl.Source); err != nil {
				return fmt.Errorf("error writing file: %w", err)
			}

			fmt.Printf("Written %s .gitignore template to %s\n", selectedName, output)
			return nil
		},
	}

	cmd.Flags().String("name", "", "Gitignore template name (skip prompt)")
	cmd.Flags().StringP("output", "o", ".gitignore", "Output file path")
	return cmd
}
