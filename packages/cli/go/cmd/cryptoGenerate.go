// Package cmd ...
package cmd

import (
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"log"

	"github.com/spf13/cobra"
)

// GenerateRandomBytes generates a secure random byte slice of the given length
func GenerateRandomBytes(size int) string {
	bytes := make([]byte, size)
	_, err := rand.Read(bytes)
	if err != nil {
		log.Fatal("Failed to generate random bytes:", err)
	}
	return hex.EncodeToString(bytes) // Convert to hexadecimal for storage
}

// cryptoGenerateCmd represents the cryptoGenerate command
var cryptoGenerateCmd = &cobra.Command{
	Use:   "generate",
	Short: "A brief description of your command",
	Long: `A longer description that spans multiple lines and likely contains examples
and usage of using your command. For example:

Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.`,
	Run: func(cmd *cobra.Command, args []string) {
		encryptionKey := GenerateRandomBytes(32) // 256-bit key
		encryptionIV := GenerateRandomBytes(12)  // 96-bit IV (recommended for AES-GCM)

		fmt.Println("ENCRYPTION_KEY : ", encryptionKey)
		fmt.Println("ENCRYPTION_IV  : ", encryptionIV)
	},
}

func init() {
	cryptoCmd.AddCommand(cryptoGenerateCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// cryptoGenerateCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// cryptoGenerateCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
