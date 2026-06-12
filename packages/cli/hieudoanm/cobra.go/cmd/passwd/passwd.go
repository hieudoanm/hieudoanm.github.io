package passwd

import (
	"crypto/rand"
	"fmt"
	"math/big"
	"strings"

	"github.com/atotto/clipboard"
	"github.com/spf13/cobra"
)

const (
	lower    = "abcdefghijklmnopqrstuvwxyz"
	upper    = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	digits   = "0123456789"
	symbols  = "!@#$%^&*()-_=+[]{}|;:,.<>?"
	vowels   = "aeiou"
	consos   = "bcdfghjklmnpqrstvwxyz"
	consosUp = "BCDFGHJKLMNPQRSTVWXYZ"
)

func NewCommand() *cobra.Command {
	var length, count int
	var noUpper, noDigits, noSymbols, pin, clip, pronounceable bool

	cmd := &cobra.Command{
		Use:   "passwd",
		Short: "Generate random passwords",
		Example: `  passwd
  passwd --length 20
  passwd --length 32 --no-symbols
  passwd --pin
  passwd --count 5 --clip
  passwd --pronounceable`,
		RunE: func(cmd *cobra.Command, args []string) error {
			var passwords []string

			for i := 0; i < count; i++ {
				var pwd string
				var err error

				if pin {
					pwd, err = generatePIN(length)
				} else if pronounceable {
					pwd, err = generatePronounceable(length)
				} else {
					pwd, err = generateRandom(length, noUpper, noDigits, noSymbols)
				}
				if err != nil {
					return err
				}
				passwords = append(passwords, pwd)
			}

			output := strings.Join(passwords, "\n")

			if clip {
				if err := clipboard.WriteAll(output); err != nil {
					return fmt.Errorf("clipboard error: %w", err)
				}
				if count == 1 {
					fmt.Println("Password copied to clipboard")
				} else {
					fmt.Println("Passwords copied to clipboard")
				}
			} else {
				fmt.Println(output)
			}
			return nil
		},
	}

	cmd.Flags().IntVarP(&length, "length", "l", 16, "Password length")
	cmd.Flags().IntVarP(&count, "count", "n", 1, "Number of passwords to generate")
	cmd.Flags().BoolVar(&noUpper, "no-upper", false, "Exclude uppercase letters")
	cmd.Flags().BoolVar(&noDigits, "no-digits", false, "Exclude digits")
	cmd.Flags().BoolVar(&noSymbols, "no-symbols", false, "Exclude symbols")
	cmd.Flags().BoolVar(&pin, "pin", false, "Generate numeric PIN only")
	cmd.Flags().BoolVar(&clip, "clip", false, "Copy to clipboard instead of printing")
	cmd.Flags().BoolVar(&pronounceable, "pronounceable", false, "Generate pronounceable password")
	return cmd
}

func generateRandom(length int, noUpper, noDigits, noSymbols bool) (string, error) {
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
			return "", err
		}
		password[i] = charset[n.Int64()]
	}
	return string(password), nil
}

func generatePIN(length int) (string, error) {
	if length < 4 {
		length = 6
	}
	pin := make([]byte, length)
	for i := range pin {
		n, err := rand.Int(rand.Reader, big.NewInt(10))
		if err != nil {
			return "", err
		}
		pin[i] = digits[n.Int64()]
	}
	return string(pin), nil
}

func generatePronounceable(length int) (string, error) {
	if length < 4 {
		length = 8
	}

	result := make([]byte, length)
	useVowel := false

	for i := 0; i < length; i++ {
		var charset string
		if useVowel {
			charset = vowels
		} else {
			if i == 0 {
				charset = consos + consosUp + vowels
			} else {
				charset = consos + consosUp
			}
		}
		n, err := rand.Int(rand.Reader, big.NewInt(int64(len(charset))))
		if err != nil {
			return "", err
		}
		result[i] = charset[n.Int64()]
		useVowel = !useVowel
	}

	return string(result), nil
}
