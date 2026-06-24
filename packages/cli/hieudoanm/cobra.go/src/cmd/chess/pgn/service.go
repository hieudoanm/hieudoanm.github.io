package pgn

func classifyMove(cp int) string {
	switch {
	case cp <= 20:
		return "Best"
	case cp <= 50:
		return "Good"
	case cp <= 100:
		return "Inaccuracy"
	case cp <= 200:
		return "Mistake"
	default:
		return "Blunder"
	}
}

func abs(a int) int {
	if a < 0 {
		return -a
	}
	return a
}
