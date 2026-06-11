package hash

import (
	"crypto/md5"
	"crypto/sha1"
	"crypto/sha256"
	"crypto/sha512"
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

func NewCommand() *cobra.Command {
	var algorithm, file string

	cmd := &cobra.Command{
		Use:   "hash [text]",
		Short: "Generate cryptographic hashes of strings or files",
		Long:  `Generate MD5, SHA1, SHA256, or SHA512 hashes of text strings or file contents.`,
		Example: `  hash "hello world"
  hash --sha256 "hello"
  hash --sha512 --file document.pdf`,
		Args: cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			var input []byte
			if file != "" {
				var err error
				input, err = os.ReadFile(file)
				if err != nil {
					return err
				}
			} else if len(args) > 0 {
				input = []byte(args[0])
			} else {
				return fmt.Errorf("provide text argument or --file flag")
			}

			var hash string
			switch algorithm {
			case "md5":
				hash = fmt.Sprintf("%x", md5.Sum(input))
			case "sha1":
				hash = fmt.Sprintf("%x", sha1.Sum(input))
			case "sha256":
				hash = fmt.Sprintf("%x", sha256.Sum256(input))
			case "sha512":
				hash = fmt.Sprintf("%x", sha512.Sum512(input))
			default:
				hash = fmt.Sprintf("%x", md5.Sum(input))
			}

			fmt.Println(hash)
			return nil
		},
	}

	cmd.Flags().StringVarP(&algorithm, "algorithm", "a", "md5", "Hash algorithm: md5, sha1, sha256, sha512")
	cmd.Flags().StringVarP(&file, "file", "f", "", "Hash file contents instead of text")
	return cmd
}
