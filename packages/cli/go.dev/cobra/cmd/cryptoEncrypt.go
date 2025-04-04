// Package cmd ...
package cmd

import (
	"encoding/hex"
	"fmt"
	"log"
	"nothing-cli/utils"

	"github.com/spf13/cobra"
)

// cryptoEncryptCmd represents the cryptoEncrypt command
var cryptoEncryptCmd = &cobra.Command{
	Use:   "encrypt",
	Short: "A brief description of your command",
	Long: `A longer description that spans multiple lines and likely contains examples
and usage of using your command. For example:

Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.`,
	Run: func(cmd *cobra.Command, args []string) {
		utils.LogProgramName()
		// Get Text
		fmt.Print("Text: ")
		var text string
		fmt.Scanln(&text)
		// Get Key
		fmt.Print("Key: ")
		var keyInput string
		fmt.Scanln(&keyInput)
		// Get IV
		fmt.Print("IV: ")
		var nonceInput string
		fmt.Scanln(&nonceInput)
		// Decode key and nonce from hex
		key, err := hex.DecodeString(keyInput)
		if err != nil || len(key) != 32 {
			log.Fatal("Invalid encryption key. Must be a 32-byte hex string.")
		}

		nonce, err := hex.DecodeString(nonceInput)
		if err != nil || len(nonce) != 12 {
			log.Fatal("Invalid nonce. Must be a 12-byte hex string.")
		}
		// EncryptAES
		encrypted, err := utils.EncryptAES(text, key, nonce)
		if err != nil {
			log.Fatal("Encryption error:", err)
		}
		fmt.Println("Encrypted:", encrypted)
	},
}

func init() {
	cryptoCmd.AddCommand(cryptoEncryptCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// cryptoEncryptCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// cryptoEncryptCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
