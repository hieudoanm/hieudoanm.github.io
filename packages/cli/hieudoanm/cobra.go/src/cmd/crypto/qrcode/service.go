package qrcode

import (
	"encoding/json"
	"fmt"
	"os"

	"github.com/mdp/qrterminal/v3"
)

func runQRCode(data string, jsonOutput bool) error {
	if jsonOutput {
		b, _ := json.MarshalIndent(map[string]interface{}{
			"data": data,
		}, "", "  ")
		fmt.Println(string(b))
	} else {
		config := qrterminal.Config{
			Level:      qrterminal.M,
			Writer:     os.Stdout,
			HalfBlocks: true,
			BlackChar:  qrterminal.BLACK,
			WhiteChar:  qrterminal.WHITE,
			QuietZone:  1,
		}
		qrterminal.GenerateWithConfig(data, config)
		fmt.Println()
	}
	return nil
}
