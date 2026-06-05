package array

import "testing"

func TestIndexOf(t *testing.T) {
	var got1 int = IndexOf([]float64{1, 2, 1, 2}, 2, 0)
	var want1 = 1

	if got1 != want1 {
		t.Errorf("got %d, wanted %d", got1, want1)
	}

	var got2 int = IndexOf([]float64{1, 2, 1, 2}, 2, 2)
	var want2 = 3

	if got2 != want2 {
		t.Errorf("got %d, wanted %d", got1, want2)
	}
}

func TestLastIndexOf(t *testing.T) {
	var got1 int = LastIndexOf([]float64{1, 2, 1, 2}, 2, 0)
	var want1 = 3

	if got1 != want1 {
		t.Errorf("got %d, wanted %d", got1, want1)
	}

	var got2 int = LastIndexOf([]float64{1, 2, 1, 2}, 2, 2)
	var want2 = 1

	if got2 != want2 {
		t.Errorf("got %d, wanted %d", got1, want2)
	}
}
