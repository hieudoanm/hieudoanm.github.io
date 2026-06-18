package web

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"regexp"
	"strings"
	"time"

	"github.com/hieudoanm/hieudoanm/libs/browser"
	"github.com/hieudoanm/hieudoanm/libs/colors"
)

var igShortcodePattern = regexp.MustCompile(`(?:instagram\.com/(?:p|reels|tv|reel)/)([^/?#&]+)`)
var igOgImagePattern = regexp.MustCompile(`<meta[^>]+property="og:image"[^>]+content="([^"]+)"`)

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

func fetchIGPage(shortcode string) (string, error) {
	targetURL := fmt.Sprintf("https://www.instagram.com/p/%s/", shortcode)
	html, err := browser.FetchHTML(targetURL)
	if err != nil {
		return "", fmt.Errorf("fetch page: %w", err)
	}
	return html, nil
}

func scrapeImages(html string) []string {
	if m := igOgImagePattern.FindStringSubmatch(html); len(m) > 1 {
		return []string{strings.ReplaceAll(m[1], "&amp;", "&")}
	}
	return nil
}

func downloadImageFile(rawURL, filename, outDir string) (string, error) {
	client := &http.Client{Timeout: 60 * time.Second}
	resp, err := client.Get(rawURL)
	if err != nil {
		return "", fmt.Errorf("download: %w", err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", fmt.Errorf("read: %w", err)
	}

	path := filepath.Join(outDir, filename)
	if err := os.WriteFile(path, body, 0644); err != nil {
		return "", fmt.Errorf("write: %w", err)
	}
	return path, nil
}

func outputImagesJSON(shortcode string, imageURLs []string) error {
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

func downloadImages(shortcode string, imageURLs []string, imgIndex int, outputDir string) int {
	downloaded := 0
	for i, u := range imageURLs {
		filename := fmt.Sprintf("%s_%d.jpg", shortcode, i+1)
		if len(imageURLs) == 1 && imgIndex > 0 {
			filename = fmt.Sprintf("%s_%d.jpg", shortcode, imgIndex)
		} else if len(imageURLs) == 1 {
			filename = fmt.Sprintf("%s.jpg", shortcode)
		}

		path, err := downloadImageFile(u, filename, outputDir)
		if err != nil {
			fmt.Printf(colors.Red("failed: %v\n"), err)
			continue
		}
		fmt.Println(colors.Green("saved ") + path)
		downloaded++
	}
	return downloaded
}
