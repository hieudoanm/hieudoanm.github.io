package image

import (
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
