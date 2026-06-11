package jwt

import (
	"encoding/base64"
	"encoding/json"
	"strings"
	"testing"
)

func TestJWTDecode(t *testing.T) {
	// Create a minimal JWT-like token
	header := `{"alg":"HS256"}`
	payload := `{"sub":"123"}`

	h := base64.URLEncoding.EncodeToString([]byte(header))
	p := base64.URLEncoding.EncodeToString([]byte(payload))
	token := h + "." + p + ".signature"

	parts := strings.Split(token, ".")
	if len(parts) < 2 {
		t.Fatal("expected at least 2 parts")
	}

	for i, part := range parts[:2] {
		padded := part
		switch len(padded) % 4 {
		case 2:
			padded += "=="
		case 3:
			padded += "="
		}
		decoded, err := base64.URLEncoding.DecodeString(padded)
		if err != nil {
			t.Fatalf("decode part %d: %v", i+1, err)
		}
		var v interface{}
		if err := json.Unmarshal(decoded, &v); err != nil {
			t.Fatalf("JSON parse part %d: %v", i+1, err)
		}
	}
}
