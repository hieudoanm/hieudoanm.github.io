package file

import (
	"crypto/md5"
	"crypto/sha1"
	"crypto/sha256"
	"crypto/sha512"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io"
	"os"

	"github.com/spf13/cobra"
)

func newChecksumCmd() *cobra.Command {
	var algorithm, filePath string
	cmd := &cobra.Command{
		Use:   "checksum [--file <path>]",
		Short: "Compute file checksum",
		Example: `  file checksum --file document.pdf
  file checksum --algorithm sha256 --file document.pdf
  file checksum -f document.pdf --algorithm sha256`,
		RunE: func(cmd *cobra.Command, args []string) error {
			f, err := os.Open(filePath)
			if err != nil {
				return err
			}
			defer f.Close()

			var hash string
			switch algorithm {
			case "md5":
				h := md5.New()
				io.Copy(h, f)
				hash = hex.EncodeToString(h.Sum(nil))
			case "sha1":
				h := sha1.New()
				io.Copy(h, f)
				hash = hex.EncodeToString(h.Sum(nil))
			case "sha256":
				h := sha256.New()
				io.Copy(h, f)
				hash = hex.EncodeToString(h.Sum(nil))
			case "sha512":
				h := sha512.New()
				io.Copy(h, f)
				hash = hex.EncodeToString(h.Sum(nil))
			default:
				h := sha256.New()
				io.Copy(h, f)
				hash = hex.EncodeToString(h.Sum(nil))
			}

			if jsonOutput {
				b, _ := json.MarshalIndent(map[string]string{
					"file":      filePath,
					"algorithm": algorithm,
					"hash":      hash,
				}, "", "  ")
				fmt.Println(string(b))
			} else {
				fmt.Printf("%s  %s\n", hash, filePath)
			}
			return nil
		},
	}
	cmd.Flags().StringVarP(&algorithm, "algorithm", "a", "sha256", "Hash algorithm: md5, sha1, sha256, sha512")
	cmd.Flags().StringVarP(&filePath, "file", "f", "", "File path")
	return cmd
}
