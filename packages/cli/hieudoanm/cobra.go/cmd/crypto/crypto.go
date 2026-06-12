package crypto

import "github.com/spf13/cobra"

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "crypto",
		Short: "Cryptographic and security tools",
		Long:  `Hashing, password generation, JWT, UUIDs, and QR codes.`,
	}
	cmd.AddCommand(
		newHashCmd(),
		newJwtCmd(),
		newPasswdCmd(),
		newUUIDCmd(),
		newQrcodeCmd(),
	)
	return cmd
}
