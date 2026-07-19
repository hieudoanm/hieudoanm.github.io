package lichess

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"strconv"
)

type CloudEvaluation struct {
	Fen   string `json:"fen"`
	Pvs   []Pv   `json:"pvs"`
	Depth int    `json:"depth"`
}

type Pv struct {
	Moves string `json:"moves"`
	Cp    int    `json:"cp"`
	Mate  int    `json:"mate"`
}

type LichessClient struct {
	BaseURL string
}

func NewLichessClient() *LichessClient {
	return &LichessClient{BaseURL: "https://lichess.org"}
}

func (c *LichessClient) GetCloudEvaluation(fen string, multiPv int, variant string) (*CloudEvaluation, error) {
	u, _ := url.Parse(fmt.Sprintf("%s/api/cloud-eval", c.BaseURL))
	q := u.Query()
	q.Set("fen", fen)
	q.Set("multiPv", strconv.Itoa(multiPv))
	q.Set("variant", variant)
	u.RawQuery = q.Encode()

	resp, err := http.Get(u.String())
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("lichess api returned status: %d", resp.StatusCode)
	}

	var result CloudEvaluation
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, err
	}
	return &result, nil
}
