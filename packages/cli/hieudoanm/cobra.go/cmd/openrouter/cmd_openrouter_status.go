// package openrouter ...
package openrouter

import (
	"fmt"
	"os"
	"sort"
	"strings"
	"sync"

	"github.com/fatih/color"
	"github.com/spf13/cobra"
)

var (
	statusSearch  string
	statusWorkers int
)

var openrouterStatusCmd = &cobra.Command{
	Use:   "status",
	Short: "Run the status operation for the OpenRouter app",
	Long: `The status command is a specific utility to execute operations related to status within the OpenRouter application.

As a component of the ai tools, this command empowers you to interact directly with OpenRouter's status features via the CLI.`,
	RunE: runOpenRouterStatus,
}

func runOpenRouterStatus(cmd *cobra.Command, args []string) error {
	apiKey := LoadAPIKey()
	if apiKey == "" {
		return fmt.Errorf("no OpenRouter API key found.\n  Set OPEN_ROUTER_API_KEY or add it to ~/.hieudoanm")
	}

	fmt.Fprint(os.Stderr, color.CyanString("⠿ Fetching free models from OpenRouter...\n"))

	models, err := FetchFreeModels()
	if err != nil {
		return fmt.Errorf("failed to fetch models: %w", err)
	}

	// Optional filter
	if statusSearch != "" {
		q := strings.ToLower(statusSearch)
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
		color.Yellow("No models found.")
		return nil
	}

	fmt.Fprintf(os.Stderr, color.CyanString("⠿ Probing %d model(s) with %d workers...\n"),
		len(models), statusWorkers)

	// Fan-out probe jobs
	jobs := make(chan Model, len(models))
	for _, m := range models {
		jobs <- m
	}
	close(jobs)

	results := make([]ProbeResult, len(models))
	var mu sync.Mutex
	var wg sync.WaitGroup
	idx := 0

	for i := 0; i < statusWorkers; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			for m := range jobs {
				r := ProbeModel(m, apiKey)
				mu.Lock()
				results[idx] = r
				idx++
				mu.Unlock()
			}
		}()
	}
	wg.Wait()

	// Sort: OK first (by latency), then rate-limited, restricted, errors
	sort.Slice(results, func(i, j int) bool {
		if results[i].Status != results[j].Status {
			return results[i].Status < results[j].Status
		}
		if results[i].Status == StatusOK {
			return results[i].Latency < results[j].Latency
		}
		return results[i].Model.ID < results[j].Model.ID
	})

	// Tally
	counts := map[ProbeStatus]int{}
	for _, r := range results {
		counts[r.Status]++
	}

	fmt.Println()

	green := color.New(color.FgGreen, color.Bold)
	yellow := color.New(color.FgYellow, color.Bold)
	red := color.New(color.FgRed, color.Bold)
	dim := color.New(color.Faint)
	white := color.New(color.FgWhite)

	green.Printf("  ✔ %d OK", counts[StatusOK])
	fmt.Print("  ")
	yellow.Printf("⚡ %d rate-limited", counts[StatusRateLimited])
	fmt.Print("  ")
	red.Printf("🔒 %d restricted", counts[StatusRestricted])
	fmt.Print("  ")
	red.Printf("✖ %d error", counts[StatusError])
	fmt.Println()
	fmt.Println()

	for _, r := range results {
		switch r.Status {
		case StatusOK:
			green.Print("  ✔ OK          ")
			white.Printf("%-52s", r.Model.ID)
			dim.Printf(" %dms\n", r.Latency)

		case StatusRateLimited:
			yellow.Print("  ⚡ RATE-LIMIT  ")
			white.Printf("%-52s", r.Model.ID)
			if r.Message != "" {
				dim.Printf(" %s\n", truncate(r.Message, 60))
			} else {
				fmt.Println()
			}

		case StatusRestricted:
			red.Print("  🔒 RESTRICTED  ")
			white.Printf("%-52s", r.Model.ID)
			dim.Printf(" privacy/guardrail\n")

		case StatusError:
			red.Print("  ✖ ERROR        ")
			white.Printf("%-52s", r.Model.ID)
			if r.Message != "" {
				dim.Printf(" %s\n", truncate(r.Message, 60))
			} else {
				fmt.Println()
			}
		}
	}

	fmt.Println()
	dim.Print("  Tip: ")
	fmt.Print("rate-limited models recover in ~1 min. ")
	dim.Println("Restricted models need openrouter.ai/settings/privacy")
	fmt.Println()

	return nil
}

func truncate(s string, max int) string {
	if len(s) <= max {
		return s
	}
	return s[:max-1] + "…"
}

func init() {
	openrouterStatusCmd.Flags().StringVarP(&statusSearch, "search", "s", "", "Filter models by name or ID before probing")
	openrouterStatusCmd.Flags().IntVarP(&statusWorkers, "workers", "w", 6, "Parallel probe workers")
}
