package web

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"os"
	"path/filepath"
	"regexp"
	"strings"

	"github.com/hieudoanm/hieudoanm/libs/colors"
	"github.com/hieudoanm/hieudoanm/libs/requests"
)

var igShortcodePattern = regexp.MustCompile(`(?:instagram\.com/(?:p|reels|tv|reel)/)([^/?#&]+)`)
var igDisplayUrlPattern = regexp.MustCompile(`"display_url":"([^"]+)"`)
var igOgImagePattern = regexp.MustCompile(`<meta property="og:image" content="([^"]+)"`)

func extractShortcode(input string) (string, error) {
	input = strings.TrimSpace(input)
	if m := igShortcodePattern.FindStringSubmatch(input); len(m) > 1 {
		return m[1], nil
	}
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

func outputIGJSON(shortcode string, imageURLs []string) error {
	out, err := json.MarshalIndent(map[string]interface{}{
		"shortcode":  shortcode,
		"image_urls": imageURLs,
		"count":      len(imageURLs),
	}, "", "  ")
	if err != nil {
		return err
	}
	fmt.Println(string(out))
	return nil
}

func downloadIGImages(shortcode string, imageURLs []string, imgIndex int, outputDir string) int {
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
	return downloaded
}
