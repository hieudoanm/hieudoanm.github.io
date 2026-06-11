package passwd

import (
	"crypto/rand"
	"fmt"
	"math/big"

	"github.com/spf13/cobra"
)

const (
	lower   = "abcdefghijklmnopqrstuvwxyz"
	upper   = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	digits  = "0123456789"
	symbols = "!@#$%^&*()-_=+[]{}|;:,.<>?"
)

func NewCommand() *cobra.Command {
	var length int
	var noUpper, noDigits, noSymbols bool

	cmd := &cobra.Command{
		Use:   "passwd",
		Short: "Generate a random password",
		Example: `  passwd
  passwd --length 20
  passwd --length 32 --no-symbols`,
		RunE: func(cmd *cobra.Command, args []string) error {
			charset := lower
			if !noUpper {
				charset += upper
			}
			if !noDigits {
				charset += digits
			}
			if !noSymbols {
				charset += symbols
			}

			password := make([]byte, length)
			for i := range password {
				n, err := rand.Int(rand.Reader, big.NewInt(int64(len(charset))))
				if err != nil {
					return err
				}
				password[i] = charset[n.Int64()]
			}

			fmt.Println(string(password))
			return nil
		},
	}

	cmd.Flags().IntVarP(&length, "length", "l", 16, "Password length")
	cmd.Flags().BoolVar(&noUpper, "no-upper", false, "Exclude uppercase letters")
	cmd.Flags().BoolVar(&noDigits, "no-digits", false, "Exclude digits")
	cmd.Flags().BoolVar(&noSymbols, "no-symbols", false, "Exclude symbols")
	return cmd
}
