// Package libs ...
package libs

import (
	"io"
	"log"
	"net/http"
)

// ApplicationJSON ...
const ApplicationJSON string = "application/json"

// GetRequest ...
func GetRequest(url string) []byte {
	request, requestError := http.NewRequest(
		http.MethodGet, // method
		url,            // url
		nil,            // body
	)
	if requestError != nil {
		log.Printf("GetRequest requestError=%v", requestError)
	}

	request.Header.Add("Accept", ApplicationJSON)
	request.Header.Add("Content-Type", ApplicationJSON)

	response, responseError := http.DefaultClient.Do(request)
	if responseError != nil {
		log.Printf("GetRequest responseError=%v", responseError)
	}

	bytes, bytesError := io.ReadAll(response.Body)
	if bytesError != nil {
		log.Printf("GetRequest bytesError=%v", bytesError)
	}

	return bytes
}

// PostRequest ...
func PostRequest(url string, body io.Reader) []byte {
	request, requestError := http.NewRequest(
		http.MethodPost, // method
		url,             // url
		body,            // body
	)
	if requestError != nil {
		log.Printf("PostRequest requestError=%v", requestError)
	}

	request.Header.Add("Accept", ApplicationJSON)
	request.Header.Add("Content-Type", ApplicationJSON)

	response, responseError := http.DefaultClient.Do(request)
	if responseError != nil {
		log.Printf("PostRequest responseError=%v", responseError)
	}

	bytes, bytesError := io.ReadAll(response.Body)
	if bytesError != nil {
		log.Printf("PostRequest bytesError=%v", bytesError)
	}

	return bytes
}
