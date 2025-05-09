package libs

import (
	"encoding/json"
	"fmt"
	"net/http"
	"nothing-cli/utils"
)

const FOOTBALL_DATA_BASE_URL = "https://api.football-data.org/v4"
const X_AUTH_TOKEN_HEADER = "X-Auth-Token"

type Competition struct {
	Id                       int    `json:"id"`
	Name                     string `json:"name"`
	Code                     string `json:"code"`
	Type                     string `json:"type"`
	Emblem                   string `json:"emblem"`
	Plan                     string `json:"plan"`
	NumberOfAvailableSeasons int    `json:"numberOfAvailableSeasons"`
	LastUpdated              string `json:"lastUpdated"`
	Area                     struct {
		Id   int    `json:"id"`
		Name string `json:"name"`
		Code string `json:"code"`
		Flag string `json:"flag"`
	} `json:"area"`
	CurrentSeason struct {
		Id              int    `json:"id"`
		StartDate       string `json:"startDate"`
		EndDate         string `json:"endDate"`
		CurrentMatchday string `json:"currentMatchday"`
	} `json:"currentSeason"`
}

type CompetitionsResponse struct {
	Count        int           `json:"count"`
	Competitions []Competition `json:"competitions"`
}

func GetCompetitions(authToken string) (CompetitionsResponse, error) {
	var url = fmt.Sprintf("%s/competitions", FOOTBALL_DATA_BASE_URL)
	var header = http.Header{}
	header.Add(X_AUTH_TOKEN_HEADER, authToken)
	var options = utils.Options{}
	options.Header = header
	// Get
	body, getError := utils.Get(url, options)
	if getError != nil {
		return CompetitionsResponse{}, getError
	}
	// Competitions
	var competitionsResponse CompetitionsResponse
	jsonUnmarshalError := json.Unmarshal(body, &competitionsResponse)
	if jsonUnmarshalError != nil {
		return CompetitionsResponse{}, jsonUnmarshalError
	}

	return competitionsResponse, nil
}

func GetCompetition(authToken string, id int) (Competition, error) {
	var url = fmt.Sprintf("%s/competitions/%d", FOOTBALL_DATA_BASE_URL, id)
	var header = http.Header{}
	header.Add(X_AUTH_TOKEN_HEADER, authToken)
	var options = utils.Options{}
	options.Header = header
	// Get
	body, getError := utils.Get(url, options)
	if getError != nil {
		return Competition{}, getError
	}
	// Competition
	var competitionResponse Competition
	jsonUnmarshalError := json.Unmarshal(body, &competitionResponse)
	if jsonUnmarshalError != nil {
		return Competition{}, jsonUnmarshalError
	}

	return competitionResponse, nil
}

type Team struct {
	Id          int    `json:"id"`
	Name        string `json:"name"`
	ShortName   string `json:"shortName"`
	Tla         string `json:"tla"`
	Crest       string `json:"crest"`
	Address     string `json:"address"`
	Website     string `json:"website"`
	Founded     int    `json:"founded"`
	ClubColors  string `json:"clubColors"`
	Venue       string `json:"venue"`
	LastUpdated string `json:"lastUpdated"`
}

type TeamsResponse struct {
	Count int    `json:"count"`
	Teams []Team `json:"teams"`
}

func GetTeamsByCompetition(authToken string, id int) (TeamsResponse, error) {
	var url = fmt.Sprintf("%s/competitions/%d/teams", FOOTBALL_DATA_BASE_URL, id)
	var header = http.Header{}
	header.Add(X_AUTH_TOKEN_HEADER, authToken)
	var options = utils.Options{}
	options.Header = header
	// Get
	body, getError := utils.Get(url, options)
	if getError != nil {
		return TeamsResponse{}, getError
	}
	// Teams By Competition
	var teamsResponse TeamsResponse
	jsonUnmarshalError := json.Unmarshal(body, &teamsResponse)
	if jsonUnmarshalError != nil {
		return TeamsResponse{}, jsonUnmarshalError
	}

	return teamsResponse, nil
}

func GetTeams(authToken string) (TeamsResponse, error) {
	var url = fmt.Sprintf("%s/teams", FOOTBALL_DATA_BASE_URL)
	var header = http.Header{}
	header.Add(X_AUTH_TOKEN_HEADER, authToken)
	var options = utils.Options{}
	options.Header = header
	// Get
	body, getError := utils.Get(url, options)
	if getError != nil {
		return TeamsResponse{}, getError
	}
	// Teams
	var teamsResponse TeamsResponse
	jsonUnmarshalError := json.Unmarshal(body, &teamsResponse)
	if jsonUnmarshalError != nil {
		return TeamsResponse{}, jsonUnmarshalError
	}

	return teamsResponse, nil
}

func GetTeam(authToken string, id int) (Team, error) {
	var url = fmt.Sprintf("%s/teams/%d", FOOTBALL_DATA_BASE_URL, id)
	var header = http.Header{}
	header.Add(X_AUTH_TOKEN_HEADER, authToken)
	var options = utils.Options{}
	options.Header = header
	// Get
	body, getError := utils.Get(url, options)
	if getError != nil {
		return Team{}, getError
	}
	// Team
	var teamResponse Team
	jsonUnmarshalError := json.Unmarshal(body, &teamResponse)
	if jsonUnmarshalError != nil {
		return Team{}, jsonUnmarshalError
	}

	return teamResponse, nil
}

type Match struct {
	Id          int    `json:"id"`
	UtcDate     string `json:"utcDate"`
	Status      string `json:"status"`
	Venue       string `json:"venue"`
	Matchday    int    `json:"matchday"`
	Stage       string `json:"stage"`
	LastUpdated string `json:"lastUpdated"`
	HomeTeam    struct {
		Id        int    `json:"id"`
		Name      string `json:"name"`
		ShortName string `json:"shortName"`
		Crest     string `json:"crest"`
	} `json:"homeTeam"`
	AwayTeam struct {
		Id        int    `json:"id"`
		Name      string `json:"name"`
		ShortName string `json:"shortName"`
		Crest     string `json:"crest"`
	} `json:"awayTeam"`
	Score struct {
		FullTime struct {
			Home int `json:"home"`
			Away int `json:"away"`
		} `json:"fullTime"`
		HalfTime struct {
			Home int `json:"home"`
			Away int `json:"away"`
		} `json:"halfTime"`
	} `json:"score"`
}

type MatchesResponse struct {
	Count   int     `json:"count"`
	Matches []Match `json:"matches"`
}

func GetMatchesByTeam(authToken string, id int) (MatchesResponse, error) {
	var url = fmt.Sprintf("%s/teams/%d/matches", FOOTBALL_DATA_BASE_URL, id)
	var header = http.Header{}
	header.Add(X_AUTH_TOKEN_HEADER, authToken)
	var options = utils.Options{}
	options.Header = header
	// Get
	body, getError := utils.Get(url, options)
	if getError != nil {
		return MatchesResponse{}, getError
	}
	// Team
	var matchesResponse MatchesResponse
	jsonUnmarshalError := json.Unmarshal(body, &matchesResponse)
	if jsonUnmarshalError != nil {
		return MatchesResponse{}, jsonUnmarshalError
	}

	return matchesResponse, nil
}
