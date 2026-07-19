package util

import (
	"fmt"
	"reflect"
	"strings"
	"sync"
)

var idCounter int
var idMu sync.Mutex

func Attempt(fn func(...interface{}) interface{}, args ...interface{}) interface{} {
	defer func() {
		recover()
	}()
	return fn(args...)
}

func BindAll(object map[string]interface{}, methodNames ...string) map[string]interface{} {
	result := make(map[string]interface{}, len(object))
	for k, v := range object {
		result[k] = v
	}
	for _, name := range methodNames {
		if fn, ok := result[name]; ok {
			if f, ok := fn.(func(...interface{}) interface{}); ok {
				result[name] = func(args ...interface{}) interface{} {
					return f(args...)
				}
			}
		}
	}
	return result
}

func Cond(pairs []struct {
	Predicate func(...interface{}) bool
	Action    func(...interface{}) interface{}
}) func(...interface{}) interface{} {
	return func(args ...interface{}) interface{} {
		for _, pair := range pairs {
			if pair.Predicate(args...) {
				return pair.Action(args...)
			}
		}
		return nil
	}
}

func Conforms(source map[string]func(interface{}) bool) func(map[string]interface{}) bool {
	return func(object map[string]interface{}) bool {
		for key, checker := range source {
			if val, ok := object[key]; ok {
				if !checker(val) {
					return false
				}
			} else {
				return false
			}
		}
		return true
	}
}

func Constant(value interface{}) func(...interface{}) interface{} {
	return func(args ...interface{}) interface{} {
		return value
	}
}

func DefaultTo(value interface{}, defaultValue interface{}) interface{} {
	if value == nil {
		return defaultValue
	}
	v := reflect.ValueOf(value)
	switch v.Kind() {
	case reflect.Float64, reflect.Float32:
		if v.Float() != v.Float() {
			return defaultValue
		}
	}
	return value
}

func Flow(funcs ...func(interface{}) interface{}) func(...interface{}) interface{} {
	return func(args ...interface{}) interface{} {
		var result interface{}
		if len(args) > 0 {
			result = args[0]
		}
		for _, fn := range funcs {
			result = fn(result)
		}
		return result
	}
}

func FlowRight(funcs ...func(interface{}) interface{}) func(...interface{}) interface{} {
	n := len(funcs)
	reversed := make([]func(interface{}) interface{}, n)
	for i, fn := range funcs {
		reversed[n-1-i] = fn
	}
	return Flow(reversed...)
}

func Identity(value interface{}) interface{} {
	return value
}

func Iteratee(funcOrPath interface{}) func(interface{}) interface{} {
	switch f := funcOrPath.(type) {
	case func(interface{}) interface{}:
		return f
	case string:
		return Property(f)
	default:
		return func(v interface{}) interface{} {
			return v
		}
	}
}

func Matches(source map[string]interface{}) func(map[string]interface{}) bool {
	return func(object map[string]interface{}) bool {
		for key, val := range source {
			if objVal, ok := object[key]; !ok || !reflect.DeepEqual(objVal, val) {
				return false
			}
		}
		return true
	}
}

func MatchesProperty(key string, value interface{}) func(map[string]interface{}) bool {
	return func(object map[string]interface{}) bool {
		if objVal, ok := object[key]; ok {
			return reflect.DeepEqual(objVal, value)
		}
		return false
	}
}

func Method(path string, args ...interface{}) func(map[string]interface{}) interface{} {
	return func(object map[string]interface{}) interface{} {
		parts := strings.Split(path, ".")
		var current interface{} = object
		for _, part := range parts {
			if m, ok := current.(map[string]interface{}); ok {
				current = m[part]
			} else {
				return nil
			}
		}
		if fn, ok := current.(func(...interface{}) interface{}); ok {
			return fn(args...)
		}
		return nil
	}
}

func MethodOf(object map[string]interface{}, args ...interface{}) func(string) interface{} {
	return func(path string) interface{} {
		parts := strings.Split(path, ".")
		var current interface{} = object
		for _, part := range parts {
			if m, ok := current.(map[string]interface{}); ok {
				current = m[part]
			} else {
				return nil
			}
		}
		if fn, ok := current.(func(...interface{}) interface{}); ok {
			return fn(args...)
		}
		return nil
	}
}

func Mixin(object map[string]interface{}, source map[string]interface{}) map[string]interface{} {
	result := make(map[string]interface{}, len(object))
	for k, v := range object {
		result[k] = v
	}
	for k, v := range source {
		result[k] = v
	}
	return result
}

func NoConflict() interface{} {
	return nil
}

func Noop(args ...interface{}) {
}

func NthArg(n int) func(...interface{}) interface{} {
	return func(args ...interface{}) interface{} {
		if n >= 0 && n < len(args) {
			return args[n]
		}
		return nil
	}
}

func Over(iteratees ...func(...interface{}) interface{}) func(...interface{}) []interface{} {
	return func(args ...interface{}) []interface{} {
		results := make([]interface{}, len(iteratees))
		for i, fn := range iteratees {
			results[i] = fn(args...)
		}
		return results
	}
}

func OverEvery(predicates ...func(...interface{}) bool) func(...interface{}) bool {
	return func(args ...interface{}) bool {
		for _, p := range predicates {
			if !p(args...) {
				return false
			}
		}
		return true
	}
}

func OverSome(predicates ...func(...interface{}) bool) func(...interface{}) bool {
	return func(args ...interface{}) bool {
		for _, p := range predicates {
			if p(args...) {
				return true
			}
		}
		return false
	}
}

func Property(path string) func(interface{}) interface{} {
	return func(obj interface{}) interface{} {
		parts := strings.Split(path, ".")
		var current interface{} = obj
		for _, part := range parts {
			if m, ok := current.(map[string]interface{}); ok {
				current = m[part]
			} else {
				v := reflect.ValueOf(current)
				if v.Kind() == reflect.Map {
					val := v.MapIndex(reflect.ValueOf(part))
					if val.IsValid() {
						current = val.Interface()
					} else {
						return nil
					}
				} else if v.Kind() == reflect.Struct {
					f := v.FieldByName(part)
					if f.IsValid() {
						current = f.Interface()
					} else {
						return nil
					}
				} else {
					return nil
				}
			}
		}
		return current
	}
}

func PropertyOf(object map[string]interface{}) func(string) interface{} {
	return func(path string) interface{} {
		parts := strings.Split(path, ".")
		var current interface{} = object
		for _, part := range parts {
			if m, ok := current.(map[string]interface{}); ok {
				current = m[part]
			} else {
				return nil
			}
		}
		return current
	}
}

func Range(start int, end int, step int) []int {
	if step == 0 {
		return nil
	}
	var result []int
	if step > 0 {
		for i := start; i < end; i += step {
			result = append(result, i)
		}
	} else {
		for i := start; i > end; i += step {
			result = append(result, i)
		}
	}
	return result
}

func RangeRight(start int, end int, step int) []int {
	r := Range(start, end, step)
	if r == nil {
		return nil
	}
	n := len(r)
	reversed := make([]int, n)
	for i, v := range r {
		reversed[n-1-i] = v
	}
	return reversed
}

func RunInContext(context map[string]interface{}) map[string]interface{} {
	return context
}

func StubArray() [0]int {
	return [0]int{}
}

func StubFalse() bool {
	return false
}

func StubObject() map[string]interface{} {
	return make(map[string]interface{})
}

func StubString() string {
	return ""
}

func StubTrue() bool {
	return true
}

func Times(n int, iteratee func(int) interface{}) []interface{} {
	results := make([]interface{}, n)
	for i := 0; i < n; i++ {
		results[i] = iteratee(i)
	}
	return results
}

func ToPath(path string) []string {
	parts := strings.Split(path, ".")
	return parts
}

func UniqueId(prefix string) string {
	idMu.Lock()
	idCounter++
	id := idCounter
	idMu.Unlock()
	if prefix != "" {
		return fmt.Sprintf("%s%d", prefix, id)
	}
	return fmt.Sprintf("%d", id)
}
