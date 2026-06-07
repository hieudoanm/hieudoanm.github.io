package youtube

import (
	"strings"
	"testing"

	"github.com/spf13/cobra"
)

func TestNewCmd(t *testing.T) {
	cmd := NewCmd()
	if cmd.Use != "youtube" {
		t.Errorf("Use = %q, want 'youtube'", cmd.Use)
	}
	if cmd.Short != "YouTube transcript and thumbnail tools" {
		t.Errorf("Short = %q", cmd.Short)
	}
	expect := map[string]bool{"fetch": true, "thumbnails": true}
	got := subNameSet(cmd)
	for name := range expect {
		if !got[name] {
			t.Errorf("missing subcommand %q", name)
		}
	}
}

func TestNewYoutubeFetchCmd(t *testing.T) {
	cmd := newYoutubeFetchCmd()
	if cmd.Use != "fetch [--url <video-id-or-url>]" {
		t.Errorf("Use = %q, want 'fetch [--url <video-id-or-url>]'", cmd.Use)
	}
	if cmd.Short != "Fetch YouTube video transcript" {
		t.Errorf("Short = %q", cmd.Short)
	}
	for _, name := range []string{"url", "lang", "output", "format", "no-timestamps"} {
		if cmd.Flag(name) == nil {
			t.Errorf("missing flag: --%s", name)
		}
	}
}

func TestNewYoutubeThumbnailsCmd(t *testing.T) {
	cmd := newYoutubeThumbnailsCmd()
	if cmd.Use != "thumbnails [--url <video-url-or-id>]" {
		t.Errorf("Use = %q, want 'thumbnails [--url <video-url-or-id>]'", cmd.Use)
	}
	if cmd.Short != "Download YouTube video thumbnails" {
		t.Errorf("Short = %q", cmd.Short)
	}
	for _, name := range []string{"url", "quality", "output", "all", "list", "json"} {
		if cmd.Flag(name) == nil {
			t.Errorf("missing flag: --%s", name)
		}
	}
}

func TestNewYoutubeFetchCmd_RunE_NoURL(t *testing.T) {
	cmd := newYoutubeFetchCmd()
	err := cmd.RunE(cmd, nil)
	if err == nil {
		t.Fatal("expected error")
	}
	if !strings.Contains(err.Error(), "could not extract video ID") {
		t.Errorf("expected video ID extraction error, got %v", err)
	}
}

func TestNewYoutubeThumbnailsCmd_RunE_NoURL(t *testing.T) {
	cmd := newYoutubeThumbnailsCmd()
	err := cmd.RunE(cmd, nil)
	if err == nil {
		t.Fatal("expected error")
	}
	if !strings.Contains(err.Error(), "could not extract video ID") {
		t.Errorf("expected video ID extraction error, got %v", err)
	}
}

func subNameSet(cmd *cobra.Command) map[string]bool {
	s := make(map[string]bool)
	for _, c := range cmd.Commands() {
		s[c.Name()] = true
	}
	return s
}
