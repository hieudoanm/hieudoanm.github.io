package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"
)

func main() {
  const url string = "https://api.github.com/emojis"
  response, err := http.Get(url)
  if err != nil {
		fmt.Printf("error making http request: %s\n", err)
		os.Exit(1)
	}
  defer response.Body.Close()

  var decoder = json.NewDecoder(response.Body)
  var emojis map[string]string
  err = decoder.Decode(&emojis)
  if err != nil {
		fmt.Printf("error decoding http response: %s\n", err)
		os.Exit(1)
  }

  for emoji, url := range emojis {
    fmt.Println(emoji)
    var file string = fmt.Sprintf("./png/%s.png", strings.ToLower(emoji))
    DownloadFile(file, url)
  }
}

func DownloadFile(filepath string, url string) error {
	// Get the data
	resp, err := http.Get(url)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	// Create the file
	out, err := os.Create(filepath)
	if err != nil {
		return err
	}
	defer out.Close()

	// Write the body to file
	_, err = io.Copy(out, resp.Body)
	return err
}
