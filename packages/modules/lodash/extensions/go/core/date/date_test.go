package date

import (
	"testing"
	"time"
)

func TestCalendar(t *testing.T) {
	t.Run("valid month", func(t *testing.T) {
		weeks := Calendar(2024, 1)
		if len(weeks) == 0 {
			t.Fatal("expected at least one week")
		}
		if len(weeks[0]) != 7 {
			t.Errorf("expected 7 days per week, got %d", len(weeks[0]))
		}
	})

	t.Run("february 2024 has 29 days", func(t *testing.T) {
		weeks := Calendar(2024, 2)
		dayCount := 0
		for _, week := range weeks {
			for _, day := range week {
				if day.CurrentMonth == CurrentMonthCurrent {
					dayCount++
				}
			}
		}
		if dayCount != 29 {
			t.Errorf("expected 29 days in Feb 2024, got %d", dayCount)
		}
	})

	t.Run("previous month days shown", func(t *testing.T) {
		weeks := Calendar(2024, 1)
		hasPrev := false
		for _, day := range weeks[0] {
			if day.CurrentMonth == CurrentMonthPrevious {
				hasPrev = true
				break
			}
		}
		if !hasPrev {
			t.Errorf("expected previous month days in first week")
		}
	})
}

func TestWeekOfYear(t *testing.T) {
	t.Run("known date", func(t *testing.T) {
		d := time.Date(2024, 1, 1, 0, 0, 0, 0, time.UTC)
		week := WeekOfYear(d)
		if week < 1 || week > 53 {
			t.Errorf("expected valid week number, got %d", week)
		}
	})
}

func TestDiffTime(t *testing.T) {
	a := time.Date(2024, 1, 5, 0, 0, 0, 0, time.UTC)
	b := time.Date(2024, 1, 1, 0, 0, 0, 0, time.UTC)

	t.Run("DiffTime ms", func(t *testing.T) {
		ms := DiffTime(a, b)
		if ms <= 0 {
			t.Errorf("expected positive ms, got %d", ms)
		}
	})

	t.Run("DiffDays", func(t *testing.T) {
		days := DiffDays(a, b)
		if days != 4 {
			t.Errorf("expected 4 days, got %d", days)
		}
	})

	t.Run("DiffHours", func(t *testing.T) {
		hrs := DiffHours(a, b)
		if hrs != 96 {
			t.Errorf("expected 96 hours, got %d", hrs)
		}
	})

	t.Run("DiffMinutes", func(t *testing.T) {
		mins := DiffMinutes(a, b)
		if mins != 5760 {
			t.Errorf("expected 5760 minutes, got %d", mins)
		}
	})

	t.Run("DiffSeconds", func(t *testing.T) {
		secs := DiffSeconds(a, b)
		if secs != 345600 {
			t.Errorf("expected 345600 seconds, got %d", secs)
		}
	})

	t.Run("reversed order gives absolute difference", func(t *testing.T) {
		if DiffDays(b, a) != 4 {
			t.Errorf("expected 4 days for reversed")
		}
	})
}

func TestDiffResult(t *testing.T) {
	a := time.Date(2024, 1, 5, 0, 0, 0, 0, time.UTC)
	b := time.Date(2024, 1, 1, 0, 0, 0, 0, time.UTC)
	d := Diff(a, b)

	if d.Days() != 4 {
		t.Errorf("expected 4 days, got %d", d.Days())
	}
	if d.Hours() != 96 {
		t.Errorf("expected 96 hours, got %d", d.Hours())
	}
	if d.Minutes() != 5760 {
		t.Errorf("expected 5760 min, got %d", d.Minutes())
	}
	if d.Seconds() != 345600 {
		t.Errorf("expected 345600 sec, got %d", d.Seconds())
	}
}

func TestFormatDate(t *testing.T) {
	d := time.Date(2024, 3, 5, 0, 0, 0, 0, time.UTC)

	t.Run("default separator", func(t *testing.T) {
		got := FormatDate(d, "")
		if got != "2024-03-05" {
			t.Errorf("expected '2024-03-05', got %q", got)
		}
	})

	t.Run("custom separator", func(t *testing.T) {
		got := FormatDate(d, "/")
		if got != "2024/03/05" {
			t.Errorf("expected '2024/03/05', got %q", got)
		}
	})
}

func TestFormatTime(t *testing.T) {
	d := time.Date(2024, 3, 5, 9, 5, 3, 0, time.UTC)

	t.Run("without seconds", func(t *testing.T) {
		got := FormatTime(d, false)
		if got != "09:05" {
			t.Errorf("expected '09:05', got %q", got)
		}
	})

	t.Run("with seconds", func(t *testing.T) {
		got := FormatTime(d, true)
		if got != "09:05:03" {
			t.Errorf("expected '09:05:03', got %q", got)
		}
	})
}

func TestFormatDateTime(t *testing.T) {
	d := time.Date(2024, 3, 5, 9, 5, 3, 0, time.UTC)
	got := FormatDateTime(d)
	if got != "2024-03-05 09:05:03" {
		t.Errorf("expected '2024-03-05 09:05:03', got %q", got)
	}
}

func TestFormatResult(t *testing.T) {
	d := time.Date(2024, 12, 25, 14, 30, 0, 0, time.UTC)
	f := Format(d)

	if f.Date("/") != "2024/12/25" {
		t.Errorf("expected '2024/12/25', got %q", f.Date("/"))
	}
	if f.Time(false) != "14:30" {
		t.Errorf("expected '14:30', got %q", f.Time(false))
	}
	if f.DateTime() != "2024-12-25 14:30:00" {
		t.Errorf("expected '2024-12-25 14:30:00', got %q", f.DateTime())
	}
}

func TestLunarCalendarSolarToLunar(t *testing.T) {
	lc := LunarCalendar{}

	t.Run("known date conversion", func(t *testing.T) {
		result, err := lc.SolarToLunar(2024, 1, 31)
		if err != nil {
			t.Fatalf("unexpected error: %v", err)
		}
		if result.LYear == 0 || result.LMonth == 0 || result.LDay == 0 {
			t.Errorf("expected valid lunar date, got %+v", result)
		}
	})

	t.Run("year out of range", func(t *testing.T) {
		_, err := lc.SolarToLunar(1899, 1, 1)
		if err == nil {
			t.Errorf("expected error for year < 1900")
		}
	})

	t.Run("year too high", func(t *testing.T) {
		_, err := lc.SolarToLunar(2101, 1, 1)
		if err == nil {
			t.Errorf("expected error for year > 2100")
		}
	})

	t.Run("before base date", func(t *testing.T) {
		_, err := lc.SolarToLunar(1900, 1, 1)
		if err == nil {
			t.Errorf("expected error for date before base")
		}
	})
}

func TestLunarCalendarLeapMonth(t *testing.T) {
	lc := LunarCalendar{}
	leap := lc.LeapMonth(2023)
	if leap == 0 {
		t.Log("2023 has no leap month")
	}
	leap = lc.LeapMonth(2023)
	if leap < 0 || leap > 12 {
		t.Errorf("expected leap month 0-12, got %d", leap)
	}
}

func TestLunarCalendarLeapDays(t *testing.T) {
	lc := LunarCalendar{}
	days := lc.LeapDays(2023)
	if days < 0 || days > 30 {
		t.Errorf("expected leap days 0-30, got %d", days)
	}
}

func TestLunarCalendarLYearDays(t *testing.T) {
	lc := LunarCalendar{}
	days := lc.LYearDays(2024)
	if days < 350 || days > 400 {
		t.Errorf("expected year days ~353-384, got %d", days)
	}
}

func TestLunarCalendarMonthDays(t *testing.T) {
	lc := LunarCalendar{}
	t.Run("valid month", func(t *testing.T) {
		days := lc.MonthDays(2024, 1)
		if days != 29 && days != 30 {
			t.Errorf("expected 29 or 30, got %d", days)
		}
	})

	t.Run("invalid month returns -1", func(t *testing.T) {
		if days := lc.MonthDays(2024, 13); days != -1 {
			t.Errorf("expected -1, got %d", days)
		}
	})

	t.Run("month 0 returns -1", func(t *testing.T) {
		if days := lc.MonthDays(2024, 0); days != -1 {
			t.Errorf("expected -1, got %d", days)
		}
	})
}
