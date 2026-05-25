package lang

import (
	"testing"
)

func TestGt(t *testing.T) {
	var greaterThan1 bool = Gt(3, 1)
	var greaterThan2 bool = Gt(3, 3)

	if !greaterThan1 {
		t.Errorf("got %t, wanted %t", greaterThan1, true)
	}

	if greaterThan2 {
		t.Errorf("got %t, wanted %t", greaterThan2, false)
	}
}

func TestGte(t *testing.T) {
	var greaterThanOrEqual1 bool = Gte(3, 1)
	var greaterThanOrEqual2 bool = Gte(3, 3)

	if !greaterThanOrEqual1 {
		t.Errorf("got %t, wanted %t", greaterThanOrEqual1, true)
	}

	if !greaterThanOrEqual2 {
		t.Errorf("got %t, wanted %t", greaterThanOrEqual2, true)
	}
}

func TestLt(t *testing.T) {
	var lessThan1 bool = Lt(1, 3)
	var lessThan2 bool = Lt(3, 3)

	if !lessThan1 {
		t.Errorf("got %t, wanted %t", lessThan1, true)
	}

	if lessThan2 {
		t.Errorf("got %t, wanted %t", lessThan2, false)
	}
}

func TestLte(t *testing.T) {
	var lessThanOrEqual1 bool = Lte(1, 3)
	var lessThanOrEqual2 bool = Lte(3, 3)

	if !lessThanOrEqual1 {
		t.Errorf("got %t, wanted %t", lessThanOrEqual1, true)
	}

	if !lessThanOrEqual2 {
		t.Errorf("got %t, wanted %t", lessThanOrEqual2, true)
	}
}
