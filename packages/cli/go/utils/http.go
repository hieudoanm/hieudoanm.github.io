package utils

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

// Get ...
func Get(url string, requestQuery map[string]string) ([]byte, error) {
	// Make the GET request
	resp, err := http.Get(url)
	if err != nil {
		fmt.Println("Error:", err)
		return nil, err
	}
	defer resp.Body.Close() // Ensure response body is closed

	// Read response body
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("Error reading response:", err)
		return nil, err
	}

	fmt.Println("Response Status:", resp.Status)
	fmt.Println("Response Body:", string(body))

	// Return response body
	return body, nil
}

// Post ...
func Post(url string, requestBody map[string]string) ([]byte, error) {
	// JSON payload
	requestData, _ := json.Marshal(requestBody)

	// Create request
	req, _ := http.NewRequest("POST", url, bytes.NewBuffer(requestData))
	req.Header.Set("Content-Type", "application/json")

	// Send request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Request error:", err)
		return nil, err
	}
	defer resp.Body.Close()

	// Read response
	body, _ := io.ReadAll(resp.Body)
	fmt.Println("Response Status:", resp.Status)
	fmt.Println("Response Body:", string(body))

	// Return response body
	return body, nil
}
