package image

import (
	"encoding/json"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"strings"

	"github.com/spf13/cobra"
)

func newIconsCmd() *cobra.Command {
	var svgFile string
	var sizes []int

	cmd := &cobra.Command{
		Use:   "icons --svg <file>",
		Short: "Generate PNG icons from SVG at multiple sizes",
		Long: `Generate a set of PNG icon files from a single SVG source at the specified dimensions.

Each output file is named {filename}-{size}x{size}.png (e.g., logo-16x16.png, logo-256x256.png).
Requires rsvg-convert (librsvg) to be installed on the system.`,
		Example: `  image icons --svg icon.svg
  image icons --svg icon.svg --sizes 16,32,48,64,128,256
  image icons -i icon.svg --sizes 16,256,512`,
		RunE: func(cmd *cobra.Command, args []string) error {
			if svgFile == "" {
				return fmt.Errorf("--svg flag is required")
			}

			if _, err := exec.LookPath("rsvg-convert"); err != nil {
				return fmt.Errorf("rsvg-convert not found: install librsvg (brew install librsvg / apt install librsvg2-bin)")
			}

			if _, err := os.Stat(svgFile); err != nil {
				return fmt.Errorf("svg file not found: %w", err)
			}

			base := strings.TrimSuffix(filepath.Base(svgFile), filepath.Ext(svgFile))

			var created []string
			for _, s := range sizes {
				outName := fmt.Sprintf("%s-%dx%d.png", base, s, s)

				cmdExec := exec.Command("rsvg-convert",
					"-w", fmt.Sprintf("%d", s),
					"-h", fmt.Sprintf("%d", s),
					"-o", outName,
					svgFile,
				)
				cmdExec.Stderr = os.Stderr

				if err := cmdExec.Run(); err != nil {
					return fmt.Errorf("failed to generate %s: %w", outName, err)
				}

				created = append(created, outName)

				if ok, _ := cmd.Flags().GetBool("json"); ok {
					continue
				}
				fmt.Printf("Created %s (%dx%d)\n", outName, s, s)
			}

			if ok, _ := cmd.Flags().GetBool("json"); ok {
				b, _ := json.MarshalIndent(map[string]interface{}{
					"svg":   svgFile,
					"sizes": sizes,
					"files": created,
				}, "", "  ")
				fmt.Println(string(b))
			}

			return nil
		},
	}

	cmd.Flags().StringVarP(&svgFile, "svg", "i", "", "Input SVG file")
	cmd.Flags().IntSliceVar(&sizes, "sizes", []int{16, 32, 48, 64, 96, 128, 144, 152, 192, 256, 384, 512}, "Icon sizes in pixels")

	return cmd
}
