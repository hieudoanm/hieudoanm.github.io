package telegram

import (
	"encoding/json"
	"testing"

	"github.com/spf13/cobra"
)

func TestNewCommand(t *testing.T) {
	cmd := NewCommand()
	if cmd.Use != "telegram" {
		t.Errorf("expected Use 'telegram', got %q", cmd.Use)
	}

	expected := []string{"message", "webhook"}
	subs := subcommandNames(cmd)
	for _, name := range expected {
		if !contains(subs, name) {
			t.Errorf("expected subcommand %q not found", name)
		}
	}
}

func subcommandNames(cmd *cobra.Command) []string {
	var names []string
	for _, c := range cmd.Commands() {
		names = append(names, c.Name())
	}
	return names
}

func contains(slice []string, s string) bool {
	for _, v := range slice {
		if v == s {
			return true
		}
	}
	return false
}

func TestSendResponseUnmarshal(t *testing.T) {
	data := `{"ok": true}`
	var resp SendResponse
	if err := json.Unmarshal([]byte(data), &resp); err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if !resp.Ok {
		t.Error("expected Ok to be true")
	}
}

func TestSendResponseUnmarshalFalse(t *testing.T) {
	data := `{"ok": false}`
	var resp SendResponse
	if err := json.Unmarshal([]byte(data), &resp); err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if resp.Ok {
		t.Error("expected Ok to be false")
	}
}

func TestSetResponseUnmarshal(t *testing.T) {
	data := `{"ok": true}`
	var resp SetResponse
	if err := json.Unmarshal([]byte(data), &resp); err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if !resp.Ok {
		t.Error("expected Ok to be true")
	}
}

func TestDeleteResponseUnmarshal(t *testing.T) {
	data := `{"ok": true}`
	var resp DeleteResponse
	if err := json.Unmarshal([]byte(data), &resp); err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if !resp.Ok {
		t.Error("expected Ok to be true")
	}
}

func TestGetInfoResponseUnmarshal(t *testing.T) {
	data := `{"ok": true, "result": {"url": "https://example.com"}}`
	var resp GetInfoResponse
	if err := json.Unmarshal([]byte(data), &resp); err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if !resp.Ok {
		t.Error("expected Ok to be true")
	}
}

func TestGetInfoResponseUnmarshalFalse(t *testing.T) {
	data := `{"ok": false}`
	var resp GetInfoResponse
	if err := json.Unmarshal([]byte(data), &resp); err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if resp.Ok {
		t.Error("expected Ok to be false")
	}
}

func TestSendResponseUnmarshalEmpty(t *testing.T) {
	data := `{}`
	var resp SendResponse
	if err := json.Unmarshal([]byte(data), &resp); err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if resp.Ok {
		t.Error("expected Ok to be false for empty JSON")
	}
}

func TestTelegramMessageCmdExists(t *testing.T) {
	cmd := newMessageCmd()
	if cmd.Use != "message" {
		t.Errorf("expected Use 'message', got %q", cmd.Use)
	}
}

func TestTelegramWebhookCmdExists(t *testing.T) {
	cmd := newWebhookCmd()
	if cmd.Use != "webhook" {
		t.Errorf("expected Use 'webhook', got %q", cmd.Use)
	}
}

func TestTelegramWebhookSubcommands(t *testing.T) {
	expected := []string{"delete", "info", "set"}
	subs := subcommandNames(newWebhookCmd())
	for _, name := range expected {
		if !contains(subs, name) {
			t.Errorf("expected webhook subcommand %q not found", name)
		}
	}
}
