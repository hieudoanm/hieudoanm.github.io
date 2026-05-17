package main

import (
	"encoding/json"
	"testing"
)

func TestValidateData_EmptySchema(t *testing.T) {
	if err := validateData(json.RawMessage(`{"a":1}`), ""); err != nil {
		t.Fatalf("empty schema: %v", err)
	}
	if err := validateData(json.RawMessage(`{"a":1}`), "{}"); err != nil {
		t.Fatalf("empty object schema: %v", err)
	}
}

func TestValidateData_InvalidData(t *testing.T) {
	err := validateData(json.RawMessage(`not json`), `{"name":"string"}`)
	if err == nil {
		t.Fatal("expected error for invalid data")
	}
}

func TestValidateData_InvalidSchema(t *testing.T) {
	err := validateData(json.RawMessage(`{"name":"hello"}`), `not json`)
	if err != nil {
		t.Fatalf("expected nil for invalid schema, got %v", err)
	}
}

func TestValidateData_RequiredField(t *testing.T) {
	err := validateData(json.RawMessage(`{}`), `{"name":"string"}`)
	if err == nil {
		t.Fatal("expected error for missing required field")
	}
}

func TestValidateData_OptionalField(t *testing.T) {
	err := validateData(json.RawMessage(`{}`), `{"name?":"string"}`)
	if err != nil {
		t.Fatalf("expected nil for missing optional field, got %v", err)
	}
}

func TestValidateData_TypeString(t *testing.T) {
	err := validateData(json.RawMessage(`{"name":"hello"}`), `{"name":"string"}`)
	if err != nil {
		t.Fatalf("valid string: %v", err)
	}
	err = validateData(json.RawMessage(`{"name":123}`), `{"name":"string"}`)
	if err == nil {
		t.Fatal("expected error for non-string")
	}
}

func TestValidateData_TypeNumber(t *testing.T) {
	err := validateData(json.RawMessage(`{"price":9.99}`), `{"price":"number"}`)
	if err != nil {
		t.Fatalf("valid number: %v", err)
	}
	err = validateData(json.RawMessage(`{"price":"9.99"}`), `{"price":"number"}`)
	if err == nil {
		t.Fatal("expected error for non-number")
	}
}

func TestValidateData_TypeInteger(t *testing.T) {
	err := validateData(json.RawMessage(`{"count":42}`), `{"count":"integer"}`)
	if err != nil {
		t.Fatalf("valid integer: %v", err)
	}
	err = validateData(json.RawMessage(`{"count":42.5}`), `{"count":"integer"}`)
	if err == nil {
		t.Fatal("expected error for non-integer")
	}
	err = validateData(json.RawMessage(`{"count":"42"}`), `{"count":"integer"}`)
	if err == nil {
		t.Fatal("expected error for string instead of integer")
	}
}

func TestValidateData_TypeBoolean(t *testing.T) {
	err := validateData(json.RawMessage(`{"active":true}`), `{"active":"boolean"}`)
	if err != nil {
		t.Fatalf("valid boolean: %v", err)
	}
	err = validateData(json.RawMessage(`{"active":"true"}`), `{"active":"boolean"}`)
	if err == nil {
		t.Fatal("expected error for non-boolean")
	}
}

func TestValidateData_TypeArray(t *testing.T) {
	err := validateData(json.RawMessage(`{"tags":["a","b"]}`), `{"tags":"array"}`)
	if err != nil {
		t.Fatalf("valid array: %v", err)
	}
	err = validateData(json.RawMessage(`{"tags":"not-array"}`), `{"tags":"array"}`)
	if err == nil {
		t.Fatal("expected error for non-array")
	}
}

func TestValidateData_TypeObject(t *testing.T) {
	err := validateData(json.RawMessage(`{"meta":{"key":"val"}}`), `{"meta":"object"}`)
	if err != nil {
		t.Fatalf("valid object: %v", err)
	}
	err = validateData(json.RawMessage(`{"meta":"not-object"}`), `{"meta":"object"}`)
	if err == nil {
		t.Fatal("expected error for non-object")
	}
}

func TestValidateData_TypeEmail(t *testing.T) {
	err := validateData(json.RawMessage(`{"email":"user@example.com"}`), `{"email":"email"}`)
	if err != nil {
		t.Fatalf("valid email: %v", err)
	}
	err = validateData(json.RawMessage(`{"email":"not-an-email"}`), `{"email":"email"}`)
	if err == nil {
		t.Fatal("expected error for invalid email (no @)")
	}
	err = validateData(json.RawMessage(`{"email":123}`), `{"email":"email"}`)
	if err == nil {
		t.Fatal("expected error for non-string email")
	}
}

func TestValidateData_TypeURL(t *testing.T) {
	err := validateData(json.RawMessage(`{"url":"https://example.com"}`), `{"url":"url"}`)
	if err != nil {
		t.Fatalf("valid https url: %v", err)
	}
	err = validateData(json.RawMessage(`{"url":"http://example.com"}`), `{"url":"url"}`)
	if err != nil {
		t.Fatalf("valid http url: %v", err)
	}
	err = validateData(json.RawMessage(`{"url":"not-a-url"}`), `{"url":"url"}`)
	if err == nil {
		t.Fatal("expected error for invalid url (no scheme)")
	}
	err = validateData(json.RawMessage(`{"url":42}`), `{"url":"url"}`)
	if err == nil {
		t.Fatal("expected error for non-string url")
	}
}

func TestValidateData_MultipleErrors(t *testing.T) {
	err := validateData(json.RawMessage(`{"name":123,"email":"bad"}`), `{"name":"string","email":"email"}`)
	if err == nil {
		t.Fatal("expected multiple errors")
	}
}

func TestValidateData_MixedFields(t *testing.T) {
	err := validateData(json.RawMessage(`{"name":"hello","email":"a@b.com","count":10}`),
		`{"name":"string","email":"email","count":"integer"}`)
	if err != nil {
		t.Fatalf("valid mixed fields: %v", err)
	}
}

func TestValidateData_AllTypesValid(t *testing.T) {
	data := json.RawMessage(`{
		"s":"hi","n":1.5,"i":10,"b":true,"a":[1],"o":{"k":"v"},
		"e":"test@test.com","u":"https://x.com"
	}`)
	schema := `{"s":"string","n":"number","i":"integer","b":"boolean","a":"array","o":"object","e":"email","u":"url"}`
	if err := validateData(data, schema); err != nil {
		t.Fatalf("all types valid: %v", err)
	}
}
