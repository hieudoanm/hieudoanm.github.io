package english

import (
	"encoding/json"
	"testing"
)

func TestWordJSONUnmarshal(t *testing.T) {
	input := `{
		"word": "hello",
		"results": [
			{
				"definition": "used as a greeting",
				"partOfSpeech": "interjection",
				"synonyms": ["hi", "hey"],
				"anonyms": ["goodbye"],
				"usageOf": ["greeting"],
				"typeOf": ["greeting"]
			}
		]
	}`
	var w Word
	if err := json.Unmarshal([]byte(input), &w); err != nil {
		t.Fatalf("unmarshal error: %v", err)
	}
	if w.Word != "hello" {
		t.Errorf("Word = %q, want %q", w.Word, "hello")
	}
	if len(w.Results) != 1 {
		t.Fatalf("expected 1 result, got %d", len(w.Results))
	}
	r := w.Results[0]
	if r.Definition != "used as a greeting" {
		t.Errorf("Definition = %q", r.Definition)
	}
	if r.PartOfSpeech != "interjection" {
		t.Errorf("PartOfSpeech = %q", r.PartOfSpeech)
	}
	if len(r.Synonyms) != 2 || r.Synonyms[0] != "hi" {
		t.Errorf("Synonyms = %v", r.Synonyms)
	}
	if len(r.Anonyms) != 1 || r.Anonyms[0] != "goodbye" {
		t.Errorf("Anonyms = %v", r.Anonyms)
	}
}

func TestNewDefineCmd(t *testing.T) {
	cmd := newDefineCmd()
	if cmd == nil {
		t.Fatal("newDefineCmd() returned nil")
	}
	if cmd.Use != "define [--word <word>]" {
		t.Errorf("Use = %q", cmd.Use)
	}
	if cmd.Flag("json") == nil {
		t.Error("expected --json flag")
	}
	if cmd.Flag("word") == nil {
		t.Error("expected --word flag")
	}
}

func TestNewDefineCmdArgs(t *testing.T) {
	cmd := newDefineCmd()
	if cmd.Args != nil {
		t.Error("Args should be nil after conversion to flags")
	}
}
