package english

import (
	"encoding/json"
	"errors"
	"fmt"
	"strings"

	"github.com/hieudoanm/hieudoanm/libs/requests"
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

func newDefineCmd() *cobra.Command {
	var word string
	var defineJSON bool
	cmd := &cobra.Command{
		Use:   "define [--word <word>]",
		Short: "Look up the definition of an English word",
		Long:  `Fetches and displays the definition, part of speech, synonyms, and antonyms for a given English word from a local dictionary data source.`,
		Example: `  english define --word hello
  english define --word serendipity --json`,
		RunE: func(cmd *cobra.Command, args []string) error {
			word = strings.TrimSpace(strings.ToLower(word))
			if word == "" {
				return errors.New("word cannot be empty")
			}

			url := fmt.Sprintf(
				"https://raw.githubusercontent.com/hieudoanm/words/refs/heads/master/packages/data/english/words/%s.json",
				word,
			)

			body, err := requests.Get(url, requests.Options{})
			if err != nil {
				return fmt.Errorf("fetch error: %w", err)
			}

			var data Word
			if err := json.Unmarshal(body, &data); err != nil {
				return fmt.Errorf("json error: %w", err)
			}

			if defineJSON {
				out, _ := json.MarshalIndent(data, "", "  ")
				fmt.Println(string(out))
				return nil
			}

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
	cmd.Flags().StringVarP(&word, "word", "w", "", "Word to define")
	cmd.Flags().BoolVar(&defineJSON, "json", false, "Output in JSON format")
	return cmd
}
