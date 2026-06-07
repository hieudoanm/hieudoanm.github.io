package doi

import (
	"encoding/json"
	"fmt"

	"github.com/AlecAivazis/survey/v2"
	"github.com/hieudoanm/jack/src/libs/requests"
)

func resolveDOI(args []string) (string, error) {
	if len(args) > 0 {
		return args[0], nil
	}
	var id string
	prompt := &survey.Input{Message: "DOI ID:"}
	if err := survey.AskOne(prompt, &id); err != nil {
		return "", err
	}
	return id, nil
}

func fetchCrossref(id string) (CrossRefData, error) {
	url := fmt.Sprintf("https://api.crossref.org/works/%s", id)
	response, err := requests.Get(url, requests.Options{})
	if err != nil {
		return CrossRefData{}, fmt.Errorf("fetch error: %w", err)
	}
	var data CrossRefData
	if err := json.Unmarshal(response, &data); err != nil {
		return CrossRefData{}, fmt.Errorf("parse error: %w", err)
	}
	return data, nil
}
