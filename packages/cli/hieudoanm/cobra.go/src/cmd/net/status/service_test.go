package status

import "testing"

func TestParseStatusResponse_Valid(t *testing.T) {
	body := []byte(`{"page":{"name":"TestPage"},"status":{"indicator":"none","description":"All Good"}}`)
	resp, err := parseStatusResponse(body)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if resp.Page.Name != "TestPage" {
		t.Errorf("Page.Name = %q", resp.Page.Name)
	}
	if resp.Status.Indicator != "none" {
		t.Errorf("Status.Indicator = %q", resp.Status.Indicator)
	}
}

func TestParseStatusResponse_InvalidJSON(t *testing.T) {
	_, err := parseStatusResponse([]byte(`invalid`))
	if err == nil {
		t.Fatal("expected error")
	}
}

func TestDescriptiveStatusFromResponse_Healthy(t *testing.T) {
	resp := Response{Status: Status{Indicator: "none"}}
	if s := descriptiveStatusFromResponse(resp); s != "Healthy" {
		t.Errorf("got %q, want 'Healthy'", s)
	}
}

func TestDescriptiveStatusFromResponse_Offline(t *testing.T) {
	resp := Response{Status: Status{Indicator: "critical"}}
	if s := descriptiveStatusFromResponse(resp); s != "Offline" {
		t.Errorf("got %q, want 'Offline'", s)
	}

	resp = Response{Status: Status{Indicator: "major"}}
	if s := descriptiveStatusFromResponse(resp); s != "Offline" {
		t.Errorf("got %q, want 'Offline'", s)
	}

	resp = Response{Status: Status{Indicator: "minor"}}
	if s := descriptiveStatusFromResponse(resp); s != "Offline" {
		t.Errorf("got %q, want 'Offline'", s)
	}
}
