package info

import (
	"encoding/json"
	"fmt"
	"image"
	_ "image/gif"
	_ "image/jpeg"
	_ "image/png"
	"os"
	"strings"

	"github.com/spf13/cobra"
)

type metadata struct {
	Format string `json:"format"`
	Width  int    `json:"width"`
	Height int    `json:"height"`
	Size   int64  `json:"size_bytes"`
}

func NewCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "info <file>",
		Short: "Show image metadata",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			return runInfo(args[0])
		},
	}
}

func runInfo(path string) error {
	f, err := os.Open(path)
	if err != nil {
		return fmt.Errorf("open: %w", err)
	}
	defer f.Close()

	img, format, err := image.Decode(f)
	if err != nil {
		return fmt.Errorf("decode: %w", err)
	}

	info, _ := os.Stat(path)

	meta := metadata{
		Format: strings.ToUpper(format),
		Width:  img.Bounds().Dx(),
		Height: img.Bounds().Dy(),
		Size:   info.Size(),
	}

	jsonOut, _ := json.Marshal(meta)
	fmt.Println(string(jsonOut))
	return nil
}
