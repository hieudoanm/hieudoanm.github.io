package calc

import (
	"strconv"
	"testing"
)

func TestBaseConversion(t *testing.T) {
	n, _ := strconv.ParseInt("FF", 16, 64)
	if n != 255 {
		t.Errorf("hex FF = %d, want 255", n)
	}
	result := strconv.FormatInt(n, 2)
	if result != "11111111" {
		t.Errorf("dec 255 to bin = %s, want 11111111", result)
	}
	result = strconv.FormatInt(n, 16)
	if result != "ff" {
		t.Errorf("dec 255 to hex = %s, want ff", result)
	}
}
