package math

import (
	"testing"
)

func TestAdd(t *testing.T) {
	if got := Add(6, 4); got != 10 {
		t.Errorf("expected 10, got %f", got)
	}
	if got := Add(-2, 3); got != 1 {
		t.Errorf("expected 1, got %f", got)
	}
}

func TestCeil(t *testing.T) {
	if got := Ceil(4.006); got != 5 {
		t.Errorf("expected 5, got %f", got)
	}
	if got := Ceil(4.0); got != 4 {
		t.Errorf("expected 4, got %f", got)
	}
	if got := Ceil(-4.5); got != -4 {
		t.Errorf("expected -4, got %f", got)
	}
}

func TestDivide(t *testing.T) {
	if got := Divide(6, 4); got != 1.5 {
		t.Errorf("expected 1.5, got %f", got)
	}
	if got := Divide(0, 5); got != 0 {
		t.Errorf("expected 0, got %f", got)
	}
	if got := Divide(10, 3); got != 10.0/3.0 {
		t.Errorf("expected %f, got %f", 10.0/3.0, got)
	}
}

func TestFloor(t *testing.T) {
	if got := Floor(4.006); got != 4 {
		t.Errorf("expected 4, got %f", got)
	}
	if got := Floor(4.0); got != 4 {
		t.Errorf("expected 4, got %f", got)
	}
	if got := Floor(-4.5); got != -5 {
		t.Errorf("expected -5, got %f", got)
	}
}

func TestMax(t *testing.T) {
	if got := Max([]float64{4, 2, 8, 6}); got != 8 {
		t.Errorf("expected 8, got %f", got)
	}
	if got := Max([]float64{-1, -5, -3}); got != -1 {
		t.Errorf("expected -1, got %f", got)
	}
}

func TestMean(t *testing.T) {
	if got := Mean([]float64{4, 2, 8, 6}); got != 5 {
		t.Errorf("expected 5, got %f", got)
	}
	if got := Mean([]float64{1, 2, 3}); got != 2 {
		t.Errorf("expected 2, got %f", got)
	}
	if got := Mean([]float64{}); got != 0 {
		t.Errorf("expected 0, got %f", got)
	}
}

func TestMin(t *testing.T) {
	if got := Min([]float64{4, 2, 8, 6}); got != 2 {
		t.Errorf("expected 2, got %f", got)
	}
	if got := Min([]float64{-1, -5, -3}); got != -5 {
		t.Errorf("expected -5, got %f", got)
	}
}

func TestMultiply(t *testing.T) {
	if got := Multiply(6, 4); got != 24 {
		t.Errorf("expected 24, got %f", got)
	}
	if got := Multiply(-2, 3); got != -6 {
		t.Errorf("expected -6, got %f", got)
	}
	if got := Multiply(0, 5); got != 0 {
		t.Errorf("expected 0, got %f", got)
	}
}

func TestRound(t *testing.T) {
	if got := Round(4.1); got != 4 {
		t.Errorf("expected 4, got %f", got)
	}
	if got := Round(4.9); got != 5 {
		t.Errorf("expected 5, got %f", got)
	}
	if got := Round(4.5); got != 5 {
		t.Errorf("expected 5, got %f", got)
	}
	if got := Round(-4.5); got != -5 {
		t.Errorf("expected -5, got %f", got)
	}
}

func TestSubtract(t *testing.T) {
	if got := Subtract(6, 4); got != 2 {
		t.Errorf("expected 2, got %f", got)
	}
	if got := Subtract(1, 5); got != -4 {
		t.Errorf("expected -4, got %f", got)
	}
}

func TestSum(t *testing.T) {
	if got := Sum([]float64{4, 2, 8, 6}); got != 20 {
		t.Errorf("expected 20, got %f", got)
	}
	if got := Sum([]float64{}); got != 0 {
		t.Errorf("expected 0, got %f", got)
	}
	if got := Sum([]float64{-1, 1}); got != 0 {
		t.Errorf("expected 0, got %f", got)
	}
}

func TestMaxBy(t *testing.T) {
	objects := []map[string]float64{
		{"n": 1},
		{"n": 5},
		{"n": 3},
	}
	iteratee := func(obj map[string]float64) float64 {
		return obj["n"]
	}
	if got := MaxBy(objects, iteratee); got != 5 {
		t.Errorf("expected 5, got %f", got)
	}

	if got := MaxBy([]map[string]float64{}, iteratee); got != 0 {
		t.Errorf("expected 0, got %f", got)
	}
}

func TestMeanBy(t *testing.T) {
	objects := []map[string]float64{
		{"n": 1},
		{"n": 2},
		{"n": 3},
	}
	iteratee := func(obj map[string]float64) float64 {
		return obj["n"]
	}
	if got := MeanBy(objects, iteratee); got != 2 {
		t.Errorf("expected 2, got %f", got)
	}

	if got := MeanBy([]map[string]float64{}, iteratee); got != 0 {
		t.Errorf("expected 0, got %f", got)
	}
}

func TestMinBy(t *testing.T) {
	objects := []map[string]float64{
		{"n": 5},
		{"n": 1},
		{"n": 3},
	}
	iteratee := func(obj map[string]float64) float64 {
		return obj["n"]
	}
	if got := MinBy(objects, iteratee); got != 1 {
		t.Errorf("expected 1, got %f", got)
	}

	if got := MinBy([]map[string]float64{}, iteratee); got != 0 {
		t.Errorf("expected 0, got %f", got)
	}
}

func TestSumBy(t *testing.T) {
	objects := []map[string]float64{
		{"n": 1},
		{"n": 2},
		{"n": 3},
	}
	iteratee := func(obj map[string]float64) float64 {
		return obj["n"]
	}
	if got := SumBy(objects, iteratee); got != 6 {
		t.Errorf("expected 6, got %f", got)
	}

	if got := SumBy([]map[string]float64{}, iteratee); got != 0 {
		t.Errorf("expected 0, got %f", got)
	}
}
