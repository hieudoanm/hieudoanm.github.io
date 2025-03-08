package date

import (
	"reflect"
	"testing"
)

func TestNow(t *testing.T) {
	got := Now()

	if reflect.TypeOf(got).String() != "int64" {
		t.Errorf("got %s, wanted int", reflect.TypeOf(got).String())
	}
}
