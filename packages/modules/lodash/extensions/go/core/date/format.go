package date

import (
	"fmt"
	"time"
)

func padZero(n int) string {
	if n < 10 {
		return fmt.Sprintf("0%d", n)
	}
	return fmt.Sprintf("%d", n)
}

func FormatDate(d time.Time, separator string) string {
	if separator == "" {
		separator = "-"
	}
	return fmt.Sprintf("%d%s%s%s%s", d.Year(), separator, padZero(int(d.Month())), separator, padZero(d.Day()))
}

func FormatTime(d time.Time, withSeconds bool) string {
	if withSeconds {
		return fmt.Sprintf("%s:%s:%s", padZero(d.Hour()), padZero(d.Minute()), padZero(d.Second()))
	}
	return fmt.Sprintf("%s:%s", padZero(d.Hour()), padZero(d.Minute()))
}

func FormatDateTime(d time.Time) string {
	return FormatDate(d, "-") + " " + FormatTime(d, true)
}

type FormatResult struct{ d time.Time }

func Format(d time.Time) FormatResult { return FormatResult{d} }
func (f FormatResult) Date(separator string) string {
	if separator == "" {
		separator = "-"
	}
	return FormatDate(f.d, separator)
}
func (f FormatResult) Time(withSeconds bool) string  { return FormatTime(f.d, withSeconds) }
func (f FormatResult) DateTime() string                { return FormatDateTime(f.d) }
