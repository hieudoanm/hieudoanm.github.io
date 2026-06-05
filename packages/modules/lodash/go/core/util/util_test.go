package util

import (
	"fmt"
	"testing"
)

func TestStubArray(t *testing.T) {
	var _stubArray [0]int = StubArray()
	fmt.Println("stubArray", _stubArray == [0]int{})
}

func TestStubFalse(t *testing.T) {
	var _stubFalse bool = StubFalse()
	fmt.Println("stubFalse", !_stubFalse)
}

func TestStubString(t *testing.T) {
	var _stubString string = StubString()
	fmt.Println("stubString", _stubString == "")
}

func TestStubTrue(t *testing.T) {
	var _stubTrue bool = StubTrue()
	fmt.Println("stubTrue", _stubTrue)
}
