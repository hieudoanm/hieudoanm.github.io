package jwt

import (
	"bytes"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/spf13/cobra"
)

func NewCommand() *cobra.Command {
	return &cobra.Command{
		Use:     "jwt <token>",
		Short:   "Decode a JWT token (header + payload)",
		Long:    `Decodes the header and payload of a JWT token without signature verification.`,
		Example: `  jwt eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNqPnd9iyw`,
		Args:    cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			token := args[0]
			parts := strings.Split(token, ".")
			if len(parts) < 2 {
				return fmt.Errorf("invalid JWT: expected at least 2 dot-separated parts")
			}

			for i, part := range parts[:2] {
				padded := part
				switch len(padded) % 4 {
				case 2:
					padded += "=="
				case 3:
					padded += "="
				}

				decoded, err := base64.URLEncoding.DecodeString(padded)
				if err != nil {
					return fmt.Errorf("base64 decode part %d: %w", i+1, err)
				}

				var pretty bytes.Buffer
				if err := json.Indent(&pretty, decoded, "", "  "); err != nil {
					return fmt.Errorf("invalid JSON in part %d: %w", i+1, err)
				}

				switch i {
				case 0:
					fmt.Println("=== Header ===")
				case 1:
					fmt.Println("=== Payload ===")
				}
				fmt.Println(pretty.String())
			}
			return nil
		},
	}
}
