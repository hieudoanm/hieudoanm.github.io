package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"strconv"
	"strings"
)

const FrankfurterBaseURL = "https://api.frankfurter.app"

type FrankfurterLatestRequest struct {
	Amount float64
	Base   string
	To     []string
}

type FrankfurterLatestResponse struct {
	Amount float64            `json:"amount"`
	Base   string             `json:"base"`
	Date   string             `json:"date"`
	Rates  map[string]float64 `json:"rates"`
}

type CurrenciesResponse map[string]string

func GetLatest(req FrankfurterLatestRequest) (*FrankfurterLatestResponse, error) {
	u, _ := url.Parse(fmt.Sprintf("%s/latest", FrankfurterBaseURL))
	q := u.Query()
	q.Set("amount", strconv.FormatFloat(req.Amount, 'f', -1, 64))
	q.Set("from", req.Base)
	if len(req.To) > 0 {
		q.Set("to", strings.Join(req.To, ","))
	}
	u.RawQuery = q.Encode()

	resp, err := http.Get(u.String())
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var result FrankfurterLatestResponse
	err = json.NewDecoder(resp.Body).Decode(&result)
	return &result, err
}

func GetCurrencies() (CurrenciesResponse, error) {
	resp, err := http.Get(fmt.Sprintf("%s/currencies", FrankfurterBaseURL))
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var result CurrenciesResponse
	err = json.NewDecoder(resp.Body).Decode(&result)
	return result, err
}
