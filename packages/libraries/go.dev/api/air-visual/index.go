package airvisual

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

const BASE_URL = "http://api.airvisual.com/v2"

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

type CountriesResponse struct {
	Status string `json:"status"`
	Data   []struct {
		Country string `json:"country"`
	} `json:"data"`
}

func GetCountries(key string) (CountriesResponse, error) {
	var url = fmt.Sprintf("%s/countries?key=%s", BASE_URL, key)

	body, getError := Get(url)
	if getError != nil {
		return CountriesResponse{}, getError
	}

	var countriesResponse CountriesResponse
	jsonUnmarshalError := json.Unmarshal(body, &countriesResponse)
	if jsonUnmarshalError != nil {
		return CountriesResponse{}, jsonUnmarshalError
	}

	return countriesResponse, nil
}

type StatesResponse struct {
	Status string `json:"status"`
	Data   []struct {
		State string `json:"state"`
	} `json:"data"`
}

func GetStates(key string, country string) (StatesResponse, error) {
	var url = fmt.Sprintf("%s/states?key=%s&country=%s", BASE_URL, key, country)

	body, getError := Get(url)
	if getError != nil {
		return StatesResponse{}, getError
	}

	var statesResponse StatesResponse
	jsonUnmarshalError := json.Unmarshal(body, &statesResponse)
	if jsonUnmarshalError != nil {
		return StatesResponse{}, jsonUnmarshalError
	}

	return statesResponse, nil
}

type CitiesResponse struct {
	Status string `json:"status"`
	Data   []struct {
		City string `json:"city"`
	} `json:"data"`
}

func GetCities(key string, country string, state string) (CitiesResponse, error) {
	var url = fmt.Sprintf("%s/cities?key=%s&country=%s&state=%s", BASE_URL, key, country, state)

	body, getError := Get(url)
	if getError != nil {
		return CitiesResponse{}, getError
	}

	var citiesResponse CitiesResponse
	jsonUnmarshalError := json.Unmarshal(body, &citiesResponse)
	if jsonUnmarshalError != nil {
		return CitiesResponse{}, jsonUnmarshalError
	}

	return citiesResponse, nil
}

type ForecastType struct {
	Ts    string `json:"ts"`
	Aqius int    `json:"aquius"`
	Aqicn int    `json:"aquicn"`
	Tp    int    `json:"tp"`
	TpMin int    `json:"tp_min"`
	Pr    int    `json:"pr"`
	Hu    int    `json:"hu"`
	Ws    int    `json:"ws"`
	Wd    int    `json:"wd"`
	Ic    string `json:"ic"`
}

type WeatherType struct {
	Ts string `json:"ts"`
	Tp int    `json:"tp"`
	Pr int    `json:"pr"`
	Hu int    `json:"hu"`
	Ws int    `json:"ws"`
	Wd int    `json:"wd"`
	Ic string `json:"ic"`
}

type PollutionType struct {
	Ts     string `json:"ts"`
	Aqius  int    `json:"aqius"`
	Mainus string `json:"mainus"`
	Aqicn  int    `json:"aqicn"`
	Maincn string `json:"maincn"`
	P2     struct {
		Conc  int `json:"conc"`
		Aqius int `json:"aqius"`
		Aqicn int `json:"aqicn"`
	} `json:"p2"`
	P1 struct {
		Conc  int `json:"conc"`
		Aqius int `json:"aqius"`
		Aqicn int `json:"aqicn"`
	} `json:"p1"`
	O3 struct {
		Conc  int `json:"conc"`
		Aqius int `json:"aqius"`
		Aqicn int `json:"aqicn"`
	} `json:"o3"`
	N2 struct {
		Conc  int `json:"conc"`
		Aqius int `json:"aqius"`
		Aqicn int `json:"aqicn"`
	} `json:"n2"`
	S2 struct {
		Conc  int `json:"conc"`
		Aqius int `json:"aqius"`
		Aqicn int `json:"aqicn"`
	} `json:"s2"`
	CO struct {
		Conc  int `json:"conc"`
		Aqius int `json:"aqius"`
		Aqicn int `json:"aqicn"`
	} `json:"co"`
}

type AirQualityResponse struct {
	Status string `json:"status"`
	Data   struct {
		City     string `json:"city"`
		State    string `json:"state"`
		Country  string `json:"country"`
		Location struct {
			Type        string    `json:"type"`
			Coordinates []float64 `json:"coordinates"`
		} `json:"location"`
		Current struct {
			Weather   WeatherType   `json:"weather"`
			Pollution PollutionType `json:"pollution"`
		} `json:"current"`
		History struct {
			Weather   WeatherType   `json:"weather"`
			Pollution PollutionType `json:"pollution"`
		} `json:"history"`
	} `json:"data"`
}

func GetAirQuality(key string, country string, state string, city string) (AirQualityResponse, error) {
	var url = fmt.Sprintf("%s/city?key=%s&country=%s&state=%s&city=%s", BASE_URL, key, country, state, city)

	body, getError := Get(url)
	if getError != nil {
		return AirQualityResponse{}, getError
	}

	var airQualityResponse AirQualityResponse
	jsonUnmarshalError := json.Unmarshal(body, &airQualityResponse)
	if jsonUnmarshalError != nil {
		return AirQualityResponse{}, jsonUnmarshalError
	}

	return airQualityResponse, nil
}
