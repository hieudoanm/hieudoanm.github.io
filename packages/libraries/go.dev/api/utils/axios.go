package utils

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"
)

func Get(url string, headers http.Header) ([]byte, error) {
	// Set Up Request
	request, requestError := http.NewRequest("GET", url, nil)
	if requestError != nil {
		return nil, requestError
	}
	// Get Headers
	request.Header = headers
	// Response
	client := http.Client{}
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

// Patch ...
func Patch(url string, requestBody map[string]string, headers http.Header) ([]byte, error) {
	jsonData, jsonMarshalError := json.Marshal(requestBody)
	if jsonMarshalError != nil {
		return nil, jsonMarshalError
	}

	request, requestError := http.NewRequest(http.MethodPatch, url, bytes.NewBuffer(jsonData))
	if requestError != nil {
		return nil, requestError
	}
	// Get Headers
	request.Header = headers
	// Response
	client := &http.Client{}
	response, responseError := client.Do(request)
	if responseError != nil {
		return nil, responseError
	}
	defer response.Body.Close()
	// Convert []byte
	body, readBodyError := io.ReadAll(response.Body)
	if readBodyError != nil {
		return nil, readBodyError
	}
	// Return
	return body, nil
}

// Put ...
func Put(url string, requestBody map[string]string, headers http.Header) ([]byte, error) {
	jsonData, jsonMarshalError := json.Marshal(requestBody)
	if jsonMarshalError != nil {
		return nil, jsonMarshalError
	}

	request, requestError := http.NewRequest(http.MethodPut, url, bytes.NewBuffer(jsonData))
	if requestError != nil {
		return nil, requestError
	}
	// Get Headers
	request.Header = headers
	// Response
	client := &http.Client{}
	response, responseError := client.Do(request)
	if responseError != nil {
		return nil, responseError
	}
	defer response.Body.Close()
	// Convert []byte
	body, readBodyError := io.ReadAll(response.Body)
	if readBodyError != nil {
		return nil, readBodyError
	}
	// Return
	return body, nil
}

// Delete ...
func Delete(url string, requestBody map[string]string, headers http.Header) ([]byte, error) {
	jsonData, jsonMarshalError := json.Marshal(requestBody)
	if jsonMarshalError != nil {
		return nil, jsonMarshalError
	}

	request, requestError := http.NewRequest(http.MethodDelete, url, bytes.NewBuffer(jsonData))
	if requestError != nil {
		return nil, requestError
	}
	// Get Headers
	request.Header = headers
	// Response
	client := &http.Client{}
	response, responseError := client.Do(request)
	if responseError != nil {
		return nil, responseError
	}
	defer response.Body.Close()
	// Convert []byte
	body, readBodyError := io.ReadAll(response.Body)
	if readBodyError != nil {
		return nil, readBodyError
	}
	// Return
	return body, nil
}
