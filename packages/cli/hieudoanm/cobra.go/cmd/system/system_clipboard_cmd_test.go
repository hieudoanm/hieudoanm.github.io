package system

import "testing"

func TestPreviewClip_ShortText(t *testing.T) {
	tests := []string{
		"hello",
		"",
		"short",
		"exactly 40 chars -- this is exactly 40",
	}

	for _, input := range tests {
		t.Run(input, func(t *testing.T) {
			got := previewClip(input)
			if got != input {
				t.Errorf("previewClip(%q) = %q, want %q", input, got, input)
			}
		})
	}
}

func TestPreviewClip_LongText(t *testing.T) {
	input := "this is a very long string that should definitely be truncated because it exceeds 40 characters"
	expected := "this is a very long string that should d..."

	got := previewClip(input)
	if got != expected {
		t.Errorf("previewClip(%q) = %q, want %q", input, got, expected)
	}
}

func TestPreviewClip_Exact40Chars(t *testing.T) {
	input := "1234567890123456789012345678901234567890"
	if len(input) != 40 {
		t.Fatalf("test string must be exactly 40 chars, got %d", len(input))
	}

	got := previewClip(input)
	if got != input {
		t.Errorf("previewClip for 40-char string = %q, want %q", got, input)
	}
}

func TestPreviewClip_41Chars(t *testing.T) {
	input := "12345678901234567890123456789012345678901"
	if len(input) != 41 {
		t.Fatalf("test string must be exactly 41 chars, got %d", len(input))
	}

	got := previewClip(input)
	expected := "1234567890123456789012345678901234567890..."
	if got != expected {
		t.Errorf("previewClip for 41-char string = %q, want %q", got, expected)
	}
	if len(got) != 43 {
		t.Errorf("expected truncated result to be 43 chars (40 + ...), got %d", len(got))
	}
}
