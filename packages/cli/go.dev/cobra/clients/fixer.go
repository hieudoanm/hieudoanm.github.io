package libs

import (
	"encoding/json"
	"fmt"
	"nothing-cli/utils"
)

const FIXER_BASE_URL = "http://data.fixer.io/api"

type LatestResponse struct {
	Success   bool               `json:"success"`
	Timestamp int                `json:"timestamp"`
	Base      string             `json:"base"`
	Date      string             `json:"date"`
	Rates     map[string]float64 `json:"rates"`
}

func GetLatest(accessKey string) (LatestResponse, error) {
	var url string = fmt.Sprintf("%s/latest?access_key=%s", FIXER_BASE_URL, accessKey)

	body, getError := utils.Get(url, utils.Options{})
	if getError != nil {
		return LatestResponse{}, getError
	}

	var latestResponse LatestResponse
	jsonUnmarshalError := json.Unmarshal(body, &latestResponse)
	if jsonUnmarshalError != nil {
		return LatestResponse{}, jsonUnmarshalError
	}

	return latestResponse, nil
}

type SymbolsResponse struct {
	Success bool              `json:"success"`
	Symbols map[string]string `json:"symbols"`
}

func GetSymbols(accessKey string) (SymbolsResponse, error) {
	var url string = fmt.Sprintf("%s/symbols?access_key=%s", FIXER_BASE_URL, accessKey)

	body, getError := utils.Get(url, utils.Options{})
	if getError != nil {
		return SymbolsResponse{}, getError
	}

	var symbolsResponse SymbolsResponse
	jsonUnmarshalError := json.Unmarshal(body, &symbolsResponse)
	if jsonUnmarshalError != nil {
		return SymbolsResponse{}, jsonUnmarshalError
	}

	return symbolsResponse, nil
}
