package newsapi

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"strconv"
	"strings"
)

var NewsAPIBaseURL = "https://newsapi.org/v2"

type Article struct {
	Source struct {
		ID   string `json:"id"`
		Name string `json:"name"`
	} `json:"source"`
	Author      string `json:"author"`
	Title       string `json:"title"`
	Description string `json:"description"`
	URL         string `json:"url"`
	PublishedAt string `json:"publishedAt"`
}

type ArticleResponse struct {
	Status       string    `json:"status"`
	TotalResults int       `json:"totalResults"`
	Articles     []Article `json:"articles"`
}

type TopHeadlinesRequest struct {
	Category string
	Country  string
	Page     int
	PageSize int
	Query    string
	Sources  []string
}

func GetTopHeadlines(apiKey string, req TopHeadlinesRequest) (*ArticleResponse, error) {
	u, _ := url.Parse(fmt.Sprintf("%s/top-headlines", NewsAPIBaseURL))
	q := u.Query()
	q.Set("category", req.Category)
	q.Set("country", req.Country)
	if req.Page > 0 {
		q.Set("page", strconv.Itoa(req.Page))
	}
	if req.PageSize > 0 {
		q.Set("pageSize", strconv.Itoa(req.PageSize))
	}
	if req.Query != "" {
		q.Set("q", req.Query)
	}
	if len(req.Sources) > 0 {
		q.Set("sources", strings.Join(req.Sources, ","))
	}
	u.RawQuery = q.Encode()

	reqHttp, _ := http.NewRequest("GET", u.String(), nil)
	reqHttp.Header.Set("X-Api-Key", apiKey)

	client := &http.Client{}
	resp, err := client.Do(reqHttp)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var result ArticleResponse
	err = json.NewDecoder(resp.Body).Decode(&result)
	return &result, err
}
