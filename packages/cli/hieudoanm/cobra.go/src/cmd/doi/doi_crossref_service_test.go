package doi

import (
	"testing"
	"time"
)

func TestResolveDOI_WithArgs(t *testing.T) {
	id, err := resolveDOI([]string{"10.1000/xyz123"})
	if err != nil {
		t.Fatal(err)
	}
	if id != "10.1000/xyz123" {
		t.Errorf("got %q, want %q", id, "10.1000/xyz123")
	}
}

func TestResolveDOI_NoArgs(t *testing.T) {
	done := make(chan struct{})
	var err error
	go func() {
		defer close(done)
		_, err = resolveDOI([]string{})
	}()
	select {
	case <-done:
		if err == nil {
			t.Error("expected error when no args (survey fails in non-TTY)")
		}
	case <-time.After(3 * time.Second):
		t.Skip("skipping: survey prompt blocked in test environment (no TTY)")
	}
}

func TestFetchCrossref(t *testing.T) {
	data, err := fetchCrossref("10.1038/nature12373")
	if err != nil {
		t.Skipf("skipping network-dependent test: %v", err)
	}
	if data.Status != "ok" {
		t.Errorf("expected status %q, got %q", "ok", data.Status)
	}
	if len(data.Message.Authors) == 0 {
		t.Error("expected at least one author")
	}
}

func TestFetchCrossref_InvalidDOI(t *testing.T) {
	_, err := fetchCrossref("not-a-valid-doi-12345")
	if err == nil {
		t.Error("expected error for invalid DOI")
	}
}
