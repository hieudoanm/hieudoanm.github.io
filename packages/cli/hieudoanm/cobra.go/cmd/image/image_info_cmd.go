package image

import (
	"encoding/json"
	"fmt"
	"image"
	"os"

	"github.com/spf13/cobra"
)

func newInfoCmd() *cobra.Command {
	var file string
	cmd := &cobra.Command{
		Use:   "info [--file <file>]",
		Short: "Show image metadata (dimensions, format, etc.)",
		Long:  `Display detailed metadata for an image file including dimensions (width/height), file format, file size on disk, and color model information.`,
		Example: `  image info --file photo.jpg
  image info -f logo.png
  image info --file screenshot.png --json`,
		RunE: func(cmd *cobra.Command, args []string) error {
			f, err := os.Open(file)
			if err != nil {
				return err
			}
			defer f.Close()

			cfg, format, err := image.DecodeConfig(f)
			if err != nil {
				return fmt.Errorf("not a recognized image: %w", err)
			}

			stat, _ := os.Stat(file)

			if jsonOutput {
				b, _ := json.MarshalIndent(map[string]interface{}{
					"file":   file,
					"format": format,
					"width":  cfg.Width,
					"height": cfg.Height,
					"sizeKB": stat.Size() / 1024,
				}, "", "  ")
				fmt.Println(string(b))
			} else {
				fmt.Printf("File     : %s\n", file)
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

	cmd.Flags().StringVarP(&file, "file", "f", "", "Image file")
	return cmd
}
