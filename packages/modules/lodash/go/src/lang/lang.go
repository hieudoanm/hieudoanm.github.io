package lang

import (
	"fmt"
	"math"
	"reflect"
	"regexp"
	"time"
)

func Gt(value float64, other float64) bool {
	return value > other
}

func Gte(value float64, other float64) bool {
	return value >= other
}

func Lt(value float64, other float64) bool {
	return value < other
}

func Lte(value float64, other float64) bool {
	return value <= other
}

func CastArray(value interface{}) []interface{} {
	if value == nil {
		return []interface{}{}
	}
	val := reflect.ValueOf(value)
	if val.Kind() == reflect.Slice || val.Kind() == reflect.Array {
		result := make([]interface{}, val.Len())
		for i := 0; i < val.Len(); i++ {
			result[i] = val.Index(i).Interface()
		}
		return result
	}
	return []interface{}{value}
}

func Clone(value interface{}) interface{} {
	if value == nil {
		return nil
	}
	val := reflect.ValueOf(value)
	switch val.Kind() {
	case reflect.Slice:
		result := reflect.MakeSlice(val.Type(), val.Len(), val.Cap())
		reflect.Copy(result, val)
		return result.Interface()
	case reflect.Map:
		result := reflect.MakeMap(val.Type())
		for _, key := range val.MapKeys() {
			result.SetMapIndex(key, val.MapIndex(key))
		}
		return result.Interface()
	case reflect.Ptr:
		if val.IsNil() {
			return nil
		}
		elem := val.Elem()
		newPtr := reflect.New(elem.Type())
		newPtr.Elem().Set(elem)
		return newPtr.Interface()
	case reflect.Struct:
		cp := reflect.New(val.Type()).Elem()
		cp.Set(val)
		return cp.Interface()
	default:
		return value
	}
}

func cloneDeepReflect(val reflect.Value) reflect.Value {
	switch val.Kind() {
	case reflect.Ptr:
		if val.IsNil() {
			return reflect.Zero(val.Type())
		}
		newPtr := reflect.New(val.Type().Elem())
		newPtr.Elem().Set(cloneDeepReflect(val.Elem()))
		return newPtr
	case reflect.Struct:
		cp := reflect.New(val.Type()).Elem()
		for i := 0; i < val.NumField(); i++ {
			cp.Field(i).Set(cloneDeepReflect(val.Field(i)))
		}
		return cp
	case reflect.Map:
		if val.IsNil() {
			return reflect.Zero(val.Type())
		}
		cp := reflect.MakeMap(val.Type())
		for _, key := range val.MapKeys() {
			cp.SetMapIndex(cloneDeepReflect(key), cloneDeepReflect(val.MapIndex(key)))
		}
		return cp
	case reflect.Slice:
		if val.IsNil() {
			return reflect.Zero(val.Type())
		}
		cp := reflect.MakeSlice(val.Type(), val.Len(), val.Cap())
		for i := 0; i < val.Len(); i++ {
			cp.Index(i).Set(cloneDeepReflect(val.Index(i)))
		}
		return cp
	case reflect.Array:
		cp := reflect.New(val.Type()).Elem()
		for i := 0; i < val.Len(); i++ {
			cp.Index(i).Set(cloneDeepReflect(val.Index(i)))
		}
		return cp
	case reflect.Interface:
		if val.IsNil() {
			return reflect.Zero(val.Type())
		}
		return cloneDeepReflect(val.Elem())
	default:
		return val
	}
}

func CloneDeep(value interface{}) interface{} {
	if value == nil {
		return nil
	}
	val := reflect.ValueOf(value)
	result := cloneDeepReflect(val)
	return result.Interface()
}

func CloneDeepWith(value interface{}, customizer func(interface{}) interface{}) interface{} {
	if customizer != nil {
		if result := customizer(value); result != nil {
			return result
		}
	}
	return CloneDeep(value)
}

func CloneWith(value interface{}, customizer func(interface{}) interface{}) interface{} {
	if customizer != nil {
		if result := customizer(value); result != nil {
			return result
		}
	}
	return Clone(value)
}

func ConformsTo(object interface{}, source map[string]func(interface{}) bool) bool {
	val := reflect.ValueOf(object)
	if val.Kind() == reflect.Ptr {
		val = val.Elem()
	}
	if !val.IsValid() {
		return false
	}
	for key, predicate := range source {
		var propVal interface{}
		if val.Kind() == reflect.Map {
			mapVal := val.MapIndex(reflect.ValueOf(key))
			if !mapVal.IsValid() {
				return false
			}
			propVal = mapVal.Interface()
		} else if val.Kind() == reflect.Struct {
			field := val.FieldByName(key)
			if !field.IsValid() {
				return false
			}
			propVal = field.Interface()
		} else {
			return false
		}
		if !predicate(propVal) {
			return false
		}
	}
	return true
}

func Eq(value interface{}, other interface{}) bool {
	return reflect.DeepEqual(value, other)
}

func IsArguments(value interface{}) bool {
	if value == nil {
		return false
	}
	return reflect.ValueOf(value).Kind() == reflect.Array
}

func IsArray(value interface{}) bool {
	if value == nil {
		return false
	}
	k := reflect.ValueOf(value).Kind()
	return k == reflect.Array || k == reflect.Slice
}

func IsArrayBuffer(value interface{}) bool {
	if value == nil {
		return false
	}
	v := reflect.ValueOf(value)
	return v.Kind() == reflect.Slice && v.Type().Elem().Kind() == reflect.Uint8
}

func IsArrayLike(value interface{}) bool {
	if value == nil {
		return false
	}
	switch reflect.ValueOf(value).Kind() {
	case reflect.Slice, reflect.Array, reflect.String, reflect.Map:
		return true
	}
	return false
}

func IsArrayLikeObject(value interface{}) bool {
	if value == nil {
		return false
	}
	k := reflect.ValueOf(value).Kind()
	return k == reflect.Slice || k == reflect.Array || k == reflect.Map
}

func IsBoolean(value interface{}) bool {
	if value == nil {
		return false
	}
	_, ok := value.(bool)
	return ok
}

func IsBuffer(value interface{}) bool {
	return false
}

func IsDate(value interface{}) bool {
	if value == nil {
		return false
	}
	_, ok := value.(time.Time)
	return ok
}

func IsElement(value interface{}) bool {
	return false
}

func IsEmpty(value interface{}) bool {
	if value == nil {
		return true
	}
	val := reflect.ValueOf(value)
	switch val.Kind() {
	case reflect.String, reflect.Slice, reflect.Array, reflect.Map:
		return val.Len() == 0
	case reflect.Struct:
		return reflect.DeepEqual(value, reflect.Zero(val.Type()).Interface())
	case reflect.Ptr, reflect.Interface:
		if val.IsNil() {
			return true
		}
		return IsEmpty(val.Elem().Interface())
	case reflect.Func, reflect.Chan:
		return val.IsNil()
	default:
		return false
	}
}

func IsEqual(value interface{}, other interface{}) bool {
	return reflect.DeepEqual(value, other)
}

func IsEqualWith(value interface{}, other interface{}, customizer func(interface{}, interface{}) bool) bool {
	if customizer != nil {
		return customizer(value, other)
	}
	return reflect.DeepEqual(value, other)
}

func IsError(value interface{}) bool {
	if value == nil {
		return false
	}
	_, ok := value.(error)
	return ok
}

func IsFinite(value float64) bool {
	return !math.IsInf(value, 0) && !math.IsNaN(value)
}

func IsFunction(value interface{}) bool {
	if value == nil {
		return false
	}
	return reflect.ValueOf(value).Kind() == reflect.Func
}

func IsInteger(value float64) bool {
	if math.IsInf(value, 0) || math.IsNaN(value) {
		return false
	}
	return value == float64(int64(value))
}

func IsLength(value int) bool {
	return value >= 0 && value <= math.MaxUint32
}

func IsMap(value interface{}) bool {
	if value == nil {
		return false
	}
	return reflect.ValueOf(value).Kind() == reflect.Map
}

func IsMatch(object interface{}, source interface{}) bool {
	if source == nil {
		return true
	}
	if object == nil {
		return false
	}
	srcVal := reflect.ValueOf(source)
	objVal := reflect.ValueOf(object)
	if srcVal.Kind() == reflect.Ptr {
		srcVal = srcVal.Elem()
	}
	if objVal.Kind() == reflect.Ptr {
		objVal = objVal.Elem()
	}
	if !srcVal.IsValid() || !objVal.IsValid() {
		return false
	}
	switch srcVal.Kind() {
	case reflect.Map:
		if objVal.Kind() != reflect.Map {
			return false
		}
		for _, key := range srcVal.MapKeys() {
			objMapVal := objVal.MapIndex(key)
			if !objMapVal.IsValid() {
				return false
			}
			if !IsMatch(objMapVal.Interface(), srcVal.MapIndex(key).Interface()) {
				return false
			}
		}
		return true
	case reflect.Struct:
		if objVal.Kind() != reflect.Struct {
			return false
		}
		for i := 0; i < srcVal.NumField(); i++ {
			if !srcVal.Type().Field(i).IsExported() {
				continue
			}
			name := srcVal.Type().Field(i).Name
			objField := objVal.FieldByName(name)
			if !objField.IsValid() {
				return false
			}
			if !IsMatch(objField.Interface(), srcVal.Field(i).Interface()) {
				return false
			}
		}
		return true
	case reflect.Slice, reflect.Array:
		if objVal.Kind() != reflect.Slice && objVal.Kind() != reflect.Array {
			return false
		}
		if srcVal.Len() != objVal.Len() {
			return false
		}
		for i := 0; i < srcVal.Len(); i++ {
			if !IsMatch(objVal.Index(i).Interface(), srcVal.Index(i).Interface()) {
				return false
			}
		}
		return true
	default:
		return reflect.DeepEqual(object, source)
	}
}

func IsMatchWith(object interface{}, source interface{}, customizer func(interface{}, interface{}) bool) bool {
	if customizer != nil {
		return customizer(object, source)
	}
	return IsMatch(object, source)
}

func IsNaN(value interface{}) bool {
	if value == nil {
		return false
	}
	v := reflect.ValueOf(value)
	switch v.Kind() {
	case reflect.Float32, reflect.Float64:
		return math.IsNaN(v.Float())
	case reflect.Interface:
		return IsNaN(v.Elem().Interface())
	}
	return false
}

func IsNative(value interface{}) bool {
	return false
}

func IsNil(value interface{}) bool {
	if value == nil {
		return true
	}
	v := reflect.ValueOf(value)
	switch v.Kind() {
	case reflect.Ptr, reflect.Interface, reflect.Slice, reflect.Map, reflect.Chan, reflect.Func:
		return v.IsNil()
	}
	return false
}

func IsNull(value interface{}) bool {
	return IsNil(value)
}

func IsNumber(value interface{}) bool {
	if value == nil {
		return false
	}
	switch reflect.ValueOf(value).Kind() {
	case reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64,
		reflect.Uint, reflect.Uint8, reflect.Uint16, reflect.Uint32, reflect.Uint64,
		reflect.Float32, reflect.Float64,
		reflect.Complex64, reflect.Complex128:
		return true
	}
	return false
}

func IsObject(value interface{}) bool {
	if value == nil {
		return false
	}
	switch reflect.ValueOf(value).Kind() {
	case reflect.Struct, reflect.Map, reflect.Slice, reflect.Array,
		reflect.Ptr, reflect.Func, reflect.Chan, reflect.Interface:
		return true
	}
	return false
}

func IsObjectLike(value interface{}) bool {
	if value == nil {
		return false
	}
	k := reflect.ValueOf(value).Kind()
	return k != reflect.Invalid && k != reflect.Bool && k != reflect.String &&
		k != reflect.Int && k != reflect.Int8 && k != reflect.Int16 &&
		k != reflect.Int32 && k != reflect.Int64 &&
		k != reflect.Uint && k != reflect.Uint8 && k != reflect.Uint16 &&
		k != reflect.Uint32 && k != reflect.Uint64 &&
		k != reflect.Float32 && k != reflect.Float64 &&
		k != reflect.Complex64 && k != reflect.Complex128
}

func IsPlainObject(value interface{}) bool {
	if value == nil {
		return false
	}
	v := reflect.ValueOf(value)
	if v.Kind() == reflect.Ptr {
		v = v.Elem()
	}
	return v.Kind() == reflect.Map || v.Kind() == reflect.Struct
}

func IsRegExp(value interface{}) bool {
	if value == nil {
		return false
	}
	_, ok := value.(*regexp.Regexp)
	return ok
}

func IsSafeInteger(value float64) bool {
	if math.IsInf(value, 0) || math.IsNaN(value) {
		return false
	}
	if value != float64(int64(value)) {
		return false
	}
	maxSafe := math.Pow(2, 53) - 1
	return value >= -maxSafe && value <= maxSafe
}

func IsSet(value interface{}) bool {
	if value == nil {
		return false
	}
	v := reflect.ValueOf(value)
	if v.Kind() != reflect.Map {
		return false
	}
	var emptyStruct struct{}
	return v.Type().Elem() == reflect.TypeOf(emptyStruct)
}

func IsString(value interface{}) bool {
	if value == nil {
		return false
	}
	_, ok := value.(string)
	return ok
}

func IsSymbol(value interface{}) bool {
	return false
}

func IsTypedArray(value interface{}) bool {
	if value == nil {
		return false
	}
	v := reflect.ValueOf(value)
	if v.Kind() != reflect.Slice && v.Kind() != reflect.Array {
		return false
	}
	switch v.Type().Elem().Kind() {
	case reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64,
		reflect.Uint8, reflect.Uint16, reflect.Uint32, reflect.Uint64,
		reflect.Float32, reflect.Float64, reflect.Uintptr:
		return true
	}
	return false
}

func IsUndefined(value interface{}) bool {
	return value == nil
}

func IsWeakMap(value interface{}) bool {
	return false
}

func IsWeakSet(value interface{}) bool {
	return false
}

func ToArray(value interface{}) []interface{} {
	if value == nil {
		return []interface{}{}
	}
	v := reflect.ValueOf(value)
	switch v.Kind() {
	case reflect.Slice, reflect.Array:
		result := make([]interface{}, v.Len())
		for i := 0; i < v.Len(); i++ {
			result[i] = v.Index(i).Interface()
		}
		return result
	case reflect.Map:
		result := make([]interface{}, 0, v.Len())
		for _, key := range v.MapKeys() {
			result = append(result, v.MapIndex(key).Interface())
		}
		return result
	case reflect.String:
		s := v.String()
		result := make([]interface{}, 0, len(s))
		for _, r := range s {
			result = append(result, string(r))
		}
		return result
	default:
		return []interface{}{value}
	}
}

func ToFinite(value interface{}) float64 {
	if value == nil {
		return 0
	}
	v := reflect.ValueOf(value)
	switch v.Kind() {
	case reflect.Float32, reflect.Float64:
		f := v.Float()
		if math.IsNaN(f) {
			return 0
		}
		if math.IsInf(f, 1) {
			return math.MaxFloat64
		}
		if math.IsInf(f, -1) {
			return -math.MaxFloat64
		}
		return f
	case reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64:
		return float64(v.Int())
	case reflect.Uint, reflect.Uint8, reflect.Uint16, reflect.Uint32, reflect.Uint64:
		return float64(v.Uint())
	case reflect.Bool:
		if v.Bool() {
			return 1
		}
		return 0
	case reflect.String:
		var f float64
		fmt.Sscanf(v.String(), "%f", &f)
		return f
	default:
		return 0
	}
}

func ToInteger(value interface{}) int {
	if value == nil {
		return 0
	}
	v := reflect.ValueOf(value)
	switch v.Kind() {
	case reflect.Float32, reflect.Float64:
		f := v.Float()
		if math.IsNaN(f) || math.IsInf(f, 0) {
			return 0
		}
		return int(f)
	case reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64:
		return int(v.Int())
	case reflect.Uint, reflect.Uint8, reflect.Uint16, reflect.Uint32, reflect.Uint64:
		return int(v.Uint())
	case reflect.Bool:
		if v.Bool() {
			return 1
		}
		return 0
	case reflect.String:
		var i int
		fmt.Sscanf(v.String(), "%d", &i)
		return i
	default:
		return 0
	}
}

func ToLength(value interface{}) int {
	n := ToInteger(value)
	if n < 0 {
		return 0
	}
	if n > math.MaxUint32 {
		return math.MaxUint32
	}
	return n
}

func ToNumber(value interface{}) float64 {
	if value == nil {
		return 0
	}
	v := reflect.ValueOf(value)
	switch v.Kind() {
	case reflect.Float32, reflect.Float64:
		return v.Float()
	case reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64:
		return float64(v.Int())
	case reflect.Uint, reflect.Uint8, reflect.Uint16, reflect.Uint32, reflect.Uint64:
		return float64(v.Uint())
	case reflect.Bool:
		if v.Bool() {
			return 1
		}
		return 0
	case reflect.String:
		var f float64
		fmt.Sscanf(v.String(), "%f", &f)
		return f
	default:
		return 0
	}
}

func ToPlainObject(value interface{}) map[string]interface{} {
	result := make(map[string]interface{})
	if value == nil {
		return result
	}
	v := reflect.ValueOf(value)
	if v.Kind() == reflect.Ptr {
		v = v.Elem()
	}
	if !v.IsValid() {
		return result
	}
	switch v.Kind() {
	case reflect.Struct:
		t := v.Type()
		for i := 0; i < v.NumField(); i++ {
			field := t.Field(i)
			if field.IsExported() {
				result[field.Name] = v.Field(i).Interface()
			}
		}
	case reflect.Map:
		for _, key := range v.MapKeys() {
			result[fmt.Sprint(key.Interface())] = v.MapIndex(key).Interface()
		}
	}
	return result
}

func ToSafeInteger(value interface{}) int {
	n := ToInteger(value)
	if n < 0 {
		return 0
	}
	maxSafe := int(math.Pow(2, 53) - 1)
	if n > maxSafe {
		return maxSafe
	}
	return n
}

func ToString(value interface{}) string {
	if value == nil {
		return ""
	}
	return fmt.Sprint(value)
}
