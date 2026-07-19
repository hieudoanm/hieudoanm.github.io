package date

import "time"

const (
	oneSecond = 1000
	oneMinute = oneSecond * 60
	oneHour   = oneMinute * 60
	oneDay    = oneHour * 24
)

func diffMillis(a, b time.Time) int64 {
	ms := a.Sub(b).Milliseconds()
	if ms < 0 {
		return -ms
	}
	return ms
}

func DiffTime(a, b time.Time) int64 { return diffMillis(a, b) }

func DiffDays(a, b time.Time) int64  { return diffMillis(a, b) / oneDay }
func DiffHours(a, b time.Time) int64  { return diffMillis(a, b) / oneHour }
func DiffMinutes(a, b time.Time) int64 { return diffMillis(a, b) / oneMinute }
func DiffSeconds(a, b time.Time) int64 { return diffMillis(a, b) / oneSecond }

type DiffResult struct {
	a, b time.Time
}

func Diff(a, b time.Time) DiffResult { return DiffResult{a, b} }
func (d DiffResult) Days() int64    { return DiffDays(d.a, d.b) }
func (d DiffResult) Hours() int64   { return DiffHours(d.a, d.b) }
func (d DiffResult) Minutes() int64 { return DiffMinutes(d.a, d.b) }
func (d DiffResult) Seconds() int64 { return DiffSeconds(d.a, d.b) }
