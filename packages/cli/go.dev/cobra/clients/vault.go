package libs

import (
	"fmt"
	"net/http"
	"nothing-cli/utils"
)

func GetSecret(token string, endpoint string, path string) []byte {
	var url = fmt.Sprintf("%s/v1/secret/data/%s", endpoint, path)
	var header = http.Header{}
	header.Add("X-Vault-Token", token)
	var options = utils.Options{}
	options.Header = header
	response, getError := utils.Get(url, options)
	if getError != nil {
		fmt.Println("getError", getError)
		return []byte{}
	}
	return response
}

func SetSecret(token string, endpoint string, path string, data map[string]string) []byte {
	var url = fmt.Sprintf("%s/v1/secret/data/%s", endpoint, path)
	var header = http.Header{}
	header.Add("X-Vault-Token", token)
	var options = utils.Options{}
	options.Header = header
	options.Body = data
	response, postError := utils.Post(url, options)
	if postError != nil {
		fmt.Println("postError", postError)
		return []byte{}
	}
	return response
}
