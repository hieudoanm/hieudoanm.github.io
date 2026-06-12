package web

import (
	"encoding/json"
	"fmt"
	"net/url"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/hieudoanm/hieudoanm/libs/browser"
	"github.com/spf13/cobra"
)

func newSnapshotCmd() *cobra.Command {
	var (
		flagOutput   string
		flagWidth    int
		flagHeight   int
		flagPreset   string
		flagFullPage bool
		flagDelay    time.Duration
		flagPDF      bool
		flagQuality  int
		flagVerbose  bool
		flagJSON     bool
	)

	cmd := &cobra.Command{
		Use:   "snapshot <url>",
		Short: "Take a screenshot of a web page",
		Long: `Take a full or viewport screenshot of a given URL.
The output file is saved as PNG (default) or PDF.
If --output is a directory, the filename is derived from the URL hostname + timestamp.`,
		Args: cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			rawURL := args[0]
			if !strings.HasPrefix(rawURL, "http://") && !strings.HasPrefix(rawURL, "https://") {
				rawURL = "https://" + rawURL
			}

			opts := browser.DefaultOptions()

			if p, ok := browser.Presets[flagPreset]; ok {
				opts.Width = p.Width
				opts.Height = p.Height
			}
			if flagWidth > 0 {
				opts.Width = flagWidth
			}
			if flagHeight > 0 {
				opts.Height = flagHeight
			}
			opts.FullPage = flagFullPage
			opts.Delay = flagDelay
			opts.PDF = flagPDF
			opts.Quality = flagQuality

			var outPath string
			var err error

			if flagOutput == "" {
				outPath, err = defaultSnapshotPath(rawURL, flagPDF)
			} else {
				outPath, err = resolveOutput(flagOutput, rawURL, flagPDF)
			}

			if err != nil {
				return err
			}

			ext := "PNG"
			if flagPDF {
				ext = "PDF"
			}

			start := time.Now()
			data, err := browser.Capture(rawURL, opts)
			if err != nil {
				return fmt.Errorf("capture failed: %w", err)
			}
			elapsed := time.Since(start)

			if err := os.WriteFile(outPath, data, 0644); err != nil {
				return fmt.Errorf("writing file: %w", err)
			}

			if flagJSON {
				out, _ := json.MarshalIndent(map[string]interface{}{
					"url":       rawURL,
					"file":      outPath,
					"size_kb":   len(data) / 1024,
					"time_sec":  fmt.Sprintf("%.1f", elapsed.Seconds()),
					"format":    ext,
					"viewport":  fmt.Sprintf("%dx%d", opts.Width, opts.Height),
					"full_page": opts.FullPage,
				}, "", "  ")
				fmt.Println(string(out))
			} else {
				fmt.Printf("Capturing %s\n", rawURL)
				if flagVerbose {
					fmt.Printf("    Viewport : %dx%d\n", opts.Width, opts.Height)
					fmt.Printf("    Full page: %v\n", opts.FullPage)
					fmt.Printf("    Format   : %s\n", ext)
					if opts.Delay > 0 {
						fmt.Printf("    Delay    : %s\n", opts.Delay)
					}
				}
				fmt.Printf("Saved -> %s\n", outPath)
				if flagVerbose {
					fmt.Printf("    Size: %d KB | Time: %.1fs\n", len(data)/1024, elapsed.Seconds())
				}
			}

			return nil
		},
	}

	cmd.Flags().StringVarP(&flagOutput, "output", "o", "", "Output file or directory")
	cmd.Flags().IntVar(&flagWidth, "width", 0, "Viewport width (overrides --preset)")
	cmd.Flags().IntVar(&flagHeight, "height", 0, "Viewport height (overrides --preset)")
	cmd.Flags().StringVar(&flagPreset, "preset", "desktop", "Viewport preset: desktop|laptop|tablet|mobile|hd|4k")
	cmd.Flags().BoolVar(&flagFullPage, "full-page", false, "Capture full scrollable page")
	cmd.Flags().DurationVar(&flagDelay, "delay", 0, "Wait before capturing (e.g. 500ms, 2s)")
	cmd.Flags().BoolVar(&flagPDF, "pdf", false, "Save as PDF instead of PNG")
	cmd.Flags().IntVar(&flagQuality, "quality", 90, "Screenshot quality 1-100 (JPEG only)")
	cmd.Flags().BoolVarP(&flagVerbose, "verbose", "v", false, "Print extra info")
	cmd.Flags().BoolVar(&flagJSON, "json", false, "Output in JSON format")
	return cmd
}

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
