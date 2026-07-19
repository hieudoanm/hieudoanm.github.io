package number

import (
	"testing"
)

func TestClamp(t *testing.T) {
	t.Run("below lower bound", func(t *testing.T) {
		if got := Clamp(-10, -5, 5); got != -5 {
			t.Errorf("expected -5, got %f", got)
		}
	})

	t.Run("above upper bound", func(t *testing.T) {
		if got := Clamp(10, -5, 5); got != 5 {
			t.Errorf("expected 5, got %f", got)
		}
	})

	t.Run("within bounds", func(t *testing.T) {
		if got := Clamp(0, -5, 5); got != 0 {
			t.Errorf("expected 0, got %f", got)
		}
	})

	t.Run("equal to lower", func(t *testing.T) {
		if got := Clamp(-5, -5, 5); got != -5 {
			t.Errorf("expected -5, got %f", got)
		}
	})

	t.Run("equal to upper", func(t *testing.T) {
		if got := Clamp(5, -5, 5); got != 5 {
			t.Errorf("expected 5, got %f", got)
		}
	})
}

func TestInRange(t *testing.T) {
	t.Run("two params (0 to stop)", func(t *testing.T) {
		if !InRange(3, 4) {
			t.Errorf("expected true")
		}
		if InRange(4, 4) {
			t.Errorf("expected false")
		}
		if InRange(-1, 5) {
			t.Errorf("expected false for negative number")
		}
	})

	t.Run("three params", func(t *testing.T) {
		if !InRange(3, 2, 4) {
			t.Errorf("expected true")
		}
		if InRange(4, 2, 4) {
			t.Errorf("expected false (equals stop)")
		}
		if InRange(2, 2, 4) {
			t.Errorf("expected false (equals start)")
		}
	})

	t.Run("no params", func(t *testing.T) {
		if InRange() {
			t.Errorf("expected false")
		}
	})
}

func TestRandom(t *testing.T) {
	t.Run("within range", func(t *testing.T) {
		for i := 0; i < 100; i++ {
			result := Random(0, 5)
			if result < 0 || result > 5 {
				t.Errorf("expected between 0 and 5, got %d", result)
			}
		}
	})

	t.Run("lower > upper swapped", func(t *testing.T) {
		result := Random(5, 0)
		if result < 0 || result > 5 {
			t.Errorf("expected between 0 and 5, got %d", result)
		}
	})

	t.Run("same bounds", func(t *testing.T) {
		result := Random(3, 3)
		if result != 3 {
			t.Errorf("expected 3, got %d", result)
		}
	})
}
