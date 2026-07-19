package object

import (
	"reflect"
	"sort"
	"strings"
)

func contains(slice []string, item string) bool {
	for _, s := range slice {
		if s == item {
			return true
		}
	}
	return false
}

func sortedKeys(m map[string]interface{}) []string {
	keys := make([]string, 0, len(m))
	for k := range m {
		keys = append(keys, k)
	}
	sort.Strings(keys)
	return keys
}

func isFunction(v interface{}) bool {
	if v == nil {
		return false
	}
	return reflect.TypeOf(v).Kind() == reflect.Func
}

func invokeIfFunc(v interface{}) interface{} {
	if v == nil {
		return nil
	}
	fnValue := reflect.ValueOf(v)
	if fnValue.Kind() == reflect.Func {
		result := fnValue.Call(nil)
		if len(result) > 0 {
			return result[0].Interface()
		}
		return nil
	}
	return v
}

func deepDefaults(dst, src map[string]interface{}) {
	for k, v := range src {
		if _, exists := dst[k]; !exists || dst[k] == nil {
			dst[k] = v
		} else {
			dstMap, dstOK := dst[k].(map[string]interface{})
			srcMap, srcOK := v.(map[string]interface{})
			if dstOK && srcOK {
				deepDefaults(dstMap, srcMap)
			}
		}
	}
}

func deepMerge(dst, src map[string]interface{}) {
	for k, v := range src {
		if v == nil {
			if _, exists := dst[k]; exists {
				continue
			}
			dst[k] = nil
			continue
		}
		dstVal, dstExists := dst[k]
		if dstExists {
			dstMap, dstIsMap := dstVal.(map[string]interface{})
			srcMap, srcIsMap := v.(map[string]interface{})
			if dstIsMap && srcIsMap {
				deepMerge(dstMap, srcMap)
				continue
			}
		}
		dst[k] = v
	}
}

func deepMergeWith(dst, src map[string]interface{}, customizer func(interface{}, interface{}) interface{}) {
	for k, v := range src {
		if customizer != nil {
			result := customizer(dst[k], v)
			if result != nil {
				dst[k] = result
				continue
			}
		}
		if v == nil {
			if _, exists := dst[k]; exists {
				continue
			}
			dst[k] = nil
			continue
		}
		dstVal, dstExists := dst[k]
		if dstExists {
			dstMap, dstIsMap := dstVal.(map[string]interface{})
			srcMap, srcIsMap := v.(map[string]interface{})
			if dstIsMap && srcIsMap {
				deepMergeWith(dstMap, srcMap, customizer)
				continue
			}
		}
		dst[k] = v
	}
}

// Assign assigns own enumerable string keyed properties of source objects
// to the destination object. Source properties that resolve to nil
// are skipped if a destination value exists.
func Assign(object map[string]interface{}, sources ...map[string]interface{}) map[string]interface{} {
	if object == nil {
		object = make(map[string]interface{})
	}
	for _, source := range sources {
		if source == nil {
			continue
		}
		for k, v := range source {
			if v == nil {
				if _, exists := object[k]; exists {
					continue
				}
			}
			object[k] = v
		}
	}
	return object
}

// AssignIn is like Assign but iterates over own and inherited source properties.
func AssignIn(object map[string]interface{}, sources ...map[string]interface{}) map[string]interface{} {
	return Assign(object, sources...)
}

// AssignInWith is like AssignIn but accepts a customizer which is invoked
// to produce the assigned values. If customizer returns nil, assignment
// is handled by the method instead.
func AssignInWith(object map[string]interface{}, customizer func(interface{}, interface{}) interface{}, sources ...map[string]interface{}) map[string]interface{} {
	if object == nil {
		object = make(map[string]interface{})
	}
	for _, source := range sources {
		if source == nil {
			continue
		}
		for k, v := range source {
			if customizer != nil {
				result := customizer(object[k], v)
				if result != nil {
					object[k] = result
					continue
				}
			}
			if v == nil {
				if _, exists := object[k]; exists {
					continue
				}
			}
			object[k] = v
		}
	}
	return object
}

// AssignWith is like Assign but accepts a customizer which is invoked
// to produce the assigned values. If customizer returns nil, assignment
// is handled by the method instead.
func AssignWith(object map[string]interface{}, customizer func(interface{}, interface{}) interface{}, sources ...map[string]interface{}) map[string]interface{} {
	return AssignInWith(object, customizer, sources...)
}

// At creates a slice of values corresponding to paths of object.
func At(object map[string]interface{}, paths ...string) []interface{} {
	result := make([]interface{}, len(paths))
	for i, path := range paths {
		result[i] = Get(object, path)
	}
	return result
}

// Create creates an object that inherits from the given prototype object.
// If properties is provided, its own enumerable string keyed properties
// are assigned to the created object.
func Create(prototype map[string]interface{}, properties map[string]interface{}) map[string]interface{} {
	result := make(map[string]interface{})
	if prototype != nil {
		for k, v := range prototype {
			result[k] = v
		}
	}
	if properties != nil {
		for k, v := range properties {
			result[k] = v
		}
	}
	return result
}

// Defaults assigns own and inherited enumerable string keyed properties
// of source objects to the destination object for all destination
// properties that resolve to nil.
func Defaults(object map[string]interface{}, sources ...map[string]interface{}) map[string]interface{} {
	if object == nil {
		object = make(map[string]interface{})
	}
	for _, source := range sources {
		if source == nil {
			continue
		}
		for k, v := range source {
			if _, exists := object[k]; !exists || object[k] == nil {
				object[k] = v
			}
		}
	}
	return object
}

// DefaultsDeep is like Defaults but recursively assigns default values.
func DefaultsDeep(object map[string]interface{}, sources ...map[string]interface{}) map[string]interface{} {
	if object == nil {
		object = make(map[string]interface{})
	}
	for _, source := range sources {
		if source == nil {
			continue
		}
		deepDefaults(object, source)
	}
	return object
}

// FindKey finds the first key for which the predicate returns true.
// The predicate is invoked with the value of each key.
func FindKey(object map[string]interface{}, predicate func(interface{}) bool) string {
	for k, v := range object {
		if predicate(v) {
			return k
		}
	}
	return ""
}

// FindLastKey is like FindKey but iterates from right to left.
// Note: since Go map iteration order is not deterministic, the result is best-effort.
func FindLastKey(object map[string]interface{}, predicate func(interface{}) bool) string {
	var lastKey string
	for k, v := range object {
		if predicate(v) {
			lastKey = k
		}
	}
	return lastKey
}

// ForIn iterates over own and inherited enumerable string keyed properties
// of an object and invokes iteratee for each property.
func ForIn(object map[string]interface{}, iteratee func(string, interface{})) {
	for k, v := range object {
		iteratee(k, v)
	}
}

// ForInRight is like ForIn but iterates from right to left.
func ForInRight(object map[string]interface{}, iteratee func(string, interface{})) {
	keys := sortedKeys(object)
	for i := len(keys) - 1; i >= 0; i-- {
		iteratee(keys[i], object[keys[i]])
	}
}

// ForOwn iterates over own enumerable string keyed properties of an object
// and invokes iteratee for each property.
func ForOwn(object map[string]interface{}, iteratee func(string, interface{})) {
	for k, v := range object {
		iteratee(k, v)
	}
}

// ForOwnRight is like ForOwn but iterates from right to left.
func ForOwnRight(object map[string]interface{}, iteratee func(string, interface{})) {
	keys := sortedKeys(object)
	for i := len(keys) - 1; i >= 0; i-- {
		iteratee(keys[i], object[keys[i]])
	}
}

// Functions gets the names of all own enumerable function properties.
func Functions(object map[string]interface{}) []string {
	var result []string
	keys := sortedKeys(object)
	for _, k := range keys {
		if isFunction(object[k]) {
			result = append(result, k)
		}
	}
	return result
}

// FunctionsIn gets the names of all own and inherited enumerable function properties.
func FunctionsIn(object map[string]interface{}) []string {
	return Functions(object)
}

// Get gets the value at the dot-separated path of object.
// Returns nil if the path does not exist.
func Get(object map[string]interface{}, path string) interface{} {
	keys := strings.Split(path, ".")
	current := interface{}(object)
	for _, key := range keys {
		m, ok := current.(map[string]interface{})
		if !ok {
			return nil
		}
		current = m[key]
	}
	return current
}

// Has checks if the dot-separated path exists as an own property of object.
func Has(object map[string]interface{}, path string) bool {
	keys := strings.Split(path, ".")
	current := interface{}(object)
	for _, key := range keys {
		m, ok := current.(map[string]interface{})
		if !ok {
			return false
		}
		_, exists := m[key]
		if !exists {
			return false
		}
		current = m[key]
	}
	return true
}

// HasIn checks if the dot-separated path exists in own or inherited
// properties of object.
func HasIn(object map[string]interface{}, path string) bool {
	return Has(object, path)
}

// Invert creates a map of inverted keys and values. If object contains
// duplicate values, subsequent values overwrite previous key assignments.
func Invert(object map[string]interface{}) map[interface{}]string {
	result := make(map[interface{}]string, len(object))
	for k, v := range object {
		result[v] = k
	}
	return result
}

// InvertBy creates a map of inverted keys and values where the inverted keys
// are generated by running each value through the iteratee. The corresponding
// inverted values are an array of keys responsible for generating the inverted key.
func InvertBy(object map[string]interface{}, iteratee func(interface{}) string) map[string][]string {
	result := make(map[string][]string)
	for k, v := range object {
		key := iteratee(v)
		result[key] = append(result[key], k)
	}
	return result
}

// Invoke invokes the function at the dot-separated path of object with
// the given arguments. Returns nil if the path does not resolve to a function.
func Invoke(object map[string]interface{}, path string, args ...interface{}) interface{} {
	keys := strings.Split(path, ".")
	current := interface{}(object)
	for i := 0; i < len(keys)-1; i++ {
		m, ok := current.(map[string]interface{})
		if !ok {
			return nil
		}
		current = m[keys[i]]
	}
	lastKey := keys[len(keys)-1]
	m, ok := current.(map[string]interface{})
	if !ok {
		return nil
	}
	fn := m[lastKey]
	if fn == nil {
		return nil
	}
	fnValue := reflect.ValueOf(fn)
	if fnValue.Kind() != reflect.Func {
		return nil
	}
	fnArgs := make([]reflect.Value, len(args))
	for i, arg := range args {
		fnArgs[i] = reflect.ValueOf(arg)
	}
	result := fnValue.Call(fnArgs)
	if len(result) > 0 {
		return result[0].Interface()
	}
	return nil
}

// Keys gets the names of all own enumerable string keyed properties of object.
func Keys(object map[string]interface{}) []string {
	return sortedKeys(object)
}

// KeysIn gets the names of all own and inherited enumerable string keyed
// properties of object.
func KeysIn(object map[string]interface{}) []string {
	return sortedKeys(object)
}

// MapKeys creates a map with the same values as object and keys generated
// by running each key through the iteratee.
func MapKeys(object map[string]interface{}, iteratee func(string, interface{}) string) map[string]interface{} {
	result := make(map[string]interface{}, len(object))
	for k, v := range object {
		newKey := iteratee(k, v)
		result[newKey] = v
	}
	return result
}

// MapValues creates a map with the same keys as object and values generated
// by running each value through the iteratee.
func MapValues(object map[string]interface{}, iteratee func(interface{}) interface{}) map[string]interface{} {
	result := make(map[string]interface{}, len(object))
	for k, v := range object {
		result[k] = iteratee(v)
	}
	return result
}

// Merge recursively merges own and inherited enumerable string keyed
// properties of source objects into the destination object. Source
// properties that resolve to nil are skipped if a destination value exists.
func Merge(object map[string]interface{}, sources ...map[string]interface{}) map[string]interface{} {
	if object == nil {
		object = make(map[string]interface{})
	}
	for _, source := range sources {
		if source == nil {
			continue
		}
		deepMerge(object, source)
	}
	return object
}

// MergeWith is like Merge but accepts a customizer which is invoked to
// produce the merged values. If customizer returns nil, merging is handled
// by the method instead.
func MergeWith(object map[string]interface{}, customizer func(interface{}, interface{}) interface{}, sources ...map[string]interface{}) map[string]interface{} {
	if object == nil {
		object = make(map[string]interface{})
	}
	for _, source := range sources {
		if source == nil {
			continue
		}
		deepMergeWith(object, source, customizer)
	}
	return object
}

// Omit creates a map composed of the own and inherited enumerable property
// paths that are not omitted.
func Omit(object map[string]interface{}, paths ...string) map[string]interface{} {
	result := make(map[string]interface{})
	for k, v := range object {
		if !contains(paths, k) {
			result[k] = v
		}
	}
	return result
}

// OmitBy creates a map composed of the own and inherited enumerable string
// keyed properties that the predicate does not return truthy for.
func OmitBy(object map[string]interface{}, predicate func(string, interface{}) bool) map[string]interface{} {
	result := make(map[string]interface{})
	for k, v := range object {
		if !predicate(k, v) {
			result[k] = v
		}
	}
	return result
}

// Pick creates a map composed of the picked object properties.
func Pick(object map[string]interface{}, paths ...string) map[string]interface{} {
	result := make(map[string]interface{})
	for _, path := range paths {
		if v, ok := object[path]; ok {
			result[path] = v
		}
	}
	return result
}

// PickBy creates a map composed of the object properties the predicate
// returns truthy for.
func PickBy(object map[string]interface{}, predicate func(string, interface{}) bool) map[string]interface{} {
	result := make(map[string]interface{})
	for k, v := range object {
		if predicate(k, v) {
			result[k] = v
		}
	}
	return result
}

// Result gets the value at the dot-separated path of object. If the resolved
// value is a function, it is invoked and its result returned. If the resolved
// value is nil, the defaultValue is returned.
func Result(object map[string]interface{}, path string, defaultValue interface{}) interface{} {
	value := Get(object, path)
	if value == nil {
		return invokeIfFunc(defaultValue)
	}
	// If the resolved value is a function, invoke it
	if isFunction(value) {
		return invokeIfFunc(value)
	}
	return value
}

// Set sets the value at the dot-separated path of object. If a portion of
// the path does not exist, it is created. Returns the modified object.
func Set(object map[string]interface{}, path string, value interface{}) map[string]interface{} {
	if object == nil {
		object = make(map[string]interface{})
	}
	keys := strings.Split(path, ".")
	current := object
	for i := 0; i < len(keys)-1; i++ {
		key := keys[i]
		if _, ok := current[key]; !ok {
			current[key] = make(map[string]interface{})
		}
		if m, ok := current[key].(map[string]interface{}); ok {
			current = m
		} else {
			m := make(map[string]interface{})
			current[key] = m
			current = m
		}
	}
	if len(keys) > 0 {
		current[keys[len(keys)-1]] = value
	}
	return object
}

// SetWith is like Set but accepts a customizer which is invoked to produce
// the objects of path. If customizer returns nil, a new map is created instead.
func SetWith(object map[string]interface{}, path string, value interface{}, customizer func(string, interface{}) interface{}) map[string]interface{} {
	if object == nil {
		object = make(map[string]interface{})
	}
	keys := strings.Split(path, ".")
	current := object
	for i := 0; i < len(keys)-1; i++ {
		key := keys[i]
		if _, ok := current[key]; !ok {
			if customizer != nil {
				current[key] = customizer(key, current)
			} else {
				current[key] = make(map[string]interface{})
			}
		}
		if m, ok := current[key].(map[string]interface{}); ok {
			current = m
		} else {
			m := make(map[string]interface{})
			current[key] = m
			current = m
		}
	}
	if len(keys) > 0 {
		current[keys[len(keys)-1]] = value
	}
	return object
}

// ToPairs creates a slice of key-value pairs from object.
func ToPairs(object map[string]interface{}) [][]interface{} {
	result := make([][]interface{}, 0, len(object))
	keys := sortedKeys(object)
	for _, k := range keys {
		result = append(result, []interface{}{k, object[k]})
	}
	return result
}

// ToPairsIn creates a slice of key-value pairs from object, including
// inherited enumerable properties.
func ToPairsIn(object map[string]interface{}) [][]interface{} {
	return ToPairs(object)
}

// Transform is an alternative to reduce for maps. It iterates over object
// and invokes iteratee with (accumulator, value).
func Transform(object map[string]interface{}, iteratee func(interface{}, interface{}), accumulator interface{}) {
	for _, v := range object {
		iteratee(accumulator, v)
	}
}

// Unset removes the property at the dot-separated path of object.
// Returns true if the property was deleted.
func Unset(object map[string]interface{}, path string) bool {
	keys := strings.Split(path, ".")
	if len(keys) == 0 {
		return false
	}
	current := object
	for i := 0; i < len(keys)-1; i++ {
		m, ok := current[keys[i]].(map[string]interface{})
		if !ok {
			return false
		}
		current = m
	}
	lastKey := keys[len(keys)-1]
	_, exists := current[lastKey]
	if exists {
		delete(current, lastKey)
		return true
	}
	return false
}

// Update updates the value at the dot-separated path of object using
// the updater function. Returns the modified object.
func Update(object map[string]interface{}, path string, updater func(interface{}) interface{}) map[string]interface{} {
	if object == nil {
		object = make(map[string]interface{})
	}
	keys := strings.Split(path, ".")
	current := object
	for i := 0; i < len(keys)-1; i++ {
		key := keys[i]
		if _, ok := current[key]; !ok {
			current[key] = make(map[string]interface{})
		}
		if m, ok := current[key].(map[string]interface{}); ok {
			current = m
		} else {
			m := make(map[string]interface{})
			current[key] = m
			current = m
		}
	}
	if len(keys) > 0 {
		lastKey := keys[len(keys)-1]
		current[lastKey] = updater(current[lastKey])
	}
	return object
}

// UpdateWith is like Update but accepts a customizer which is invoked to
// produce the objects of path. If customizer returns nil, a new map is
// created instead.
func UpdateWith(object map[string]interface{}, path string, updater func(interface{}) interface{}, customizer func(string, interface{}) interface{}) map[string]interface{} {
	if object == nil {
		object = make(map[string]interface{})
	}
	keys := strings.Split(path, ".")
	current := object
	for i := 0; i < len(keys)-1; i++ {
		key := keys[i]
		if _, ok := current[key]; !ok {
			if customizer != nil {
				current[key] = customizer(key, current)
			} else {
				current[key] = make(map[string]interface{})
			}
		}
		if m, ok := current[key].(map[string]interface{}); ok {
			current = m
		} else {
			m := make(map[string]interface{})
			current[key] = m
			current = m
		}
	}
	if len(keys) > 0 {
		lastKey := keys[len(keys)-1]
		current[lastKey] = updater(current[lastKey])
	}
	return object
}

// Values gets all values of own enumerable string keyed properties of object.
func Values(object map[string]interface{}) []interface{} {
	result := make([]interface{}, 0, len(object))
	keys := sortedKeys(object)
	for _, k := range keys {
		result = append(result, object[k])
	}
	return result
}

// ValuesIn gets all values of own and inherited enumerable string keyed
// properties of object.
func ValuesIn(object map[string]interface{}) []interface{} {
	return Values(object)
}
