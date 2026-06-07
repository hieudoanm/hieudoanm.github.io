package web

import (
	"bytes"
	"io"
	"os"
	"strings"
	"testing"

	"github.com/spf13/cobra"
)

func TestNewShopifyCmd(t *testing.T) {
	cmd := newShopifyCmd()
	if cmd.Use != "shopify" {
		t.Errorf("Use = %q, want 'shopify'", cmd.Use)
	}
	if cmd.Short != "Shopify detection and analysis tools" {
		t.Errorf("Short = %q", cmd.Short)
	}
	subs := cmd.Commands()
	if len(subs) != 1 || subs[0].Name() != "detect" {
		t.Errorf("expected subcommand 'detect', got %v", subNames(cmd))
	}
}

func TestNewShopifyDetectCmd(t *testing.T) {
	cmd := newShopifyDetectCmd()
	if cmd.Use != "detect [url]" {
		t.Errorf("Use = %q, want 'detect [url]'", cmd.Use)
	}
	if cmd.Short != "Detect if a website is using Shopify" {
		t.Errorf("Short = %q", cmd.Short)
	}
	if cmd.Flag("verbose") == nil {
		t.Error("expected --verbose flag")
	}
	if cmd.Flag("json") == nil {
		t.Error("expected --json flag")
	}
}

func TestNewSnapshotCmd(t *testing.T) {
	cmd := newSnapshotCmd()
	if cmd.Use != "snapshot [--url <url>]" {
		t.Errorf("Use = %q, want 'snapshot [--url <url>]'", cmd.Use)
	}
	if cmd.Short != "Take a screenshot of a web page" {
		t.Errorf("Short = %q", cmd.Short)
	}
	for _, name := range []string{"url", "output", "width", "height", "preset", "full-page", "delay", "pdf", "quality", "verbose", "json"} {
		if cmd.Flag(name) == nil {
			t.Errorf("missing flag: --%s", name)
		}
	}
}

func TestNewWeatherCmd(t *testing.T) {
	cmd := newWeatherCmd()
	if cmd.Use != "weather [city]" {
		t.Errorf("Use = %q, want 'weather [city]'", cmd.Use)
	}
	if cmd.Short != "Check current weather for a city" {
		t.Errorf("Short = %q", cmd.Short)
	}
	if cmd.Flag("forecast") == nil {
		t.Error("expected --forecast flag")
	}
	if cmd.Flag("units") == nil {
		t.Error("expected --units flag")
	}
}

func TestNewCommand_WebSubcommandShortDescriptions(t *testing.T) {
	cmd := NewCommand()
	short := make(map[string]string)
	for _, c := range cmd.Commands() {
		short[c.Name()] = c.Short
	}
	expect := map[string]string{
		"shopify":  "Shopify detection and analysis tools",
		"simplify": "Extract and convert web content",
		"snapshot": "Take a screenshot of a web page",
		"weather":  "Check current weather for a city",
		"youtube":  "YouTube transcript and thumbnail tools",
	}
	for name, want := range expect {
		got, ok := short[name]
		if !ok {
			t.Errorf("missing subcommand %q", name)
			continue
		}
		if got != want {
			t.Errorf("subcommand %q: Short = %q, want %q", name, got, want)
		}
	}
}

func TestWeatherConfigService(t *testing.T) {
	t.Setenv("WEATHER_API_KEY", "test-key")
	key := WeatherKey()
	if key != "test-key" {
		t.Errorf("WeatherKey() = %q, want 'test-key'", key)
	}
}

func captureOutput(fn func()) string {
	old := os.Stdout
	r, w, _ := os.Pipe()
	os.Stdout = w
	fn()
	w.Close()
	var buf bytes.Buffer
	io.Copy(&buf, r)
	os.Stdout = old
	return strings.TrimRight(buf.String(), "\n")
}

func TestNewSnapshotCmd_RunE_NotNil(t *testing.T) {
	cmd := newSnapshotCmd()
	if cmd.RunE == nil {
		t.Fatal("expected RunE to be set")
	}
}

func TestNewWeatherCmd_RunE_NoCity(t *testing.T) {
	cmd := newWeatherCmd()
	cmd.SetArgs([]string{"--forecast"})
	err := cmd.Execute()
	if err == nil {
		t.Fatal("expected error")
	}
	if !strings.Contains(err.Error(), "provide a city name") {
		t.Errorf("expected 'provide a city name' error, got %v", err)
	}
}

func TestNewShopifyDetectCmd_RunE_EmptyURL(t *testing.T) {
	cmd := newShopifyDetectCmd()
	err := cmd.RunE(cmd, []string{""})
	if err == nil {
		t.Fatal("expected error")
	}
	if !strings.Contains(err.Error(), "URL is required") {
		t.Errorf("expected 'URL is required' error, got %v", err)
	}
}

func subNames(cmd *cobra.Command) []string {
	var names []string
	for _, c := range cmd.Commands() {
		names = append(names, c.Name())
	}
	return names
}
