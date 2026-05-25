package math

import (
	"fmt"
	"testing"
)

func TestAdd(t *testing.T) {
	got := Add(6, 4)
	var want float64 = 10

	if got != want {
		t.Errorf("got %f, wanted %f", got, want)
	}
}

func TestCeil(t *testing.T) {
	var roundedUp float64 = Ceil(4.006)
	fmt.Println("ceil", roundedUp == 5)
	// divide
	// floor
	// max
	// mean
	// min
	// multiply
	// round
	// subtract
	// sum
}

func TestDivide(t *testing.T) {
	var quotient float64 = Divide(6, 4)
	fmt.Println("divide", quotient == 1.5)
}

func TestFloor(t *testing.T) {
	var roundedDown float64 = Floor(4.006)
	fmt.Println("floor", roundedDown == 4)
}

func TestMax(t *testing.T) {
	var maximum float64 = Max([]float64{4, 2, 8, 6})
	fmt.Println("max", maximum == 8)
}

func TestMean(t *testing.T) {
	var _mean float64 = Mean([]float64{4, 2, 8, 6})
	fmt.Println("mean", _mean == 5)
}

func TestMin(t *testing.T) {
	var minimum float64 = Min([]float64{4, 2, 8, 6})
	fmt.Println("min", minimum == 2)
}

func TestMultiply(t *testing.T) {
	var product float64 = Multiply(6, 4)
	fmt.Println("multiply", product == 24)
}

func TestRound(t *testing.T) {
	var rounded1 float64 = Round(4.1)
	var rounded2 float64 = Round(4.9)
	if rounded1 == 4 && rounded2 == 5 {
		fmt.Println("round true")
	}
}

func TestSubtract(t *testing.T) {
	var difference float64 = Subtract(6, 4)
	fmt.Println("subtract", difference == 2)
}

func TestSum(t *testing.T) {
	var _sum float64 = Sum([]float64{4, 2, 8, 6})
	fmt.Println("sum", _sum == 20)
}
