package util

import (
	"testing"
)

func TestAttempt(t *testing.T) {
	t.Run("successful function", func(t *testing.T) {
		fn := func(args ...interface{}) interface{} {
			return 42
		}
		if got := Attempt(fn); got != 42 {
			t.Errorf("expected 42, got %v", got)
		}
	})

	t.Run("panicking function", func(t *testing.T) {
		fn := func(args ...interface{}) interface{} {
			panic("oops")
		}
		if got := Attempt(fn); got != nil {
			t.Errorf("expected nil, got %v", got)
		}
	})
}

func TestBindAll(t *testing.T) {
	fn := func(args ...interface{}) interface{} {
		return "called"
	}
	obj := map[string]interface{}{
		"greet": fn,
		"name":  "test",
	}
	result := BindAll(obj, "greet")
	if result["name"] != "test" {
		t.Errorf("expected non-function to be preserved, got %v", result["name"])
	}
	if f, ok := result["greet"].(func(...interface{}) interface{}); ok {
		if got := f(); got != "called" {
			t.Errorf("expected 'called', got %v", got)
		}
	} else {
		t.Errorf("expected greet to be a function")
	}

	obj2 := map[string]interface{}{"x": 1}
	result2 := BindAll(obj2, "missing")
	if result2["x"] != 1 {
		t.Errorf("expected {x:1}, got %v", result2)
	}

	obj3 := map[string]interface{}{"x": 1}
	result3 := BindAll(obj3, "x")
	if result3["x"] != 1 {
		t.Errorf("expected {x:1}, got %v", result3)
	}
}

func TestCond(t *testing.T) {
	fn := Cond([]struct {
		Predicate func(...interface{}) bool
		Action    func(...interface{}) interface{}
	}{
		{
			Predicate: func(args ...interface{}) bool {
				return args[0].(int) < 0
			},
			Action: func(args ...interface{}) interface{} {
				return "negative"
			},
		},
		{
			Predicate: func(args ...interface{}) bool {
				return args[0].(int) > 0
			},
			Action: func(args ...interface{}) interface{} {
				return "positive"
			},
		},
	})

	if got := fn(-5); got != "negative" {
		t.Errorf("expected 'negative', got %v", got)
	}
	if got := fn(5); got != "positive" {
		t.Errorf("expected 'positive', got %v", got)
	}
	if got := fn(0); got != nil {
		t.Errorf("expected nil, got %v", got)
	}
}

func TestConforms(t *testing.T) {
	checker := Conforms(map[string]func(interface{}) bool{
		"age": func(v interface{}) bool {
			return v.(int) >= 18
		},
	})
	if !checker(map[string]interface{}{"age": 25}) {
		t.Errorf("expected true")
	}
	if checker(map[string]interface{}{"age": 15}) {
		t.Errorf("expected false")
	}
	if checker(map[string]interface{}{}) {
		t.Errorf("expected false (missing key)")
	}
}

func TestConstant(t *testing.T) {
	fn := Constant(42)
	if got := fn(); got != 42 {
		t.Errorf("expected 42, got %v", got)
	}
	if got := fn("ignored"); got != 42 {
		t.Errorf("expected 42, got %v", got)
	}
}

func TestDefaultTo(t *testing.T) {
	if got := DefaultTo(nil, 42); got != 42 {
		t.Errorf("expected 42, got %v", got)
	}
	if got := DefaultTo(1, 42); got != 1 {
		t.Errorf("expected 1, got %v", got)
	}
	if got := DefaultTo("hello", "default"); got != "hello" {
		t.Errorf("expected 'hello', got %v", got)
	}
}

func TestFlow(t *testing.T) {
	addOne := func(v interface{}) interface{} {
		return v.(int) + 1
	}
	double := func(v interface{}) interface{} {
		return v.(int) * 2
	}
	fn := Flow(addOne, double)
	if got := fn(3); got != 8 {
		t.Errorf("expected 8, got %v", got)
	}

	fn2 := Flow()
	if got := fn2(42); got != 42 {
		t.Errorf("expected 42, got %v", got)
	}
}

func TestFlowRight(t *testing.T) {
	addOne := func(v interface{}) interface{} {
		return v.(int) + 1
	}
	double := func(v interface{}) interface{} {
		return v.(int) * 2
	}
	fn := FlowRight(addOne, double)
	if got := fn(3); got != 7 {
		t.Errorf("expected 7 (double then addOne), got %v", got)
	}
}

func TestIdentity(t *testing.T) {
	if got := Identity(42); got != 42 {
		t.Errorf("expected 42, got %v", got)
	}
	if got := Identity("test"); got != "test" {
		t.Errorf("expected 'test', got %v", got)
	}
}

func TestIteratee(t *testing.T) {
	t.Run("function input", func(t *testing.T) {
		fn := func(v interface{}) interface{} {
			return v.(int) * 2
		}
		result := Iteratee(fn)
		if got := result(5); got != 10 {
			t.Errorf("expected 10, got %v", got)
		}
	})

	t.Run("string path", func(t *testing.T) {
		result := Iteratee("a.b")
		obj := map[string]interface{}{
			"a": map[string]interface{}{"b": 42},
		}
		if got := result(obj); got != 42 {
			t.Errorf("expected 42, got %v", got)
		}
	})

	t.Run("other input returns identity", func(t *testing.T) {
		result := Iteratee(42)
		if got := result("anything"); got != "anything" {
			t.Errorf("expected 'anything', got %v", got)
		}
	})
}

func TestMatches(t *testing.T) {
	source := map[string]interface{}{"a": 1, "b": 2}
	m := Matches(source)
	if !m(map[string]interface{}{"a": 1, "b": 2}) {
		t.Errorf("expected true")
	}
	if m(map[string]interface{}{"a": 1}) {
		t.Errorf("expected false (missing b)")
	}
	if m(map[string]interface{}{"a": 99, "b": 2}) {
		t.Errorf("expected false (a mismatch)")
	}
}

func TestMatchesProperty(t *testing.T) {
	m := MatchesProperty("name", "Alice")
	if !m(map[string]interface{}{"name": "Alice", "age": 30}) {
		t.Errorf("expected true")
	}
	if m(map[string]interface{}{"name": "Bob"}) {
		t.Errorf("expected false")
	}
	if m(map[string]interface{}{}) {
		t.Errorf("expected false (missing key)")
	}
}

func TestMethod(t *testing.T) {
	obj := map[string]interface{}{
		"math": map[string]interface{}{
			"add": func(args ...interface{}) interface{} {
				var sum int
				for _, a := range args {
					if v, ok := a.(int); ok {
						sum += v
					}
				}
				return sum
			},
		},
	}
	fn := Method("math.add", 1, 2)
	if got := fn(obj); got != 3 {
		t.Errorf("expected 3, got %v", got)
	}

	fn2 := Method("missing")
	if got := fn2(obj); got != nil {
		t.Errorf("expected nil, got %v", got)
	}

	fn3 := Method("math")
	if got := fn3(obj); got != nil {
		t.Errorf("expected nil, got %v", got)
	}
}

func TestMethodOf(t *testing.T) {
	obj := map[string]interface{}{
		"add": func(args ...interface{}) interface{} {
			var sum int
			for _, a := range args {
				if v, ok := a.(int); ok {
					sum += v
				}
			}
			return sum
		},
	}
	fn := MethodOf(obj, 1, 2)
	if got := fn("add"); got != 3 {
		t.Errorf("expected 3, got %v", got)
	}
	if got := fn("missing"); got != nil {
		t.Errorf("expected nil, got %v", got)
	}
}

func TestMixin(t *testing.T) {
	obj := map[string]interface{}{"a": 1}
	src := map[string]interface{}{"b": 2}
	result := Mixin(obj, src)
	if result["a"] != 1 || result["b"] != 2 {
		t.Errorf("expected {a:1 b:2}, got %v", result)
	}
}

func TestNoConflict(t *testing.T) {
	if got := NoConflict(); got != nil {
		t.Errorf("expected nil, got %v", got)
	}
}

func TestNoop(t *testing.T) {
	Noop()
	Noop(1, 2, 3)
}

func TestNthArg(t *testing.T) {
	fn := NthArg(1)
	if got := fn("a", "b", "c"); got != "b" {
		t.Errorf("expected 'b', got %v", got)
	}
	fn2 := NthArg(5)
	if got := fn2("a", "b"); got != nil {
		t.Errorf("expected nil, got %v", got)
	}
	fn3 := NthArg(-1)
	if got := fn3("a", "b"); got != nil {
		t.Errorf("expected nil, got %v", got)
	}
}

func TestOver(t *testing.T) {
	double := func(args ...interface{}) interface{} {
		return args[0].(int) * 2
	}
	square := func(args ...interface{}) interface{} {
		return args[0].(int) * args[0].(int)
	}
	fn := Over(double, square)
	result := fn(3)
	if result[0] != 6 || result[1] != 9 {
		t.Errorf("expected [6 9], got %v", result)
	}
}

func TestOverEvery(t *testing.T) {
	isPositive := func(args ...interface{}) bool {
		return args[0].(int) > 0
	}
	isEven := func(args ...interface{}) bool {
		return args[0].(int)%2 == 0
	}
	fn := OverEvery(isPositive, isEven)
	if !fn(2) {
		t.Errorf("expected true")
	}
	if fn(-2) {
		t.Errorf("expected false")
	}
	if fn(3) {
		t.Errorf("expected false (not even)")
	}
}

func TestOverSome(t *testing.T) {
	isPositive := func(args ...interface{}) bool {
		return args[0].(int) > 0
	}
	isEven := func(args ...interface{}) bool {
		return args[0].(int)%2 == 0
	}
	fn := OverSome(isPositive, isEven)
	if !fn(2) {
		t.Errorf("expected true")
	}
	if !fn(3) {
		t.Errorf("expected true (positive)")
	}
	if fn(-1) {
		t.Errorf("expected false")
	}
}

func TestProperty(t *testing.T) {
	t.Run("gets nested property", func(t *testing.T) {
		p := Property("a.b.c")
		obj := map[string]interface{}{
			"a": map[string]interface{}{"b": map[string]interface{}{"c": 42}},
		}
		if got := p(obj); got != 42 {
			t.Errorf("expected 42, got %v", got)
		}
	})

	t.Run("missing key", func(t *testing.T) {
		p := Property("missing")
		if got := p(map[string]interface{}{}); got != nil {
			t.Errorf("expected nil, got %v", got)
		}
	})

	t.Run("reflect map access", func(t *testing.T) {
		p := Property("a")
		obj := map[string]int{"a": 42}
		if got := p(obj); got != 42 {
			t.Errorf("expected 42, got %v", got)
		}
	})

	t.Run("missing reflect key", func(t *testing.T) {
		p := Property("x")
		obj := map[string]int{"a": 1}
		if got := p(obj); got != nil {
			t.Errorf("expected nil, got %v", got)
		}
	})

	t.Run("non-map non-struct", func(t *testing.T) {
		p := Property("a")
		if got := p("hello"); got != nil {
			t.Errorf("expected nil, got %v", got)
		}
	})
}

func TestPropertyOf(t *testing.T) {
	obj := map[string]interface{}{
		"a": map[string]interface{}{"b": 1},
	}
	p := PropertyOf(obj)
	if got := p("a.b"); got != 1 {
		t.Errorf("expected 1, got %v", got)
	}
	if got := p("missing"); got != nil {
		t.Errorf("expected nil, got %v", got)
	}
}

func TestRange(t *testing.T) {
	result := Range(1, 5, 1)
	if len(result) != 4 || result[0] != 1 || result[3] != 4 {
		t.Errorf("expected [1 2 3 4], got %v", result)
	}

	result2 := Range(5, 0, -1)
	if len(result2) != 5 || result2[0] != 5 || result2[4] != 1 {
		t.Errorf("expected [5 4 3 2 1], got %v", result2)
	}

	if got := Range(0, 5, 0); got != nil {
		t.Errorf("expected nil, got %v", got)
	}
}

func TestRangeRight(t *testing.T) {
	result := RangeRight(1, 5, 1)
	if len(result) != 4 || result[0] != 4 || result[3] != 1 {
		t.Errorf("expected [4 3 2 1], got %v", result)
	}

	if got := RangeRight(0, 5, 0); got != nil {
		t.Errorf("expected nil, got %v", got)
	}
}

func TestRunInContext(t *testing.T) {
	ctx := map[string]interface{}{"a": 1}
	result := RunInContext(ctx)
	if result["a"] != 1 {
		t.Errorf("expected {a:1}, got %v", result)
	}
}

func TestStubArray(t *testing.T) {
	if got := StubArray(); got != [0]int{} {
		t.Errorf("expected [0]int{}, got %v", got)
	}
}

func TestStubFalse(t *testing.T) {
	if StubFalse() {
		t.Errorf("expected false")
	}
}

func TestStubObject(t *testing.T) {
	result := StubObject()
	if len(result) != 0 {
		t.Errorf("expected empty map, got %v", result)
	}
}

func TestStubString(t *testing.T) {
	if got := StubString(); got != "" {
		t.Errorf("expected '', got '%s'", got)
	}
}

func TestStubTrue(t *testing.T) {
	if !StubTrue() {
		t.Errorf("expected true")
	}
}

func TestTimes(t *testing.T) {
	iteratee := func(i int) interface{} {
		return i * 2
	}
	result := Times(3, iteratee)
	if len(result) != 3 || result[0] != 0 || result[1] != 2 || result[2] != 4 {
		t.Errorf("expected [0 2 4], got %v", result)
	}

	result2 := Times(0, iteratee)
	if len(result2) != 0 {
		t.Errorf("expected empty, got %v", result2)
	}
}

func TestToPath(t *testing.T) {
	result := ToPath("a.b.c")
	if len(result) != 3 || result[0] != "a" || result[1] != "b" || result[2] != "c" {
		t.Errorf("expected [a b c], got %v", result)
	}
}

func TestUniqueId(t *testing.T) {
	id1 := UniqueId("prefix_")
	id2 := UniqueId("prefix_")
	if id2 <= id1 {
		t.Errorf("expected id2 > id1, got %s and %s", id1, id2)
	}

	id3 := UniqueId("")
	if id3 == "" {
		t.Errorf("expected non-empty id, got '%s'", id3)
	}
}
