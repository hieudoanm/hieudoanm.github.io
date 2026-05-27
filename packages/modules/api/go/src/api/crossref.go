package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

type Author struct {
	Given  string `json:"given"`
	Family string `json:"family"`
}

type DateParts struct {
	DateParts [][]int `json:"date-parts"`
}

type CrossRefMessage struct {
	Author         []Author  `json:"author"`
	Title          []string  `json:"title"`
	ContainerTitle []string  `json:"container-title"`
	Volume         string    `json:"volume"`
	Issue          string    `json:"issue"`
	Page           string    `json:"page"`
	PublishedPrint *DateParts `json:"published-print"`
	PublishedOnline *DateParts `json:"published-online"`
}

type CrossRefResponse struct {
	Message CrossRefMessage `json:"message"`
}

type Reference struct {
	ID      string
	Authors []Author
	Title   string
	Journal string
	Volume  string
	Issue   string
	Pages   string
	Year    int
	URL     string
}

type CrossRefClient struct {
	BaseURL string
}

func NewCrossRefClient() *CrossRefClient {
	return &CrossRefClient{BaseURL: "https://api.crossref.org"}
}

func (c *CrossRefClient) GetWork(id string) (*Reference, error) {
	client := &http.Client{Timeout: 60 * time.Second}
	url := fmt.Sprintf("%s/works/%s", c.BaseURL, id)
	
	resp, err := client.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("crossref.org API error: %s", resp.Status)
	}

	var data CrossRefResponse
	if err := json.NewDecoder(resp.Body).Decode(&data); err != nil {
		return nil, err
	}

	m := data.Message
	published := m.PublishedPrint
	if published == nil {
		published = m.PublishedOnline
	}
	
	year := 0
	if published != nil && len(published.DateParts) > 0 && len(published.DateParts[0]) > 0 {
		year = published.DateParts[0][0]
	}

	title := ""
	if len(m.Title) > 0 {
		title = m.Title[0]
	}

	journal := ""
	if len(m.ContainerTitle) > 0 {
		journal = m.ContainerTitle[0]
	}

	return &Reference{
		ID:      id,
		Authors: m.Author,
		Title:   title,
		Journal: journal,
		Volume:  m.Volume,
		Issue:   m.Issue,
		Pages:   m.Page,
		Year:    year,
		URL:     fmt.Sprintf("https://doi.org/%s", id),
	}, nil
}
