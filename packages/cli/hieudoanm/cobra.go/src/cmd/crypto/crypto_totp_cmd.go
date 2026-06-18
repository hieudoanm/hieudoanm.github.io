package crypto

import (
	"crypto/hmac"
	"crypto/sha1"
	"encoding/base32"
	"encoding/binary"
	"encoding/json"
	"fmt"
	"math"
	"strings"
	"time"

	"github.com/spf13/cobra"
)

var totpJSON bool

func newTotpCmd() *cobra.Command {
	var (
		secretStr string
		step      int
		digits    int
		timeStr   string
	)

	cmd := &cobra.Command{
		Use:   "totp [--secret <secret>]",
		Short: "Generate a TOTP code from a Base32 secret",
		Long: `Generate a Time-based One-Time Password (RFC 6238) from a Base32-encoded secret key.

Accepts secrets with or without padding. Compatible with Google Authenticator, Authy, and most 2FA apps.`,
		Example: `  crypto totp --secret JBSWY3DPEHPK3PXP
  crypto totp --secret JBSWY3DPEHPK3PXP --step 30 --digits 6
  crypto totp --secret JBSWY3DPEHPK3PXP --json`,
		RunE: func(cmd *cobra.Command, args []string) error {
			secret := strings.ToUpper(strings.TrimSpace(secretStr))
			secret = strings.ReplaceAll(secret, " ", "")

			padding := 8 - len(secret)%8
			if padding > 0 && padding < 8 {
				secret += strings.Repeat("=", padding)
			}

			key, err := base32.StdEncoding.DecodeString(secret)
			if err != nil {
				return fmt.Errorf("invalid Base32 secret: %w", err)
			}

			var t time.Time
			if timeStr != "" {
				t, err = time.Parse(time.RFC3339, timeStr)
				if err != nil {
					return fmt.Errorf("invalid time (use RFC3339): %w", err)
				}
			} else {
				t = time.Now()
			}

			counter := uint64(t.Unix()) / uint64(step)

			counterBytes := make([]byte, 8)
			binary.BigEndian.PutUint64(counterBytes, counter)

			mac := hmac.New(sha1.New, key)
			mac.Write(counterBytes)
			hash := mac.Sum(nil)

			offset := hash[len(hash)-1] & 0x0f
			code := int32(binary.BigEndian.Uint32(hash[offset:offset+4]) & 0x7fffffff)
			code %= int32(math.Pow10(digits))

			format := fmt.Sprintf("%%0%dd", digits)
			codeStr := fmt.Sprintf(format, code)

			remaining := uint64(step) - (uint64(t.Unix()) % uint64(step))

			if totpJSON {
				b, _ := json.MarshalIndent(map[string]interface{}{
					"code":      codeStr,
					"step":      step,
					"remaining": remaining,
					"time":      t.Format(time.RFC3339),
				}, "", "  ")
				fmt.Println(string(b))
			} else {
				fmt.Println(codeStr)
			}
			return nil
		},
	}

	cmd.Flags().StringVarP(&secretStr, "secret", "s", "", "Base32 secret")
	cmd.Flags().IntVar(&step, "step", 30, "Time step in seconds")
	cmd.Flags().IntVar(&digits, "digits", 6, "Number of digits (6 or 8)")
	cmd.Flags().StringVar(&timeStr, "time", "", "Time in RFC3339 format (for testing)")
	cmd.Flags().BoolVar(&totpJSON, "json", false, "Output in JSON format")
	return cmd
}
