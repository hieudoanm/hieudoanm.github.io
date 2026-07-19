package main

import (
	"log"

	"github.com/hieudoanm/kevin/cmd"
)

func main() {
	if err := cmd.NewRootCommand().Execute(); err != nil {
		log.Fatal(err)
	}
}
