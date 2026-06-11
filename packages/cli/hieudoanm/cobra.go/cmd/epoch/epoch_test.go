package epoch

import (
	"testing"
	"time"
)

func TestEpochToTime(t *testing.T) {
	sec := int64(1718100000)
	tm := time.Unix(sec, 0).UTC()
	expected := "2024-06-11T10:00:00Z"
	if tm.Format(time.RFC3339) != expected {
		t.Errorf("epoch %d = %s, want %s", sec, tm.Format(time.RFC3339), expected)
	}
}

func TestTimeToEpoch(t *testing.T) {
	tm, _ := time.Parse("2006-01-02", "2024-06-11")
	expected := int64(1718064000)
	if tm.Unix() != expected {
		t.Errorf("2024-06-11 epoch = %d, want %d", tm.Unix(), expected)
	}
}
