package status

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestGetStatus(t *testing.T) {
	expectedResponse := Response{
		Page: Page{
			Id:   "abc",
			Name: "Test Page",
			Url:  "https://test.com",
		},
		Status: Status{
			Indicator:   "none",
			Description: "All Systems Operational",
		},
	}

	ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(expectedResponse)
	}))
	defer ts.Close()

	resp, err := GetStatus(ts.URL, false)
	if err != nil {
		t.Fatalf("GetStatus failed: %v", err)
	}

	if resp.Page.Name != expectedResponse.Page.Name {
		t.Errorf("Expected Page Name %s, got %s", expectedResponse.Page.Name, resp.Page.Name)
	}
	if resp.Status.Indicator != expectedResponse.Status.Indicator {
		t.Errorf("Expected Indicator %s, got %s", expectedResponse.Status.Indicator, resp.Status.Indicator)
	}
}

func TestGetDescriptiveStatus(t *testing.T) {
	tests := []struct {
		name      string
		indicator string
		expected  string
	}{
		{"Healthy", "none", "✅ Healthy"},
		{"Offline", "minor", "❌ Offline"},
		{"Critical", "critical", "❌ Offline"},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
				resp := Response{
					Status: Status{Indicator: tt.indicator},
				}
				json.NewEncoder(w).Encode(resp)
			}))
			defer ts.Close()

			result := GetDescriptiveStatus("test", ts.URL, false)
			if result != tt.expected {
				t.Errorf("Expected %s, got %s", tt.expected, result)
			}
		})
	}
}
