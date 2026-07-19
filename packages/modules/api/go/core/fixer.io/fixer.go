package fixer

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
)

type FixerLatestResponse struct {
	Success   bool               `json:"success"`
	Timestamp int64              `json:"timestamp"`
	Base      string             `json:"base"`
	Date      string             `json:"date"`
	Rates     map[string]float64 `json:"rates"`
}

type FixerSymbolsResponse struct {
	Success bool              `json:"success"`
	Symbols map[string]string `json:"symbols"`
}

type FixerClient struct {
	BaseURL string
	APIKey  string
}

func NewFixerClient(key string) *FixerClient {
	return &FixerClient{
		BaseURL: "http://data.fixer.io/api",
		APIKey:  key,
	}
}

func (c *FixerClient) GetLatest() (*FixerLatestResponse, error) {
	u, _ := url.Parse(fmt.Sprintf("%s/latest", c.BaseURL))
	q := u.Query()
	q.Set("access_key", c.APIKey)
	u.RawQuery = q.Encode()

	resp, err := http.Get(u.String())
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("fixer api returned status: %d", resp.StatusCode)
	}

	var result FixerLatestResponse
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, err
	}
	return &result, nil
}

func (c *FixerClient) GetSymbols() (*FixerSymbolsResponse, error) {
	u, _ := url.Parse(fmt.Sprintf("%s/symbols", c.BaseURL))
	q := u.Query()
	q.Set("access_key", c.APIKey)
	u.RawQuery = q.Encode()

	resp, err := http.Get(u.String())
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("fixer api returned status: %d", resp.StatusCode)
	}

	var result FixerSymbolsResponse
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, err
	}
	return &result, nil
}
