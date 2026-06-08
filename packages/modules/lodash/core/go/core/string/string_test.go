package string

import (
	"fmt"
	"testing"
)

func TestEndsWith(t *testing.T) {
	var _endsWith1 bool = EndsWith("abc", 'c', 1)
	var _endsWith2 bool = EndsWith("abc", 'b', 1)
	var _endsWith3 bool = EndsWith("abc", 'b', 2)
	if _endsWith1 && !_endsWith2 && _endsWith3 {
		fmt.Println("endsWith true")
	}
}

func TestTrim(t *testing.T) {
	var _trim string = Trim("  abc  ", " ")
	fmt.Println("trim", _trim == "abc")
}

func TestTrimEnd(t *testing.T) {
	var _trimEnd string = TrimEnd("  abc  ", " ")
	fmt.Println("trimEnd", _trimEnd == "  abc")
}

func TestTrimStart(t *testing.T) {
	var _trimStart string = TrimStart("  abc  ", " ")
	fmt.Println("trimStart", _trimStart == "abc  ")
}

func TestStartsWith(t *testing.T) {
	var _startsWith1 bool = StartsWith("abc", 'a', 0)
	var _startsWith2 bool = StartsWith("abc", 'a', 1)
	var _startsWith3 bool = StartsWith("abc", 'b', 1)
	if _startsWith1 && !_startsWith2 && _startsWith3 {
		fmt.Println("startsWith true")
	}
}
