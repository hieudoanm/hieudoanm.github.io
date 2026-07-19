package airvisual

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
)

var AirVisualBaseURL = "http://api.airvisual.com/v2"

type AirQuality struct {
	Status string `json:"status"`
	Data   struct {
		City     string `json:"city"`
		State    string `json:"state"`
		Country  string `json:"country"`
		Location struct {
			Type        string    `json:"type"`
			Coordinates []float64 `json:"coordinates"`
		} `json:"location"`
		Current struct {
			Pollution struct {
				Aqius  int    `json:"aqius"`
				Mainus string `json:"mainus"`
			} `json:"pollution"`
		} `json:"current"`
	} `json:"data"`
}

type CountriesResponse struct {
	Status string `json:"status"`
	Data   []struct {
		Country string `json:"country"`
	} `json:"data"`
}

func GetCountries(apiKey string) (*CountriesResponse, error) {
	u, _ := url.Parse(fmt.Sprintf("%s/countries", AirVisualBaseURL))
	q := u.Query()
	q.Set("key", apiKey)
	u.RawQuery = q.Encode()

	resp, err := http.Get(u.String())
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var result CountriesResponse
	err = json.NewDecoder(resp.Body).Decode(&result)
	return &result, err
}
