package convert

import (
	"github.com/AlecAivazis/survey/v2"
)

func resolveText(args []string) (string, error) {
	if len(args) > 0 {
		return args[0], nil
	}
	var text string
	prompt := &survey.Input{Message: "Text:"}
	if err := survey.AskOne(prompt, &text); err != nil {
		return "", err
	}
	return text, nil
}
