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

	"github.com/hieudoanm/hieudoanm/cmd/web/transcript"
	"github.com/spf13/cobra"
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

var ytThumbnailsCmd = &cobra.Command{
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

		qualityFlag, _ := cmd.Flags().GetString("quality")
		outputDir, _ := cmd.Flags().GetString("output")
		downloadAll, _ := cmd.Flags().GetBool("all")
		listOnly, _ := cmd.Flags().GetBool("list")
		ytJSON, _ := cmd.Flags().GetBool("json")

		videoID, err := ytExtractVideoID(input)
		if err != nil {
			return err
		}

		if listOnly {
			if ytJSON {
				type thumbEntry struct {
					ID         string `json:"id"`
					Resolution string `json:"resolution"`
					URL        string `json:"url"`
				}
				var entries []thumbEntry
				for _, q := range ytQualities {
					entries = append(entries, thumbEntry{
						ID:         q.id,
						Resolution: q.resolution,
						URL:        ytThumbURL(videoID, q.id),
					})
				}
				b, _ := json.MarshalIndent(map[string]interface{}{
					"video_id":   videoID,
					"thumbnails": entries,
				}, "", "  ")
				fmt.Println(string(b))
			} else {
				fmt.Printf("Video ID: %s\n\n", videoID)
				fmt.Println("Available thumbnail URLs:")
				for _, q := range ytQualities {
					fmt.Printf("  %-18s %-12s %s\n", q.id, q.resolution, ytThumbURL(videoID, q.id))
				}
			}
			return nil
		}
		fmt.Printf("Video ID: %s\n\n", videoID)

		if outputDir == "" {
			outputDir = "."
		}
		if err := os.MkdirAll(outputDir, 0o755); err != nil {
			return fmt.Errorf("create output dir: %w", err)
		}

		var targets []ytQuality
		switch {
		case downloadAll:
			targets = ytQualities
		case qualityFlag != "":
			found := false
			for _, q := range ytQualities {
				if q.id == qualityFlag {
					targets = []ytQuality{q}
					found = true
					break
				}
			}
			if !found {
				return fmt.Errorf("unknown quality %q — valid values: %s",
					qualityFlag, ytValidQualityIDs())
			}
		default:
			targets = ytQualities[:3]
		}

		downloaded := 0
		for _, q := range targets {
			fmt.Printf("  Downloading %-18s (%s) ... ", q.id, q.resolution)
			path, err := ytDownloadThumb(videoID, q.id, outputDir)
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

var (
	ytLang       string
	ytOutputFile string
	ytFormat     string
	ytNoTS       bool
)

var ytTranscriptCmd = &cobra.Command{
	Use:   "fetch <video-id-or-url>",
	Short: "Fetch YouTube video transcript",
	Args:  cobra.ExactArgs(1),
	RunE: func(cmd *cobra.Command, args []string) error {
		videoID, err := ytExtractVideoID(args[0])
		if err != nil {
			return err
		}

		client := transcript.NewClient()
		t, err := client.Fetch(videoID, ytLang)
		if err != nil {
			return err
		}

		fmt.Fprintf(os.Stderr, "✓ %s (%s, %s)\n", videoID, t.Language, t.Kind)

		var out string
		switch strings.ToLower(ytFormat) {
		case "json":
			b, _ := json.MarshalIndent(t, "", "  ")
			out = string(b)
		default:
			var sb strings.Builder
			for _, line := range t.Lines {
				if ytNoTS {
					sb.WriteString(line.Text + "\n")
				} else {
					sb.WriteString(fmt.Sprintf("[%6.2fs] %s\n", line.Start, line.Text))
				}
			}
			out = sb.String()
		}

		if ytOutputFile != "" {
			return os.WriteFile(ytOutputFile, []byte(out), 0644)
		}
		fmt.Print(out)
		return nil
	},
}

func newYoutubeCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "youtube",
		Short: "YouTube CLI application (devtools)",
		Long: `The youtube CLI application is a comprehensive backend utility belonging to the devtools suite of tools.

Use this root executable to manage configuring, running, and interacting with all youtube-related operations securely and efficiently from your terminal.`,
	}

	cmd.AddCommand(ytThumbnailsCmd)
	cmd.AddCommand(ytTranscriptCmd)

	return cmd
}

func init() {
	ytThumbnailsCmd.Flags().StringP("quality", "q", "", fmt.Sprintf("specific quality to download (%s)", ytValidQualityIDs()))
	ytThumbnailsCmd.Flags().StringP("output", "o", ".", "output directory")
	ytThumbnailsCmd.Flags().BoolP("all", "a", false, "download all quality variants")
	ytThumbnailsCmd.Flags().BoolP("list", "l", false, "list thumbnail URLs without downloading")
	ytThumbnailsCmd.Flags().Bool("json", false, "Output in JSON format (with --list)")

	ytTranscriptCmd.Flags().StringVarP(&ytLang, "lang", "l", "en", "Language code (e.g. en, es, fr)")
	ytTranscriptCmd.Flags().StringVarP(&ytOutputFile, "output", "o", "", "Save to file instead of stdout")
	ytTranscriptCmd.Flags().StringVarP(&ytFormat, "format", "f", "text", "Output format: text or json")
	ytTranscriptCmd.Flags().BoolVar(&ytNoTS, "no-timestamps", false, "Omit timestamps from text output")
}
