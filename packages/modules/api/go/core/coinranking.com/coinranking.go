package coinranking

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
)

type CoinRankingStats struct {
	Total          int    `json:"total"`
	TotalCoins     int    `json:"totalCoins"`
	TotalMarkets   int    `json:"totalMarkets"`
	TotalExchanges int    `json:"totalExchanges"`
	TotalMarketCap string `json:"totalMarketCap"`
	Total24hVolume string `json:"total24hVolume"`
}

type Coin struct {
	UUID           string   `json:"uuid"`
	Symbol         string   `json:"symbol"`
	Name           string   `json:"name"`
	Color          string   `json:"color"`
	IconURL        string   `json:"iconUrl"`
	MarketCap      string   `json:"marketCap"`
	Price          string   `json:"price"`
	ListedAt       int      `json:"listedAt"`
	Tier           int      `json:"tier"`
	Change         string   `json:"change"`
	Rank           int      `json:"rank"`
	Sparkline      []string `json:"sparkline"`
	LowVolume      bool     `json:"lowVolume"`
	CoinrankingURL string   `json:"coinrankingUrl"`
	Volume24h      string   `json:"24hVolume"`
	BTCPrice       float64  `json:"btcPrice"`
}

type CoinRankingData struct {
	Stats CoinRankingStats `json:"stats"`
	Coins []Coin           `json:"coins"`
}

type CoinRankingResponse struct {
	Status string          `json:"status"`
	Data   CoinRankingData `json:"data"`
}

type CoinRankingClient struct {
	BaseURL string
}

func NewCoinRankingClient() *CoinRankingClient {
	return &CoinRankingClient{BaseURL: "https://api.coinranking.com"}
}

func (c *CoinRankingClient) GetCoins(tag string) (*CoinRankingResponse, error) {
	u, _ := url.Parse(fmt.Sprintf("%s/v2/coins", c.BaseURL))
	if tag != "" {
		q := u.Query()
		q.Set("tags", tag)
		u.RawQuery = q.Encode()
	}

	resp, err := http.Get(u.String())
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("coinranking.com API error: %s", resp.Status)
	}

	var result CoinRankingResponse
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, err
	}
	return &result, nil
}
