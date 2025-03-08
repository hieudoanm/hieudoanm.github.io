// Package main
package main

import (
	"fmt"
	"log"
	"os"

	"github.com/cli/go-gh/v2/pkg/api"
	"github.com/manifoldco/promptui"
)

// CodeOfConduct ...
type CodeOfConduct struct {
	Key  string `json:"key"`
	Name string `json:"name"`
	URL  string `json:"url"`
	Body string `json:"body"`
}

func main() {
	client, err := api.DefaultRESTClient()
	if err != nil {
		log.Fatal(err)
	}

	codesOfConduct := []CodeOfConduct{}
	err = client.Get("codes_of_conduct", &codesOfConduct)
	if err != nil {
		log.Fatal(err)
	}

	var keys []string
	for _, codeOfConduct := range codesOfConduct {
		keys = append(keys, codeOfConduct.Key)
	}

	prompt := promptui.Select{
		Label: "Select COC",
		Items: keys,
	}

	_, spdxID, err := prompt.Run()
	if err != nil {
		log.Fatal(err)
	}

	codeOfConduct := CodeOfConduct{}
	err = client.Get(fmt.Sprintf("codes_of_conduct/%s", spdxID), &codeOfConduct)
	if err != nil {
		log.Fatal(err)
	}

	file, err := os.Create("CODE_OF_CONDUCT")
	if err != nil {
		log.Fatal(err)
		return
	}
	defer file.Close()

	file.WriteString(codeOfConduct.Body)
}

// For more examples of using go-gh, see:
// https://github.com/cli/go-gh/blob/trunk/example_gh_test.go
