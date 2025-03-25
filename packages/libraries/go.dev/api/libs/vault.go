package libs

import (
	"api/utils"
	"fmt"
	"net/http"
)

func GetSecret(token string, endpoint string, path string) []byte {
	var url = fmt.Sprintf("%s/v1/secret/data/%s", endpoint, path)
	var headers = http.Header{}
	headers.Add("X-Vault-Token", token)
	response, getError := utils.Get(url, headers)
	if getError != nil {
		fmt.Println("getError", getError)
		return []byte{}
	}
	return response
}

func SetSecret(token string, endpoint string, path string, data map[string]string) []byte {
	var url = fmt.Sprintf("%s/v1/secret/data/%s", endpoint, path)
	var headers = http.Header{}
	headers.Add("X-Vault-Token", token)
	response, postError := utils.Post(url, data, headers)
	if postError != nil {
		fmt.Println("postError", postError)
		return []byte{}
	}
	return response
}
