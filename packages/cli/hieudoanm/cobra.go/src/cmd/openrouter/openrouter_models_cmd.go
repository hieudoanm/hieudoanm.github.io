package openrouter

import (
	"encoding/json"
	"fmt"
	"os"
	"sort"
	"strings"

	"github.com/hieudoanm/jack/src/libs/colors"
	"github.com/spf13/cobra"
)

func newModelsCmd() *cobra.Command {
	var (
		modelsSearch string
		modelsJSON   bool
	)

	cmd := &cobra.Command{
		Use:   "models",
		Short: "List available free models from OpenRouter",
		Long:  `Fetch and display all free models available on OpenRouter. Models can be filtered by name or ID with --search, and grouped by provider for easy browsing.`,
		Example: `  openrouter models
  openrouter models --search gemma
  openrouter models --json`,
		RunE: func(cmd *cobra.Command, args []string) error {
			return runModels(cmd, args, modelsSearch, modelsJSON)
		},
	}

	cmd.Flags().StringVarP(&modelsSearch, "search", "s", "", "Filter models by name or ID")
	cmd.Flags().BoolVar(&modelsJSON, "json", false, "Output raw JSON")
	return cmd
}

func runModels(cmd *cobra.Command, args []string, modelsSearch string, modelsJSON bool) error {
	fmt.Fprint(os.Stderr, colors.Cyan("⠿ Fetching free models from OpenRouter...\n"))

	models, err := FetchFreeModels()
	if err != nil {
		return fmt.Errorf("failed to fetch models: %w", err)
	}

	if modelsSearch != "" {
		q := strings.ToLower(modelsSearch)
		filtered := models[:0]
		for _, m := range models {
			if strings.Contains(strings.ToLower(m.ID), q) ||
				strings.Contains(strings.ToLower(m.Name), q) {
				filtered = append(filtered, m)
			}
		}
		models = filtered
	}

	if len(models) == 0 {
		fmt.Println(colors.Yellow("No models found."))
		return nil
	}

	if modelsJSON {
		enc := json.NewEncoder(os.Stdout)
		enc.SetIndent("", "  ")
		return enc.Encode(models)
	}

	grouped := map[string][]Model{}
	for _, m := range models {
		parts := strings.SplitN(m.ID, "/", 2)
		provider := parts[0]
		grouped[provider] = append(grouped[provider], m)
	}

	providers := make([]string, 0, len(grouped))
	for p := range grouped {
		providers = append(providers, p)
	}
	sort.Strings(providers)

	fmt.Printf("\n%s\n\n", colors.Bold(colors.Green(fmt.Sprintf("✨ %d free model(s) on OpenRouter", len(models)))))

	for _, provider := range providers {
		fmt.Printf("  %s\n", colors.Bold(colors.Cyan(provider)))
		for _, m := range grouped[provider] {
			var ctx string
			if m.ContextLength > 0 {
				ctx = colors.Dim(fmt.Sprintf(" [%s ctx]", formatCtx(m.ContextLength)))
			}
			fmt.Printf("    %s%s\n", m.ID, ctx)

			if m.Description != "" {
				desc := m.Description
				if len(desc) > 72 {
					desc = desc[:71] + "…"
				}
				fmt.Printf("      %s\n", colors.Dim(desc))
			}
		}
		fmt.Println()
	}

	fmt.Printf("  %s%s%s\n", colors.Dim("Run: "), "fr run <model-id>", colors.Dim(" to start a local proxy"))

	return nil
}

func formatCtx(n int) string {
	switch {
	case n >= 1_000_000:
		return fmt.Sprintf("%dM", n/1_000_000)
	case n >= 1_000:
		return fmt.Sprintf("%dk", n/1_000)
	default:
		return fmt.Sprintf("%d", n)
	}
}
