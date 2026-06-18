package gh

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strings"

	requests "github.com/hieudoanm/hieudoanm/src/libs/requests"
	"github.com/spf13/cobra"
)

type ghRepo struct {
	Name        string `json:"name"`
	FullName    string `json:"full_name"`
	Description string `json:"description"`
	HTMLURL     string `json:"html_url"`
	Stars       int    `json:"stargazers_count"`
	Forks       int    `json:"forks_count"`
	Language    string `json:"language"`
	Owner       struct {
		Login     string `json:"login"`
		AvatarURL string `json:"avatar_url"`
	} `json:"owner"`
}

func generateOGSVG(repo ghRepo) string {
	const (
		width  = 1200
		height = 630
	)

	desc := repo.Description
	if len(desc) > 120 {
		desc = desc[:120] + "..."
	}
	if desc == "" {
		desc = "No description"
	}

	langColor := LanguageColors[repo.Language]
	if langColor == "" {
		langColor = "#6e7681"
	}

	var sb strings.Builder
	sb.WriteString(fmt.Sprintf(`<svg xmlns="http://www.w3.org/2000/svg" width="%d" height="%d" viewBox="0 0 %d %d">
<defs>
  <linearGradient id="bg" x1="0%%" y1="0%%" x2="100%%" y2="100%%">
    <stop offset="0%%" stop-color="#0d1117"/>
    <stop offset="100%%" stop-color="#161b22"/>
  </linearGradient>
</defs>
<rect width="%d" height="%d" fill="url(#bg)" rx="12"/>
`, width, height, width, height, width, height))

	// Avatar
	if repo.Owner.AvatarURL != "" {
		sb.WriteString(fmt.Sprintf(`<image x="60" y="60" width="80" height="80" href="%s" rx="40"/>
`, repo.Owner.AvatarURL))
	}

	// Owner login
	sb.WriteString(fmt.Sprintf(`<text x="155" y="95" fill="#8b949e" font-family="sans-serif" font-size="18">%s</text>
`, escapeXML(repo.Owner.Login)))

	// Repo name
	sb.WriteString(fmt.Sprintf(`<text x="60" y="145" fill="#58a6ff" font-family="sans-serif" font-size="36" font-weight="bold">%s</text>
`, escapeXML(repo.Name)))

	// Description
	sb.WriteString(fmt.Sprintf(`<text x="60" y="195" fill="#c9d1d9" font-family="sans-serif" font-size="20">%s</text>
`, escapeXML(desc)))

	// Stats row
	statY := 270
	sb.WriteString(fmt.Sprintf(`<circle cx="65" cy="%d" r="8" fill="%s"/>
`, statY-6, langColor))
	sb.WriteString(fmt.Sprintf(`<text x="82" y="%d" fill="#8b949e" font-family="sans-serif" font-size="18">%s</text>
`, statY, escapeXML(repo.Language)))

	// Stars
	sb.WriteString(fmt.Sprintf(`<text x="200" y="%d" fill="#8b949e" font-family="sans-serif" font-size="18">★ %d</text>
`, statY, repo.Stars))

	// Forks
	sb.WriteString(fmt.Sprintf(`<text x="320" y="%d" fill="#8b949e" font-family="sans-serif" font-size="18">⑂ %d</text>
`, statY, repo.Forks))

	// URL at bottom
	sb.WriteString(fmt.Sprintf(`<text x="60" y="%d" fill="#30363d" font-family="sans-serif" font-size="16">%s</text>
`, height-30, escapeXML(repo.HTMLURL)))

	sb.WriteString("</svg>\n")
	return sb.String()
}

func escapeXML(s string) string {
	s = strings.ReplaceAll(s, "&", "&amp;")
	s = strings.ReplaceAll(s, "<", "&lt;")
	s = strings.ReplaceAll(s, ">", "&gt;")
	s = strings.ReplaceAll(s, "'", "&apos;")
	s = strings.ReplaceAll(s, `"`, "&quot;")
	return s
}

func newOGCmd() *cobra.Command {
	var url string
	cmd := &cobra.Command{
		Use:   "og [--url <owner/repo>]",
		Short: "Generate an Open Graph SVG for a GitHub repository",
		Long: `Fetches repository metadata from GitHub and generates
a 1200×630 Open Graph SVG image (social preview card).`,
		Example: `  gh og --url hieudoanm/hieudoanm.github.io
  gh og --url hieudoanm/hieudoanm --output preview.svg`,
		RunE: func(cmd *cobra.Command, args []string) error {
			repoArg := url
			output, _ := cmd.Flags().GetString("output")

			parts := strings.Split(repoArg, "/")
			if len(parts) != 2 {
				return fmt.Errorf("repo must be in format owner/repo (got %q)", repoArg)
			}

			url := fmt.Sprintf("https://api.github.com/repos/%s/%s", parts[0], parts[1])
			body, err := requests.Get(url, requests.Options{
				Header: http.Header{
					"Accept":     {"application/json"},
					"User-Agent": {"hieudoanm-cli"},
				},
			})
			if err != nil {
				return fmt.Errorf("error fetching repository: %w", err)
			}

			var repo ghRepo
			if err := json.Unmarshal(body, &repo); err != nil {
				return fmt.Errorf("error parsing response: %w", err)
			}

			svg := generateOGSVG(repo)
			if err := os.WriteFile(output, []byte(svg), 0644); err != nil {
				return fmt.Errorf("error writing SVG: %w", err)
			}

			fmt.Printf("✓ og.svg generated at %s\n", output)
			return nil
		},
	}

	cmd.Flags().StringVarP(&url, "url", "u", "", "Repository (owner/repo)")
	cmd.Flags().StringP("output", "o", "og.svg", "Output SVG file path")
	return cmd
}
