package number

import "testing"

func TestAddZero(t *testing.T) {
	tests := []struct {
		input    int
		expected string
	}{
		{0, "00"},
		{1, "01"},
		{8, "08"},
		{9, "9"},
		{10, "10"},
		{99, "99"},
	}

	for _, tt := range tests {
		result := AddZero(tt.input)
		if result != tt.expected {
			t.Errorf("AddZero(%d) = %s; expected %s", tt.input, result, tt.expected)
		}
	}
}
