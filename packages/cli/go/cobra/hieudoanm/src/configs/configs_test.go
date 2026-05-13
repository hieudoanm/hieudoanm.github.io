package configs

import "testing"

func TestServicesMap(t *testing.T) {
	if len(Services) == 0 {
		t.Errorf("Services map should not be empty")
	}

	expectedCategories := []string{"atlassian", "crypto", "serverless", "saas"}
	for _, category := range expectedCategories {
		if _, ok := Services[category]; !ok {
			t.Errorf("Expected category %s not found in Services", category)
		}
	}

	// Spot check a few services
	if url := Services["saas"]["github"]; url != "https://www.githubstatus.com/api/v2/status.json" {
		t.Errorf("Unexpected URL for GitHub: %s", url)
	}
}
