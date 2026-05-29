package http

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

const CONTENT_TYPE_HEADER = "Content-Type"
const CONTENT_TYPE_APPLICATION_JSON = "application/json"
const RESPONSE_ERROR = "Response Error"
const RESPONSE_STATUS = "Response Status"
const RESPONSE_BODY = "Response Body"

// Options
type Options struct {
	Header http.Header
	Query  map[string]string
	Body   map[string]interface{}
	Debug  bool
}

func debugLog(debug bool, label string, value interface{}) {
	if debug {
		fmt.Printf("%s: %+v\n", label, value)
	}
}

func setHeadersAndQuery(req *http.Request, options Options) {
	if options.Header != nil {
		req.Header = options.Header
	}
	if options.Query != nil {
		q := req.URL.Query()
		for k, v := range options.Query {
			q.Add(k, v)
		}
		req.URL.RawQuery = q.Encode()
	}
}

// Get ...
func Get(url string, options Options) ([]byte, error) {
	request, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}

	setHeadersAndQuery(request, options)

	client := &http.Client{}
	response, err := client.Do(request)
	if err != nil {
		return nil, err
	}
	defer response.Body.Close()

	body, err := io.ReadAll(response.Body)
	if err != nil {
		debugLog(options.Debug, RESPONSE_ERROR, err)
		return nil, err
	}

	debugLog(options.Debug, RESPONSE_STATUS, response.Status)
	debugLog(options.Debug, RESPONSE_BODY, string(body))
	return body, nil
}

// Post ...
func Post(url string, options Options) ([]byte, error) {
	requestData, err := json.Marshal(options.Body)
	if err != nil {
		return nil, err
	}

	request, err := http.NewRequest("POST", url, bytes.NewBuffer(requestData))
	if err != nil {
		return nil, err
	}

	setHeadersAndQuery(request, options)
	request.Header.Set(CONTENT_TYPE_HEADER, CONTENT_TYPE_APPLICATION_JSON)

	client := &http.Client{}
	response, err := client.Do(request)
	if err != nil {
		return nil, err
	}
	defer response.Body.Close()

	body, err := io.ReadAll(response.Body)
	if err != nil {
		debugLog(options.Debug, RESPONSE_ERROR, err)
		return nil, err
	}

	debugLog(options.Debug, RESPONSE_STATUS, response.Status)
	debugLog(options.Debug, RESPONSE_BODY, string(body))
	return body, nil
}

// Put ...
func Put(url string, options Options) ([]byte, error) {
	requestData, err := json.Marshal(options.Body)
	if err != nil {
		return nil, err
	}

	request, err := http.NewRequest("PUT", url, bytes.NewBuffer(requestData))
	if err != nil {
		return nil, err
	}

	setHeadersAndQuery(request, options)
	request.Header.Set(CONTENT_TYPE_HEADER, CONTENT_TYPE_APPLICATION_JSON)

	client := &http.Client{}
	response, err := client.Do(request)
	if err != nil {
		return nil, err
	}
	defer response.Body.Close()

	body, err := io.ReadAll(response.Body)
	if err != nil {
		debugLog(options.Debug, RESPONSE_ERROR, err)
		return nil, err
	}

	debugLog(options.Debug, RESPONSE_STATUS, response.Status)
	debugLog(options.Debug, RESPONSE_BODY, string(body))
	return body, nil
}

// Delete ...
func Delete(url string, options Options) ([]byte, error) {
	requestData, err := json.Marshal(options.Body)
	if err != nil {
		return nil, err
	}

	request, err := http.NewRequest("DELETE", url, bytes.NewBuffer(requestData))
	if err != nil {
		return nil, err
	}

	setHeadersAndQuery(request, options)
	request.Header.Set(CONTENT_TYPE_HEADER, CONTENT_TYPE_APPLICATION_JSON)

	client := &http.Client{}
	response, err := client.Do(request)
	if err != nil {
		return nil, err
	}
	defer response.Body.Close()

	body, err := io.ReadAll(response.Body)
	if err != nil {
		debugLog(options.Debug, RESPONSE_ERROR, err)
		return nil, err
	}

	debugLog(options.Debug, RESPONSE_STATUS, response.Status)
	debugLog(options.Debug, RESPONSE_BODY, string(body))
	return body, nil
}
