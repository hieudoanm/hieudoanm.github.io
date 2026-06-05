package main

import (
	"encoding/json"
	"fmt"
	"strings"
)

func validateData(data json.RawMessage, schema string) error {
	if schema == "" || schema == "{}" {
		return nil
	}
	var dataMap map[string]any
	if err := json.Unmarshal(data, &dataMap); err != nil {
		return fmt.Errorf("validation: invalid data: %v", err)
	}
	var schemaMap map[string]string
	if err := json.Unmarshal([]byte(schema), &schemaMap); err != nil {
		return nil
	}
	var errs []string
	for field, typ := range schemaMap {
		optional := false
		if strings.HasSuffix(field, "?") {
			optional = true
			field = strings.TrimSuffix(field, "?")
		}
		val, exists := dataMap[field]
		if !exists {
			if !optional {
				errs = append(errs, fmt.Sprintf("field %s is required", field))
			}
			continue
		}
		switch typ {
		case "string":
			if _, ok := val.(string); !ok {
				errs = append(errs, fmt.Sprintf("field %s must be a string", field))
			}
		case "number":
			if _, ok := val.(float64); !ok {
				errs = append(errs, fmt.Sprintf("field %s must be a number", field))
			}
		case "integer":
			v, ok := val.(float64)
			if !ok || v != float64(int64(v)) {
				errs = append(errs, fmt.Sprintf("field %s must be an integer", field))
			}
		case "boolean":
			if _, ok := val.(bool); !ok {
				errs = append(errs, fmt.Sprintf("field %s must be a boolean", field))
			}
		case "array":
			if _, ok := val.([]any); !ok {
				errs = append(errs, fmt.Sprintf("field %s must be an array", field))
			}
		case "object":
			if _, ok := val.(map[string]any); !ok {
				errs = append(errs, fmt.Sprintf("field %s must be an object", field))
			}
		case "email":
			s, ok := val.(string)
			if !ok {
				errs = append(errs, fmt.Sprintf("field %s must be a string", field))
			} else if !strings.Contains(s, "@") {
				errs = append(errs, fmt.Sprintf("field %s must be a valid email", field))
			}
		case "url":
			s, ok := val.(string)
			if !ok {
				errs = append(errs, fmt.Sprintf("field %s must be a string", field))
			} else if !strings.HasPrefix(s, "http://") && !strings.HasPrefix(s, "https://") {
				errs = append(errs, fmt.Sprintf("field %s must be a valid URL", field))
			}
		}
	}
	if len(errs) > 0 {
		return fmt.Errorf("validation: %s", strings.Join(errs, "; "))
	}
	return nil
}
