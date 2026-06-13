package search

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"regexp"
	"strings"

	"github.com/spf13/cobra"
)

func newWebCmd() *cobra.Command {
	var maxResults int
	var source string

	cmd := &cobra.Command{
		Use:   "web <query>",
		Short: "Search the internet",
		Long: `Search the web for a query. Uses DuckDuckGo by default (no API key needed).

Examples:
  search web "golang concurrency patterns"
  search web "latest AI news 2026" --max-results 10
  search web --source google "site:github.com golang cli"`,
		Args: cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			query := args[0]

			if source == "" || source == "duckduckgo" {
				return duckDuckGoSearch(query, maxResults)
			}

			return fmt.Errorf("unsupported search source: %s (use 'duckduckgo')", source)
		},
	}

	cmd.Flags().IntVarP(&maxResults, "max-results", "n", 5, "Maximum number of results")
	cmd.Flags().StringVarP(&source, "source", "s", "duckduckgo", "Search source (duckduckgo)")
	return cmd
}

type webResult struct {
	Title   string `json:"title"`
	URL     string `json:"url"`
	Snippet string `json:"snippet"`
}

func duckDuckGoSearch(query string, maxResults int) error {
	searchURL := fmt.Sprintf("https://lite.duckduckgo.com/lite/?q=%s", url.QueryEscape(query))

	req, err := http.NewRequest("GET", searchURL, nil)
	if err != nil {
		return fmt.Errorf("request error: %w", err)
	}
	req.Header.Set("User-Agent", "Mozilla/5.0 (compatible; hieudoanm-cli/1.0)")

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return fmt.Errorf("fetch error: %w", err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return fmt.Errorf("read error: %w", err)
	}

	results := parseDuckDuckGoResults(string(body), maxResults)

	if jsonOutput {
		out, _ := json.MarshalIndent(map[string]interface{}{
			"query":   query,
			"results": results,
			"count":   len(results),
		}, "", "  ")
		fmt.Println(string(out))
		return nil
	}

	if len(results) == 0 {
		fmt.Println("(no results)")
		return nil
	}

	for i, r := range results {
		fmt.Printf("%d. %s\n", i+1, r.Title)
		fmt.Printf("   %s\n", r.URL)
		if r.Snippet != "" {
			fmt.Printf("   %s\n", r.Snippet)
		}
		fmt.Println()
	}
	fmt.Printf("%d results from DuckDuckGo\n", len(results))
	return nil
}

var ddgResultRe = regexp.MustCompile(`<a[^>]*class="result-link"[^>]*href="([^"]*)"[^>]*>([^<]*)</a>`)
var ddgSnippetRe = regexp.MustCompile(`<td[^>]*class="result-snippet"[^>]*>(.*?)</td>`)

func parseDuckDuckGoResults(html string, maxResults int) []webResult {
	linkMatches := ddgResultRe.FindAllStringSubmatch(html, -1)
	snippetMatches := ddgSnippetRe.FindAllStringSubmatch(html, -1)

	n := len(linkMatches)
	if maxResults > 0 && maxResults < n {
		n = maxResults
	}

	results := make([]webResult, 0, n)
	for i := 0; i < n && i < len(linkMatches); i++ {
		link := linkMatches[i]
		href := link[1]
		title := cleanHTML(link[2])

		if strings.HasPrefix(href, "//") {
			href = "https:" + href
		} else if !strings.HasPrefix(href, "http") {
			href = "https://" + href
		}

		var snippet string
		if i < len(snippetMatches) {
			snippet = cleanHTML(snippetMatches[i][1])
		}

		results = append(results, webResult{
			Title:   title,
			URL:     href,
			Snippet: snippet,
		})
	}

	return results
}

var htmlTagRe = regexp.MustCompile(`<[^>]*>`)
var htmlEntityRe = regexp.MustCompile(`&([^;]+);`)

var htmlEntities = map[string]string{
	"amp":  "&",
	"lt":   "<",
	"gt":   ">",
	"quot": "\"",
	"apos": "'",
	"nbsp": " ",
}

func cleanHTML(s string) string {
	s = htmlTagRe.ReplaceAllString(s, "")
	s = htmlEntityRe.ReplaceAllStringFunc(s, func(m string) string {
		key := m[1 : len(m)-1]
		if v, ok := htmlEntities[key]; ok {
			return v
		}
		if strings.HasPrefix(key, "#") {
			var r rune
			if _, err := fmt.Sscanf(key, "#%d", &r); err == nil {
				return string(r)
			}
		}
		return m
	})
	s = strings.TrimSpace(s)
	return s
}
