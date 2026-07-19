package rating

import (
	"math"
)

type TimeClass string

const (
	TimeClassClassical TimeClass = "classical"
	TimeClassRapid     TimeClass = "rapid"
	TimeClassBlitz     TimeClass = "blitz"
)

type Score string

const (
	ScoreWin  Score = "WIN"
	ScoreDraw Score = "DRAW"
	ScoreLoss Score = "LOSS"
)

type Game struct {
	RatingOpponent int
	Score          Score
}

type PerformanceInput struct {
	Games []Game
}

type DevelopmentCoefficient int

const (
	DevCoeff10 DevelopmentCoefficient = 10
	DevCoeff20 DevelopmentCoefficient = 20
	DevCoeff40 DevelopmentCoefficient = 40
)

func GetScoreValue(score Score) float64 {
	switch score {
	case ScoreWin:
		return 1
	case ScoreDraw:
		return 0.5
	case ScoreLoss:
		return 0
	default:
		return 0
	}
}

func getAverageOpponentRating(games []Game) float64 {
	if len(games) == 0 {
		return 0
	}
	total := 0.0
	for _, g := range games {
		total += float64(g.RatingOpponent)
	}
	return total / float64(len(games))
}

func getScorePercentage(games []Game) float64 {
	if len(games) == 0 {
		return 0
	}
	totalScore := 0.0
	for _, g := range games {
		totalScore += GetScoreValue(g.Score)
	}
	return totalScore / float64(len(games))
}

func getPerformanceDifferential(p float64) float64 {
	epsilon := 0.0001
	if p <= 0 {
		p = epsilon
	}
	if p >= 1 {
		p = 1 - epsilon
	}
	return 400 * math.Log10(p/(1-p))
}

func CalculatePerformance(input PerformanceInput) int {
	if len(input.Games) == 0 {
		return 0
	}
	avgOpponent := getAverageOpponentRating(input.Games)
	percentage := getScorePercentage(input.Games)
	differential := getPerformanceDifferential(percentage)
	return int(math.Round(avgOpponent + differential))
}

func getDevelopmentCoefficient(ratingPlayer int, lessThan30Games bool, overRating2400 bool, overAge18 bool, timeClass TimeClass) DevelopmentCoefficient {
	if timeClass == TimeClassRapid || timeClass == TimeClassBlitz {
		return DevCoeff20
	}
	if overRating2400 {
		return DevCoeff10
	}
	if lessThan30Games || (!overAge18 && ratingPlayer < 2300) {
		return DevCoeff40
	}
	return DevCoeff20
}

func getDelta(ratingPlayer int, ratingOpponent int, lessThan30Games bool, overRating2400 bool, overAge18 bool, score Score, timeClass TimeClass) int {
	if score != ScoreWin && score != ScoreDraw && score != ScoreLoss {
		return 0
	}
	if ratingPlayer <= 0 {
		ratingPlayer = 1000
	}
	if ratingOpponent <= 0 {
		ratingOpponent = 1000
	}

	gap := float64(ratingOpponent - ratingPlayer)
	chanceToWin := 1.0 / (1.0 + math.Pow(10, gap/400))
	K := getDevelopmentCoefficient(ratingPlayer, lessThan30Games, overRating2400, overAge18, timeClass)
	return int(math.Round(float64(K) * (GetScoreValue(score) - chanceToWin)))
}

type CalculateRatingParams struct {
	RatingPlayer   int
	RatingOpponent int
	LessThan30Games bool
	OverRating2400  bool
	OverAge18       bool
	Score           Score
	TimeClass       TimeClass
}

func CalculateRating(params CalculateRatingParams) int {
	ratingPlayer := params.RatingPlayer
	if ratingPlayer <= 0 {
		ratingPlayer = 1000
	}
	ratingOpponent := params.RatingOpponent
	if ratingOpponent <= 0 {
		ratingOpponent = 1000
	}
	score := params.Score
	if score == "" {
		score = ScoreDraw
	}
	timeClass := params.TimeClass
	if timeClass == "" {
		timeClass = TimeClassClassical
	}

	delta := getDelta(ratingPlayer, ratingOpponent, params.LessThan30Games, params.OverRating2400, params.OverAge18, score, timeClass)
	return ratingPlayer + delta
}
