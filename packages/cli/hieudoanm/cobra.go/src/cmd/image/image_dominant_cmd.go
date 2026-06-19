package image

import (
	"encoding/json"
	"fmt"
	"image"
	"os"
	"sort"

	"github.com/spf13/cobra"
	_ "golang.org/x/image/webp"
)

func newDominantCmd() *cobra.Command {
	var file string
	cmd := &cobra.Command{
		Use:   "dominant [--file <file>]",
		Short: "Extract dominant color from an image",
		Long:  `Analyze an image and extract its top 5 dominant colors by sampling pixels. Each color is returned as a hex code with its percentage of the sampled pixels.`,
		Example: `  image dominant --file photo.jpg
  image dominant -f logo.png
  image dominant --file wallpaper.jpg --json`,
		RunE: func(cmd *cobra.Command, args []string) error {
			f, err := os.Open(file)
			if err != nil {
				return err
			}
			defer f.Close()

			img, _, err := image.Decode(f)
			if err != nil {
				return fmt.Errorf("decode error: %w", err)
			}

			bounds := img.Bounds()
			colorCount := make(map[string]int)
			w := bounds.Max.X - bounds.Min.X
			h := bounds.Max.Y - bounds.Min.Y
			totalPixels := w * h
			step := max(1, totalPixels/10000)

			var count int
			for y := bounds.Min.Y; y < bounds.Max.Y; y++ {
				for x := bounds.Min.X; x < bounds.Max.X; x++ {
					count++
					if count%step != 0 {
						continue
					}
					r, g, b, _ := img.At(x, y).RGBA()
					key := fmt.Sprintf("#%02x%02x%02x", r/257, g/257, b/257)
					colorCount[key]++
				}
			}

			type colorEntry struct {
				Hex   string  `json:"hex"`
				Pct   float64 `json:"percentage"`
				count int
			}
			var entries []colorEntry
			for hex, c := range colorCount {
				entries = append(entries, colorEntry{Hex: hex, count: c})
			}
			sort.Slice(entries, func(i, j int) bool {
				return entries[i].count > entries[j].count
			})

			sampled := max(1, count/step)
			for i := range entries {
				entries[i].Pct = float64(entries[i].count) * 100 / float64(sampled)
			}

			maxEntries := 5
			if len(entries) < maxEntries {
				maxEntries = len(entries)
			}
			entries = entries[:maxEntries]

			if jsonOutput {
				b, _ := json.MarshalIndent(entries, "", "  ")
				fmt.Println(string(b))
			} else {
				fmt.Printf("Dominant colors for %s:\n", file)
				fmt.Println()
				for _, e := range entries {
					fmt.Printf("  %s  %.1f%%\n", e.Hex, e.Pct)
				}
			}
			return nil
		},
	}

	cmd.Flags().StringVarP(&file, "file", "f", "", "Image file")
	return cmd
}
