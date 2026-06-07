package openrouter

import (
	"encoding/json"
	"fmt"
	"os"
	"sort"
	"strings"
	"sync"

	"github.com/hieudoanm/jack/src/libs/colors"
	"github.com/spf13/cobra"
)

func newStatusCmd() *cobra.Command {
	var (
		statusSearch  string
		statusWorkers int
	)

	cmd := &cobra.Command{
		Use:   "status",
		Short: "Probe free models for availability and latency",
		Long:  `Probe free OpenRouter models in parallel to check which are currently available, rate-limited, restricted, or erroring. Reports latency for available models and sorts results by status.`,
		Example: `  openrouter status
  openrouter status --search gemma
  openrouter status --workers 10`,
		RunE: func(cmd *cobra.Command, args []string) error {
			return runOpenRouterStatus(cmd, args, statusSearch, statusWorkers)
		},
	}

	cmd.Flags().StringVarP(&statusSearch, "search", "s", "", "Filter models by name or ID before probing")
	cmd.Flags().IntVarP(&statusWorkers, "workers", "w", 6, "Parallel probe workers")
	return cmd
}

func runOpenRouterStatus(cmd *cobra.Command, args []string, statusSearch string, statusWorkers int) error {
	jsonOutput, _ := cmd.Flags().GetBool("json")
	apiKey := LoadAPIKey()
	if apiKey == "" {
		return fmt.Errorf("no OpenRouter API key found.\n  Set OPEN_ROUTER_API_KEY or add it to ~/.hieudoanm")
	}

	fmt.Fprint(os.Stderr, colors.Cyan("⠿ Fetching free models from OpenRouter...\n"))

	models, err := FetchFreeModels()
	if err != nil {
		return fmt.Errorf("failed to fetch models: %w", err)
	}

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
		if jsonOutput {
			fmt.Println(`{"results":[],"counts":{"ok":0,"rate_limited":0,"restricted":0,"error":0}}`)
			return nil
		}
		fmt.Println(colors.Yellow("No models found."))
		return nil
	}

	fmt.Fprintf(os.Stderr, colors.Cyan("⠿ Probing %d model(s) with %d workers...\n"),
		len(models), statusWorkers)

	jobs := make(chan Model, len(models))
	for _, m := range models {
		jobs <- m
	}
	close(jobs)

	results := make([]ProbeResult, len(models))
	var mu sync.Mutex
	var wg sync.WaitGroup
	var idx int

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

	sort.Slice(results, func(i, j int) bool {
		if results[i].Status != results[j].Status {
			return results[i].Status < results[j].Status
		}
		if results[i].Status == StatusOK {
			return results[i].Latency < results[j].Latency
		}
		return results[i].Model.ID < results[j].Model.ID
	})

	counts := map[ProbeStatus]int{}
	for _, r := range results {
		counts[r.Status]++
	}

	if jsonOutput {
		type resultItem struct {
			Model     Model  `json:"model"`
			Status    string `json:"status"`
			Message   string `json:"message,omitempty"`
			LatencyMs int64  `json:"latency_ms,omitempty"`
		}
		items := make([]resultItem, len(results))
		for i, r := range results {
			statusStr := ""
			switch r.Status {
			case StatusOK:
				statusStr = "ok"
			case StatusRateLimited:
				statusStr = "rate_limited"
			case StatusRestricted:
				statusStr = "restricted"
			case StatusError:
				statusStr = "error"
			}
			items[i] = resultItem{
				Model:     r.Model,
				Status:    statusStr,
				Message:   r.Message,
				LatencyMs: r.Latency,
			}
		}
		out, _ := json.Marshal(map[string]interface{}{
			"results": items,
			"counts": map[string]int{
				"ok":           counts[StatusOK],
				"rate_limited": counts[StatusRateLimited],
				"restricted":   counts[StatusRestricted],
				"error":        counts[StatusError],
			},
		})
		fmt.Println(string(out))
		return nil
	}

	fmt.Println()
	fmt.Printf("  %s", colors.Bold(colors.Green(fmt.Sprintf("✔ %d OK", counts[StatusOK]))))
	fmt.Printf("  %s", colors.Bold(colors.Yellow(fmt.Sprintf("⚡ %d rate-limited", counts[StatusRateLimited]))))
	fmt.Printf("  %s", colors.Bold(colors.Red(fmt.Sprintf("🔒 %d restricted", counts[StatusRestricted]))))
	fmt.Printf("  %s\n", colors.Bold(colors.Red(fmt.Sprintf("✖ %d error", counts[StatusError]))))
	fmt.Println()

	for _, r := range results {
		switch r.Status {
		case StatusOK:
			fmt.Printf("  %s %-52s %s\n",
				colors.Bold(colors.Green("✔ OK")),
				r.Model.ID,
				colors.Dim(fmt.Sprintf("%dms", r.Latency)))

		case StatusRateLimited:
			fmt.Printf("  %s %-52s %s\n",
				colors.Bold(colors.Yellow("⚡ RATE-LIMIT")),
				r.Model.ID,
				colors.Dim(truncate(r.Message, 60)))

		case StatusRestricted:
			fmt.Printf("  %s %-52s %s\n",
				colors.Bold(colors.Red("🔒 RESTRICTED")),
				r.Model.ID,
				colors.Dim("privacy/guardrail"))

		case StatusError:
			fmt.Printf("  %s %-52s %s\n",
				colors.Bold(colors.Red("✖ ERROR")),
				r.Model.ID,
				colors.Dim(truncate(r.Message, 60)))
		}
	}

	fmt.Println()
	fmt.Print(colors.Dim("  Tip: "))
	fmt.Print("rate-limited models recover in ~1 min. ")
	fmt.Println(colors.Dim("Restricted models need openrouter.ai/settings/privacy"))
	fmt.Println()

	return nil
}

func truncate(s string, max int) string {
	if len(s) <= max {
		return s
	}
	return s[:max-1] + "…"
}
