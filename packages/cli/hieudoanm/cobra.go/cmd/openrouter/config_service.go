package openrouter

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/hieudoanm/hieudoanm/libs/config"
)

// LoadAPIKey returns the OpenRouter API key from (in priority order):
//  1. OPEN_ROUTER_API_KEY environment variable
//  2. ~/.hieudoanm/config.json (via config package)
//  3. ~/.fr  (supports KEY=value or bare sk-... lines)
//  4. .env in the current working directory
//  5. Interactive prompt
func LoadAPIKey() string {
	// 1. Env var
	if v := os.Getenv("OPEN_ROUTER_API_KEY"); v != "" {
		return v
	}

	// 2. Config file
	if v := config.OpenRouterKey(); v != "" {
		return v
	}

	// 3. ~/.fr
	if v := readKeyFromFile(os.ExpandEnv("$HOME/.fr")); v != "" {
		return v
	}

	// 4. .env
	if v := readKeyFromFile(".env"); v != "" {
		return v
	}

	fmt.Println("OPEN_ROUTER_API_KEY is not set.")
	fmt.Print("Please enter your OpenRouter API key: ")

	reader := bufio.NewReader(os.Stdin)
	key, err := reader.ReadString('\n')
	if err != nil {
		log.Fatal("failed to read API key:", err)
	}

	key = strings.TrimSpace(key)

	if key == "" {
		log.Fatal("API key cannot be empty")
	}

	os.Setenv("OPEN_ROUTER_API_KEY", key)

	return key
}

func readKeyFromFile(path string) string {
	f, err := os.Open(path)
	if err != nil {
		return ""
	}
	defer f.Close()

	scanner := bufio.NewScanner(f)
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}
		if strings.HasPrefix(line, "OPEN_ROUTER_API_KEY=") {
			return strings.TrimPrefix(line, "OPEN_ROUTER_API_KEY=")
		}
		if strings.HasPrefix(line, "sk-") {
			return line
		}
	}
	return ""
}
