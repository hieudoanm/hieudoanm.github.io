package openweathermap

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestGetWeather(t *testing.T) {
	t.Run("success", func(t *testing.T) {
		ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if r.URL.Path != "/data/2.5/weather" {
				t.Errorf("expected /data/2.5/weather, got %s", r.URL.Path)
			}
			q := r.URL.Query()
			if q.Get("q") != "London" {
				t.Errorf("expected q=London, got %s", q.Get("q"))
			}
			if q.Get("lang") != "vi" {
				t.Errorf("expected lang=vi, got %s", q.Get("lang"))
			}
			if q.Get("units") != "metric" {
				t.Errorf("expected units=metric, got %s", q.Get("units"))
			}
			if q.Get("appid") != "test-key" {
				t.Errorf("expected appid=test-key, got %s", q.Get("appid"))
			}
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(OpenWeather{
				Name: "London",
				Main: Main{Temp: 15.5, Humidity: 72},
				Weather: []struct {
					ID          int    `json:"id"`
					Main        string `json:"main"`
					Description string `json:"description"`
					Icon        string `json:"icon"`
				}{{ID: 800, Main: "Clear", Description: "clear sky", Icon: "01d"}},
			})
		}))
		defer ts.Close()

		orig := OpenWeatherBaseURL
		OpenWeatherBaseURL = ts.URL + "/data/2.5/weather"
		defer func() { OpenWeatherBaseURL = orig }()

		result, err := GetWeather("test-key", "London")
		if err != nil {
			t.Fatal(err)
		}
		if result.Name != "London" {
			t.Errorf("expected London, got %s", result.Name)
		}
		if result.Main.Temp != 15.5 {
			t.Errorf("expected temp 15.5, got %f", result.Main.Temp)
		}
		if result.Main.Humidity != 72 {
			t.Errorf("expected humidity 72, got %d", result.Main.Humidity)
		}
		if len(result.Weather) != 1 || result.Weather[0].Description != "clear sky" {
			t.Errorf("unexpected weather: %+v", result.Weather)
		}
	})

	t.Run("error status", func(t *testing.T) {
		ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.WriteHeader(http.StatusNotFound)
		}))
		defer ts.Close()

		orig := OpenWeatherBaseURL
		OpenWeatherBaseURL = ts.URL + "/data/2.5/weather"
		defer func() { OpenWeatherBaseURL = orig }()

		_, err := GetWeather("test-key", "Nowhere")
		if err == nil {
			t.Fatal("expected error")
		}
	})
}
