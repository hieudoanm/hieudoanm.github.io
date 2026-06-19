package openapi

import (
	"encoding/json"
	"strings"
	"testing"
)

func parseSpec(t *testing.T, spec JSON) JSON {
	t.Helper()
	raw, err := json.Marshal(spec)
	if err != nil {
		t.Fatalf("marshal: %v", err)
	}
	parsed, err := parseOpenAPI(raw)
	if err != nil {
		t.Fatalf("parseOpenAPI: %v", err)
	}
	return parsed
}

func TestValidateSpecValid(t *testing.T) {
	spec := parseSpec(t, JSON{
		"openapi": "3.0.0",
		"info": JSON{
			"title":   "Test API",
			"version": "1.0.0",
		},
		"paths": JSON{
			"/pets": JSON{
				"get": JSON{
					"operationId": "listPets",
					"responses":   JSON{"200": JSON{"description": "OK"}},
				},
			},
		},
	})
	issues := validateSpec(spec)
	if len(issues) != 0 {
		t.Errorf("expected no issues, got %d: %v", len(issues), issues)
	}
}

func TestValidateSpecMissingOpenAPI(t *testing.T) {
	spec := parseSpec(t, JSON{
		"info": JSON{"title": "T", "version": "1"},
	})
	issues := validateSpec(spec)
	if len(issues) == 0 {
		t.Fatal("expected issues")
	}
}

func TestValidateSpecInvalidOpenAPIVersion(t *testing.T) {
	spec := parseSpec(t, JSON{
		"openapi": "3",
		"info":    JSON{"title": "T", "version": "1"},
		"paths":   JSON{},
	})
	issues := validateSpec(spec)
	var found bool
	for _, i := range issues {
		if strings.Contains(i, "invalid openapi version") {
			found = true
			break
		}
	}
	if !found {
		t.Errorf("expected version format issue, got %v", issues)
	}
}

func TestValidateSpecMissingInfo(t *testing.T) {
	spec := parseSpec(t, JSON{
		"openapi": "3.0.0",
		"paths":   JSON{},
	})
	issues := validateSpec(spec)
	if len(issues) == 0 {
		t.Fatal("expected issues for missing info")
	}
}

func TestValidateSpecMissingPaths(t *testing.T) {
	spec := parseSpec(t, JSON{
		"openapi": "3.0.0",
		"info":    JSON{"title": "T", "version": "1"},
	})
	issues := validateSpec(spec)
	if len(issues) == 0 {
		t.Fatal("expected issues for missing paths")
	}
}

func TestValidateSpecPatchMethod(t *testing.T) {
	spec := parseSpec(t, JSON{
		"openapi": "3.0.0",
		"info":    JSON{"title": "T", "version": "1"},
		"paths": JSON{
			"/pets": JSON{
				"patch": JSON{
					"operationId": "updatePet",
					"responses":   JSON{"200": JSON{"description": "OK"}},
				},
			},
		},
	})
	issues := validateSpec(spec)
	if len(issues) != 0 {
		t.Errorf("patch is valid in OpenAPI, got issues: %v", issues)
	}
}

func TestValidateSpecMissingResponses(t *testing.T) {
	spec := parseSpec(t, JSON{
		"openapi": "3.0.0",
		"info":    JSON{"title": "T", "version": "1"},
		"paths": JSON{
			"/pets": JSON{
				"get": JSON{
					"operationId": "listPets",
				},
			},
		},
	})
	issues := validateSpec(spec)
	var found bool
	for _, i := range issues {
		if strings.Contains(i, "missing responses") {
			found = true
			break
		}
	}
	if !found {
		t.Errorf("expected missing responses issue, got %v", issues)
	}
}

func TestValidateSpecDuplicateOpID(t *testing.T) {
	spec := parseSpec(t, JSON{
		"openapi": "3.0.0",
		"info":    JSON{"title": "T", "version": "1"},
		"paths": JSON{
			"/pets": JSON{
				"get": JSON{
					"operationId": "listPets",
					"responses":   JSON{"200": JSON{"description": "OK"}},
				},
			},
			"/pets/{id}": JSON{
				"get": JSON{
					"operationId": "listPets",
					"responses":   JSON{"200": JSON{"description": "OK"}},
				},
			},
		},
	})
	issues := validateSpec(spec)
	var found bool
	for _, i := range issues {
		if strings.Contains(i, "duplicate operationId") {
			found = true
			break
		}
	}
	if !found {
		t.Errorf("expected duplicate operationId issue, got %v", issues)
	}
}

func TestValidatePathNotStartingWithSlash(t *testing.T) {
	spec := parseSpec(t, JSON{
		"openapi": "3.0.0",
		"info":    JSON{"title": "T", "version": "1"},
		"paths": JSON{
			"pets": JSON{
				"get": JSON{
					"operationId": "listPets",
					"responses":   JSON{"200": JSON{"description": "OK"}},
				},
			},
		},
	})
	issues := validateSpec(spec)
	var found bool
	for _, i := range issues {
		if strings.Contains(i, "should start with /") {
			found = true
			break
		}
	}
	if !found {
		t.Errorf("expected path format issue, got %v", issues)
	}
}

func TestNewValidateCommand(t *testing.T) {
	cmd := newValidateCmd()
	if cmd == nil {
		t.Fatal("newValidateCmd() returned nil")
	}
	if cmd.Use != "validate [--file <file>]" {
		t.Errorf("Use = %q", cmd.Use)
	}
	if cmd.Flag("file") == nil {
		t.Error("expected --file flag")
	}
}

func TestValidateSpecWithJSONRoundtrip(t *testing.T) {
	spec := parseSpec(t, JSON{
		"openapi": "3.0.0",
		"info":    JSON{"title": "T", "version": "1"},
		"paths":   JSON{},
	})
	issues := validateSpec(spec)
	if len(issues) != 0 {
		t.Errorf("valid spec has issues: %v", issues)
	}
}

func TestValidateSpecInvalidMethod(t *testing.T) {
	spec := parseSpec(t, JSON{
		"openapi": "3.0.0",
		"info":    JSON{"title": "T", "version": "1"},
		"paths": JSON{
			"/pets": JSON{
				"foo": JSON{
					"responses": JSON{"200": JSON{"description": "OK"}},
				},
			},
		},
	})
	issues := validateSpec(spec)
	var found bool
	for _, i := range issues {
		if strings.Contains(i, "invalid method") {
			found = true
			break
		}
	}
	if !found {
		t.Errorf("expected invalid method issue, got %v", issues)
	}
}
