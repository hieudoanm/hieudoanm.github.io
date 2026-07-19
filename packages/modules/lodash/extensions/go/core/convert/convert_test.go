package convert

import (
	"strings"
	"testing"
)

func TestParseJson(t *testing.T) {
	t.Run("valid object", func(t *testing.T) {
		got := ParseJson(`{"a":1}`, nil)
		m, ok := got.(map[string]interface{})
		if !ok {
			t.Fatalf("expected map, got %T", got)
		}
		if m["a"] != float64(1) {
			t.Errorf("expected 1, got %v", m["a"])
		}
	})

	t.Run("valid array", func(t *testing.T) {
		got := ParseJson(`[1,2,3]`, []interface{}{})
		arr, ok := got.([]interface{})
		if !ok || len(arr) != 3 {
			t.Errorf("expected [1,2,3], got %v", got)
		}
	})

	t.Run("invalid json uses default", func(t *testing.T) {
		got := ParseJson(`bad`, "fallback")
		if got != "fallback" {
			t.Errorf("expected 'fallback', got %v", got)
		}
	})

	t.Run("default not provided returns nil", func(t *testing.T) {
		got := ParseJson(`bad`, nil)
		if got != nil {
			t.Errorf("expected nil, got %v", got)
		}
	})
}

func TestJsonToCsv(t *testing.T) {
	t.Run("empty input", func(t *testing.T) {
		if got := JsonToCsv([]interface{}{}); got != "" {
			t.Errorf("expected empty, got %q", got)
		}
	})

	t.Run("nil input", func(t *testing.T) {
		if got := JsonToCsv(nil); got != "" {
			t.Errorf("expected empty, got %q", got)
		}
	})

	t.Run("basic csv", func(t *testing.T) {
		data := []interface{}{
			map[string]interface{}{"name": "Alice", "age": float64(30)},
			map[string]interface{}{"name": "Bob", "age": float64(25)},
		}
		got := JsonToCsv(data)
		if !strings.Contains(got, "Alice") || !strings.Contains(got, "Bob") {
			t.Errorf("result missing data: %q", got)
		}
		if !strings.Contains(got, "name") || !strings.Contains(got, "age") {
			t.Errorf("result missing headers: %q", got)
		}
	})

	t.Run("non-array input", func(t *testing.T) {
		if got := JsonToCsv("not an array"); got != "" {
			t.Errorf("expected empty, got %q", got)
		}
	})
}

func TestToXml(t *testing.T) {
	t.Run("empty indented", func(t *testing.T) {
		obj := map[string]interface{}{}
		got := ToXml(obj, true, 2, false, "")
		if got != "" {
			t.Errorf("expected empty, got %q", got)
		}
	})

	t.Run("simple object", func(t *testing.T) {
		obj := map[string]interface{}{
			"name": "test",
		}
		got := ToXml(obj, true, 2, false, "")
		// with rootName empty, tags use key names directly
		if got == "" {
			t.Errorf("expected XML, got empty")
		}
	})

	t.Run("with root name and declaration", func(t *testing.T) {
		obj := map[string]interface{}{
			"item": "value",
		}
		got := ToXml(obj, false, 0, true, "root")
		if !strings.Contains(got, `<?xml`) {
			t.Errorf("expected declaration, got %q", got)
		}
		if !strings.Contains(got, "<root>") {
			t.Errorf("expected root tag, got %q", got)
		}
	})

	t.Run("with attributes", func(t *testing.T) {
		obj := map[string]interface{}{
			"div": map[string]interface{}{
				"@class": "main",
				"p":      "hello",
			},
		}
		got := ToXml(obj, true, 2, false, "")
		if got == "" {
			t.Errorf("expected XML, got empty")
		}
	})

	t.Run("nil value omitted", func(t *testing.T) {
		obj := map[string]interface{}{
			"key": nil,
		}
		got := ToXml(obj, true, 2, false, "")
		if got != "" {
			t.Errorf("expected empty for nil, got %q", got)
		}
	})

	t.Run("not a map returns empty", func(t *testing.T) {
		got := ToXml("bad", true, 2, false, "")
		if got != "" {
			t.Errorf("expected empty, got %q", got)
		}
	})
}

func TestToJava(t *testing.T) {
	t.Run("simple object", func(t *testing.T) {
		data := map[string]interface{}{
			"name": "test",
			"age":  float64(25),
		}
		got := ToJava(data, "Person")
		if !strings.Contains(got, "class Person") {
			t.Errorf("expected class Person, got %q", got)
		}
		if !strings.Contains(got, "private String name") {
			t.Errorf("expected String field, got %q", got)
		}
		if !strings.Contains(got, "private int age") {
			t.Errorf("expected int field, got %q", got)
		}
	})

	t.Run("empty root name uses Root", func(t *testing.T) {
		data := map[string]interface{}{}
		got := ToJava(data, "")
		if !strings.Contains(got, "class Root") {
			t.Errorf("expected class Root, got %q", got)
		}
	})

	t.Run("nested object creates inner class", func(t *testing.T) {
		data := map[string]interface{}{
			"child": map[string]interface{}{
				"val": float64(1),
			},
		}
		got := ToJava(data, "Parent")
		if !strings.Contains(got, "class Parent") {
			t.Errorf("expected class Parent, got %q", got)
		}
		if !strings.Contains(got, "class Child") {
			t.Errorf("expected class Child, got %q", got)
		}
	})

	t.Run("not a map returns empty", func(t *testing.T) {
		got := ToJava("bad", "Root")
		if got != "import java.util.List;\nimport javax.annotation.Nullable;\n\n" {
			t.Errorf("expected just imports, got %q", got)
		}
	})
}

func TestToPython(t *testing.T) {
	t.Run("simple object", func(t *testing.T) {
		data := map[string]interface{}{
			"name": "test",
		}
		got := ToPython(data, "Item")
		if !strings.Contains(got, "class Item") {
			t.Errorf("expected class Item, got %q", got)
		}
		if !strings.Contains(got, "name: str") {
			t.Errorf("expected str field, got %q", got)
		}
	})

	t.Run("empty root name uses Root", func(t *testing.T) {
		data := map[string]interface{}{}
		got := ToPython(data, "")
		if !strings.Contains(got, "class Root") {
			t.Errorf("expected class Root, got %q", got)
		}
	})
}

func TestToRust(t *testing.T) {
	t.Run("simple object", func(t *testing.T) {
		data := map[string]interface{}{
			"name": "test",
		}
		got := ToRust(data, "Item")
		if !strings.Contains(got, "struct Item") {
			t.Errorf("expected struct Item, got %q", got)
		}
		if !strings.Contains(got, "Serialize") {
			t.Errorf("expected derives, got %q", got)
		}
	})

	t.Run("empty struct", func(t *testing.T) {
		data := map[string]interface{}{}
		got := ToRust(data, "Empty")
		if !strings.Contains(got, "// empty") {
			t.Errorf("expected empty comment, got %q", got)
		}
	})

	t.Run("type keyword as field name", func(t *testing.T) {
		data := map[string]interface{}{
			"type": "test",
		}
		got := ToRust(data, "Msg")
		if !strings.Contains(got, "r#type") {
			t.Errorf("expected raw identifier, got %q", got)
		}
	})
}

func TestToTS(t *testing.T) {
	t.Run("simple object", func(t *testing.T) {
		data := map[string]interface{}{
			"name": "test",
		}
		got := ToTS(data, "Item", 2)
		if !strings.Contains(got, "type Item") {
			t.Errorf("expected type Item, got %q", got)
		}
		if !strings.Contains(got, "name: string") {
			t.Errorf("expected string field, got %q", got)
		}
	})

	t.Run("empty root name uses Root", func(t *testing.T) {
		data := map[string]interface{}{
			"x": float64(1),
		}
		got := ToTS(data, "", 0)
		if !strings.Contains(got, "type Root") {
			t.Errorf("expected type Root, got %q", got)
		}
	})

	t.Run("null field is optional", func(t *testing.T) {
		data := map[string]interface{}{
			"maybe": nil,
		}
		got := ToTS(data, "Test", 2)
		if !strings.Contains(got, "maybe?") {
			t.Errorf("expected optional field, got %q", got)
		}
	})
}

func TestToSchema(t *testing.T) {
	t.Run("string field", func(t *testing.T) {
		data := map[string]interface{}{
			"name": "hello",
		}
		got := ToSchema(data, "Item", 2)
		if !strings.Contains(got, "string") {
			t.Errorf("expected string type, got %q", got)
		}
	})

	t.Run("integer value", func(t *testing.T) {
		data := float64(42)
		got := ToSchema(data, "Num", 2)
		if !strings.Contains(got, "integer") {
			t.Errorf("expected integer type, got %q", got)
		}
	})

	t.Run("null value", func(t *testing.T) {
		var data interface{}
		got := ToSchema(data, "Null", 2)
		if !strings.Contains(got, "null") {
			t.Errorf("expected null type, got %q", got)
		}
	})
}

func TestJsonResult(t *testing.T) {
	t.Run("Parse", func(t *testing.T) {
		got := Json(`{"a":1}`, nil).Parse()
		if got == nil {
			t.Errorf("expected parsed result")
		}
	})

	t.Run("Parse with default on marshal error", func(t *testing.T) {
		ch := make(chan int)
		got := Json(ch, "fallback").Parse()
		if got != "fallback" {
			t.Errorf("expected 'fallback', got %v", got)
		}
	})

	t.Run("Beautify", func(t *testing.T) {
		got := Json(map[string]interface{}{"a": float64(1)}, nil).Beautify()
		if !strings.Contains(got, `"a"`) {
			t.Errorf("expected pretty JSON, got %q", got)
		}
	})

	t.Run("Minify", func(t *testing.T) {
		got := Json(map[string]interface{}{"a": float64(1)}, nil).Minify()
		if !strings.Contains(got, `"a"`) {
			t.Errorf("expected JSON, got %q", got)
		}
		if !strings.Contains(got, ":1") {
			t.Errorf("expected compact JSON, got %q", got)
		}
	})

	t.Run("Sort", func(t *testing.T) {
		data := map[string]interface{}{
			"z": float64(3),
			"a": float64(1),
			"m": float64(2),
		}
		got := Json(data, nil).Sort()
		if !strings.Contains(got, `"a"`) {
			t.Errorf("expected sorted keys, got %q", got)
		}
	})

	t.Run("Convert xml", func(t *testing.T) {
		data := map[string]interface{}{"x": "y"}
		got := Json(data, nil).Convert("xml")
		if got == "" || got == "Unsupported format: xml" {
			t.Errorf("expected XML, got %q", got)
		}
	})

	t.Run("Convert unsupported", func(t *testing.T) {
		got := Json(nil, nil).Convert("unknown")
		if got != "Unsupported format: unknown" {
			t.Errorf("expected error message, got %q", got)
		}
	})
}
