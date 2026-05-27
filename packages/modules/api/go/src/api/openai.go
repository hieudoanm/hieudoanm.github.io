package api

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
)

type Message struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type ChatRequest struct {
	Model    string    `json:"model"`
	Messages []Message `json:"messages"`
}

type ChatResponse struct {
	Choices []struct {
		Message Message `json:"message"`
	} `json:"choices"`
}

type OpenAIClient struct {
	APIKey string
}

func NewOpenAIClient(apiKey string) *OpenAIClient {
	return &OpenAIClient{APIKey: apiKey}
}

func (c *OpenAIClient) GetChatCompletion(model string, content string) (*ChatResponse, error) {
	reqBody := ChatRequest{
		Model:    model,
		Messages: []Message{{Role: "user", Content: content}},
	}
	body, _ := json.Marshal(reqBody)

	req, err := http.NewRequest("POST", "https://api.openai.com/v1/chat/completions", bytes.NewBuffer(body))
	if err != nil {
		return nil, err
	}
	req.Header.Set("Authorization", "Bearer "+c.APIKey)
	req.Header.Set("Content-Type", "application/json")

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("openai api returned status: %d", resp.StatusCode)
	}

	var result ChatResponse
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, err
	}
	return &result, nil
}
