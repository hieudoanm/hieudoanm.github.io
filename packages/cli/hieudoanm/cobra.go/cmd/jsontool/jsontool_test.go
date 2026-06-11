package jsontool

import (
	"encoding/json"
	"testing"
)

func TestJSONValid(t *testing.T) {
	var v interface{}
	if err := json.Unmarshal([]byte(`{"a":1}`), &v); err != nil {
		t.Errorf("valid JSON should parse: %v", err)
	}
}

func TestJSONInvalid(t *testing.T) {
	var v interface{}
	if err := json.Unmarshal([]byte(`{invalid}`), &v); err == nil {
		t.Error("invalid JSON should not parse")
	}
}

func TestJSONMinify(t *testing.T) {
	input := `{  "a" : 1,  "b" : 2  }`
	var v interface{}
	json.Unmarshal([]byte(input), &v)
	b, _ := json.Marshal(v)
	expected := `{"a":1,"b":2}`
	if string(b) != expected {
		t.Errorf("minify = %s, want %s", string(b), expected)
	}
}
