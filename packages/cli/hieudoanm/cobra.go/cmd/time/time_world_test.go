package time

import (
	"testing"
	"time"
)

func TestCommonZonesHasExpectedEntries(t *testing.T) {
	expected := map[string]string{
		"utc":    "UTC",
		"ny":     "America/New_York",
		"london": "Europe/London",
		"tokyo":  "Asia/Tokyo",
		"hcmc":   "Asia/Ho_Chi_Minh",
	}
	for alias, zone := range expected {
		got, ok := commonZones[alias]
		if !ok {
			t.Errorf("commonZones missing entry for %q", alias)
			continue
		}
		if got != zone {
			t.Errorf("commonZones[%q] = %q, want %q", alias, got, zone)
		}
	}
}

func TestCommonZonesHasAdditionalEntries(t *testing.T) {
	additional := []string{"hanoi", "sf", "la", "paris", "berlin", "mumbai", "beijing", "seoul", "sydney", "dubai", "singapore", "hk", "ams", "chi", "den", "phx"}
	for _, alias := range additional {
		if _, ok := commonZones[alias]; !ok {
			t.Errorf("commonZones missing expected entry for %q", alias)
		}
	}
}

func TestLoadLocationAliasUTC(t *testing.T) {
	loc, err := loadLocation("utc")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if loc.String() != "UTC" {
		t.Errorf("expected 'UTC', got %q", loc.String())
	}
}

func TestLoadLocationAliasNY(t *testing.T) {
	loc, err := loadLocation("ny")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if loc.String() != "America/New_York" {
		t.Errorf("expected 'America/New_York', got %q", loc.String())
	}
}

func TestLoadLocationAliasLondon(t *testing.T) {
	loc, err := loadLocation("london")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if loc.String() != "Europe/London" {
		t.Errorf("expected 'Europe/London', got %q", loc.String())
	}
}

func TestLoadLocationAliasTokyo(t *testing.T) {
	loc, err := loadLocation("tokyo")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if loc.String() != "Asia/Tokyo" {
		t.Errorf("expected 'Asia/Tokyo', got %q", loc.String())
	}
}

func TestLoadLocationAliasHCMC(t *testing.T) {
	loc, err := loadLocation("hcmc")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if loc.String() != "Asia/Ho_Chi_Minh" {
		t.Errorf("expected 'Asia/Ho_Chi_Minh', got %q", loc.String())
	}
}

func TestLoadLocationDirect(t *testing.T) {
	loc, err := loadLocation("Europe/Paris")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if loc.String() != "Europe/Paris" {
		t.Errorf("expected 'Europe/Paris', got %q", loc.String())
	}
}

func TestLoadLocationUnknown(t *testing.T) {
	_, err := loadLocation("mars/olympus")
	if err == nil {
		t.Fatal("expected error for unknown location")
	}
}

func TestCommonZonesNoEmptyValues(t *testing.T) {
	for alias, zone := range commonZones {
		if alias == "" || zone == "" {
			t.Errorf("empty alias or zone in commonZones: %q -> %q", alias, zone)
		}
	}
}

func TestLoadLocationAfterLoad(t *testing.T) {
	loc, err := loadLocation("America/New_York")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	now := time.Now().In(loc)
	if now.Location().String() != "America/New_York" {
		t.Errorf("expected location 'America/New_York', got %q", now.Location().String())
	}
}
