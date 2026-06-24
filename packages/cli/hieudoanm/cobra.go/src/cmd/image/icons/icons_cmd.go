package icons

import (
	"fmt"
	"image"
	"image/png"
	"os"
	"path/filepath"
	"strings"

	"github.com/spf13/cobra"
	"golang.org/x/image/draw"
)

var sizes []int

func NewCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "icons <file>",
		Short: "Generate app icons in multiple sizes",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			return runIcons(args[0])
		},
	}
	cmd.Flags().IntSliceVarP(&sizes, "sizes", "s", []int{192, 512}, "Icon sizes to generate")
	return cmd
}

func runIcons(inputPath string) error {
	srcFile, err := os.Open(inputPath)
	if err != nil {
		return fmt.Errorf("open %s: %w", inputPath, err)
	}
	defer srcFile.Close()

	srcImg, _, err := image.Decode(srcFile)
	if err != nil {
		return fmt.Errorf("decode %s: %w", inputPath, err)
	}

	baseDir := filepath.Dir(inputPath)
	ext := filepath.Ext(inputPath)
	base := strings.TrimSuffix(filepath.Base(inputPath), ext)

	for _, size := range sizes {
		outPath := filepath.Join(baseDir, fmt.Sprintf("%s-%d.png", base, size))

		dst := image.NewRGBA(image.Rect(0, 0, size, size))
		draw.ApproxBiLinear.Scale(dst, dst.Bounds(), srcImg, srcImg.Bounds(), draw.Over, nil)

		dstFile, err := os.Create(outPath)
		if err != nil {
			return fmt.Errorf("create %s: %w", outPath, err)
		}

		if err := png.Encode(dstFile, dst); err != nil {
			dstFile.Close()
			return fmt.Errorf("encode %s: %w", outPath, err)
		}
		dstFile.Close()

		fmt.Printf("generated %s\n", outPath)
	}
	return nil
}
