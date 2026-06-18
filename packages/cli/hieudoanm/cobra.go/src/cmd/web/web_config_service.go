package web

import "os"

func WeatherKey() string {
	return os.Getenv("WEATHER_API_KEY")
}
