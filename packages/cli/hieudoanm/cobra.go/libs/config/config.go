// Package config provides a centralized configuration system.
//
// Configuration is stored in ~/.hieudoanm/config.json.
// Example config file:
//
//	{
//	  "open_router_api_key": "sk-or-v1-...",
//	  "weather_api_key": "...",
//	  "telegram_bot_token": "..."
//	}
package config

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
)

type Config struct {
	OpenRouterAPIKey string `json:"open_router_api_key"`
	WeatherAPIKey    string `json:"weather_api_key"`
	TelegramBotToken string `json:"telegram_bot_token"`
	GithubToken      string `json:"github_token"`
}

var cached *Config

func configPath() (string, error) {
	home, err := os.UserHomeDir()
	if err != nil {
		return "", fmt.Errorf("home dir: %w", err)
	}
	return filepath.Join(home, ".hieudoanm", "config.json"), nil
}

func Load() (*Config, error) {
	if cached != nil {
		return cached, nil
	}

	path, err := configPath()
	if err != nil {
		return nil, err
	}

	data, err := os.ReadFile(path)
	if err != nil {
		if os.IsNotExist(err) {
			cached = &Config{}
			return cached, nil
		}
		return nil, fmt.Errorf("read config: %w", err)
	}

	cfg := &Config{}
	if err := json.Unmarshal(data, cfg); err != nil {
		return nil, fmt.Errorf("parse config: %w", err)
	}
	cached = cfg
	return cfg, nil
}

func OpenRouterKey() string {
	if key := os.Getenv("OPEN_ROUTER_API_KEY"); key != "" {
		return key
	}
	cfg, err := Load()
	if err != nil {
		return ""
	}
	return cfg.OpenRouterAPIKey
}

func WeatherKey() string {
	if key := os.Getenv("WEATHER_API_KEY"); key != "" {
		return key
	}
	cfg, err := Load()
	if err != nil {
		return ""
	}
	return cfg.WeatherAPIKey
}

func TelegramBotToken() string {
	if key := os.Getenv("TELEGRAM_BOT_TOKEN"); key != "" {
		return key
	}
	cfg, err := Load()
	if err != nil {
		return ""
	}
	return cfg.TelegramBotToken
}

func GithubToken() string {
	if key := os.Getenv("GITHUB_TOKEN"); key != "" {
		return key
	}
	cfg, err := Load()
	if err != nil {
		return ""
	}
	return cfg.GithubToken
}
