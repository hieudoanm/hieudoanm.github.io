package snapshot

import (
	"fmt"
	"net/url"
	"os"
	"path/filepath"
	"strings"
	"time"
)

func resolveOutput(output, rawURL string, pdf bool) (string, error) {
	ext := ".png"
	if pdf {
		ext = ".pdf"
	}

	info, err := os.Stat(output)
	if err == nil && info.IsDir() {
		name := hostnameSlug(rawURL) + "_" + time.Now().Format("20060102_150405") + ext
		return filepath.Join(output, name), nil
	}

	if strings.HasSuffix(output, string(os.PathSeparator)) || strings.HasSuffix(output, "/") {
		if err := os.MkdirAll(output, 0755); err != nil {
			return "", fmt.Errorf("creating directory %s: %w", output, err)
		}
		name := hostnameSlug(rawURL) + "_" + time.Now().Format("20060102_150405") + ext
		return filepath.Join(output, name), nil
	}

	dir := filepath.Dir(output)
	if dir != "." {
		if err := os.MkdirAll(dir, 0755); err != nil {
			return "", fmt.Errorf("creating directory %s: %w", dir, err)
		}
	}
	return output, nil
}

func hostnameSlug(rawURL string) string {
	u, err := url.Parse(rawURL)
	if err != nil || u.Host == "" {
		return "snapshot"
	}
	slug := strings.ReplaceAll(u.Host, ".", "_")
	slug = strings.ReplaceAll(slug, ":", "_")
	return slug
}

func defaultSnapshotPath(rawURL string, pdf bool) (string, error) {
	home, err := os.UserHomeDir()
	if err != nil {
		return "", fmt.Errorf("getting home dir: %w", err)
	}
	dir := filepath.Join(home, ".snapshot")
	if err := os.MkdirAll(dir, 0755); err != nil {
		return "", fmt.Errorf("creating snapshot dir: %w", err)
	}
	ext := ".png"
	if pdf {
		ext = ".pdf"
	}
	filename := hostnameSlug(rawURL) + "_" + time.Now().Format("20060102_150405") + ext
	return filepath.Join(dir, filename), nil
}
