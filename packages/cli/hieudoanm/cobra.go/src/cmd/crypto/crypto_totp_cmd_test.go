package crypto

import (
	"testing"
)

func TestNewTotpCmd_Use(t *testing.T) {
	cmd := newTotpCmd()
	if cmd.Use != "totp [--secret <secret>]" {
		t.Errorf("got Use %q, want %q", cmd.Use, "totp [--secret <secret>]")
	}
}

func TestNewTotpCmd_Args(t *testing.T) {
	cmd := newTotpCmd()
	if cmd.Args != nil {
		t.Fatal("Args should be nil after conversion to flags")
	}
}

func TestNewTotpCmd_Flags(t *testing.T) {
	cmd := newTotpCmd()

	tests := []struct {
		name     string
		defValue string
		typ      string
	}{
		{"step", "30", "int"},
		{"digits", "6", "int"},
		{"time", "", "string"},
		{"json", "false", "bool"},
	}

	for _, tt := range tests {
		f := cmd.Flag(tt.name)
		if f == nil {
			t.Errorf("missing flag: %s", tt.name)
			continue
		}
		if f.DefValue != tt.defValue {
			t.Errorf("flag %s: got DefValue %q, want %q", tt.name, f.DefValue, tt.defValue)
		}
		if f.Value.Type() != tt.typ {
			t.Errorf("flag %s: got type %q, want %q", tt.name, f.Value.Type(), tt.typ)
		}
	}
}
