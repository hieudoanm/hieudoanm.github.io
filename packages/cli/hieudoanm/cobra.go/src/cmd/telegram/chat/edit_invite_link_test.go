package chat

import "testing"

func TestNewEditInviteLinkCmd_UseShort(t *testing.T) {
	cmd := newEditInviteLinkCmd()
	if cmd.Use != "edit-invite-link" {
		t.Errorf("Use = %q, want 'edit-invite-link'", cmd.Use)
	}
	if cmd.Short != "Edit an invite link" {
		t.Errorf("Short = %q", cmd.Short)
	}
	if cmd.RunE == nil {
		t.Error("RunE is nil, expected a function")
	}
}
