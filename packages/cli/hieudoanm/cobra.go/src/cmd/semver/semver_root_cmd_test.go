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

func TestBumpMajor(t *testing.T) {
	v := version{1, 2, 3, "alpha"}
	got := v.bump("major")
	want := version{2, 0, 0, ""}
	if got != want {
		t.Errorf("bump(major) = %+v, want %+v", got, want)
	}
}

func TestBumpMinor(t *testing.T) {
	v := version{1, 2, 3, ""}
	got := v.bump("minor")
	want := version{1, 3, 0, ""}
	if got != want {
		t.Errorf("bump(minor) = %+v, want %+v", got, want)
	}
}

func TestBumpPatch(t *testing.T) {
	v := version{1, 2, 3, ""}
	got := v.bump("patch")
	want := version{1, 2, 4, ""}
	if got != want {
		t.Errorf("bump(patch) = %+v, want %+v", got, want)
	}
}

func TestBumpUnknown(t *testing.T) {
	v := version{1, 2, 3, ""}
	got := v.bump("unknown")
	if got != v {
		t.Errorf("bump(unknown) = %+v, want %+v", got, v)
	}
}

func TestCheckRange(t *testing.T) {
	base := version{1, 5, 0, ""}
	tests := []struct {
		name      string
		rangeExpr string
		want      bool
		wantErr   bool
	}{
		{">", "> 1.0.0", true, false},
		{"> negative", "> 2.0.0", false, false},
		{">=", ">= 1.5.0", true, false},
		{">= higher", ">= 2.0.0", false, false},
		{"<", "< 2.0.0", true, false},
		{"< lower", "< 1.0.0", false, false},
		{"<=", "<= 1.5.0", true, false},
		{"<= lower", "<= 1.0.0", false, false},
		{"=", "= 1.5.0", true, false},
		{"= wrong", "= 2.0.0", false, false},
		{"==", "== 1.5.0", true, false},
		{"compound match", ">= 1.0.0 < 2.0.0", true, false},
		{"compound no match", ">= 2.0.0 < 3.0.0", false, false},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := checkRange(base, tt.rangeExpr)
			if (err != nil) != tt.wantErr {
				t.Errorf("checkRange(%q) error = %v, wantErr %v", tt.rangeExpr, err, tt.wantErr)
			}
			if got != tt.want {
				t.Errorf("checkRange(%q) = %v, want %v", tt.rangeExpr, got, tt.want)
			}
		})
	}
}

func TestCheckRangeEmpty(t *testing.T) {
	_, err := checkRange(version{}, "")
	if err == nil {
		t.Error("expected error for empty range")
	}
}

func TestCheckRangeIncomplete(t *testing.T) {
	_, err := checkRange(version{}, ">=")
	if err == nil {
		t.Error("expected error for incomplete range")
	}
}

func TestCheckRangeInvalidVersion(t *testing.T) {
	_, err := checkRange(version{}, "> abc")
	if err == nil {
		t.Error("expected error for invalid version in range")
	}
}

func TestCheckRangeUnknownOperator(t *testing.T) {
	_, err := checkRange(version{}, "~ 1.0.0")
	if err == nil {
		t.Error("expected error for unknown operator")
	}
}

func TestCheckRangePrerelease(t *testing.T) {
	v := version{1, 0, 0, "alpha"}
	got, err := checkRange(v, "> 1.0.0")
	if err != nil {
		t.Fatal(err)
	}
	if got {
		t.Error("1.0.0-alpha should not be > 1.0.0")
	}
}

func TestParseVersionWithPrerelease(t *testing.T) {
	v, err := parseVersion("1.2.3-beta.1")
	if err != nil {
		t.Fatal(err)
	}
	if v.prerelease != "beta.1" {
		t.Errorf("prerelease = %q, want %q", v.prerelease, "beta.1")
	}
	if v.major != 1 || v.minor != 2 || v.patch != 3 {
		t.Errorf("v = %+v", v)
	}
}

func TestParseVersionInvalidMajor(t *testing.T) {
	_, err := parseVersion("abc.2.3")
	if err == nil {
		t.Error("expected error for invalid major")
	}
}

func TestParseVersionInvalidMinor(t *testing.T) {
	_, err := parseVersion("1.abc.3")
	if err == nil {
		t.Error("expected error for invalid minor")
	}
}

func TestParseVersionInvalidPatch(t *testing.T) {
	_, err := parseVersion("1.2.abc")
	if err == nil {
		t.Error("expected error for invalid patch")
	}
}

func TestParseVersionEmpty(t *testing.T) {
	_, err := parseVersion("")
	if err == nil {
		t.Error("expected error for empty string")
	}
}

func TestParseVersionOnlyMajor(t *testing.T) {
	_, err := parseVersion("1")
	if err == nil {
		t.Error("expected error for '1'")
	}
}

func TestNewCommandHasFlags(t *testing.T) {
	cmd := NewCommand()
	for _, name := range []string{"bump", "prerelease", "range", "version"} {
		if _, err := cmd.Flags().GetString(name); err != nil {
			t.Errorf("missing flag: --%s", name)
		}
	}
	if _, err := cmd.PersistentFlags().GetBool("json"); err != nil {
		t.Error("missing persistent flag: --json")
	}
}

func TestNewCommandSubcommandCount(t *testing.T) {
	cmd := NewCommand()
	if n := len(cmd.Commands()); n != 3 {
		t.Errorf("expected 3 subcommands, got %d", n)
	}
}

func TestNewCommandBumpMajor(t *testing.T) {
	cmd := NewCommand()
	cmd.SetArgs([]string{"--bump", "major", "--version", "1.2.3"})
	if err := cmd.Execute(); err != nil {
		t.Fatal(err)
	}
}

func TestNewCommandBumpMinor(t *testing.T) {
	cmd := NewCommand()
	cmd.SetArgs([]string{"--bump", "minor", "--version", "1.2.3"})
	if err := cmd.Execute(); err != nil {
		t.Fatal(err)
	}
}

func TestNewCommandBumpPatch(t *testing.T) {
	cmd := NewCommand()
	cmd.SetArgs([]string{"--bump", "patch", "--version", "1.2.3"})
	if err := cmd.Execute(); err != nil {
		t.Fatal(err)
	}
}

func TestNewCommandBumpWithPrerelease(t *testing.T) {
	cmd := NewCommand()
	cmd.SetArgs([]string{"--bump", "patch", "--prerelease", "alpha", "--version", "1.2.3"})
	if err := cmd.Execute(); err != nil {
		t.Fatal(err)
	}
}

func TestNewCommandBumpJSON(t *testing.T) {
	cmd := NewCommand()
	cmd.SetArgs([]string{"--bump", "patch", "--version", "1.2.3", "--json"})
	if err := cmd.Execute(); err != nil {
		t.Fatal(err)
	}
}

func TestNewCommandBumpInvalidPart(t *testing.T) {
	cmd := NewCommand()
	cmd.SetArgs([]string{"--bump", "invalid", "--version", "1.2.3"})
	if err := cmd.Execute(); err != nil {
		t.Fatal(err)
	}
}

func TestNewCommandBumpNoVersion(t *testing.T) {
	cmd := NewCommand()
	cmd.SetArgs([]string{"--bump", "patch"})
	if err := cmd.Execute(); err == nil {
		t.Error("expected error when --bump is set without --version")
	}
}

func TestNewCommandRangeMatch(t *testing.T) {
	cmd := NewCommand()
	cmd.SetArgs([]string{"--range", ">= 1.0.0 < 2.0.0", "--version", "1.5.0"})
	if err := cmd.Execute(); err != nil {
		t.Fatal(err)
	}
}

func TestNewCommandRangeNoMatch(t *testing.T) {
	cmd := NewCommand()
	cmd.SetArgs([]string{"--range", ">= 2.0.0", "--version", "1.5.0"})
	if err := cmd.Execute(); err != nil {
		t.Fatal(err)
	}
}

func TestNewCommandRangeNoVersion(t *testing.T) {
	cmd := NewCommand()
	cmd.SetArgs([]string{"--range", ">= 1.0.0"})
	if err := cmd.Execute(); err == nil {
		t.Error("expected error when --range is set without --version")
	}
}

func TestNewCommandRangeJSON(t *testing.T) {
	cmd := NewCommand()
	cmd.SetArgs([]string{"--range", ">= 1.0.0", "--version", "1.5.0", "--json"})
	if err := cmd.Execute(); err != nil {
		t.Fatal(err)
	}
}
