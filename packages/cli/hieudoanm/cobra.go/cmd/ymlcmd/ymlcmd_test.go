package ymlcmd

import (
	"testing"

	"gopkg.in/yaml.v3"
)

func TestYAMLMarshal(t *testing.T) {
	v := map[string]interface{}{
		"name":   "test",
		"values": []interface{}{1, 2, 3},
	}
	out, err := yaml.Marshal(v)
	if err != nil {
		t.Fatal(err)
	}
	if len(out) == 0 {
		t.Error("expected non-empty yaml output")
	}
}

func TestYAMLUnmarshal(t *testing.T) {
	input := "name: test\nage: 30\n"
	var v interface{}
	if err := yaml.Unmarshal([]byte(input), &v); err != nil {
		t.Fatal(err)
	}
}
