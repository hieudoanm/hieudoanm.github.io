package web

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
)

func detectLocation() (string, error) {
	resp, err := http.Get("https://ipinfo.io/json")
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	var data struct {
		City string `json:"city"`
	}
	if err := json.Unmarshal(body, &data); err != nil {
		return "", err
	}
	if data.City == "" {
		return "", fmt.Errorf("could not detect city")
	}
	return data.City, nil
}

func init() {
	os.Setenv("WTTR_VERBOSE", "0")
}
