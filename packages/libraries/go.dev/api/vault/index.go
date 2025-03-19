package vault

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

func Get(url string, headers http.Header) ([]byte, error) {
	client := http.Client{}
	// Set Up Request
	request, requestError := http.NewRequest("GET", url, nil)
	if requestError != nil {
		return nil, requestError
	}
	// Get Headers
	request.Header = headers
	// Response
	response, httpGetError := client.Do(request)
	if httpGetError != nil {
		return nil, httpGetError
	}
	defer response.Body.Close()
	// Convert []byte
	body, readBodyError := io.ReadAll(response.Body)
	if readBodyError != nil {
		return nil, readBodyError
	}

	return body, nil
}

func Post(url string, requestBody map[string]string, headers http.Header) ([]byte, error) {
	client := http.Client{}
	// Json Parse
	jsonData, jsonMarshalError := json.Marshal(requestBody)
	if jsonMarshalError != nil {
		return nil, jsonMarshalError
	}
	// Set Up Request
	request, requestError := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	if requestError != nil {
		return nil, requestError
	}
	// Get Headers
	request.Header = headers
	// Response
	response, httpGetError := client.Do(request)
	if httpGetError != nil {
		return nil, httpGetError
	}
	defer response.Body.Close()
	// Convert []byte
	body, readBodyError := io.ReadAll(response.Body)
	if readBodyError != nil {
		return nil, readBodyError
	}

	return body, nil
}

func GetSecret(token string, endpoint string, path string) []byte {
	var url = fmt.Sprintf("%s/v1/secret/data/%s", endpoint, path)
	var headers = http.Header{}
	headers.Add("X-Vault-Token", token)
	response, getError := Get(url, headers)
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
	response, postError := Post(url, data, headers)
	if postError != nil {
		fmt.Println("postError", postError)
		return []byte{}
	}
	return response
}
