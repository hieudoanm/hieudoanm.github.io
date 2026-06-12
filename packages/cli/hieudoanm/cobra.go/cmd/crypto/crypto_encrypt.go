package crypto

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"crypto/sha256"
	"fmt"
	"io"
	"os"

	"github.com/spf13/cobra"
)

func newEncryptCmd() *cobra.Command {
	var password, output string

	cmd := &cobra.Command{
		Use:   "encrypt <file>",
		Short: "Encrypt a file with AES-256-GCM",
		Long:  `Encrypt a file using AES-256-GCM with a key derived from the given password.`,
		Example: `  crypto encrypt secret.txt --password "hunter2"
  crypto encrypt secret.txt --password "hunter2" --output secret.enc`,
		Args: cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			plaintext, err := os.ReadFile(args[0])
			if err != nil {
				return err
			}

			key := sha256.Sum256([]byte(password))
			block, err := aes.NewCipher(key[:])
			if err != nil {
				return err
			}

			aesgcm, err := cipher.NewGCM(block)
			if err != nil {
				return err
			}

			nonce := make([]byte, aesgcm.NonceSize())
			if _, err := io.ReadFull(rand.Reader, nonce); err != nil {
				return err
			}

			ciphertext := aesgcm.Seal(nil, nonce, plaintext, nil)

			outPath := output
			if outPath == "" {
				outPath = args[0] + ".enc"
			}

			if err := os.WriteFile(outPath, append(nonce, ciphertext...), 0644); err != nil {
				return err
			}

			fmt.Println(outPath)
			return nil
		},
	}

	cmd.Flags().StringVarP(&password, "password", "p", "", "Encryption password")
	cmd.Flags().StringVarP(&output, "output", "o", "", "Output file (default: <file>.enc)")
	cmd.MarkFlagRequired("password")
	return cmd
}

func newDecryptCmd() *cobra.Command {
	var password, output string

	cmd := &cobra.Command{
		Use:   "decrypt <file>",
		Short: "Decrypt a file encrypted with AES-256-GCM",
		Long:  `Decrypt a file previously encrypted with "crypto encrypt" using the same password.`,
		Example: `  crypto decrypt secret.enc --password "hunter2"
  crypto decrypt secret.enc --password "hunter2" --output secret.txt`,
		Args: cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			data, err := os.ReadFile(args[0])
			if err != nil {
				return err
			}

			key := sha256.Sum256([]byte(password))
			block, err := aes.NewCipher(key[:])
			if err != nil {
				return err
			}

			aesgcm, err := cipher.NewGCM(block)
			if err != nil {
				return err
			}

			nonceSize := aesgcm.NonceSize()
			if len(data) < nonceSize {
				return fmt.Errorf("file too small to be valid encrypted data")
			}

			nonce, ciphertext := data[:nonceSize], data[nonceSize:]
			plaintext, err := aesgcm.Open(nil, nonce, ciphertext, nil)
			if err != nil {
				return fmt.Errorf("decryption failed (wrong password or corrupted file): %w", err)
			}

			outPath := output
			if outPath == "" {
				outPath = args[0]
				if len(outPath) > 4 && outPath[len(outPath)-4:] == ".enc" {
					outPath = outPath[:len(outPath)-4]
				} else {
					outPath = outPath + ".dec"
				}
			}

			if err := os.WriteFile(outPath, plaintext, 0644); err != nil {
				return err
			}

			fmt.Println(outPath)
			return nil
		},
	}

	cmd.Flags().StringVarP(&password, "password", "p", "", "Decryption password")
	cmd.Flags().StringVarP(&output, "output", "o", "", "Output file")
	cmd.MarkFlagRequired("password")
	return cmd
}
