package chat

import "testing"

func TestNewRevokeInviteLinkCmd_UseShort(t *testing.T) {
	cmd := newRevokeInviteLinkCmd()
	if cmd.Use != "revoke-invite-link" {
		t.Errorf("Use = %q, want 'revoke-invite-link'", cmd.Use)
	}
	if cmd.Short != "Revoke an invite link" {
		t.Errorf("Short = %q", cmd.Short)
	}
	if cmd.RunE == nil {
		t.Error("RunE is nil, expected a function")
	}
}
