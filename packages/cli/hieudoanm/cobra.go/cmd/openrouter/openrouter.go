package openrouter

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"sort"
	"strings"
	"time"
)

const BaseURL = "https://openrouter.ai/api/v1"

type Model struct {
	ID            string  `json:"id"`
	Name          string  `json:"name"`
	Description   string  `json:"description"`
	ContextLength int     `json:"context_length"`
	Pricing       Pricing `json:"pricing"`
}

type Pricing struct {
	Prompt     string `json:"prompt"`
	Completion string `json:"completion"`
	Request    string `json:"request"`
}

type modelsResponse struct {
	Data []Model `json:"data"`
}

func FetchFreeModels() ([]Model, error) {
	resp, err := http.Get(BaseURL + "/models")
	if err != nil {
		return nil, fmt.Errorf("request failed: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("OpenRouter returned HTTP %d", resp.StatusCode)
	}

	var payload modelsResponse
	if err := json.NewDecoder(resp.Body).Decode(&payload); err != nil {
		return nil, fmt.Errorf("decode error: %w", err)
	}

	var free []Model
	for _, m := range payload.Data {
		if isFree(m.Pricing) {
			free = append(free, m)
		}
	}

	sort.Slice(free, func(i, j int) bool {
		return free[i].ID < free[j].ID
	})

	return free, nil
}

func isFree(p Pricing) bool {
	return (p.Prompt == "0" || p.Prompt == "") &&
		(p.Completion == "0" || p.Completion == "")
}

func ResolveModel(query string, models []Model) *Model {
	q := strings.ToLower(query)

	for i, m := range models {
		if strings.ToLower(m.ID) == q {
			return &models[i]
		}
	}

	for i, m := range models {
		if strings.ToLower(m.ID) == q+":free" {
			return &models[i]
		}
	}

	var idMatches []Model
	for _, m := range models {
		if strings.Contains(strings.ToLower(m.ID), q) {
			idMatches = append(idMatches, m)
		}
	}
	if len(idMatches) == 1 {
		return &idMatches[0]
	}
	if len(idMatches) > 1 {
		sort.Slice(idMatches, func(i, j int) bool {
			iFree := strings.HasSuffix(idMatches[i].ID, ":free")
			jFree := strings.HasSuffix(idMatches[j].ID, ":free")
			if iFree != jFree {
				return iFree
			}
			return len(idMatches[i].ID) < len(idMatches[j].ID)
		})
		return &idMatches[0]
	}

	var nameMatches []Model
	for _, m := range models {
		if strings.Contains(strings.ToLower(m.Name), q) {
			nameMatches = append(nameMatches, m)
		}
	}
	if len(nameMatches) > 0 {
		sort.Slice(nameMatches, func(i, j int) bool {
			return len(nameMatches[i].ID) < len(nameMatches[j].ID)
		})
		return &nameMatches[0]
	}

	return nil
}

// ── Probing ───────────────────────────────────────────────────────────────────

type ProbeStatus int

const (
	StatusOK ProbeStatus = iota
	StatusRateLimited
	StatusRestricted
	StatusError
)

type ProbeResult struct {
	Model   Model
	Status  ProbeStatus
	Message string
	Latency int64
}

func ProbeModel(m Model, apiKey string) ProbeResult {
	payload := map[string]any{
		"model": m.ID,
		"messages": []map[string]any{
			{"role": "user", "content": "hi"},
		},
		"max_tokens": 1,
		"provider": map[string]any{
			"allow_fallbacks": false,
			"data_collection": "allow",
		},
	}

	body, _ := json.Marshal(payload)

	req, err := http.NewRequest(http.MethodPost, BaseURL+"/chat/completions", bytes.NewReader(body))
	if err != nil {
		return ProbeResult{Model: m, Status: StatusError, Message: err.Error()}
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+apiKey)
	req.Header.Set("HTTP-Referer", "https://github.com/freerouter/freerouter")
	req.Header.Set("X-Title", "freerouter")

	start := time.Now()
	resp, err := http.DefaultClient.Do(req)
	elapsed := time.Since(start).Milliseconds()
	if err != nil {
		return ProbeResult{Model: m, Status: StatusError, Message: err.Error()}
	}
	defer resp.Body.Close()

	raw, _ := io.ReadAll(resp.Body)

	switch resp.StatusCode {
	case http.StatusOK:
		return ProbeResult{Model: m, Status: StatusOK, Latency: elapsed}
	case http.StatusTooManyRequests:
		return ProbeResult{Model: m, Status: StatusRateLimited, Message: extractMessage(raw)}
	case http.StatusNotFound:
		return ProbeResult{Model: m, Status: StatusRestricted, Message: extractMessage(raw)}
	default:
		msg := extractMessage(raw)
		if msg == "" {
			msg = fmt.Sprintf("HTTP %d", resp.StatusCode)
		}
		return ProbeResult{Model: m, Status: StatusError, Message: msg}
	}
}

type generateRequest struct {
	Model     string        `json:"model"`
	Messages  []generateMsg `json:"messages"`
	MaxTokens int           `json:"max_tokens,omitempty"`
}

type generateMsg struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type generateResponse struct {
	Choices []struct {
		Message generateMsg `json:"message"`
	} `json:"choices"`
	Error *struct {
		Message string `json:"message"`
	} `json:"error,omitempty"`
}

func Generate(model, prompt string) (string, error) {
	apiKey := LoadAPIKey()
	if apiKey == "" {
		return "", fmt.Errorf("OpenRouter API key not found")
	}

	reqBody := generateRequest{
		Model: model,
		Messages: []generateMsg{
			{Role: "user", Content: prompt},
		},
		MaxTokens: 2048,
	}

	body, err := json.Marshal(reqBody)
	if err != nil {
		return "", fmt.Errorf("marshal request: %w", err)
	}

	req, err := http.NewRequest(http.MethodPost, BaseURL+"/chat/completions", bytes.NewReader(body))
	if err != nil {
		return "", fmt.Errorf("create request: %w", err)
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+apiKey)
	req.Header.Set("HTTP-Referer", "https://github.com/hieudoanm/hieudoanm")
	req.Header.Set("X-Title", "hieudoanm")

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return "", fmt.Errorf("request failed: %w", err)
	}
	defer resp.Body.Close()

	raw, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", fmt.Errorf("read response: %w", err)
	}

	if resp.StatusCode != http.StatusOK {
		var errResp generateResponse
		if json.Unmarshal(raw, &errResp) == nil && errResp.Error != nil {
			return "", fmt.Errorf("OpenRouter error: %s", errResp.Error.Message)
		}
		return "", fmt.Errorf("OpenRouter returned HTTP %d", resp.StatusCode)
	}

	var result generateResponse
	if err := json.Unmarshal(raw, &result); err != nil {
		return "", fmt.Errorf("decode response: %w", err)
	}

	if len(result.Choices) == 0 {
		return "", fmt.Errorf("no choices returned")
	}

	return result.Choices[0].Message.Content, nil
}

func extractMessage(raw []byte) string {
	var envelope struct {
		Error struct {
			Message string `json:"message"`
		} `json:"error"`
	}
	if err := json.Unmarshal(raw, &envelope); err == nil && envelope.Error.Message != "" {
		msg := envelope.Error.Message
		if len(msg) > 80 {
			msg = msg[:77] + "..."
		}
		return msg
	}
	return ""
}
