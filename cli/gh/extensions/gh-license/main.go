package main

import (
	"fmt"
	"log"
	"os"

	"github.com/cli/go-gh/v2/pkg/api"
	"github.com/manifoldco/promptui"
)

// License ...
type License struct {
	Key    string `json:"key"`
	Name   string `json:"name"`
	SpdxID string `json:"spdx_id"`
	URL    string `json:"url"`
	Body   string `json:"body"`
}

func main() {
	client, err := api.DefaultRESTClient()
	if err != nil {
		log.Fatal(err)
	}

	licenses := []License{}
	err = client.Get("licenses", &licenses)
	if err != nil {
		log.Fatal(err)
	}

	var spdxIds []string
	for _, license := range licenses {
		spdxIds = append(spdxIds, license.SpdxID)
	}

	prompt := promptui.Select{
		Label: "Select License",
		Items: spdxIds,
	}

	_, spdxID, err := prompt.Run()
	if err != nil {
		log.Fatal(err)
	}

	license := License{}
	err = client.Get(fmt.Sprintf("licenses/%s", spdxID), &license)
	if err != nil {
		log.Fatal(err)
	}

	file, err := os.Create("LICENSE")
	if err != nil {
		log.Fatal(err)
		return
	}
	defer file.Close()

	file.WriteString(license.Body)
}

// For more examples of using go-gh, see:
// https://github.com/cli/go-gh/blob/trunk/example_gh_test.go
