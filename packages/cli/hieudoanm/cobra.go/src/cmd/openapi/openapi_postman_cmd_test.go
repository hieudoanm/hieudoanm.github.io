package openapi

import (
	"encoding/json"
	"testing"
)

func TestGetMap(t *testing.T) {
	m := map[string]interface{}{"key": "val"}
	if got := getMap(m); got == nil {
		t.Error("getMap should return the map")
	}
	if got := getMap("not a map"); got != nil {
		t.Error("getMap should return nil for non-map")
	}
	if got := getMap(nil); got != nil {
		t.Error("getMap should return nil for nil")
	}
}

func TestGetSlice(t *testing.T) {
	s := []interface{}{1, 2, 3}
	if got := getSlice(s); got == nil {
		t.Error("getSlice should return the slice")
	}
	if got := getSlice("not a slice"); got != nil {
		t.Error("getSlice should return nil for non-slice")
	}
}

func TestGetString(t *testing.T) {
	if got := getString("hello"); got != "hello" {
		t.Errorf("getString = %q", got)
	}
	if got := getString(42); got != "" {
		t.Errorf("getString should return empty for non-string, got %q", got)
	}
	if got := getString(nil); got != "" {
		t.Errorf("getString should return empty for nil")
	}
}

func TestSchemaToExample(t *testing.T) {
	tests := []struct {
		name   string
		schema map[string]interface{}
		want   interface{}
	}{
		{"has example", map[string]interface{}{"example": "hello"}, "hello"},
		{"has default", map[string]interface{}{"default": 42}, 42},
		{"string type", map[string]interface{}{"type": "string"}, "string"},
		{"string with enum", map[string]interface{}{"type": "string", "enum": []interface{}{"a", "b"}}, "a"},
		{"integer type", map[string]interface{}{"type": "integer"}, 0},
		{"number type", map[string]interface{}{"type": "number"}, 0},
		{"boolean type", map[string]interface{}{"type": "boolean"}, true},
		{"array type", map[string]interface{}{"type": "array", "items": map[string]interface{}{"type": "string"}}, []interface{}{"string"}},
		{"object type", map[string]interface{}{
			"type": "object",
			"properties": map[string]interface{}{
				"name": map[string]interface{}{"type": "string"},
			},
		}, map[string]interface{}{"name": "string"}},
		{"nil schema", nil, nil},
	}
	for _, tt := range tests {
		got := schemaToExample(tt.schema)
		if !jsonEqual(got, tt.want) {
			t.Errorf("%s: got %v (%T), want %v (%T)", tt.name, got, got, tt.want, tt.want)
		}
	}
}

func jsonEqual(a, b interface{}) bool {
	aj, _ := jsonMarshal(a)
	bj, _ := jsonMarshal(b)
	return string(aj) == string(bj)
}

func jsonMarshal(v interface{}) ([]byte, error) {
	return json.Marshal(v)
}

func TestParseOpenAPI(t *testing.T) {
	jsonSpec := `{"openapi":"3.0.0","info":{"title":"Test API","version":"1.0"},"paths":{}}`
	spec, err := parseOpenAPI([]byte(jsonSpec))
	if err != nil {
		t.Fatalf("parse JSON: %v", err)
	}
	if spec["openapi"] != "3.0.0" {
		t.Errorf("openapi = %v", spec["openapi"])
	}
}

func TestParseOpenAPIInvalid(t *testing.T) {
	_, err := parseOpenAPI([]byte("not valid json or yaml"))
	if err == nil {
		t.Error("expected error for invalid input")
	}
}

func TestNormalizeYAML(t *testing.T) {
	nested := map[interface{}]interface{}{
		"key": map[interface{}]interface{}{
			"inner": "val",
		},
	}
	result := normalizeYAML(nested)
	m, ok := result.(map[string]interface{})
	if !ok {
		t.Fatalf("expected map[string]interface{}, got %T", result)
	}
	if m["key"] == nil {
		t.Fatal("expected nested key")
	}
	inner, ok := m["key"].(map[string]interface{})
	if !ok {
		t.Fatalf("expected nested map[string]interface{}, got %T", m["key"])
	}
	if inner["inner"] != "val" {
		t.Errorf("inner = %v", inner["inner"])
	}
}

func TestConvertToPostman(t *testing.T) {
	raw, err := json.Marshal(JSON{
		"openapi": "3.0.0",
		"info": map[string]interface{}{
			"title":       "Pet Store",
			"description": "A pet store API",
		},
		"servers": []interface{}{
			map[string]interface{}{"url": "https://api.example.com/v1"},
		},
		"paths": map[string]interface{}{
			"/pets": map[string]interface{}{
				"get": map[string]interface{}{
					"tags":    []interface{}{"pets"},
					"summary": "List all pets",
					"parameters": []interface{}{
						map[string]interface{}{
							"name":        "limit",
							"in":          "query",
							"description": "Max results",
							"example":     10,
						},
					},
					"responses": map[string]interface{}{
						"200": map[string]interface{}{"description": "OK"},
					},
				},
				"post": map[string]interface{}{
					"tags":    []interface{}{"pets"},
					"summary": "Create a pet",
					"requestBody": map[string]interface{}{
						"content": map[string]interface{}{
							"application/json": map[string]interface{}{
								"schema": map[string]interface{}{
									"type": "object",
									"properties": map[string]interface{}{
										"name": map[string]interface{}{"type": "string"},
									},
								},
							},
						},
					},
				},
			},
		},
	})
	if err != nil {
		t.Fatalf("marshal: %v", err)
	}

	spec, err := parseOpenAPI(raw)
	if err != nil {
		t.Fatalf("parseOpenAPI: %v", err)
	}

	result, err := convertToPostman(spec)
	if err != nil {
		t.Fatalf("convertToPostman: %v", err)
	}

	// Round-trip through JSON to normalize JSON (named type) -> map[string]interface{}
	out, _ := json.Marshal(result)
	var norm map[string]interface{}
	if err := json.Unmarshal(out, &norm); err != nil {
		t.Fatalf("unmarshal result: %v", err)
	}

	info := getMap(norm["info"])
	if info == nil {
		t.Fatal("missing info")
	}
	if info["name"] != "Pet Store" {
		t.Errorf("name = %v", info["name"])
	}

	items := getSlice(norm["item"])
	if items == nil || len(items) == 0 {
		t.Fatal("expected at least one item folder")
	}
	folder := getMap(items[0])
	if folder == nil {
		t.Fatal("expected folder")
	}
	if folder["name"] != "pets" {
		t.Errorf("folder name = %v", folder["name"])
	}

	folderItems := getSlice(folder["item"])
	if folderItems == nil || len(folderItems) != 2 {
		t.Fatalf("expected 2 items in folder, got %d", len(folderItems))
	}

	names := map[string]bool{}
	for _, fi := range folderItems {
		m := getMap(fi)
		if m == nil {
			t.Fatal("expected item map")
		}
		names[getString(m["name"])] = true
	}
	if !names["List all pets"] {
		t.Error("missing item 'List all pets'")
	}
	if !names["Create a pet"] {
		t.Error("missing item 'Create a pet'")
	}
}

func TestNewPostmanCommand(t *testing.T) {
	cmd := newPostmanCmd()
	if cmd == nil {
		t.Fatal("newPostmanCmd() returned nil")
	}
	if cmd.Use != "openapi2postman" {
		t.Errorf("Use = %q", cmd.Use)
	}
	if cmd.Flag("input") == nil || cmd.Flag("output") == nil {
		t.Error("expected --input and --output flags")
	}
}
