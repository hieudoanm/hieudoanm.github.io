package convert

import (
	"encoding/json"
	"fmt"
	"sort"
	"strconv"
	"strings"
)

// ---------------------------------------------------------------------------
// JSON utilities
// ---------------------------------------------------------------------------

func ParseJson(text string, defaultValue interface{}) interface{} {
	var result interface{}
	if err := json.Unmarshal([]byte(text), &result); err != nil {
		return defaultValue
	}
	return result
}

func JsonToCsv(data interface{}) string {
	arr, ok := toSlice(data)
	if !ok || len(arr) == 0 {
		return ""
	}

	headers := orderedKeys(arr[0])
	quote := func(s string) string { return `"` + s + `"` }

	var b strings.Builder
	for i, h := range headers {
		if i > 0 {
			b.WriteByte(',')
		}
		b.WriteString(quote(h))
	}
	b.WriteByte('\n')

	for _, item := range arr {
		m, ok := item.(map[string]interface{})
		if !ok {
			continue
		}
		for i, h := range headers {
			if i > 0 {
				b.WriteByte(',')
			}
			if v, exists := m[h]; exists {
				b.WriteString(quote(fmt.Sprintf("%v", v)))
			} else {
				b.WriteString(`""`)
			}
		}
		b.WriteByte('\n')
	}
	return b.String()
}

func toSlice(v interface{}) ([]interface{}, bool) {
	a, ok := v.([]interface{})
	return a, ok
}

func orderedKeys(m interface{}) []string {
	obj, ok := m.(map[string]interface{})
	if !ok {
		return nil
	}
	keys := make([]string, 0, len(obj))
	for k := range obj {
		keys = append(keys, k)
	}
	sort.Strings(keys)
	return keys
}

func capitalize(s string) string {
	if s == "" {
		return ""
	}
	return strings.ToUpper(s[:1]) + s[1:]
}

// ---------------------------------------------------------------------------
// XML
// ---------------------------------------------------------------------------

func ToXml(obj interface{}, indent bool, indentSize int, declaration bool, rootName string) string {
	sp := func(level int) string {
		if !indent {
			return ""
		}
		return strings.Repeat(" ", level*indentSize)
	}
	nl := ""
	if indent {
		nl = "\n"
	}
	esc := func(s string) string {
		s = strings.ReplaceAll(s, "&", "&amp;")
		s = strings.ReplaceAll(s, "<", "&lt;")
		s = strings.ReplaceAll(s, ">", "&gt;")
		s = strings.ReplaceAll(s, "\"", "&quot;")
		s = strings.ReplaceAll(s, "'", "&apos;")
		return s
	}

	var ser func(key string, value interface{}, level int) string
	ser = func(key string, value interface{}, level int) string {
		switch v := value.(type) {
		case nil:
			return ""
		case []interface{}:
			var parts []string
			for _, item := range v {
				parts = append(parts, ser(key, item, level))
			}
			return strings.Join(parts, "")
		case string:
			return fmt.Sprintf("%s<%s>%s</%s>%s", sp(level), key, esc(v), key, nl)
		case float64:
			return fmt.Sprintf("%s<%s>%s</%s>%s", sp(level), key, strconv.FormatFloat(v, 'f', -1, 64), key, nl)
		case bool:
			return fmt.Sprintf("%s<%s>%t</%s>%s", sp(level), key, v, key, nl)
		case map[string]interface{}:
			var attrs []string
			var children []string
			for ck, cv := range v {
				if strings.HasPrefix(ck, "@") {
					attrs = append(attrs, fmt.Sprintf(`%s="%s"`, ck[1:], esc(fmt.Sprintf("%v", cv))))
				} else {
					children = append(children, ser(ck, cv, level+1))
				}
			}
			attrStr := ""
			if len(attrs) > 0 {
				attrStr = " " + strings.Join(attrs, " ")
			}
			if len(children) == 0 {
				return fmt.Sprintf("%s<%s%s />%s", sp(level), key, attrStr, nl)
			}
			return fmt.Sprintf("%s<%s%s>%s%s%s</%s>%s", sp(level), key, attrStr, nl, strings.Join(children, ""), sp(level), key, nl)
		}
		return ""
	}

	objMap, ok := obj.(map[string]interface{})
	if !ok {
		return ""
	}

	keys := orderedKeys(obj)
	var bodyParts []string
	for _, k := range keys {
		bodyParts = append(bodyParts, ser(k, objMap[k], 0))
	}
	body := strings.Join(bodyParts, "")

	wrapped := body
	if rootName != "" {
		wrapped = fmt.Sprintf("%s<%s>%s%s%s</%s>%s", sp(0), rootName, nl, body, sp(0), rootName, nl)
	}
	if declaration {
		return fmt.Sprintf(`<?xml version="1.0" encoding="UTF-8"?>%s%s`, nl, wrapped)
	}
	return wrapped
}

// ---------------------------------------------------------------------------
// Java
// ---------------------------------------------------------------------------

func javaTypeOf(v interface{}, key string) string {
	switch val := v.(type) {
	case nil:
		return "Object"
	case bool:
		return "boolean"
	case float64:
		if val == float64(int64(val)) {
			return "int"
		}
		return "double"
	case string:
		return "String"
	case []interface{}:
		if len(val) == 0 {
			return "List<Object>"
		}
		types := make(map[string]bool)
		for _, item := range val {
			types[javaTypeOf(item, "")] = true
		}
		if len(types) == 1 {
			for t := range types {
				return "List<" + t + ">"
			}
		}
		return "List<Object>"
	case map[string]interface{}:
		if key == "" {
			return "Object"
		}
		return capitalize(key)
	}
	return "Object"
}

func ToJava(data interface{}, rootName string) string {
	if rootName == "" {
		rootName = "Root"
	}
	visited := make(map[string]bool)
	var classes []string

	var walk func(obj map[string]interface{}, className string)
	walk = func(obj map[string]interface{}, className string) {
		if visited[className] {
			return
		}
		visited[className] = true

		var lines []string
		lines = append(lines, fmt.Sprintf("public class %s {", className))
		if len(obj) == 0 {
			lines = append(lines, "    // empty")
		}
		keys := orderedKeys(obj)
		for _, k := range keys {
			v := obj[k]
			var ft string
			if m, isObj := v.(map[string]interface{}); isObj {
				nested := capitalize(k)
				walk(m, nested)
				ft = nested
			} else {
				ft = javaTypeOf(v, k)
			}
			nullable := ""
			if v == nil {
				nullable = " @Nullable"
			}
			lines = append(lines, fmt.Sprintf("    %s private %s %s;", nullable, ft, k))
		}
		lines = append(lines, "}")
		classes = append(classes, strings.Join(lines, "\n"))
	}

	if m, ok := data.(map[string]interface{}); ok {
		walk(m, rootName)
	}
	return "import java.util.List;\nimport javax.annotation.Nullable;\n\n" + strings.Join(classes, "\n\n")
}

// ---------------------------------------------------------------------------
// Python
// ---------------------------------------------------------------------------

func pyTypeOf(v interface{}) string {
	switch val := v.(type) {
	case nil:
		return "Any"
	case bool:
		return "bool"
	case float64:
		return "float"
	case string:
		return "str"
	case []interface{}:
		if len(val) == 0 {
			return "List[Any]"
		}
		types := make(map[string]bool)
		for _, item := range val {
			types[pyTypeOf(item)] = true
		}
		if len(types) == 1 {
			for t := range types {
				return "List[" + t + "]"
			}
		}
		union := make([]string, 0, len(types))
		for t := range types {
			union = append(union, t)
		}
		sort.Strings(union)
		return "List[Union[" + strings.Join(union, ", ") + "]]"
	case map[string]interface{}:
		return "dict"
	}
	return "Any"
}

func ToPython(data interface{}, rootName string) string {
	if rootName == "" {
		rootName = "Root"
	}
	var classes []string

	var walk func(obj map[string]interface{}, className string, level int)
	walk = func(obj map[string]interface{}, className string, level int) {
		ind := strings.Repeat("    ", level)
		var lines []string
		lines = append(lines, ind+"@dataclass")
		lines = append(lines, fmt.Sprintf("%sclass %s:", ind, className))
		if len(obj) == 0 {
			lines = append(lines, ind+"    pass")
		}
		keys := orderedKeys(obj)
		for _, k := range keys {
			v := obj[k]
			if m, isObj := v.(map[string]interface{}); isObj {
				nested := className + capitalize(k)
				walk(m, nested, level)
				lines = append(lines, fmt.Sprintf("%s    %s: %s", ind, k, nested))
			} else {
				optional := ""
				if v == nil {
					optional = " | None"
				}
				lines = append(lines, fmt.Sprintf("%s    %s: %s%s", ind, k, pyTypeOf(v), optional))
			}
		}
		classes = append(classes, strings.Join(lines, "\n"))
	}

	if m, ok := data.(map[string]interface{}); ok {
		walk(m, rootName, 0)
	}
	return "from dataclasses import dataclass\nfrom typing import List, Union, Any\n\n" + strings.Join(classes, "\n\n")
}

// ---------------------------------------------------------------------------
// Rust
// ---------------------------------------------------------------------------

func rsTypeOf(v interface{}, key string) string {
	switch val := v.(type) {
	case nil:
		return "Option<serde_json::Value>"
	case bool:
		return "bool"
	case float64:
		if val == float64(int64(val)) {
			return "i64"
		}
		return "f64"
	case string:
		return "String"
	case []interface{}:
		if len(val) == 0 {
			return "Vec<serde_json::Value>"
		}
		types := make(map[string]bool)
		for _, item := range val {
			types[rsTypeOf(item, "")] = true
		}
		if len(types) == 1 {
			for t := range types {
				return "Vec<" + t + ">"
			}
		}
		return "Vec<serde_json::Value>"
	case map[string]interface{}:
		if key == "" {
			return "serde_json::Value"
		}
		return capitalize(key)
	}
	return "serde_json::Value"
}

func ToRust(data interface{}, rootName string) string {
	if rootName == "" {
		rootName = "Root"
	}
	visited := make(map[string]bool)
	var structs []string

	var walk func(obj map[string]interface{}, structName string)
	walk = func(obj map[string]interface{}, structName string) {
		if visited[structName] {
			return
		}
		visited[structName] = true

		var lines []string
		lines = append(lines, "#[derive(Debug, Serialize, Deserialize)]")
		lines = append(lines, fmt.Sprintf("pub struct %s {", structName))
		if len(obj) == 0 {
			lines = append(lines, "    // empty")
		}
		keys := orderedKeys(obj)
		for _, k := range keys {
			v := obj[k]
			var ft string
			if m, isObj := v.(map[string]interface{}); isObj {
				nested := capitalize(k)
				walk(m, nested)
				ft = nested
			} else {
				ft = rsTypeOf(v, k)
			}
			if v == nil {
				ft = strings.ReplaceAll(ft, "Option<serde_json::Value>", "serde_json::Value")
				ft = "Option<" + ft + ">"
			}
			safeKey := k
			if k == "type" {
				safeKey = "r#type"
			}
			lines = append(lines, fmt.Sprintf("    pub %s: %s,", safeKey, ft))
		}
		lines = append(lines, "}")
		structs = append(structs, strings.Join(lines, "\n"))
	}

	if m, ok := data.(map[string]interface{}); ok {
		walk(m, rootName)
	}
	return "use serde::{Serialize, Deserialize};\n\n" + strings.Join(structs, "\n\n")
}

// ---------------------------------------------------------------------------
// TypeScript
// ---------------------------------------------------------------------------

func ToTS(data interface{}, rootName string, indentSize int) string {
	if rootName == "" {
		rootName = "Root"
	}
	if indentSize == 0 {
		indentSize = 2
	}
	ind := func(level int) string { return strings.Repeat(" ", level*indentSize) }

	var pt func(v interface{}, level int) string
	pt = func(v interface{}, level int) string {
		switch val := v.(type) {
		case nil:
			return "null"
		case bool:
			return "boolean"
		case float64:
			return "number"
		case string:
			return "string"
		case []interface{}:
			if len(val) == 0 {
				return "any[]"
			}
			types := make(map[string]bool)
			for _, item := range val {
				types[pt(item, level)] = true
			}
			if len(types) == 1 {
				for t := range types {
					return t + "[]"
				}
			}
			union := make([]string, 0, len(types))
			for t := range types {
				union = append(union, t)
			}
			sort.Strings(union)
			return "(" + strings.Join(union, " | ") + ")[]"
		case map[string]interface{}:
			if len(val) == 0 {
				return "{}"
			}
			var lines []string
			lines = append(lines, "{")
			keys := orderedKeys(val)
			for _, k := range keys {
				optional := ""
				if val[k] == nil {
					optional = "?"
				}
				lines = append(lines, fmt.Sprintf("%s%s%s: %s;", ind(level+1), k, optional, pt(val[k], level+1)))
			}
			lines = append(lines, ind(level)+"}")
			return strings.Join(lines, "\n")
		}
		return "any"
	}

	return fmt.Sprintf("type %s = %s;\n", rootName, pt(data, 0))
}

// ---------------------------------------------------------------------------
// JSON Schema
// ---------------------------------------------------------------------------

func ToSchema(data interface{}, rootName string, indentSize int) string {
	var buildType func(interface{}) map[string]interface{}
	var buildObjectSchema func(map[string]interface{}) map[string]interface{}
	var mergeSchemas func([]map[string]interface{}) map[string]interface{}

	buildType = func(value interface{}) map[string]interface{} {
		if value == nil {
			return map[string]interface{}{"type": "null"}
		}
		switch val := value.(type) {
		case bool:
			return map[string]interface{}{"type": "boolean"}
		case float64:
			if val == float64(int64(val)) {
				return map[string]interface{}{"type": "integer"}
			}
			return map[string]interface{}{"type": "number"}
		case string:
			return map[string]interface{}{"type": "string"}
		case []interface{}:
			if len(val) == 0 {
				return map[string]interface{}{"type": "array", "items": map[string]interface{}{}}
			}
			itemSchemas := make([]map[string]interface{}, len(val))
			for i, v := range val {
				itemSchemas[i] = buildType(v)
			}
			merged := mergeSchemas(itemSchemas)
			return map[string]interface{}{"type": "array", "items": merged}
		case map[string]interface{}:
			return buildObjectSchema(val)
		}
		return map[string]interface{}{}
	}

	buildObjectSchema = func(obj map[string]interface{}) map[string]interface{} {
		required := []string{}
		properties := make(map[string]interface{})

		keys := orderedKeys(obj)
		for _, key := range keys {
			val := obj[key]
			if val != nil {
				required = append(required, key)
			}
			if val == nil {
				properties[key] = map[string]interface{}{"type": "null"}
			} else {
				properties[key] = buildType(val)
			}
		}

		schema := map[string]interface{}{
			"type":       "object",
			"properties": properties,
		}
		if len(required) > 0 {
			schema["required"] = required
		}
		return schema
	}

	mergeSchemas = func(schemas []map[string]interface{}) map[string]interface{} {
		if len(schemas) == 1 {
			return schemas[0]
		}

		typeSet := make(map[string]bool)
		for _, s := range schemas {
			if t, ok := s["type"].(string); ok {
				typeSet[t] = true
			}
		}
		types := make([]string, 0, len(typeSet))
		for t := range typeSet {
			types = append(types, t)
		}
		sort.Strings(types)

		if len(types) == 1 {
			t := types[0]
			if t == "object" {
				allKeys := make(map[string]bool)
				for _, s := range schemas {
					if props, ok := s["properties"].(map[string]interface{}); ok {
						for k := range props {
							allKeys[k] = true
						}
					}
				}
				keyList := make([]string, 0, len(allKeys))
				for k := range allKeys {
					keyList = append(keyList, k)
				}
				sort.Strings(keyList)

				mergedProps := make(map[string]interface{})
				mergedRequired := []string{}

				for _, key := range keyList {
					keySchemas := []map[string]interface{}{}
					for _, s := range schemas {
						if props, ok := s["properties"].(map[string]interface{}); ok {
							if ks, ok := props[key]; ok {
								if ksm, ok := ks.(map[string]interface{}); ok {
									keySchemas = append(keySchemas, ksm)
								}
							}
						}
					}
					if len(keySchemas) == len(schemas) {
						mergedRequired = append(mergedRequired, key)
					}
					if len(keySchemas) > 0 {
						mergedProps[key] = mergeSchemas(keySchemas)
					} else {
						mergedProps[key] = map[string]interface{}{}
					}
				}

				merged := map[string]interface{}{
					"type":       "object",
					"properties": mergedProps,
				}
				if len(mergedRequired) > 0 {
					merged["required"] = mergedRequired
				}
				return merged
			}
			return map[string]interface{}{"type": t}
		}

		oneOf := make([]map[string]interface{}, len(types))
		for i, t := range types {
			oneOf[i] = map[string]interface{}{"type": t}
		}
		return map[string]interface{}{"oneOf": oneOf}
	}

	root := buildType(data)
	result := map[string]interface{}{
		"$schema": "http://json-schema.org/draft-07/schema#",
		"$id":     rootName,
		"title":   rootName,
	}
	for k, v := range root {
		result[k] = v
	}

	b, err := json.MarshalIndent(result, "", strings.Repeat(" ", indentSize))
	if err != nil {
		return ""
	}
	return string(b)
}

// ---------------------------------------------------------------------------
// json() fluent API
// ---------------------------------------------------------------------------

type JsonResult struct {
	data         interface{}
	defaultValue interface{}
}

func Json(data interface{}, defaultValue interface{}) JsonResult {
	if defaultValue == nil {
		defaultValue = data
	}
	return JsonResult{data: data, defaultValue: defaultValue}
}

func (j JsonResult) Parse() interface{} {
	b, err := json.Marshal(j.data)
	if err != nil {
		return j.defaultValue
	}
	return ParseJson(string(b), j.defaultValue)
}

func (j JsonResult) Beautify() string {
	b, err := json.MarshalIndent(j.data, "", "  ")
	if err != nil {
		return ""
	}
	return string(b)
}

func (j JsonResult) Minify() string {
	b, err := json.Marshal(j.data)
	if err != nil {
		return ""
	}
	return string(b)
}

func (j JsonResult) Sort() string {
	m, ok := toSortedMap(j.data)
	if !ok {
		return j.Minify()
	}
	b, err := json.MarshalIndent(m, "", "  ")
	if err != nil {
		return ""
	}
	return string(b)
}

func toSortedMap(v interface{}) (interface{}, bool) {
	switch val := v.(type) {
	case map[string]interface{}:
		sorted := make(map[string]interface{})
		keys := make([]string, 0, len(val))
		for k := range val {
			keys = append(keys, k)
		}
		sort.Strings(keys)
		for _, k := range keys {
			sorted[k], _ = toSortedMap(val[k])
		}
		return sorted, true
	case []interface{}:
		result := make([]interface{}, len(val))
		for i, item := range val {
			result[i], _ = toSortedMap(item)
		}
		return result, true
	default:
		return v, true
	}
}

func (j JsonResult) Convert(format string) string {
	switch format {
	case "java":
		return ToJava(j.data, "Root")
	case "py":
		return ToPython(j.data, "Root")
	case "rs":
		return ToRust(j.data, "Root")
	case "ts":
		return ToTS(j.data, "Root", 2)
	case "schema":
		return ToSchema(j.data, "Root", 2)
	case "xml":
		return ToXml(j.data, true, 2, false, "")
	default:
		return "Unsupported format: " + format
	}
}
