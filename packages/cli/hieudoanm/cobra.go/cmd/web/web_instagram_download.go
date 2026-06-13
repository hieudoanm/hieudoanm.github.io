package web

import (
	"encoding/json"
	"fmt"
	"os"

	"github.com/hieudoanm/hieudoanm/libs/colors"
	"github.com/spf13/cobra"
)

func outputIGJSON(shortcode string, imageURLs []string) {
	out, _ := json.MarshalIndent(map[string]interface{}{
		"shortcode":  shortcode,
		"image_urls": imageURLs,
		"count":      len(imageURLs),
	}, "", "  ")
	fmt.Println(string(out))
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

func newIGDownloadCmd() *cobra.Command {
	var igJSON bool
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

			html, err := fetchIGPage(shortcode, useProxy)
			if err != nil && !useProxy {
				html, err = fetchIGPage(shortcode, true)
			}
			if err != nil {
				return err
			}

			imageURLs := scrapeIGImages(html)
			if len(imageURLs) == 0 {
				return fmt.Errorf("no images found in post %s", shortcode)
			}

			if igJSON {
				outputIGJSON(shortcode, imageURLs)
				return nil
			}

			fmt.Printf("Shortcode: %s\n", colors.Cyan(shortcode))
			fmt.Printf("Found %d image candidates\n", len(imageURLs))

			if imgIndex > 0 {
				if imgIndex > len(imageURLs) {
					return fmt.Errorf("index %d out of range (found %d images)", imgIndex, len(imageURLs))
				}
				imageURLs = []string{imageURLs[imgIndex-1]}
				fmt.Printf("Selected image index %d\n", imgIndex)
			}

			if outputDir == "" {
				outputDir = "."
			}
			if err := os.MkdirAll(outputDir, 0o755); err != nil {
				return fmt.Errorf("create output dir: %w", err)
			}

			downloaded := downloadIGImages(shortcode, imageURLs, imgIndex, outputDir)
			fmt.Printf("\nDone. %d image(s) saved to %s\n", downloaded, outputDir)
			return nil
		},
	}

	cmd.Flags().StringP("output", "o", ".", "Output directory")
	cmd.Flags().IntP("index", "i", 0, "Specific image index to download (1-based)")
	cmd.Flags().BoolP("proxy", "p", false, "Use proxy to fetch content")
	cmd.Flags().BoolVar(&igJSON, "json", false, "Output in JSON format")
	return cmd
}
