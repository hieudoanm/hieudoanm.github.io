package crypto

import "github.com/spf13/cobra"

func newJwtCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "jwt",
		Short: "Encode and decode JWTs",
	}

	cmd.AddCommand(newJwtDecodeCmd(), newJwtEncodeCmd())
	return cmd
}
