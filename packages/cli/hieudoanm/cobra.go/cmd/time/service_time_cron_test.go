package time

import (
	"testing"
)

func TestCronExpandFieldWildcard(t *testing.T) {
	got := cronExpandField("*", 0, 59, nil)
	if got != "every" {
		t.Errorf("expected 'every', got %q", got)
	}
}

func TestCronExpandFieldStep(t *testing.T) {
	got := cronExpandField("*/5", 0, 59, nil)
	if got != "every 5" {
		t.Errorf("expected 'every 5', got %q", got)
	}
}

func TestCronExpandFieldRange(t *testing.T) {
	got := cronExpandField("1-5", 0, 59, nil)
	if got != "1-5" {
		t.Errorf("expected '1-5', got %q", got)
	}
}

func TestCronExpandFieldList(t *testing.T) {
	got := cronExpandField("1,3,5", 0, 59, nil)
	if got != "1,3,5" {
		t.Errorf("expected '1,3,5', got %q", got)
	}
}

func TestCronExpandFieldNamed(t *testing.T) {
	got := cronExpandField("jan", 1, 12, cronMonthNames)
	if got != "1" {
		t.Errorf("expected '1', got %q", got)
	}
}

func TestCronExpandFieldInvalidStep(t *testing.T) {
	got := cronExpandField("*/abc", 0, 59, nil)
	if got != "*/abc" {
		t.Errorf("expected '*/abc' (passthrough), got %q", got)
	}
}

func TestCronResolveNameMonth(t *testing.T) {
	got := cronResolveName("jan", cronMonthNames)
	if got != "1" {
		t.Errorf("expected '1', got %q", got)
	}
}

func TestCronResolveNameWeek(t *testing.T) {
	got := cronResolveName("mon", cronWeekNames)
	if got != "1" {
		t.Errorf("expected '1', got %q", got)
	}
}

func TestCronResolveNameUnknown(t *testing.T) {
	got := cronResolveName("foo", cronMonthNames)
	if got != "foo" {
		t.Errorf("expected 'foo', got %q", got)
	}
}

func TestCronZeropadLessThan10(t *testing.T) {
	got := cronZeropad("5")
	if got != "05" {
		t.Errorf("expected '05', got %q", got)
	}
}

func TestCronZeropad12(t *testing.T) {
	got := cronZeropad("12")
	if got != "12" {
		t.Errorf("expected '12', got %q", got)
	}
}

func TestCronZeropadNonNumeric(t *testing.T) {
	got := cronZeropad("every")
	if got != "every" {
		t.Errorf("expected 'every', got %q", got)
	}
}

func TestCronMonthNames(t *testing.T) {
	expected := map[string]int{
		"jan": 1, "feb": 2, "mar": 3, "apr": 4, "may": 5, "jun": 6,
		"jul": 7, "aug": 8, "sep": 9, "oct": 10, "nov": 11, "dec": 12,
	}
	for k, v := range expected {
		if cronMonthNames[k] != v {
			t.Errorf("cronMonthNames[%q] = %d, want %d", k, cronMonthNames[k], v)
		}
	}
}

func TestCronWeekNames(t *testing.T) {
	expected := map[string]int{
		"sun": 0, "mon": 1, "tue": 2, "wed": 3, "thu": 4, "fri": 5, "sat": 6,
	}
	for k, v := range expected {
		if cronWeekNames[k] != v {
			t.Errorf("cronWeekNames[%q] = %d, want %d", k, cronWeekNames[k], v)
		}
	}
}
