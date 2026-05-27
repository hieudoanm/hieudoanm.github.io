package api

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type ChessClient struct {
	BaseURL string
}

func NewChessClient() *ChessClient {
	return &ChessClient{BaseURL: "https://api.chess.com/pub"}
}

type PlayersResponse struct {
	Players []string `json:"players"`
}

func (c *ChessClient) GetPlayers(title string) ([]string, error) {
	url := fmt.Sprintf("%s/titled/%s", c.BaseURL, title)
	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("chess.com API error: %s", resp.Status)
	}

	var result PlayersResponse
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, err
	}
	return result.Players, nil
}

func (c *ChessClient) GetPlayer(player string) (map[string]interface{}, error) {
	url := fmt.Sprintf("%s/player/%s", c.BaseURL, player)
	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("chess.com API error: %s", resp.Status)
	}

	var result map[string]interface{}
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, err
	}
	return result, nil
}

func (c *ChessClient) GetStats(player string) (map[string]interface{}, error) {
	url := fmt.Sprintf("%s/player/%s/stats", c.BaseURL, player)
	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("chess.com API error: %s", resp.Status)
	}

	var result map[string]interface{}
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, err
	}
	return result, nil
}
