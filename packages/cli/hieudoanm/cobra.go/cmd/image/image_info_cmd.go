package image

import (
	"encoding/json"
	"fmt"
	"image"
	"os"

	"github.com/spf13/cobra"
)

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
