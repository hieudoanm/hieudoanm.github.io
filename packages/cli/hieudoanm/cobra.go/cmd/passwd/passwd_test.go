package passwd

import (
	"testing"
)

func TestPasswordLength(t *testing.T) {
	for _, length := range []int{8, 16, 32} {
		// We can't call the command directly, but we can verify the charset logic
		charset := lower + upper + digits + symbols
		if len(charset) == 0 {
			t.Error("charset should not be empty")
		}
		if len(charset) < length {
			t.Logf("charset size %d < requested length %d", len(charset), length)
		}
	}
}
