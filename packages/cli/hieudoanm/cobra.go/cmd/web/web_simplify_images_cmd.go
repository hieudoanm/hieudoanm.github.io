package web

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

func newSimplifyImagesCmd() *cobra.Command {
	var url string
	var out string
	var imgIndex int
	var imgJSON bool

	cmd := &cobra.Command{
		Use:   "images --url <url>",
		Short: "Download images from a webpage",
		Long: `Download images from a webpage, with special support for Instagram posts, reels, and carousels.

Supports Instagram URL shortcodes and direct image extraction from embedded JSON data.`,
		Example: `  web simplify images --url https://www.instagram.com/p/DZryVwRlByZ/
  web simplify images --url https://www.instagram.com/p/DZryVwRlByZ/ --index 1
  web simplify images --url DZryVwRlByZ --out ./downloads
  web simplify images --url DZryVwRlByZ --json`,
		RunE: func(cmd *cobra.Command, args []string) error {
			if url == "" {
				return fmt.Errorf("url is required")
			}

			if out == "" {
				out = "."
			}

			if _, err := os.Stat(out); os.IsNotExist(err) {
				if err := os.MkdirAll(out, 0o755); err != nil {
					return fmt.Errorf("create output dir: %w", err)
				}
			}

			shortcode, err := extractShortcode(url)
			if err != nil {
				return err
			}

			html, err := fetchIGPage(shortcode)
			if err != nil {
				return err
			}

			imageURLs := scrapeImages(html)
			if len(imageURLs) == 0 {
				return fmt.Errorf("no images found in post %s", shortcode)
			}

			if imgJSON {
				return outputImagesJSON(shortcode, imageURLs)
			}

			if imgIndex > 0 {
				if imgIndex > len(imageURLs) {
					return fmt.Errorf("index %d out of range (found %d images)", imgIndex, len(imageURLs))
				}
				imageURLs = []string{imageURLs[imgIndex-1]}
			}

			downloaded := downloadImages(shortcode, imageURLs, imgIndex, out)
			fmt.Printf("\nDone. %d image(s) saved to %s\n", downloaded, out)
			return nil
		},
	}

	cmd.Flags().StringVarP(&url, "url", "u", "", "Instagram post URL or shortcode")
	cmd.MarkFlagRequired("url")
	cmd.Flags().StringVarP(&out, "out", "o", "", "Output directory (default .)")
	cmd.Flags().IntVarP(&imgIndex, "index", "i", 0, "Specific image index to download (1-based)")
	cmd.Flags().BoolVar(&imgJSON, "json", false, "Output in JSON format")
	return cmd
}
