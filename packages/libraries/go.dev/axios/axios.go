package axios

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"
)

// Get ...
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

// Post ...
func Post(url string, requestBody map[string]string) ([]byte, error) {
	jsonData, jsonMarshalError := json.Marshal(requestBody)
	if jsonMarshalError != nil {
		return nil, jsonMarshalError
	}

	response, httpPostError := http.Post(url, "application/json", bytes.NewBuffer(jsonData))
	if httpPostError != nil {
		return nil, httpPostError
	}
	defer response.Body.Close()

	body, readBodyError := io.ReadAll(response.Body)
	if readBodyError != nil {
		return nil, readBodyError
	}

	return body, nil
}

// Patch ...
func Patch(url string, requestBody map[string]string) ([]byte, error) {
	jsonData, jsonMarshalError := json.Marshal(requestBody)
	if jsonMarshalError != nil {
		return nil, jsonMarshalError
	}

	request, requestError := http.NewRequest(http.MethodPatch, url, bytes.NewBuffer(jsonData))
	if requestError != nil {
		return nil, requestError
	}

	client := &http.Client{}
	response, responseError := client.Do(request)
	if responseError != nil {
		return nil, responseError
	}
	defer response.Body.Close()

	body, readBodyError := io.ReadAll(response.Body)
	if readBodyError != nil {
		return nil, readBodyError
	}

	return body, nil
}

// Put ...
func Put(url string, requestBody map[string]string) ([]byte, error) {
	jsonData, jsonMarshalError := json.Marshal(requestBody)
	if jsonMarshalError != nil {
		return nil, jsonMarshalError
	}

	request, requestError := http.NewRequest(http.MethodPut, url, bytes.NewBuffer(jsonData))
	if requestError != nil {
		return nil, requestError
	}

	client := &http.Client{}
	response, responseError := client.Do(request)
	if responseError != nil {
		return nil, responseError
	}
	defer response.Body.Close()

	body, readBodyError := io.ReadAll(response.Body)
	if readBodyError != nil {
		return nil, readBodyError
	}

	return body, nil
}

// Delete ...
func Delete(url string, requestBody map[string]string) ([]byte, error) {
	jsonData, jsonMarshalError := json.Marshal(requestBody)
	if jsonMarshalError != nil {
		return nil, jsonMarshalError
	}

	request, requestError := http.NewRequest(http.MethodDelete, url, bytes.NewBuffer(jsonData))
	if requestError != nil {
		return nil, requestError
	}

	client := &http.Client{}
	response, responseError := client.Do(request)
	if responseError != nil {
		return nil, responseError
	}
	defer response.Body.Close()

	body, readBodyError := io.ReadAll(response.Body)
	if readBodyError != nil {
		return nil, readBodyError
	}

	return body, nil
}
