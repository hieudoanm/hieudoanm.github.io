package keygen

import (
	"encoding/json"
	"fmt"
	"path/filepath"

	"github.com/spf13/cobra"
)

func NewCommand() *cobra.Command {
	var algorithm string
	var bits int
	var output string

	cmd := &cobra.Command{
		Use:   "keygen",
		Short: "Generate a new SSH keypair",
		Long: `Generate an SSH keypair (RSA, ECDSA, or Ed25519).

Writes two files: <name> (private key) and <name>.pub (public key).
Private key is saved in PEM format with 0600 permissions.`,
		Example: `  crypto keygen --algo ed25519 -o id_ed25519
  crypto keygen --algo rsa --bits 4096 -o id_rsa
  crypto keygen --algo ecdsa --bits 256 -o id_ecdsa`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")

			switch algorithm {
			case "rsa":
				if err := GenRSA(bits, output); err != nil {
					return err
				}
			case "ecdsa":
				if err := GenECDSA(bits, output); err != nil {
					return err
				}
			case "ed25519":
				if err := GenEd25519(output); err != nil {
					return err
				}
			default:
				return fmt.Errorf("unsupported algorithm: %s (use rsa, ecdsa, or ed25519)", algorithm)
			}

			if jsonOutput {
				abs, _ := filepath.Abs(output)
				b, _ := json.MarshalIndent(map[string]interface{}{
					"algorithm":   algorithm,
					"bits":        bits,
					"private_key": abs,
					"public_key":  abs + ".pub",
				}, "", "  ")
				fmt.Println(string(b))
			}

			return nil
		},
	}

	cmd.Flags().StringVarP(&algorithm, "algo", "a", "ed25519", "Key algorithm (rsa, ecdsa, ed25519)")
	cmd.Flags().IntVarP(&bits, "bits", "b", 256, "Key size (bits): 2048/4096 for rsa, 256/384/521 for ecdsa")
	cmd.Flags().StringVarP(&output, "output", "o", "id_rsa", "Output file path")
	return cmd
}
