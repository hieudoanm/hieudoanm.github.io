package youtube

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"regexp"
	"strings"
)

type ytQuality struct {
	id         string
	label      string
	resolution string
}

var ytQualities = []ytQuality{
	{"maxresdefault", "Max Resolution", "1280×720"},
	{"sddefault", "SD", "640×480"},
	{"hqdefault", "HQ", "480×360"},
	{"mqdefault", "MQ", "320×180"},
	{"default", "Default", "120×90"},
	{"0", "Frame 0", "480×360"},
	{"1", "Frame 1", "120×90"},
	{"2", "Frame 2", "120×90"},
	{"3", "Frame 3", "120×90"},
}

var ytVideoIDPatterns = []*regexp.Regexp{
	regexp.MustCompile(`(?:youtube\.com/watch\?.*v=)([a-zA-Z0-9_-]{11})`),
	regexp.MustCompile(`(?:youtu\.be/)([a-zA-Z0-9_-]{11})`),
	regexp.MustCompile(`(?:youtube\.com/embed/)([a-zA-Z0-9_-]{11})`),
	regexp.MustCompile(`(?:youtube\.com/shorts/)([a-zA-Z0-9_-]{11})`),
	regexp.MustCompile(`^([a-zA-Z0-9_-]{11})$`),
}

func ytExtractVideoID(input string) (string, error) {
	input = strings.TrimSpace(input)
	for _, re := range ytVideoIDPatterns {
		if m := re.FindStringSubmatch(input); len(m) > 1 {
			return m[1], nil
		}
	}
	return "", fmt.Errorf("could not extract video ID from: %s", input)
}

func ytThumbURL(videoID, qualityID string) string {
	return fmt.Sprintf("https://img.youtube.com/vi/%s/%s.jpg", videoID, qualityID)
}

func ytDownloadThumb(videoID, qualityID, outDir string) (string, error) {
	rawURL := ytThumbURL(videoID, qualityID)

	resp, err := http.Get(rawURL)
	if err != nil {
		return "", fmt.Errorf("fetch failed: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("HTTP %d for quality %s", resp.StatusCode, qualityID)
	}

	if resp.ContentLength > 0 && resp.ContentLength < 1000 {
		return "", fmt.Errorf("quality %s not available (placeholder image)", qualityID)
	}

	filename := fmt.Sprintf("%s-%s.jpg", videoID, qualityID)
	path := filepath.Join(outDir, filename)

	f, err := os.Create(path)
	if err != nil {
		return "", fmt.Errorf("create file: %w", err)
	}
	defer f.Close()

	written, err := io.Copy(f, resp.Body)
	if err != nil {
		return "", fmt.Errorf("write file: %w", err)
	}

	if written < 1000 {
		os.Remove(path)
		return "", fmt.Errorf("quality %s not available (too small: %d bytes)", qualityID, written)
	}

	return path, nil
}

func ytValidQualityIDs() string {
	ids := make([]string, len(ytQualities))
	for i, q := range ytQualities {
		ids[i] = q.id
	}
	return strings.Join(ids, ", ")
}
