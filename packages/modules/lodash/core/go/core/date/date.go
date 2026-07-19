package date

import "time"

func Now() int64 {
	var now time.Time = time.Now()
	var sec int64 = now.Unix()
	return sec
}
