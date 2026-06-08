package youtube

import (
	"fmt"
	"io"
	"net/http"
	"net/url"
	"os"
	"path/filepath"
	"regexp"
	"strings"

	"github.com/spf13/cobra"
)

/* ------------------------------------------------------------------ */
/* Qualities                                                            */
/* ------------------------------------------------------------------ */

type quality struct {
	id         string
	label      string
	resolution string
}

var qualities = []quality{
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

/* ------------------------------------------------------------------ */
/* Helpers                                                              */
/* ------------------------------------------------------------------ */

var videoIDPatterns = []*regexp.Regexp{
	regexp.MustCompile(`(?:youtube\.com/watch\?.*v=)([a-zA-Z0-9_-]{11})`),
	regexp.MustCompile(`(?:youtu\.be/)([a-zA-Z0-9_-]{11})`),
	regexp.MustCompile(`(?:youtube\.com/embed/)([a-zA-Z0-9_-]{11})`),
	regexp.MustCompile(`(?:youtube\.com/shorts/)([a-zA-Z0-9_-]{11})`),
	regexp.MustCompile(`^([a-zA-Z0-9_-]{11})$`),
}

func extractVideoID(input string) (string, error) {
	input = strings.TrimSpace(input)
	for _, re := range videoIDPatterns {
		if m := re.FindStringSubmatch(input); len(m) > 1 {
			return m[1], nil
		}
	}
	return "", fmt.Errorf("could not extract video ID from: %s", input)
}

func thumbURL(videoID, qualityID string) string {
	return fmt.Sprintf("https://img.youtube.com/vi/%s/%s.jpg", videoID, qualityID)
}

func downloadThumb(videoID, qualityID, outDir string) (string, error) {
	rawURL := thumbURL(videoID, qualityID)

	resp, err := http.Get(rawURL)
	if err != nil {
		return "", fmt.Errorf("fetch failed: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("HTTP %d for quality %s", resp.StatusCode, qualityID)
	}

	// YouTube returns a 1×1 grey pixel for missing qualities — skip those
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

	// Double-check after writing — some servers omit Content-Length
	if written < 1000 {
		os.Remove(path)
		return "", fmt.Errorf("quality %s not available (too small: %d bytes)", qualityID, written)
	}

	return path, nil
}

/* ------------------------------------------------------------------ */
/* Command                                                              */
/* ------------------------------------------------------------------ */

var youtubeThumbnailsCmd = &cobra.Command{
	Use:   "thumbnails [video-url-or-id]",
	Short: "Download YouTube video thumbnails",
	Long: `Download all available thumbnail qualities for a YouTube video.

Accepts any of:
  - Full URL:   https://www.youtube.com/watch?v=dQw4w9WgXcQ
  - Short URL:  https://youtu.be/dQw4w9WgXcQ
  - Embed URL:  https://www.youtube.com/embed/dQw4w9WgXcQ
  - Shorts URL: https://www.youtube.com/shorts/dQw4w9WgXcQ
  - Raw ID:     dQw4w9WgXcQ

Examples:
  devtools youtube thumbnails https://www.youtube.com/watch?v=dQw4w9WgXcQ
  devtools youtube thumbnails dQw4w9WgXcQ --quality hqdefault
  devtools youtube thumbnails dQw4w9WgXcQ --output ./thumbs
  devtools youtube thumbnails dQw4w9WgXcQ --all`,
	Args: cobra.ExactArgs(1),
	RunE: func(cmd *cobra.Command, args []string) error {
		input := args[0]

		// Flags
		qualityFlag, _ := cmd.Flags().GetString("quality")
		outputDir, _ := cmd.Flags().GetString("output")
		downloadAll, _ := cmd.Flags().GetBool("all")
		listOnly, _ := cmd.Flags().GetBool("list")

		// Extract video ID
		videoID, err := extractVideoID(input)
		if err != nil {
			return err
		}
		fmt.Printf("Video ID: %s\n\n", videoID)

		// --list: just print URLs
		if listOnly {
			fmt.Println("Available thumbnail URLs:")
			for _, q := range qualities {
				fmt.Printf("  %-18s %-12s %s\n", q.id, q.resolution, thumbURL(videoID, q.id))
			}
			return nil
		}

		// Resolve output directory
		if outputDir == "" {
			outputDir = "."
		}
		if err := os.MkdirAll(outputDir, 0o755); err != nil {
			return fmt.Errorf("create output dir: %w", err)
		}

		// Determine which qualities to download
		var targets []quality
		switch {
		case downloadAll:
			targets = qualities
		case qualityFlag != "":
			found := false
			for _, q := range qualities {
				if q.id == qualityFlag {
					targets = []quality{q}
					found = true
					break
				}
			}
			if !found {
				return fmt.Errorf("unknown quality %q — valid values: %s",
					qualityFlag, validQualityIDs())
			}
		default:
			// Default: maxresdefault → hqdefault → sddefault (first that works)
			targets = qualities[:3]
		}

		// Download
		downloaded := 0
		for _, q := range targets {
			fmt.Printf("  Downloading %-18s (%s) ... ", q.id, q.resolution)
			path, err := downloadThumb(videoID, q.id, outputDir)
			if err != nil {
				fmt.Printf("skipped (%s)\n", err)
				continue
			}
			fmt.Printf("saved → %s\n", path)
			downloaded++
		}

		fmt.Printf("\nDone. %d thumbnail(s) saved to %s\n", downloaded, outputDir)
		return nil
	},
}

func validQualityIDs() string {
	ids := make([]string, len(qualities))
	for i, q := range qualities {
		ids[i] = q.id
	}
	return strings.Join(ids, ", ")
}

// suppress unused import if url is not used elsewhere
var _ = url.QueryEscape

func init() {
	youtubeThumbnailsCmd.Flags().StringP("quality", "q", "", fmt.Sprintf("specific quality to download (%s)", validQualityIDs()))
	youtubeThumbnailsCmd.Flags().StringP("output", "o", ".", "output directory")
	youtubeThumbnailsCmd.Flags().BoolP("all", "a", false, "download all quality variants")
	youtubeThumbnailsCmd.Flags().BoolP("list", "l", false, "list thumbnail URLs without downloading")
}
