package footballdata

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type Competition struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Code        string `json:"code"`
	Type        string `json:"type"`
	Emblem      string `json:"emblem"`
	Plan        string `json:"plan"`
	LastUpdated string `json:"lastUpdated"`
}

type Team struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	ShortName   string `json:"shortName"`
	TLA         string `json:"tla"`
	Crest       string `json:"crest"`
	Address     string `json:"address"`
	Website     string `json:"website"`
	Founded     int    `json:"founded"`
	ClubColors  string `json:"clubColors"`
	Venue       string `json:"venue"`
	LastUpdated string `json:"lastUpdated"`
}

type FootballDataClient struct {
	BaseURL   string
	AuthToken string
}

func NewFootballDataClient(authToken string) *FootballDataClient {
	return &FootballDataClient{
		BaseURL:   "https://api.football-data.org/v4",
		AuthToken: authToken,
	}
}

func (c *FootballDataClient) doRequest(path string) (*http.Response, error) {
	req, err := http.NewRequest("GET", c.BaseURL+path, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("X-Auth-Token", c.AuthToken)
	return http.DefaultClient.Do(req)
}

func (c *FootballDataClient) GetCompetitions() (map[string]interface{}, error) {
	resp, err := c.doRequest("/competitions")
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("football-data api returned status: %d", resp.StatusCode)
	}

	var result map[string]interface{}
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, err
	}
	return result, nil
}
