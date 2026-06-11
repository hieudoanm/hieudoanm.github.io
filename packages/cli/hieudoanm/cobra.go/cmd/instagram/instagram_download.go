package instagram

import (
	"fmt"
	"net/http"
	"net/url"
	"os"
	"path/filepath"
	"regexp"
	"strings"

	"github.com/hieudoanm/hieudoanm/libs/colors"
	"github.com/hieudoanm/hieudoanm/libs/requests"

	"github.com/spf13/cobra"
)

var igShortcodePattern = regexp.MustCompile(`(?:instagram\.com/(?:p|reels|tv|reel)/)([^/?#&]+)`)
var igDisplayUrlPattern = regexp.MustCompile(`"display_url":"([^"]+)"`)
var igOgImagePattern = regexp.MustCompile(`<meta property="og:image" content="([^"]+)"`)

func extractShortcode(input string) (string, error) {
	input = strings.TrimSpace(input)
	if m := igShortcodePattern.FindStringSubmatch(input); len(m) > 1 {
		return m[1], nil
	}
	// Also handle raw shortcode
	if !strings.Contains(input, "/") && len(input) >= 10 {
		return input, nil
	}
	return "", fmt.Errorf("could not extract Instagram shortcode from: %s", input)
}

func fetchIGPage(shortcode string, useProxy bool) (string, error) {
	targetURL := fmt.Sprintf("https://www.instagram.com/p/%s/", shortcode)

	if useProxy {
		proxyURL := "https://hieudoanm-proxy.vercel.app/api?url=" + url.QueryEscape(targetURL)
		body, err := requests.Get(proxyURL, requests.Options{})
		if err != nil {
			return "", err
		}
		return string(body), nil
	}

	headers := make(http.Header)
	headers.Set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36")

	body, err := requests.Get(targetURL, requests.Options{Header: headers})
	if err != nil {
		return "", err
	}

	return string(body), nil
}

func scrapeIGImages(html string) []string {
	matches := igDisplayUrlPattern.FindAllStringSubmatch(html, -1)
	var urls []string
	seen := make(map[string]bool)
	for _, m := range matches {
		if len(m) > 1 {
			u := strings.ReplaceAll(m[1], "\\u0026", "&")
			if !seen[u] {
				urls = append(urls, u)
				seen[u] = true
			}
		}
	}

	if len(urls) == 0 {
		if m := igOgImagePattern.FindStringSubmatch(html); len(m) > 1 {
			urls = append(urls, m[1])
		}
	}

	return urls
}

func downloadIGFile(rawURL, filename, outDir string) (string, error) {
	body, err := requests.Get(rawURL, requests.Options{})
	if err != nil {
		return "", err
	}

	path := filepath.Join(outDir, filename)
	if err := os.WriteFile(path, body, 0644); err != nil {
		return "", err
	}

	return path, nil
}

func NewDownloadCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "download [url]",
		Short: "Download images from Instagram",
		Long: `Download images from an Instagram post, reel, or video.
Supports carousels and specific image selection via --index.

Example:
  devtools instagram download https://www.instagram.com/p/CLI7qRNhI_o/
  devtools instagram download CLI7qRNhI_o --index 1`,
		Args: cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			input := args[0]
			outputDir, _ := cmd.Flags().GetString("output")
			imgIndex, _ := cmd.Flags().GetInt("index")
			useProxy, _ := cmd.Flags().GetBool("proxy")

			shortcode, err := extractShortcode(input)
			if err != nil {
				return err
			}

			fmt.Printf("Shortcode: %s\n", colors.Cyan(shortcode))
			fmt.Print("Fetching page content... ")

			html, err := fetchIGPage(shortcode, useProxy)
			if err != nil {
				// Try proxy if direct failed and not already using proxy
				if !useProxy {
					fmt.Printf(colors.Yellow("direct failed (%v), trying proxy... "), err)
					html, err = fetchIGPage(shortcode, true)
				}
			}

			if err != nil {
				fmt.Println(colors.Red("failed"))
				return err
			}
			fmt.Println(colors.Green("done"))

			imageURLs := scrapeIGImages(html)
			if len(imageURLs) == 0 {
				return fmt.Errorf("no images found in post %s", shortcode)
			}

			// Handle specific index (1-based)
			if imgIndex > 0 {
				if imgIndex > len(imageURLs) {
					return fmt.Errorf("index %d out of range (found %d images)", imgIndex, len(imageURLs))
				}
				imageURLs = []string{imageURLs[imgIndex-1]}
				fmt.Printf("Selected image index %d\n", imgIndex)
			} else {
				fmt.Printf("Found %d image candidates\n", len(imageURLs))
			}

			// Resolve output directory
			if outputDir == "" {
				outputDir = "."
			}
			if err := os.MkdirAll(outputDir, 0o755); err != nil {
				return fmt.Errorf("create output dir: %w", err)
			}

			downloaded := 0
			for i, u := range imageURLs {
				filename := fmt.Sprintf("%s_%d.jpg", shortcode, i+1)
				if len(imageURLs) == 1 && imgIndex > 0 {
					filename = fmt.Sprintf("%s_%d.jpg", shortcode, imgIndex)
				} else if len(imageURLs) == 1 {
					filename = fmt.Sprintf("%s.jpg", shortcode)
				}

				fmt.Printf("  Downloading %s ... ", filename)
				path, err := downloadIGFile(u, filename, outputDir)
				if err != nil {
					fmt.Printf(colors.Red("failed: %v\n"), err)
					continue
				}
				fmt.Println(colors.Green("saved → ") + path)
				downloaded++
			}

			fmt.Printf("\nDone. %d image(s) saved to %s\n", downloaded, outputDir)
			return nil
		},
	}

	cmd.Flags().StringP("output", "o", ".", "Output directory")
	cmd.Flags().IntP("index", "i", 0, "Specific image index to download (1-based)")
	cmd.Flags().BoolP("proxy", "p", false, "Use proxy to fetch content")
	return cmd
}
