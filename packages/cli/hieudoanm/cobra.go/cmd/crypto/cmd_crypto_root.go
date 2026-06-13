package crypto

import "github.com/spf13/cobra"

var jsonOutput bool

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "crypto",
		Short: "Cryptographic and security tools",
		Long:  `Hashing, password generation, JWT, UUIDs, and QR codes.`,
	}
	cmd.AddCommand(
		newHashCmd(),
		newJwtCmd(),
		newKeygenCmd(),
		newPasswdCmd(),
		newUUIDCmd(),
		newQrcodeCmd(),
		newEncryptCmd(),
		newDecryptCmd(),
		newTotpCmd(),
	)
	cmd.PersistentFlags().BoolVarP(&jsonOutput, "json", "j", false, "Output in JSON format")
	return cmd
}
