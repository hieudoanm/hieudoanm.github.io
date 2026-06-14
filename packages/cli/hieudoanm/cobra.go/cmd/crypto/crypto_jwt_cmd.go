package crypto

import "github.com/spf13/cobra"

func newJwtCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "jwt",
		Short: "Encode and decode JWTs",
		Long:  `Encode (sign) and decode JWT tokens using HMAC-based algorithms (HS256, HS384, HS512).`,
		Example: `  crypto jwt encode --key secret --claims '{"sub":"123","name":"John"}'
  crypto jwt decode --token eyJhbGci...`,
	}

	cmd.AddCommand(newJwtDecodeCmd(), newJwtEncodeCmd())
	return cmd
}
