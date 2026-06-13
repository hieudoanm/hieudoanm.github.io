package time

import (
	"strings"
	"testing"
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
