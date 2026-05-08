package main

import (
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/cli/go-gh/v2/pkg/api"
	"github.com/hieudoanm/gh.cli/src/constants"
	"github.com/hieudoanm/gh.cli/src/services"
)

func main() {
	if len(os.Args) < 2 {
		log.Fatal("Usage: gh langs <owner>/<repo>")
	}

	repo := os.Args[1]
	parts := strings.Split(repo, "/")
	if len(parts) != 2 {
		log.Fatal("Repo must be in format owner/repo")
	}

	owner := parts[0]
	name := parts[1]

	client, err := api.DefaultRESTClient()
	if err != nil {
		log.Fatal(err)
	}

	path := fmt.Sprintf("repos/%s/%s/languages", owner, name)

	var result map[string]int
	err = client.Get(path, &result)
	if err != nil {
		log.Fatal(err)
	}

	if len(result) == 0 {
		fmt.Println("No languages found")
		return
	}

	fmt.Println("Languages:")
	for lang, bytes := range result {
		fmt.Printf("- %s: %d bytes\n", lang, bytes)
	}

	// Generate image
	filePath := services.GenerateLanguagesBar(result, constants.Colors)
	fmt.Printf("✅ languages.svg generated at %s\n", filePath)
}
