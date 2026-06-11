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

type gitignoreTemplate struct {
	Name   string `json:"name"`
	Source string `json:"source"`
}

var ghIgnoreCmd = &cobra.Command{
	Use:   "ignore",
	Short: "Fetch a .gitignore template from GitHub",
	Long: `Fetch and save a .gitignore template from the GitHub gitignore API.

Fetches the list of available templates, prompts the user to select
one (or uses --name), then writes the template content to a file.`,
	Run: func(cmd *cobra.Command, args []string) {
		name, _ := cmd.Flags().GetString("name")
		output, _ := cmd.Flags().GetString("output")

		// Fetch all gitignore templates
		body, err := requests.Get("https://api.github.com/gitignore/templates", requests.Options{
			Header: http.Header{
				"Accept":     {"application/json"},
				"User-Agent": {"hieudoanm-cli"},
			},
		})
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error fetching templates: %v\n", err)
			return
		}

		var templates []string
		if err := json.Unmarshal(body, &templates); err != nil {
			fmt.Fprintf(os.Stderr, "Error parsing response: %v\n", err)
			return
		}

		// Resolve name (prompt if not provided)
		selectedName := name
		if selectedName == "" {
			prompt := &survey.Select{
				Message: "Select a .gitignore template:",
				Options: templates,
			}
			if err := survey.AskOne(prompt, &selectedName); err != nil {
				fmt.Fprintf(os.Stderr, "Selection cancelled: %v\n", err)
				return
			}
		}

		// Fetch the selected template
		url := fmt.Sprintf("https://api.github.com/gitignore/templates/%s", selectedName)
		detailBody, err := requests.Get(url, requests.Options{
			Header: http.Header{
				"Accept":     {"application/json"},
				"User-Agent": {"hieudoanm-cli"},
			},
		})
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error fetching template: %v\n", err)
			return
		}

		var tmpl gitignoreTemplate
		if err := json.Unmarshal(detailBody, &tmpl); err != nil {
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

		if _, err := file.WriteString(tmpl.Source); err != nil {
			fmt.Fprintf(os.Stderr, "Error writing file: %v\n", err)
			return
		}

		fmt.Printf("Written %s .gitignore template to %s\n", selectedName, output)
	},
}

func init() {
	ghIgnoreCmd.Flags().String("name", "", "Gitignore template name (skip prompt)")
	ghIgnoreCmd.Flags().StringP("output", "o", ".gitignore", "Output file path")
}
