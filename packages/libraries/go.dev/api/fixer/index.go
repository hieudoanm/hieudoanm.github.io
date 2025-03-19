package fixer

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

const BASE_URL = "http://data.fixer.io/api"

func Get(url string) ([]byte, error) {
	response, httpGetError := http.Get(url)
	if httpGetError != nil {
		return nil, httpGetError
	}
	defer response.Body.Close()

	body, readBodyError := io.ReadAll(response.Body)
	if readBodyError != nil {
		return nil, readBodyError
	}

	return body, nil
}

type LatestResponse struct {
	Success   bool               `json:"success"`
	Timestamp int                `json:"timestamp"`
	Base      string             `json:"base"`
	Date      string             `json:"date"`
	Rates     map[string]float64 `json:"rates"`
}

func GetLatest(accessKey string) (LatestResponse, error) {
	var url string = fmt.Sprintf("%s/latest?access_key=%s", BASE_URL, accessKey)

	body, getError := Get(url)
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
	var url string = fmt.Sprintf("%s/symbols?access_key=%s", BASE_URL, accessKey)

	body, getError := Get(url)
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
