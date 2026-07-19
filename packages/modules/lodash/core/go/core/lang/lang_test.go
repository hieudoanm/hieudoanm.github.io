package lang

import (
	"math"
	"regexp"
	"testing"
	"time"
)

func TestGt(t *testing.T) {
	if !Gt(3, 1) {
		t.Errorf("expected true")
	}
	if Gt(3, 3) {
		t.Errorf("expected false")
	}
	if Gt(1, 3) {
		t.Errorf("expected false")
	}
}

func TestGte(t *testing.T) {
	if !Gte(3, 1) {
		t.Errorf("expected true")
	}
	if !Gte(3, 3) {
		t.Errorf("expected true")
	}
	if Gte(1, 3) {
		t.Errorf("expected false")
	}
}

func TestLt(t *testing.T) {
	if !Lt(1, 3) {
		t.Errorf("expected true")
	}
	if Lt(3, 3) {
		t.Errorf("expected false")
	}
	if Lt(3, 1) {
		t.Errorf("expected false")
	}
}

func TestLte(t *testing.T) {
	if !Lte(1, 3) {
		t.Errorf("expected true")
	}
	if !Lte(3, 3) {
		t.Errorf("expected true")
	}
	if Lte(3, 1) {
		t.Errorf("expected false")
	}
}

func TestCastArray(t *testing.T) {
	t.Run("nil returns empty", func(t *testing.T) {
		result := CastArray(nil)
		if len(result) != 0 {
			t.Errorf("expected empty, got %v", result)
		}
	})

	t.Run("slice", func(t *testing.T) {
		result := CastArray([]int{1, 2, 3})
		if len(result) != 3 {
			t.Errorf("expected 3, got %v", result)
		}
	})

	t.Run("scalar", func(t *testing.T) {
		result := CastArray(42)
		if len(result) != 1 || result[0] != 42 {
			t.Errorf("expected [42], got %v", result)
		}
	})
}

func TestClone(t *testing.T) {
	t.Run("nil", func(t *testing.T) {
		if got := Clone(nil); got != nil {
			t.Errorf("expected nil, got %v", got)
		}
	})

	t.Run("slice", func(t *testing.T) {
		orig := []int{1, 2, 3}
		clone := Clone(orig).([]int)
		clone[0] = 99
		if orig[0] != 1 {
			t.Errorf("original should be unchanged, got %v", orig)
		}
	})

	t.Run("map", func(t *testing.T) {
		orig := map[string]int{"a": 1}
		clone := Clone(orig).(map[string]int)
		clone["a"] = 99
		if orig["a"] != 1 {
			t.Errorf("original should be unchanged, got %v", orig)
		}
	})

	t.Run("ptr", func(t *testing.T) {
		x := 42
		orig := &x
		clone := Clone(orig).(*int)
		*clone = 99
		if *orig != 42 {
			t.Errorf("original should be unchanged, got %d", *orig)
		}
	})

	t.Run("nil ptr", func(t *testing.T) {
		var p *int
		if got := Clone(p); got != nil {
			t.Errorf("expected nil, got %v", got)
		}
	})

	t.Run("struct", func(t *testing.T) {
		type S struct{ X int }
		orig := S{42}
		clone := Clone(orig).(S)
		clone.X = 99
		if orig.X != 42 {
			t.Errorf("original should be unchanged, got %d", orig.X)
		}
	})

	t.Run("scalar", func(t *testing.T) {
		if got := Clone(42); got != 42 {
			t.Errorf("expected 42, got %v", got)
		}
	})
}

func TestCloneDeep(t *testing.T) {
	t.Run("nil", func(t *testing.T) {
		if got := CloneDeep(nil); got != nil {
			t.Errorf("expected nil, got %v", got)
		}
	})

	t.Run("nested map", func(t *testing.T) {
		orig := map[string]interface{}{
			"a": map[string]interface{}{"b": 1},
		}
		clone := CloneDeep(orig).(map[string]interface{})
		clone["a"].(map[string]interface{})["b"] = 99
		if orig["a"].(map[string]interface{})["b"] != 1 {
			t.Errorf("original should be unchanged, got %v", orig)
		}
	})

	t.Run("nested slice", func(t *testing.T) {
		orig := []interface{}{[]interface{}{1, 2}}
		clone := CloneDeep(orig).([]interface{})
		clone[0].([]interface{})[0] = 99
		if orig[0].([]interface{})[0] != 1 {
			t.Errorf("original should be unchanged, got %v", orig)
		}
	})

	t.Run("nil ptr in deep does not panic", func(t *testing.T) {
		var p *int
		CloneDeep(p)
	})

	t.Run("nil map does not panic", func(t *testing.T) {
		var m map[string]int
		CloneDeep(m)
	})

	t.Run("nil slice does not panic", func(t *testing.T) {
		var s []int
		CloneDeep(s)
	})
}

func TestCloneDeepWith(t *testing.T) {
	t.Run("customizer", func(t *testing.T) {
		customizer := func(v interface{}) interface{} {
			if s, ok := v.(string); ok {
				return "custom:" + s
			}
			return nil
		}
		result := CloneDeepWith("hello", customizer)
		if result != "custom:hello" {
			t.Errorf("expected 'custom:hello', got %v", result)
		}
	})

	t.Run("customizer returns nil falls through", func(t *testing.T) {
		customizer := func(v interface{}) interface{} {
			return nil
		}
		result := CloneDeepWith(42, customizer)
		if result != 42 {
			t.Errorf("expected 42, got %v", result)
		}
	})

	t.Run("nil customizer", func(t *testing.T) {
		result := CloneDeepWith(42, nil)
		if result != 42 {
			t.Errorf("expected 42, got %v", result)
		}
	})
}

func TestCloneWith(t *testing.T) {
	customizer := func(v interface{}) interface{} {
		return "custom"
	}
	if got := CloneWith("hello", customizer); got != "custom" {
		t.Errorf("expected 'custom', got %v", got)
	}

	if got := CloneWith(42, nil); got != 42 {
		t.Errorf("expected 42, got %v", got)
	}
}

func TestConformsTo(t *testing.T) {
	source := map[string]func(interface{}) bool{
		"Age": func(v interface{}) bool {
			return v.(int) >= 18
		},
	}
	type Person struct {
		Age  int
		Name string
	}
	if !ConformsTo(Person{Age: 25}, source) {
		t.Errorf("expected true for Age: 25")
	}
	if ConformsTo(Person{Age: 15}, source) {
		t.Errorf("expected false for Age: 15")
	}
	if !ConformsTo(map[string]interface{}{"Age": 25}, source) {
			t.Errorf("expected true for map with matching key")
		}
	if ConformsTo(map[string]interface{}{"Age": 15}, source) {
			t.Errorf("expected false (age < 18)")
		}

	source2 := map[string]func(interface{}) bool{
		"missing": func(v interface{}) bool { return true },
	}
	if ConformsTo(42, source2) {
		t.Errorf("expected false")
	}

	var p *Person
	if ConformsTo(p, source) {
		t.Errorf("expected false for nil ptr")
	}
}

func TestEq(t *testing.T) {
	if !Eq(1, 1) {
		t.Errorf("expected true")
	}
	if Eq(1, 2) {
		t.Errorf("expected false")
	}
	if !Eq([]int{1, 2}, []int{1, 2}) {
		t.Errorf("expected true for deep equal")
	}
}

func TestIsArguments(t *testing.T) {
	if IsArguments(nil) {
		t.Errorf("expected false")
	}
	if !IsArguments([2]int{1, 2}) {
		t.Errorf("expected true for array")
	}
	if IsArguments("hello") {
		t.Errorf("expected false for string")
	}
}

func TestIsArray(t *testing.T) {
	if !IsArray([]int{1, 2}) {
		t.Errorf("expected true for slice")
	}
	if !IsArray([2]int{1, 2}) {
		t.Errorf("expected true for array")
	}
	if IsArray("hello") {
		t.Errorf("expected false for string")
	}
	if IsArray(nil) {
		t.Errorf("expected false for nil")
	}
}

func TestIsArrayBuffer(t *testing.T) {
	if IsArrayBuffer(nil) {
		t.Errorf("expected false")
	}
	if !IsArrayBuffer([]uint8{1, 2}) {
		t.Errorf("expected true for []uint8")
	}
	if IsArrayBuffer([]int{1, 2}) {
		t.Errorf("expected false for []int")
	}
}

func TestIsArrayLike(t *testing.T) {
	if !IsArrayLike([]int{1}) {
		t.Errorf("expected true for slice")
	}
	if !IsArrayLike([1]int{1}) {
		t.Errorf("expected true for array")
	}
	if !IsArrayLike("hello") {
		t.Errorf("expected true for string")
	}
	if !IsArrayLike(map[string]int{}) {
		t.Errorf("expected true for map")
	}
	if IsArrayLike(42) {
		t.Errorf("expected false for number")
	}
	if IsArrayLike(nil) {
		t.Errorf("expected false for nil")
	}
}

func TestIsArrayLikeObject(t *testing.T) {
	if !IsArrayLikeObject([]int{1}) {
		t.Errorf("expected true for slice")
	}
	if !IsArrayLikeObject(map[string]int{}) {
		t.Errorf("expected true for map")
	}
	if IsArrayLikeObject("hello") {
		t.Errorf("expected false for string")
	}
	if IsArrayLikeObject(nil) {
		t.Errorf("expected false for nil")
	}
}

func TestIsBoolean(t *testing.T) {
	if !IsBoolean(true) {
		t.Errorf("expected true")
	}
	if IsBoolean(1) {
		t.Errorf("expected false")
	}
	if IsBoolean(nil) {
		t.Errorf("expected false")
	}
}

func TestIsBuffer(t *testing.T) {
	if IsBuffer(nil) {
		t.Errorf("expected false")
	}
}

func TestIsDate(t *testing.T) {
	if !IsDate(time.Now()) {
		t.Errorf("expected true")
	}
	if IsDate(42) {
		t.Errorf("expected false")
	}
	if IsDate(nil) {
		t.Errorf("expected false")
	}
}

func TestIsElement(t *testing.T) {
	if IsElement(nil) {
		t.Errorf("expected false")
	}
}

func TestIsEmpty(t *testing.T) {
	if !IsEmpty(nil) {
		t.Errorf("expected true for nil")
	}
	if !IsEmpty("") {
		t.Errorf("expected true for empty string")
	}
	if IsEmpty("abc") {
		t.Errorf("expected false for non-empty string")
	}
	if !IsEmpty([]int{}) {
		t.Errorf("expected true for empty slice")
	}
	if IsEmpty([]int{1}) {
		t.Errorf("expected false for non-empty slice")
	}
	if !IsEmpty(make(map[string]int)) {
		t.Errorf("expected true for empty map")
	}
	type S struct{ X int }
	if !IsEmpty(S{}) {
		t.Errorf("expected true for zero struct")
	}
	if IsEmpty(S{1}) {
		t.Errorf("expected false for non-zero struct")
	}
	var p *int
	if !IsEmpty(p) {
		t.Errorf("expected true for nil ptr")
	}
	x := 42
	if IsEmpty(&x) {
			t.Errorf("expected false for ptr to non-zero value")
		}
	var fn func()
	if !IsEmpty(fn) {
		t.Errorf("expected true for nil func")
	}
	if IsEmpty(42) {
		t.Errorf("expected false for number")
	}
}

func TestIsEqual(t *testing.T) {
	if !IsEqual(1, 1) {
		t.Errorf("expected true")
	}
	if IsEqual(1, 2) {
		t.Errorf("expected false")
	}
	if !IsEqual([]int{1, 2}, []int{1, 2}) {
		t.Errorf("expected true for deep equal")
	}
}

func TestIsEqualWith(t *testing.T) {
	customizer := func(a, b interface{}) bool {
		return true
	}
	if !IsEqualWith(1, 2, customizer) {
		t.Errorf("expected true with customizer")
	}
	if !IsEqualWith(1, 1, nil) {
		t.Errorf("expected true with nil customizer")
	}
}

func TestIsError(t *testing.T) {
	if !IsError(NewError("test")) {
		t.Errorf("expected true for error")
	}
	if IsError(42) {
		t.Errorf("expected false")
	}
	if IsError(nil) {
		t.Errorf("expected false")
	}
}

type testError struct{ msg string }

func (e *testError) Error() string { return e.msg }

func NewError(msg string) error {
	return &testError{msg: msg}
}

func TestIsFinite(t *testing.T) {
	if !IsFinite(1.0) {
		t.Errorf("expected true")
	}
	if IsFinite(math.Inf(1)) {
		t.Errorf("expected false for Inf")
	}
	if IsFinite(math.NaN()) {
		t.Errorf("expected false for NaN")
	}
}

func TestIsFunction(t *testing.T) {
	if !IsFunction(func() {}) {
		t.Errorf("expected true")
	}
	if IsFunction(42) {
		t.Errorf("expected false")
	}
	if IsFunction(nil) {
		t.Errorf("expected false")
	}
}

func TestIsInteger(t *testing.T) {
	if !IsInteger(3.0) {
		t.Errorf("expected true")
	}
	if IsInteger(3.5) {
		t.Errorf("expected false")
	}
	if IsInteger(math.Inf(1)) {
		t.Errorf("expected false for Inf")
	}
	if IsInteger(math.NaN()) {
		t.Errorf("expected false for NaN")
	}
}

func TestIsLength(t *testing.T) {
	if !IsLength(0) {
		t.Errorf("expected true")
	}
	if !IsLength(100) {
		t.Errorf("expected true")
	}
	if IsLength(-1) {
		t.Errorf("expected false")
	}
}

func TestIsMap(t *testing.T) {
	if !IsMap(map[string]int{}) {
		t.Errorf("expected true")
	}
	if IsMap([]int{}) {
		t.Errorf("expected false")
	}
	if IsMap(nil) {
		t.Errorf("expected false")
	}
}

func TestIsMatch(t *testing.T) {
	t.Run("nil source", func(t *testing.T) {
		if !IsMatch(map[string]int{"a": 1}, nil) {
			t.Errorf("expected true")
		}
	})

	t.Run("nil object", func(t *testing.T) {
		if IsMatch(nil, map[string]int{"a": 1}) {
			t.Errorf("expected false")
		}
	})

	t.Run("map matching", func(t *testing.T) {
		if !IsMatch(map[string]int{"a": 1, "b": 2}, map[string]int{"a": 1}) {
			t.Errorf("expected true")
		}
		if IsMatch(map[string]int{"a": 1}, map[string]int{"b": 2}) {
			t.Errorf("expected false")
		}
	})

	t.Run("struct matching", func(t *testing.T) {
		type S struct {
			X int
			y int
		}
		if !IsMatch(S{X: 1, y: 2}, S{X: 1}) {
			t.Errorf("expected true")
		}
		if IsMatch(S{X: 1}, S{X: 2}) {
			t.Errorf("expected false")
		}
	})

	t.Run("slice matching", func(t *testing.T) {
		if !IsMatch([]int{1, 2}, []int{1, 2}) {
			t.Errorf("expected true")
		}
		if IsMatch([]int{1, 2}, []int{1, 3}) {
			t.Errorf("expected false")
		}
		if IsMatch([]int{1, 2}, []int{1}) {
			t.Errorf("expected false (different length)")
		}
	})

	t.Run("primitive matching", func(t *testing.T) {
		if !IsMatch(1, 1) {
			t.Errorf("expected true")
		}
		if IsMatch(1, 2) {
			t.Errorf("expected false")
		}
	})
}

func TestIsMatchWith(t *testing.T) {
	customizer := func(a, b interface{}) bool {
		return true
	}
	if !IsMatchWith(1, 2, customizer) {
		t.Errorf("expected true")
	}
	if !IsMatchWith(1, 1, nil) {
		t.Errorf("expected true for nil customizer")
	}
}

func TestIsNaN(t *testing.T) {
	if !IsNaN(math.NaN()) {
		t.Errorf("expected true for NaN")
	}
	if IsNaN(42.0) {
		t.Errorf("expected false")
	}
	if IsNaN(nil) {
		t.Errorf("expected false")
	}
	if IsNaN(42) {
		t.Errorf("expected false for int")
	}
}

func TestIsNative(t *testing.T) {
	if IsNative(nil) {
		t.Errorf("expected false")
	}
}

func TestIsNil(t *testing.T) {
	if !IsNil(nil) {
		t.Errorf("expected true")
	}
	var p *int
	if !IsNil(p) {
		t.Errorf("expected true for nil ptr")
	}
	var m map[string]int
	if !IsNil(m) {
		t.Errorf("expected true for nil map")
	}
	var s []int
	if !IsNil(s) {
		t.Errorf("expected true for nil slice")
	}
	if IsNil(42) {
		t.Errorf("expected false for number")
	}
}

func TestIsNull(t *testing.T) {
	if !IsNull(nil) {
		t.Errorf("expected true")
	}
}

func TestIsNumber(t *testing.T) {
	if !IsNumber(42) {
		t.Errorf("expected true for int")
	}
	if !IsNumber(42.5) {
		t.Errorf("expected true for float")
	}
	if IsNumber("42") {
		t.Errorf("expected false for string")
	}
	if IsNumber(nil) {
		t.Errorf("expected false")
	}
}

func TestIsObject(t *testing.T) {
	if !IsObject(map[string]int{}) {
		t.Errorf("expected true for map")
	}
	if !IsObject([]int{}) {
		t.Errorf("expected true for slice")
	}
	if !IsObject(struct{}{}) {
		t.Errorf("expected true for struct")
	}
	if IsObject(42) {
		t.Errorf("expected false for number")
	}
	if IsObject(nil) {
		t.Errorf("expected false")
	}
}

func TestIsObjectLike(t *testing.T) {
	if !IsObjectLike(map[string]int{}) {
		t.Errorf("expected true for map")
	}
	if !IsObjectLike([]int{}) {
		t.Errorf("expected true for slice")
	}
	if IsObjectLike("hello") {
		t.Errorf("expected false for string")
	}
	if IsObjectLike(nil) {
		t.Errorf("expected false")
	}
}

func TestIsPlainObject(t *testing.T) {
	if !IsPlainObject(map[string]int{}) {
		t.Errorf("expected true for map")
	}
	type S struct{}
	if !IsPlainObject(S{}) {
		t.Errorf("expected true for struct")
	}
	if IsPlainObject(42) {
		t.Errorf("expected false")
	}
	if IsPlainObject(nil) {
		t.Errorf("expected false")
	}
	var s struct{}
	if !IsPlainObject(&s) {
		t.Errorf("expected true for ptr to struct")
	}
}

func TestIsRegExp(t *testing.T) {
	if !IsRegExp(regexp.MustCompile("abc")) {
		t.Errorf("expected true")
	}
	if IsRegExp("abc") {
		t.Errorf("expected false")
	}
	if IsRegExp(nil) {
		t.Errorf("expected false")
	}
}

func TestIsSafeInteger(t *testing.T) {
	if !IsSafeInteger(3.0) {
		t.Errorf("expected true")
	}
	if IsSafeInteger(3.5) {
		t.Errorf("expected false")
	}
	if IsSafeInteger(math.Inf(1)) {
		t.Errorf("expected false for Inf")
	}
}

func TestIsSet(t *testing.T) {
	if !IsSet(map[interface{}]struct{}{"a": struct{}{}}) {
		t.Errorf("expected true for map with struct{} value")
	}
	if IsSet(map[string]int{}) {
		t.Errorf("expected false for regular map")
	}
	if IsSet(nil) {
		t.Errorf("expected false")
	}
}

func TestIsString(t *testing.T) {
	if !IsString("hello") {
		t.Errorf("expected true")
	}
	if IsString(42) {
		t.Errorf("expected false")
	}
	if IsString(nil) {
		t.Errorf("expected false")
	}
}

func TestIsSymbol(t *testing.T) {
	if IsSymbol(nil) {
		t.Errorf("expected false")
	}
}

func TestIsTypedArray(t *testing.T) {
	if !IsTypedArray([]int8{1}) {
		t.Errorf("expected true for []int8")
	}
	if !IsTypedArray([]uint32{1}) {
		t.Errorf("expected true for []uint32")
	}
	if IsTypedArray([]int{1}) {
		t.Errorf("expected false for []int")
	}
	if IsTypedArray(nil) {
		t.Errorf("expected false")
	}
}

func TestIsUndefined(t *testing.T) {
	if !IsUndefined(nil) {
		t.Errorf("expected true")
	}
	if IsUndefined(42) {
		t.Errorf("expected false")
	}
}

func TestIsWeakMap(t *testing.T) {
	if IsWeakMap(nil) {
		t.Errorf("expected false")
	}
}

func TestIsWeakSet(t *testing.T) {
	if IsWeakSet(nil) {
		t.Errorf("expected false")
	}
}

func TestToArray(t *testing.T) {
	t.Run("nil", func(t *testing.T) {
		result := ToArray(nil)
		if len(result) != 0 {
			t.Errorf("expected empty, got %v", result)
		}
	})

	t.Run("slice", func(t *testing.T) {
		result := ToArray([]int{1, 2, 3})
		if len(result) != 3 {
			t.Errorf("expected 3, got %v", result)
		}
	})

	t.Run("map", func(t *testing.T) {
		result := ToArray(map[string]int{"a": 1, "b": 2})
		if len(result) != 2 {
			t.Errorf("expected 2, got %v", result)
		}
	})

	t.Run("string", func(t *testing.T) {
		result := ToArray("abc")
		if len(result) != 3 || result[0] != "a" || result[1] != "b" || result[2] != "c" {
			t.Errorf("expected [a b c], got %v", result)
		}
	})

	t.Run("scalar", func(t *testing.T) {
		result := ToArray(42)
		if len(result) != 1 || result[0] != 42 {
			t.Errorf("expected [42], got %v", result)
		}
	})
}

func TestToFinite(t *testing.T) {
	t.Run("nil", func(t *testing.T) {
		if ToFinite(nil) != 0 {
			t.Errorf("expected 0")
		}
	})

	t.Run("float", func(t *testing.T) {
		if ToFinite(42.5) != 42.5 {
			t.Errorf("expected 42.5")
		}
	})

	t.Run("NaN becomes 0", func(t *testing.T) {
		if ToFinite(math.NaN()) != 0 {
			t.Errorf("expected 0")
		}
	})

	t.Run("+Inf becomes MaxFloat64", func(t *testing.T) {
		if ToFinite(math.Inf(1)) != 1.7976931348623157e+308 {
			t.Errorf("expected MaxFloat64")
		}
	})

	t.Run("-Inf becomes -MaxFloat64", func(t *testing.T) {
		if ToFinite(-math.Inf(1)) != -1.7976931348623157e+308 {
			t.Errorf("expected -MaxFloat64")
		}
	})

	t.Run("int", func(t *testing.T) {
		if ToFinite(42) != 42.0 {
			t.Errorf("expected 42.0")
		}
	})

	t.Run("uint", func(t *testing.T) {
		var u uint = 42
		if ToFinite(u) != 42.0 {
			t.Errorf("expected 42.0")
		}
	})

	t.Run("bool", func(t *testing.T) {
		if ToFinite(true) != 1.0 {
			t.Errorf("expected 1.0")
		}
		if ToFinite(false) != 0.0 {
			t.Errorf("expected 0.0")
		}
	})

	t.Run("string", func(t *testing.T) {
		if ToFinite("42.5") != 42.5 {
			t.Errorf("expected 42.5")
		}
	})

	t.Run("unexpected type", func(t *testing.T) {
		if ToFinite([]int{}) != 0 {
			t.Errorf("expected 0")
		}
	})
}

func TestToInteger(t *testing.T) {
	t.Run("nil", func(t *testing.T) {
		if ToInteger(nil) != 0 {
			t.Errorf("expected 0")
		}
	})

	t.Run("float", func(t *testing.T) {
		if ToInteger(42.7) != 42 {
			t.Errorf("expected 42")
		}
	})

	t.Run("NaN", func(t *testing.T) {
		if ToInteger(math.NaN()) != 0 {
			t.Errorf("expected 0")
		}
	})

	t.Run("Inf", func(t *testing.T) {
		if ToInteger(math.Inf(1)) != 0 {
			t.Errorf("expected 0")
		}
	})

	t.Run("int", func(t *testing.T) {
		if ToInteger(42) != 42 {
			t.Errorf("expected 42")
		}
	})

	t.Run("uint", func(t *testing.T) {
		var u uint = 42
		if ToInteger(u) != 42 {
			t.Errorf("expected 42")
		}
	})

	t.Run("bool", func(t *testing.T) {
		if ToInteger(true) != 1 {
			t.Errorf("expected 1")
		}
		if ToInteger(false) != 0 {
			t.Errorf("expected 0")
		}
	})

	t.Run("string", func(t *testing.T) {
		if ToInteger("42") != 42 {
			t.Errorf("expected 42")
		}
	})

	t.Run("unexpected type", func(t *testing.T) {
		if ToInteger([]int{}) != 0 {
			t.Errorf("expected 0")
		}
	})
}

func TestToLength(t *testing.T) {
	if ToLength(5) != 5 {
		t.Errorf("expected 5")
	}
	if ToLength(-1) != 0 {
		t.Errorf("expected 0 for negative")
	}
	if ToLength(9999999999) != 4294967295 {
		t.Errorf("expected max uint32")
	}
}

func TestToNumber(t *testing.T) {
	t.Run("nil", func(t *testing.T) {
		if ToNumber(nil) != 0 {
			t.Errorf("expected 0")
		}
	})

	t.Run("float", func(t *testing.T) {
		if ToNumber(42.5) != 42.5 {
			t.Errorf("expected 42.5")
		}
	})

	t.Run("int", func(t *testing.T) {
		if ToNumber(42) != 42.0 {
			t.Errorf("expected 42.0")
		}
	})

	t.Run("uint", func(t *testing.T) {
		var u uint = 42
		if ToNumber(u) != 42.0 {
			t.Errorf("expected 42.0")
		}
	})

	t.Run("bool", func(t *testing.T) {
		if ToNumber(true) != 1.0 {
			t.Errorf("expected 1.0")
		}
		if ToNumber(false) != 0.0 {
			t.Errorf("expected 0.0")
		}
	})

	t.Run("string", func(t *testing.T) {
		if ToNumber("42.5") != 42.5 {
			t.Errorf("expected 42.5")
		}
	})

	t.Run("unexpected type", func(t *testing.T) {
		if ToNumber([]int{}) != 0 {
			t.Errorf("expected 0")
		}
	})
}

func TestToPlainObject(t *testing.T) {
	t.Run("nil", func(t *testing.T) {
		result := ToPlainObject(nil)
		if len(result) != 0 {
			t.Errorf("expected empty, got %v", result)
		}
	})

	t.Run("struct", func(t *testing.T) {
		type S struct {
			Name string
			Age  int
		}
		result := ToPlainObject(S{Name: "Alice", Age: 30})
		if result["Name"] != "Alice" || result["Age"] != 30 {
			t.Errorf("expected {Name:Alice Age:30}, got %v", result)
		}
	})

	t.Run("map", func(t *testing.T) {
		result := ToPlainObject(map[int]string{1: "one"})
		if result["1"] != "one" {
			t.Errorf("expected {1:one}, got %v", result)
		}
	})

	t.Run("nil ptr", func(t *testing.T) {
		var p *int
		result := ToPlainObject(p)
		if len(result) != 0 {
			t.Errorf("expected empty, got %v", result)
		}
	})
}

func TestToSafeInteger(t *testing.T) {
	if ToSafeInteger(42) != 42 {
		t.Errorf("expected 42")
	}
	if ToSafeInteger(-5) != 0 {
		t.Errorf("expected 0 for negative")
	}
}

func TestToString(t *testing.T) {
	if ToString(nil) != "" {
		t.Errorf("expected empty string")
	}
	if ToString(42) != "42" {
		t.Errorf("expected '42', got %s", ToString(42))
	}
}
