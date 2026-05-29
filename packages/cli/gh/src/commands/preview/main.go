package main

import (
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/cli/go-gh/v2/pkg/api"
	"github.com/hieudoanm/gh.cli/src/services"
)

func main() {
	if len(os.Args) < 2 {
		log.Fatal("Usage: gh preview <owner>/<repo>")
	}

	repoArg := os.Args[1]
	parts := strings.Split(repoArg, "/")
	if len(parts) != 2 {
		log.Fatal("Repo must be in format owner/repo")
	}

	owner := parts[0]
	name := parts[1]

	client, err := api.DefaultRESTClient()
	if err != nil {
		log.Fatal(err)
	}

	// ------------------------
	// Fetch repo metadata
	// ------------------------
	var repo services.Repo
	err = client.Get(fmt.Sprintf("repos/%s/%s", owner, name), &repo)
	if err != nil {
		log.Fatal(err)
	}

	// ------------------------
	// Generate outputs
	// ------------------------
	filePath := services.GenerateOpenGraph(repo)
	fmt.Printf("✅ og.svg generated at %s\n", filePath)
}
