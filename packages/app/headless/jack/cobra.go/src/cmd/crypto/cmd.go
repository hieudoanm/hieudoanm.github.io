package crypto

import (
	"github.com/hieudoanm/jack/src/cmd/crypto/barcode"
	"github.com/hieudoanm/jack/src/cmd/crypto/decrypt"
	"github.com/hieudoanm/jack/src/cmd/crypto/encrypt"
	"github.com/hieudoanm/jack/src/cmd/crypto/hash"
	"github.com/hieudoanm/jack/src/cmd/crypto/jwt"
	"github.com/hieudoanm/jack/src/cmd/crypto/keygen"
	"github.com/hieudoanm/jack/src/cmd/crypto/passwd"
	"github.com/hieudoanm/jack/src/cmd/crypto/qrcode"
	"github.com/hieudoanm/jack/src/cmd/crypto/totp"
	"github.com/hieudoanm/jack/src/cmd/crypto/uuid"
	"github.com/spf13/cobra"
)

func NewCommand() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "crypto",
		Short: "Cryptographic and security tools",
		Long:  `Hashing, password generation, JWT, UUIDs, and QR codes.`,
		Example: `  crypto uuid
  crypto hash --text "hello world"
  crypto passwd --length 32 --symbols`,
		RunE: func(cmd *cobra.Command, args []string) error { return cmd.Help() },
	}
	cmd.AddCommand(
		barcode.NewCommand(),
		hash.NewCommand(),
		jwt.NewCommand(),
		keygen.NewCommand(),
		passwd.NewCommand(),
		uuid.NewCommand(),
		qrcode.NewCommand(),
		encrypt.NewCommand(),
		decrypt.NewCommand(),
		totp.NewCommand(),
	)
	cmd.PersistentFlags().BoolP("json", "j", false, "Output in JSON format")
	return cmd
}
