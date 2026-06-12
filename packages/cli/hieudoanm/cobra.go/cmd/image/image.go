package image

import (
	"encoding/json"
	"fmt"
	"image"
	"image/gif"
	"image/jpeg"
	"image/png"
	"os"
	"path/filepath"
	"sort"
	"strings"

	"github.com/spf13/cobra"
	_ "golang.org/x/image/webp"
)

var jsonOutput bool

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "image",
		Short: "Image inspection and conversion tools",
		Long:  `Get image metadata, convert between formats, and extract dominant colors.`,
	}
	cmd.AddCommand(newInfoCmd())
	cmd.AddCommand(newConvertCmd())
	cmd.AddCommand(newDominantCmd())
	cmd.PersistentFlags().BoolVar(&jsonOutput, "json", false, "Output in JSON format")
	return cmd
}

func newInfoCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "info <file>",
		Short: "Show image metadata (dimensions, format, etc.)",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			f, err := os.Open(args[0])
			if err != nil {
				return err
			}
			defer f.Close()

			cfg, format, err := image.DecodeConfig(f)
			if err != nil {
				return fmt.Errorf("not a recognized image: %w", err)
			}

			stat, _ := os.Stat(args[0])

			if jsonOutput {
				b, _ := json.MarshalIndent(map[string]interface{}{
					"file":   args[0],
					"format": format,
					"width":  cfg.Width,
					"height": cfg.Height,
					"sizeKB": stat.Size() / 1024,
				}, "", "  ")
				fmt.Println(string(b))
			} else {
				fmt.Printf("File     : %s\n", args[0])
				fmt.Printf("Format   : %s\n", format)
				fmt.Printf("Width    : %d px\n", cfg.Width)
				fmt.Printf("Height   : %d px\n", cfg.Height)
				fmt.Printf("Size     : %d KB\n", stat.Size()/1024)
				if cfg.ColorModel != nil {
					fmt.Printf("Color    : %s\n", cfg.ColorModel)
				}
			}
			return nil
		},
	}
}

func newConvertCmd() *cobra.Command {
	var output, toFormat string
	cmd := &cobra.Command{
		Use:   "convert <file>",
		Short: "Convert image to another format",
		Example: `  image convert photo.jpg --format png
  image convert photo.png --format jpg --output photo.jpg`,
		Args: cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			f, err := os.Open(args[0])
			if err != nil {
				return err
			}
			defer f.Close()

			img, _, err := image.Decode(f)
			if err != nil {
				return fmt.Errorf("decode error: %w", err)
			}
			f.Close()

			if output == "" {
				base := strings.TrimSuffix(args[0], filepath.Ext(args[0]))
				output = base + "." + toFormat
			}

			out, err := os.Create(output)
			if err != nil {
				return err
			}
			defer out.Close()

			switch toFormat {
			case "png":
				err = png.Encode(out, img)
			case "jpg", "jpeg":
				err = jpeg.Encode(out, img, nil)
			case "gif":
				err = gif.Encode(out, img, nil)
			default:
				return fmt.Errorf("unsupported format: %s (use png, jpg, gif)", toFormat)
			}
			if err != nil {
				return err
			}
			fmt.Printf("Converted to %s\n", output)
			return nil
		},
	}
	cmd.Flags().StringVarP(&toFormat, "format", "f", "png", "Output format (png, jpg, gif)")
	cmd.Flags().StringVarP(&output, "output", "o", "", "Output file path")
	return cmd
}

func newDominantCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "dominant <file>",
		Short: "Extract dominant color from an image",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			f, err := os.Open(args[0])
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

			count := 0
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
				fmt.Printf("Dominant colors for %s:\n", args[0])
				fmt.Println()
				for _, e := range entries {
					fmt.Printf("  %s  %.1f%%\n", e.Hex, e.Pct)
				}
			}
			return nil
		},
	}
}
