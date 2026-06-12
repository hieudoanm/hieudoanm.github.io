package hash

import (
	"bufio"
	"crypto/hmac"
	"crypto/md5"
	"crypto/sha1"
	"crypto/sha256"
	"crypto/sha512"
	"encoding/hex"
	"fmt"
	"hash"
	"os"
	"strings"

	"github.com/spf13/cobra"
)

func NewCommand() *cobra.Command {
	var algorithm, file, key string
	var hmacFlag, check bool

	cmd := &cobra.Command{
		Use:   "hash [text]",
		Short: "Generate cryptographic hashes of strings or files",
		Long:  `Generate MD5, SHA1, SHA256, SHA512 hashes or HMACs of text strings or file contents.`,
		Example: `  hash "hello world"
  hash --sha256 "hello"
  hash --sha512 --file document.pdf
  hash --hmac --key mysecret "message"
  hash --check checksums.txt`,
		Args: cobra.MaximumNArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			if check {
				return checkHashes(file)
			}

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

			var h hash.Hash
			switch algorithm {
			case "md5":
				h = md5.New()
			case "sha1":
				h = sha1.New()
			case "sha256":
				h = sha256.New()
			case "sha512":
				h = sha512.New()
			default:
				h = sha256.New()
			}

			if hmacFlag {
				if key == "" {
					return fmt.Errorf("--key is required for HMAC")
				}
				h = hmac.New(func() hash.Hash {
					switch algorithm {
					case "md5":
						return md5.New()
					case "sha1":
						return sha1.New()
					case "sha256":
						return sha256.New()
					case "sha512":
						return sha512.New()
					default:
						return sha256.New()
					}
				}, []byte(key))
			}

			h.Write(input)
			fmt.Println(hex.EncodeToString(h.Sum(nil)))
			return nil
		},
	}

	cmd.Flags().StringVarP(&algorithm, "algorithm", "a", "sha256", "Hash algorithm: md5, sha1, sha256, sha512")
	cmd.Flags().StringVarP(&file, "file", "f", "", "Hash file contents instead of text")
	cmd.Flags().BoolVar(&hmacFlag, "hmac", false, "Compute HMAC instead of plain hash")
	cmd.Flags().StringVarP(&key, "key", "k", "", "Key for HMAC")
	cmd.Flags().BoolVar(&check, "check", false, "Verify checksums from a file (format: hash <space> filename)")
	return cmd
}

func checkHashes(path string) error {
	f, err := os.Open(path)
	if err != nil {
		return err
	}
	defer f.Close()

	scanner := bufio.NewScanner(f)
	errors := 0
	checked := 0

	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}

		parts := strings.SplitN(line, "  ", 2)
		if len(parts) != 2 {
			parts = strings.SplitN(line, " ", 2)
		}
		if len(parts) != 2 {
			continue
		}

		expectedHash := strings.TrimSpace(parts[0])
		filename := strings.TrimSpace(parts[1])

		data, err := os.ReadFile(filename)
		if err != nil {
			fmt.Printf("%s: FAILED (%v)\n", filename, err)
			errors++
			checked++
			continue
		}

		var h hash.Hash
		switch len(expectedHash) {
		case 32:
			h = md5.New()
		case 40:
			h = sha1.New()
		case 64:
			h = sha256.New()
		case 128:
			h = sha512.New()
		default:
			fmt.Printf("%s: unknown hash length\n", filename)
			errors++
			checked++
			continue
		}

		h.Write(data)
		got := hex.EncodeToString(h.Sum(nil))
		if got == expectedHash {
			fmt.Printf("%s: OK\n", filename)
		} else {
			fmt.Printf("%s: FAILED\n", filename)
			errors++
		}
		checked++
	}

	if err := scanner.Err(); err != nil {
		return err
	}

	if errors > 0 {
		return fmt.Errorf("%d of %d checksums failed", errors, checked)
	}
	return nil
}
