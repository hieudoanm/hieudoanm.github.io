package crypto

import (
	"encoding/json"
	"fmt"
	"math/rand"

	"github.com/spf13/cobra"
)

var (
	passwdPwdLen         int
	passwdCount          int
	passwdIncludeDigits  bool
	passwdIncludeSymbols bool
	passwdNoUpper        bool
	passwdPIN            bool
	passwdClip           bool
	passwdPronounceable  bool
	passwdJSON           bool
)

const (
	passwdLower   = "abcdefghijklmnopqrstuvwxyz"
	passwdUpper   = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	passwdDigits  = "0123456789"
	passwdSymbols = "!@#$%^&*()-_=+[]{}<>?|~"
)

func newPasswdCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "passwd",
		Short: "Generate secure random passwords",
		Long:  `Generate random passwords with configurable length, character sets, and pronounceable options.`,
		Example: `  passwd
  passwd --length 32 --symbols
  passwd --pin --count 5
  passwd --pronounceable`,
		RunE: func(cmd *cobra.Command, args []string) error {
			var passwords []string

			gen := func() string {
				if passwdPIN {
					pin := make([]byte, passwdPwdLen)
					for j := range pin {
						pin[j] = passwdDigits[rand.Intn(len(passwdDigits))]
					}
					return string(pin)
				}

				if passwdPronounceable {
					return generatePronounceable(passwdPwdLen)
				}

				charset := passwdLower
				if !passwdNoUpper {
					charset += passwdUpper
				}
				if passwdIncludeDigits {
					charset += passwdDigits
				}
				if passwdIncludeSymbols {
					charset += passwdSymbols
				}

				pw := make([]byte, passwdPwdLen)
				for j := range pw {
					pw[j] = charset[rand.Intn(len(charset))]
				}
				return string(pw)
			}

			for i := 0; i < passwdCount; i++ {
				passwords = append(passwords, gen())
			}

			if passwdJSON {
				b, _ := json.MarshalIndent(map[string]interface{}{
					"passwords": passwords,
					"count":     passwdCount,
					"length":    passwdPwdLen,
					"type": func() string {
						if passwdPIN {
							return "pin"
						}
						if passwdPronounceable {
							return "pronounceable"
						}
						return "random"
					}(),
				}, "", "  ")
				fmt.Println(string(b))
			} else {
				for i, p := range passwords {
					if passwdClip && i == 0 {
						fmt.Print(p)
					} else {
						fmt.Println(p)
					}
				}
			}
			return nil
		},
	}

	cmd.Flags().IntVarP(&passwdPwdLen, "length", "l", 16, "Password length")
	cmd.Flags().IntVarP(&passwdCount, "count", "n", 1, "Number of passwords")
	cmd.Flags().BoolVarP(&passwdIncludeDigits, "digits", "d", true, "Include digits")
	cmd.Flags().BoolVarP(&passwdIncludeSymbols, "symbols", "s", false, "Include symbols")
	cmd.Flags().BoolVar(&passwdNoUpper, "no-upper", false, "Exclude uppercase letters")
	cmd.Flags().BoolVar(&passwdPIN, "pin", false, "Generate numeric PIN")
	cmd.Flags().BoolVar(&passwdClip, "clip", false, "Copy to clipboard (first password only)")
	cmd.Flags().BoolVar(&passwdPronounceable, "pronounceable", false, "Generate pronounceable password")
	cmd.Flags().BoolVar(&passwdJSON, "json", false, "Output in JSON format")
	return cmd
}
