// Package utils ...
package utils

import (
	"fmt"
	"math/rand/v2"
	"strconv"
	"strings"
)

// HexToRgb ...
func HexToRgb(hex string) (int, int, int, error) {
	// Remove the `#` if present
	hex = strings.TrimPrefix(hex, "#")

	if len(hex) == 3 {
		hex = fmt.Sprintf("%s%s%s%s%s%s", string(hex[0]), string(hex[0]), string(hex[1]), string(hex[1]), string(hex[2]), string(hex[2]))
	}

	// Parse hex values
	r, err := strconv.ParseInt(hex[0:2], 16, 0)
	if err != nil {
		return 0, 0, 0, err
	}
	g, err := strconv.ParseInt(hex[2:4], 16, 0)
	if err != nil {
		return 0, 0, 0, err
	}
	b, err := strconv.ParseInt(hex[4:6], 16, 0)
	if err != nil {
		return 0, 0, 0, err
	}

	return int(r), int(g), int(b), nil
}

// GenerateRandomHexColor generates a random hex color string using math/rand/v2.
func GenerateRandomHexColor() string {
	r := rand.Uint32N(256) // Generates a random number between 0-255
	g := rand.Uint32N(256)
	b := rand.Uint32N(256)
	return fmt.Sprintf("#%02X%02X%02X", r, g, b)
}
