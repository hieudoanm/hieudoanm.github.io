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
	"strings"

	"github.com/spf13/cobra"
)

func newConvertCmd() *cobra.Command {
	var file, output, toFormat string
	cmd := &cobra.Command{
		Use:   "convert [--file <file>]",
		Short: "Convert image to another format",
		Long:  `Convert an image file from one format to another. Supports PNG, JPEG/JPG, and GIF output formats.`,
		Example: `  image convert --file photo.jpg --format png
  image convert --file photo.png --format jpg --output photo.jpg`,
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
			f.Close()

			if output == "" {
				base := strings.TrimSuffix(file, filepath.Ext(file))
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

			if ok, _ := cmd.Flags().GetBool("json"); ok {
				b, _ := json.MarshalIndent(map[string]interface{}{
					"input":  file,
					"output": output,
					"format": toFormat,
				}, "", "  ")
				fmt.Println(string(b))
			} else {
				fmt.Printf("Converted to %s\n", output)
			}
			return nil
		},
	}
	cmd.Flags().StringVarP(&file, "file", "i", "", "Input image file")
	cmd.Flags().StringVarP(&toFormat, "format", "f", "png", "Output format (png, jpg, gif)")
	cmd.Flags().StringVarP(&output, "output", "o", "", "Output file path")
	return cmd
}
