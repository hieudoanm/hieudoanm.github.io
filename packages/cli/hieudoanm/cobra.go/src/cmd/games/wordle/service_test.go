package wordle

import (
	"encoding/json"
	"strings"
	"testing"
)

func TestEvaluateGuessAllCorrect(t *testing.T) {
	r := evaluateGuess("adieu", "adieu")
	for i, lr := range r {
		if lr.Status != correct {
			t.Errorf("evaluateGuess letter %d: status = %d, want %d", i, lr.Status, correct)
		}
		if lr.Letter != rune("adieu"[i]) {
			t.Errorf("evaluateGuess letter %d: Letter = %c, want %c", i, lr.Letter, rune("adieu"[i]))
		}
	}
}

func TestEvaluateGuessAllAbsent(t *testing.T) {
	r := evaluateGuess("abcde", "fghij")
	for i, lr := range r {
		if lr.Status != absent {
			t.Errorf("evaluateGuess letter %d: status = %d, want %d", i, lr.Status, absent)
		}
	}
}

func TestEvaluateGuessMixed(t *testing.T) {
	r := evaluateGuess("abcde", "afcxy")
	expected := []status{correct, absent, correct, absent, absent}
	if len(r) != len(expected) {
		t.Fatalf("evaluateGuess returned %d results, want %d", len(r), len(expected))
	}
	for i, lr := range r {
		if lr.Status != expected[i] {
			t.Errorf("evaluateGuess letter %d (%c): status = %d, want %d", i, lr.Letter, lr.Status, expected[i])
		}
	}
}

func TestEvaluateGuessPresent(t *testing.T) {
	r := evaluateGuess("abcde", "xbcda")
	if r[4].Status != present {
		t.Errorf("r[4] (a present): status = %d, want %d", r[4].Status, present)
	}
}

func TestEvaluateGuessDuplicates(t *testing.T) {
	r := evaluateGuess("abcde", "aaaaa")
	if r[0].Status != correct {
		t.Errorf("r[0] (a correct): status = %d, want %d", r[0].Status, correct)
	}
	for i := 1; i < 5; i++ {
		if r[i].Status != absent {
			t.Errorf("r[%d] (extra a): status = %d, want %d", i, r[i].Status, absent)
		}
	}
}

func TestFormatResult(t *testing.T) {
	r := evaluateGuess("abcde", "afcxy")
	g := guess{Word: "afcxy", Result: r}
	output := formatResult(g)
	if !strings.Contains(output, "a") {
		t.Error("formatResult missing letter 'a'")
	}
	if !strings.Contains(output, "f") {
		t.Error("formatResult missing letter 'f'")
	}
}

func TestStatusToString(t *testing.T) {
	if statusToString(correct) != "correct" {
		t.Errorf("statusToString(correct) = %q", statusToString(correct))
	}
	if statusToString(present) != "present" {
		t.Errorf("statusToString(present) = %q", statusToString(present))
	}
	if statusToString(absent) != "absent" {
		t.Errorf("statusToString(absent) = %q", statusToString(absent))
	}
}

func TestBuildResultWon(t *testing.T) {
	guesses := []guess{
		{Word: "abcde", Result: []letterResult{
			{Letter: 'a', Status: correct},
			{Letter: 'b', Status: correct},
			{Letter: 'c', Status: correct},
			{Letter: 'd', Status: correct},
			{Letter: 'e', Status: correct},
		}},
	}
	r := buildResult("abcde", true, 1, guesses)
	if r.Word != "abcde" {
		t.Errorf("buildResult.Word = %q, want %q", r.Word, "abcde")
	}
	if !r.Won {
		t.Error("buildResult.Won = false, want true")
	}
	if r.Attempts != 1 {
		t.Errorf("buildResult.Attempts = %d, want 1", r.Attempts)
	}
	if len(r.Guesses) != 1 {
		t.Fatalf("buildResult.Guesses = %d, want 1", len(r.Guesses))
	}
}

func TestBuildResultJSON(t *testing.T) {
	guesses := []guess{
		{Word: "adieu", Result: []letterResult{
			{Letter: 'a', Status: correct},
			{Letter: 'd', Status: correct},
			{Letter: 'i', Status: correct},
			{Letter: 'e', Status: correct},
			{Letter: 'u', Status: correct},
		}},
	}
	r := buildResult("adieu", true, 3, guesses)
	data, err := json.Marshal(r)
	if err != nil {
		t.Fatal(err)
	}
	if !strings.Contains(string(data), `"word":"adieu"`) {
		t.Errorf("JSON missing word field: %s", data)
	}
	if !strings.Contains(string(data), `"won":true`) {
		t.Errorf("JSON missing won field: %s", data)
	}
}

func TestBuildResultLost(t *testing.T) {
	r := buildResult("abcde", false, 6, nil)
	if r.Won {
		t.Error("buildResult.Won = true, want false")
	}
	if r.Attempts != 6 {
		t.Errorf("buildResult.Attempts = %d, want 6", r.Attempts)
	}
}
