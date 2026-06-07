package youtube

import (
	"encoding/json"
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

func newYoutubeThumbnailsCmd() *cobra.Command {
	var url string
	cmd := &cobra.Command{
		Use:   "thumbnails [--url <video-url-or-id>]",
		Short: "Download YouTube video thumbnails",
		Long: `Download all available thumbnail qualities for a YouTube video.

Accepts any of:
  - Full URL:   https://www.youtube.com/watch?v=dQw4w9WgXcQ
  - Short URL:  https://youtu.be/dQw4w9WgXcQ
  - Embed URL:  https://www.youtube.com/embed/dQw4w9WgXcQ
  - Shorts URL: https://www.youtube.com/shorts/dQw4w9WgXcQ
  - Raw ID:     dQw4w9WgXcQ`,
		Example: `  web youtube thumbnails --url dQw4w9WgXcQ
  web youtube thumbnails --url dQw4w9WgXcQ --quality hqdefault
  web youtube thumbnails --url dQw4w9WgXcQ --output ./thumbs
  web youtube thumbnails --url dQw4w9WgXcQ --all`,
		RunE: func(cmd *cobra.Command, args []string) error {
			input := url

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
				var found bool
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

			var downloaded int
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

	cmd.Flags().StringVarP(&url, "url", "u", "", "Video URL or ID")
	cmd.Flags().StringP("quality", "q", "", fmt.Sprintf("specific quality to download (%s)", ytValidQualityIDs()))
	cmd.Flags().StringP("output", "o", ".", "output directory")
	cmd.Flags().BoolP("all", "a", false, "download all quality variants")
	cmd.Flags().BoolP("list", "l", false, "list thumbnail URLs without downloading")
	cmd.Flags().Bool("json", false, "Output in JSON format (with --list)")
	return cmd
}
