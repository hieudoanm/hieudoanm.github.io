package pgn

import (
	"fmt"
	"regexp"
	"strings"

	"github.com/hieudoanm/chess/core/notation"
	"github.com/hieudoanm/chess/core/types"
)

type PGNGame struct {
	Headers map[string]string
	Moves   []PGNMove
	Result  string
}

type PGNMove struct {
	MoveNumber int
	Color      string
	SAN        string
}

var tagRegex = regexp.MustCompile(`^\[(\w+)\s+"(.*)"\]$`)

func ParsePGN(input string) []PGNGame {
	var games []PGNGame
	chunks := strings.Split(input, "\n\n")
	var pendingHeaders map[string]string

	for _, chunk := range chunks {
		if strings.TrimSpace(chunk) == "" {
			continue
		}

		lines := strings.Split(chunk, "\n")
		headers := make(map[string]string)
		var movesText string
		hasNonTagLine := false

		for _, line := range lines {
			line = strings.TrimSpace(line)
			if line == "" {
				continue
			}
			match := tagRegex.FindStringSubmatch(line)
			if match != nil {
				headers[match[1]] = match[2]
			} else {
				movesText += " " + line
				hasNonTagLine = true
			}
		}

		if !hasNonTagLine && len(headers) > 0 {
			pendingHeaders = headers
			continue
		}

		if pendingHeaders != nil {
			for k, v := range pendingHeaders {
				if _, ok := headers[k]; !ok {
					headers[k] = v
				}
			}
			pendingHeaders = nil
		}

		movesList := parseMoves(movesText)
		result := "*"
		if r, ok := headers["Result"]; ok {
			result = r
		}

		games = append(games, PGNGame{
			Headers: headers,
			Moves:   movesList,
			Result:  result,
		})
	}

	if pendingHeaders != nil {
		result := "*"
		if r, ok := pendingHeaders["Result"]; ok {
			result = r
		}
		games = append(games, PGNGame{
			Headers: pendingHeaders,
			Moves:   nil,
			Result:  result,
		})
	}

	return games
}

func parseMoves(text string) []PGNMove {
	var movesList []PGNMove
	commentRegex := regexp.MustCompile(`\{[^}]*\}`)
	cleaned := commentRegex.ReplaceAllString(text, "")
	tokens := strings.Fields(cleaned)

	moveNumber := 0
	color := "w"

	for _, token := range tokens {
		matched, _ := regexp.MatchString(`^\d+\.`, token)
		if matched {
			fmt.Sscanf(token, "%d.", &moveNumber)
			color = "w"
			continue
		}

		if matched, _ := regexp.MatchString(`^(1-0|0-1|1/2-1/2|\*)$`, token); matched {
			break
		}

		movesList = append(movesList, PGNMove{
			MoveNumber: moveNumber,
			Color:      color,
			SAN:        token,
		})

		if color == "w" {
			color = "b"
		} else {
			color = "w"
		}
	}

	return movesList
}

func StringifyPGN(games []PGNGame) string {
	var result []string
	for _, game := range games {
		var headers []string
		for k, v := range game.Headers {
			headers = append(headers, fmt.Sprintf(`[%s "%s"]`, k, v))
		}

		var movesParts []string
		for _, m := range game.Moves {
			if m.Color == "w" {
				movesParts = append(movesParts, fmt.Sprintf("%d. %s", m.MoveNumber, m.SAN))
			} else {
				movesParts = append(movesParts, m.SAN)
			}
		}

		gameStr := strings.Join(headers, "\n")
		if gameStr != "" {
			gameStr += "\n\n"
		}
		gameStr += strings.Join(movesParts, " ") + " " + game.Result
		result = append(result, strings.TrimSpace(gameStr))
	}
	return strings.Join(result, "\n\n")
}

func GetMoves(pgn string) []string {
	games := ParsePGN(pgn)
	if len(games) == 0 {
		return nil
	}
	var sanList []string
	for _, m := range games[0].Moves {
		sanList = append(sanList, m.SAN)
	}
	return sanList
}

func GetHeaders(pgn string) map[string]string {
	games := ParsePGN(pgn)
	if len(games) == 0 {
		return nil
	}
	return games[0].Headers
}

func StateToPGN(state types.GameState) string {
	var sanList []string
	for _, entry := range state.History {
		before := notation.ParseFEN(entry.StateBefore)
		san := notation.MoveToSAN(before.Board, entry.Move, before.Turn, before.CastlingRights, before.EnPassant)
		sanList = append(sanList, san)
	}

	var pgn strings.Builder
	for i, san := range sanList {
		if i%2 == 0 {
			pgn.WriteString(fmt.Sprintf("%d. %s ", i/2+1, san))
		} else {
			pgn.WriteString(san + " ")
		}
	}

	return strings.TrimSpace(pgn.String() + " " + string(state.Result))
}
