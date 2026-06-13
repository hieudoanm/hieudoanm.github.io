package time

import (
	"strings"
	"testing"
	"time"
)

func TestCronDescribeEvery15(t *testing.T) {
	desc := cronDescribe("*/15 * * * *")
	if !strings.Contains(desc, "every 15") {
		t.Errorf("expected 'every 15' in description, got: %s", desc)
	}
}

func TestCronDescribeWeekdaysAt9(t *testing.T) {
	desc := cronDescribe("0 9 * * 1-5")
	if !strings.Contains(desc, "at 09:00") {
		t.Errorf("expected 'at 09:00' in description, got: %s", desc)
	}
}

func TestCronDescribeEveryMinute(t *testing.T) {
	desc := cronDescribe("* * * * *")
	if !strings.Contains(desc, "every minute") {
		t.Errorf("expected 'every minute' in description, got: %s", desc)
	}
}

func TestCronDescribeInvalid(t *testing.T) {
	desc := cronDescribe("*/15 * *")
	if !strings.Contains(desc, "invalid cron expression") {
		t.Errorf("expected 'invalid cron expression', got: %s", desc)
	}
}

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

func TestCronNextRuns(t *testing.T) {
	expr := "* * * * *"
	until := time.Now().Add(5 * time.Minute).Truncate(time.Minute)
	runs := cronNextRuns(expr, 3, until)
	if len(runs) != 3 {
		t.Errorf("expected 3 runs, got %d", len(runs))
	}
}

func TestCronNextRunsInvalid(t *testing.T) {
	runs := cronNextRuns("*/15 * *", 5, time.Now().Add(time.Hour))
	if runs != nil {
		t.Error("expected nil for invalid expression")
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

func TestCronDescribeSpecificTime(t *testing.T) {
	desc := cronDescribe("30 14 * * *")
	if !strings.Contains(desc, "at 14:30") {
		t.Errorf("expected 'at 14:30' in description, got: %s", desc)
	}
}

func TestCronDescribeWithMonth(t *testing.T) {
	desc := cronDescribe("0 9 * jan *")
	if !strings.Contains(desc, "in 1") {
		t.Errorf("expected 'in 1' in description, got: %s", desc)
	}
}

func TestCronExpandFieldInvalidStep(t *testing.T) {
	got := cronExpandField("*/abc", 0, 59, nil)
	if got != "*/abc" {
		t.Errorf("expected '*/abc' (passthrough), got %q", got)
	}
}
