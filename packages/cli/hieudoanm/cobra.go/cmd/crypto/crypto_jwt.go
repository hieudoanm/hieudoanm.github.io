package crypto

import (
	"encoding/json"
	"fmt"

	"github.com/golang-jwt/jwt/v5"
	"github.com/spf13/cobra"
)

var jwtJSON bool

func newJwtCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "jwt",
		Short: "Encode and decode JWTs",
	}

	cmd.AddCommand(newJwtDecodeCmd(), newJwtEncodeCmd())
	return cmd
}

func newJwtDecodeCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "decode <token>",
		Short: "Decode a JWT token without signature verification",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			token := args[0]

			parser := jwt.NewParser(jwt.WithoutClaimsValidation())
			parsed, _, err := parser.ParseUnverified(token, jwt.MapClaims{})
			if err != nil {
				return fmt.Errorf("parse failed: %w", err)
			}

			parts := splitJWT(token)

			headerData, _ := jwt.NewParser().DecodeSegment(parts[0])
			var headerJSON interface{}
			json.Unmarshal(headerData, &headerJSON)

			if jwtJSON {
				var payload interface{}
				if claims, ok := parsed.Claims.(jwt.MapClaims); ok {
					payload = map[string]interface{}(claims)
				}
				out, _ := json.MarshalIndent(map[string]interface{}{
					"header":  headerJSON,
					"payload": payload,
				}, "", "  ")
				fmt.Println(string(out))
			} else {
				fmt.Printf("Header:\n%s\n\n", string(headerData))
				fmt.Printf("Payload:\n")
				if claims, ok := parsed.Claims.(jwt.MapClaims); ok {
					for k, v := range claims {
						fmt.Printf("  %s: %v\n", k, v)
					}
				}
			}
			return nil
		},
	}

	cmd.Flags().BoolVar(&jwtJSON, "json", false, "Output in JSON format")
	return cmd
}

func splitJWT(token string) []string {
	dot1 := -1
	dot2 := -1
	for i, c := range token {
		if c == '.' {
			if dot1 == -1 {
				dot1 = i
			} else if dot2 == -1 {
				dot2 = i
				break
			}
		}
	}
	if dot1 == -1 || dot2 == -1 {
		return []string{token}
	}
	return []string{token[:dot1], token[dot1+1 : dot2]}
}
