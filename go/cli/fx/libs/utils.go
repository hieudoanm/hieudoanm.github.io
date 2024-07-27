// Package libs ...
package libs

import "strconv"

// AddZero ...
func AddZero(number int64) string {
	if number > 9 {
		return strconv.FormatInt(number, 10)
	}

	return "0" + strconv.FormatInt(number, 10)
}
