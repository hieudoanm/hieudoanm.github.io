package api

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"net/url"
)

const baseURL = "https://api.telegram.org/bot"

type ParseMode string

const (
	ParseModeHTML     ParseMode = "html"
	ParseModeMarkdown ParseMode = "markdown"
)

type SetWebhookResponse struct {
	OK          bool   `json:"ok"`
	Result      bool   `json:"result"`
	Description string `json:"description"`
}

type DeleteWebhookResponse struct {
	OK          bool   `json:"ok"`
	Result      bool   `json:"result"`
	Description string `json:"description"`
}

type WebhookInfo struct {
	OK     bool `json:"ok"`
	Result struct {
		URL                  string `json:"url"`
		HasCustomCertificate bool   `json:"has_custom_certificate"`
		PendingUpdateCount   int    `json:"pending_update_count"`
	} `json:"result"`
}

func post(urlStr string, requestBody interface{}) (*http.Response, error) {
	jsonData, err := json.Marshal(requestBody)
	if err != nil {
		return nil, err
	}
	return http.Post(urlStr, "application/json", bytes.NewBuffer(jsonData))
}

func SendMessage(token string, chatID int, message string, parseMode ParseMode) error {
	if token == "" {
		return errors.New("invalid token")
	}
	if chatID == 0 {
		return errors.New("invalid chatID")
	}
	if message == "" {
		return errors.New("invalid message")
	}

	u, _ := url.Parse(fmt.Sprintf("%s%s/sendMessage", baseURL, token))
	params := u.Query()
	params.Set("chat_id", fmt.Sprintf("%d", chatID))
	params.Set("text", message)
	params.Set("parse_mode", string(parseMode))
	u.RawQuery = params.Encode()

	resp, err := http.Get(u.String())
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("api request failed with status: %d", resp.StatusCode)
	}
	return nil
}

func SetWebhook(token, webhookURL string) (*SetWebhookResponse, error) {
	if token == "" {
		return nil, errors.New("invalid token")
	}
	if webhookURL == "" {
		return nil, errors.New("invalid url")
	}

	resp, err := post(fmt.Sprintf("%s%s/setWebhook", baseURL, token), map[string]string{"url": webhookURL})
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var result SetWebhookResponse
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, err
	}
	return &result, nil
}

func DeleteWebhook(token, webhookURL string) (*DeleteWebhookResponse, error) {
	if token == "" {
		return nil, errors.New("invalid token")
	}
	if webhookURL == "" {
		return nil, errors.New("invalid url")
	}

	resp, err := post(fmt.Sprintf("%s%s/deleteWebhook", baseURL, token), map[string]string{"url": webhookURL})
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var result DeleteWebhookResponse
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, err
	}
	return &result, nil
}

func GetWebhookInfo(token string) (*WebhookInfo, error) {
	if token == "" {
		return nil, errors.New("invalid token")
	}

	resp, err := http.Get(fmt.Sprintf("%s%s/getWebhookInfo", baseURL, token))
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var info WebhookInfo
	if err := json.NewDecoder(resp.Body).Decode(&info); err != nil {
		return nil, err
	}
	return &info, nil
}
