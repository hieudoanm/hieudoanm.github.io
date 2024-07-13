// Package main
package main

import (
	"fmt"
	"log"
	"os"

	"github.com/cli/go-gh/v2/pkg/api"
	"github.com/manifoldco/promptui"
)

// Template ...
type Template struct {
	Name   string `json:"name"`
	Source string `json:"source"`
}

func main() {
	client, err := api.DefaultRESTClient()
	if err != nil {
		log.Fatal(err)
	}

	templates := []string{}
	err = client.Get("gitignore/templates", &templates)
	if err != nil {
		log.Fatal(err)
	}

	prompt := promptui.Select{
		Label: "Select .gitignore template",
		Items: templates,
	}

	_, name, err := prompt.Run()
	if err != nil {
		log.Fatal(err)
	}

	template := Template{}
	err = client.Get(fmt.Sprintf("gitignore/templates/%s", name), &template)
	if err != nil {
		log.Fatal(err)
	}

	file, err := os.Create(".gitignore")
	if err != nil {
		log.Fatal(err)
		return
	}
	defer file.Close()

	file.WriteString(template.Source)
}

// For more examples of using go-gh, see:
// https://github.com/cli/go-gh/blob/trunk/example_gh_test.go
