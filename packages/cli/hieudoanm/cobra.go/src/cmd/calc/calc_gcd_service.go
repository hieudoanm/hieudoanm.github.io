package calc

import "fmt"

func gcd(a, b int64) int64 {
	for b != 0 {
		a, b = b, a%b
	}
	return a
}

func parseTwoInts(sa, sb string) (int64, int64, error) {
	var a, b int64
	if _, err := fmt.Sscanf(sa, "%d", &a); err != nil {
		return 0, 0, fmt.Errorf("invalid integer %q", sa)
	}
	if _, err := fmt.Sscanf(sb, "%d", &b); err != nil {
		return 0, 0, fmt.Errorf("invalid integer %q", sb)
	}
	return a, b, nil
}
