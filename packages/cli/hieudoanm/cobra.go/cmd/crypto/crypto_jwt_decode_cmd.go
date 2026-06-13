package crypto

import (
	"encoding/json"
	"fmt"

	"github.com/golang-jwt/jwt/v5"
	"github.com/spf13/cobra"
)

var jwtJSON bool

func newJwtDecodeCmd() *cobra.Command {
	var token string
	cmd := &cobra.Command{
		Use:   "decode [--token <token>]",
		Short: "Decode a JWT token without signature verification",
		RunE: func(cmd *cobra.Command, args []string) error {
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

	cmd.Flags().StringVarP(&token, "token", "t", "", "JWT token to decode")
	cmd.Flags().BoolVar(&jwtJSON, "json", false, "Output in JSON format")
	return cmd
}
