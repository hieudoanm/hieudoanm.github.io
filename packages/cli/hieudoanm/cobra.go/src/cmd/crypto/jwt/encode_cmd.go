package jwt

import (
	"encoding/json"
	"fmt"

	"github.com/golang-jwt/jwt/v5"
	"github.com/spf13/cobra"
)

func newEncodeCmd() *cobra.Command {
	var algorithm, key string
	var claimsJSON string

	cmd := &cobra.Command{
		Use:   "encode",
		Short: "Encode and sign a JWT token",
		Long:  `Create a signed JWT token with custom claims and signing method.`,
		Example: `  jwt encode --key secret --claims '{"sub":"123","name":"John"}'
  jwt encode --key secret --claims '{"sub":"123"}' --algorithm HS256`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")

			var claims jwt.MapClaims
			if err := json.Unmarshal([]byte(claimsJSON), &claims); err != nil {
				return fmt.Errorf("invalid claims JSON: %w", err)
			}

			var signingMethod jwt.SigningMethod
			switch algorithm {
			case "HS256":
				signingMethod = jwt.SigningMethodHS256
			case "HS384":
				signingMethod = jwt.SigningMethodHS384
			case "HS512":
				signingMethod = jwt.SigningMethodHS512
			default:
				return fmt.Errorf("unsupported algorithm: %s (use HS256, HS384, HS512)", algorithm)
			}

			token := jwt.NewWithClaims(signingMethod, claims)
			signed, err := token.SignedString([]byte(key))
			if err != nil {
				return fmt.Errorf("signing failed: %w", err)
			}

			if jsonOutput {
				b, _ := json.MarshalIndent(map[string]interface{}{
					"token": signed,
				}, "", "  ")
				fmt.Println(string(b))
			} else {
				fmt.Println(signed)
			}
			return nil
		},
	}

	cmd.Flags().StringVarP(&algorithm, "algorithm", "a", "HS256", "Signing algorithm (HS256, HS384, HS512)")
	cmd.Flags().StringVarP(&key, "key", "k", "", "Signing key (secret)")
	cmd.Flags().StringVarP(&claimsJSON, "claims", "c", "", "Claims as JSON string")
	cmd.MarkFlagRequired("key")
	cmd.MarkFlagRequired("claims")
	return cmd
}
