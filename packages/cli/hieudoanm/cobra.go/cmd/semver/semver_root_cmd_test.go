package semver

import (
	"testing"
)

func TestNewCommandHasSubcommands(t *testing.T) {
	cmd := NewCommand()
	names := make(map[string]bool)
	for _, c := range cmd.Commands() {
		names[c.Name()] = true
	}
	for _, want := range []string{"validate", "compare", "sort"} {
		if !names[want] {
			t.Errorf("missing subcommand: %s", want)
		}
	}
}

func TestParseVersion(t *testing.T) {
	v, err := parseVersion("1.2.3")
	if err != nil {
		t.Fatal(err)
	}
	if v.major != 1 || v.minor != 2 || v.patch != 3 {
		t.Errorf("parsed 1.2.3 = %+v", v)
	}
}

func TestParseVersionWithPrefix(t *testing.T) {
	v, err := parseVersion("v2.0.0")
	if err != nil {
		t.Fatal(err)
	}
	if v.major != 2 {
		t.Errorf("v2.0.0 major = %d", v.major)
	}
}

func TestParseVersionInvalid(t *testing.T) {
	_, err := parseVersion("1.2")
	if err == nil {
		t.Error("expected error for '1.2'")
	}
}

func TestCompare(t *testing.T) {
	a := version{1, 0, 0, ""}
	b := version{2, 0, 0, ""}
	if a.compare(b) >= 0 {
		t.Error("1.0.0 should be < 2.0.0")
	}
	if b.compare(a) <= 0 {
		t.Error("2.0.0 should be > 1.0.0")
	}
	if a.compare(a) != 0 {
		t.Error("1.0.0 should == 1.0.0")
	}
}
