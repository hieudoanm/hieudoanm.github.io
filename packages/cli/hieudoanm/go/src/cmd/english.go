package cmd

import (
	"encoding/json"
	"errors"
	"fmt"
	"strings"

	"github.com/hieudoanm/hieudoanm/src/libs/requests" // adjust to your module path

	"github.com/spf13/cobra"
)

type Result struct {
	Definition   string   `json:"definition"`
	PartOfSpeech string   `json:"partOfSpeech"`
	Synonyms     []string `json:"synonyms"`
	Anonyms      []string `json:"anonyms"`
	UsageOf      []string `json:"usageOf"`
	TypeOf       []string `json:"typeOf"`
}

type Word struct {
	Word    string   `json:"word"`
	Results []Result `json:"results"`
}

var defineCmd = &cobra.Command{
	Use:   "define <word>",
	Short: "Run the define operation for the english app",
	Long: `The define command is a specific utility to execute operations related to define within the english application.

As a component of the languages tools, this command empowers you to interact directly with english's define features via the CLI.`,
	Args: cobra.ExactArgs(1),
	RunE: func(cmd *cobra.Command, args []string) error {
		word := strings.TrimSpace(strings.ToLower(args[0]))
		if word == "" {
			return errors.New("word cannot be empty")
		}

		url := fmt.Sprintf(
			"https://raw.githubusercontent.com/hieudoanm/words/refs/heads/master/packages/data/english/words/%s.json",
			word,
		)

		// Use your own requests wrapper
		body, err := requests.Get(url, requests.Options{})
		if err != nil {
			return fmt.Errorf("fetch error: %w", err)
		}

		// Parse JSON
		var data Word
		if err := json.Unmarshal(body, &data); err != nil {
			return fmt.Errorf("json error: %w", err)
		}

		// Output like your React page
		fmt.Printf("\nWORD: %s\n\n", data.Word)

		for i, r := range data.Results {
			fmt.Printf("%d) %s\n", i+1, r.PartOfSpeech)
			fmt.Printf("   Definition: %s\n", r.Definition)

			if len(r.Synonyms) > 0 {
				fmt.Printf("   Synonyms: %s\n", strings.Join(r.Synonyms, ", "))
			}

			if len(r.Anonyms) > 0 {
				fmt.Printf("   Antonyms: %s\n", strings.Join(r.Anonyms, ", "))
			}

			fmt.Println()
		}

		return nil
	},
}

func init() {
	rootCmd.AddCommand(defineCmd)
}
