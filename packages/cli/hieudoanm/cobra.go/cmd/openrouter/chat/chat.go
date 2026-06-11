package chat

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/hieudoanm/libs/requests"
)

// Generate sends the prompt to the gaslit API and returns the AI's reply.
func Generate(model string, prompt string) (string, error) {
	url := "https://hieudoanm-chat.vercel.app/api/genai"

	// Construct the request payload
	payload := map[string]interface{}{
		"model": model,
		"messages": []map[string]string{
			{"role": "user", "text": prompt},
		},
	}

	body, err := requests.Post(url, requests.Options{Body: payload})
	if err != nil {
		return "", err
	}

	// Parse JSON response
	var response struct {
		Output string `json:"output"`
	}

	if err := json.Unmarshal([]byte(body), &response); err != nil {
		return "", fmt.Errorf("failed to parse response JSON: %w", err)
	}

	return response.Output, nil
}
