package number

import (
	"fmt"
	"testing"
)

func TestClamp(t *testing.T) {
	// clamp
	var clamped1 float64 = Clamp(-10, -5, 5)
	var clamped2 float64 = Clamp(10, -5, 5)
	if clamped1 == -5 && clamped2 == 5 {
		fmt.Println("clamped true")
	}
	// inRange

}

func TestInRange(t *testing.T) {
	var inRange1 bool = InRange(3, 2, 4)
	var inRange2 bool = InRange(4, 0, 8)
	var inRange3 bool = InRange(4, 0, 2)
	var inRange4 bool = InRange(2, 0, 2)
	if inRange1 && inRange2 && !inRange3 && !inRange4 {
		fmt.Println("isRange true")
	}
}

func TestRandom(t *testing.T) {
	var random1 = Random(0, 5)
	var random2 = Random(5, 10)
	if 0 < random1 && random1 < 5 && 5 < random2 && random2 < 10 {
		fmt.Println("random true")
	}
}
