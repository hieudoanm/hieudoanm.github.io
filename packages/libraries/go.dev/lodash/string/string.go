package string

import "strings"

func EndsWith(str string, char byte, position int) bool {
	var lastIndex int = len(str) - position
	return str[lastIndex] == char
}

func Trim(str string, chars string) string {
	return strings.Trim(str, chars)
}

func TrimEnd(str string, chars string) string {
	return strings.TrimRight(str, chars)
}

func TrimStart(str string, chars string) string {
	return strings.TrimLeft(str, chars)
}

func StartsWith(str string, char byte, position int) bool {
	return str[position] == char
}
