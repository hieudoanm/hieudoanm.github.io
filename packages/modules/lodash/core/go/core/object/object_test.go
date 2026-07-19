package object

import (
	"testing"
)

func TestAssign(t *testing.T) {
	t.Run("merges sources", func(t *testing.T) {
		obj := map[string]interface{}{"a": 1}
		result := Assign(obj, map[string]interface{}{"b": 2}, map[string]interface{}{"c": 3})
		if result["a"] != 1 || result["b"] != 2 || result["c"] != 3 {
			t.Errorf("expected {a:1 b:2 c:3}, got %v", result)
		}
	})

	t.Run("nil object creates new", func(t *testing.T) {
		result := Assign(nil, map[string]interface{}{"a": 1})
		if result["a"] != 1 {
			t.Errorf("expected {a:1}, got %v", result)
		}
	})

	t.Run("nil source skipped", func(t *testing.T) {
		obj := map[string]interface{}{"a": 1}
		result := Assign(obj, nil)
		if result["a"] != 1 {
			t.Errorf("expected {a:1}, got %v", result)
		}
	})

	t.Run("nil value does not overwrite existing", func(t *testing.T) {
		obj := map[string]interface{}{"a": 1}
		result := Assign(obj, map[string]interface{}{"a": nil})
		if result["a"] != 1 {
			t.Errorf("expected a:1, got %v", result)
		}
	})

	t.Run("nil value set when key absent", func(t *testing.T) {
		obj := map[string]interface{}{}
		result := Assign(obj, map[string]interface{}{"a": nil})
		if result["a"] != nil {
			t.Errorf("expected a:nil, got %v", result)
		}
	})

	t.Run("no sources", func(t *testing.T) {
		obj := map[string]interface{}{"a": 1}
		result := Assign(obj)
		if result["a"] != 1 {
			t.Errorf("expected {a:1}, got %v", result)
		}
	})
}

func TestAssignIn(t *testing.T) {
	result := AssignIn(map[string]interface{}{"a": 1}, map[string]interface{}{"b": 2})
	if result["a"] != 1 || result["b"] != 2 {
		t.Errorf("expected {a:1 b:2}, got %v", result)
	}
}

func TestAssignInWith(t *testing.T) {
	t.Run("customizer merges values", func(t *testing.T) {
		customizer := func(old, new interface{}) interface{} {
			if old == nil {
				return new
			}
			return old
		}
		obj := map[string]interface{}{"a": 1}
		result := AssignInWith(obj, customizer, map[string]interface{}{"a": 99, "b": 2})
		if result["a"] != 1 || result["b"] != 2 {
			t.Errorf("expected a:1 b:2, got %v", result)
		}
	})

	t.Run("nil customizer falls through", func(t *testing.T) {
		obj := map[string]interface{}{"a": 1}
		result := AssignInWith(obj, nil, map[string]interface{}{"b": 2})
		if result["a"] != 1 || result["b"] != 2 {
			t.Errorf("expected {a:1 b:2}, got %v", result)
		}
	})

	t.Run("nil object", func(t *testing.T) {
		result := AssignInWith(nil, nil, map[string]interface{}{"a": 1})
		if result["a"] != 1 {
			t.Errorf("expected {a:1}, got %v", result)
		}
	})

	t.Run("nil source", func(t *testing.T) {
		obj := map[string]interface{}{"a": 1}
		result := AssignInWith(obj, nil, nil)
		if result["a"] != 1 || len(result) != 1 {
			t.Errorf("expected {a:1}, got %v", result)
		}
	})
}

func TestAssignWith(t *testing.T) {
	customizer := func(old, new interface{}) interface{} {
		if old == nil {
			return new
		}
		return old
	}
	obj := map[string]interface{}{"a": 1}
	result := AssignWith(obj, customizer, map[string]interface{}{"a": 99, "b": 2})
	if result["a"] != 1 || result["b"] != 2 {
		t.Errorf("expected a:1 b:2, got %v", result)
	}
}

func TestAt(t *testing.T) {
	obj := map[string]interface{}{
		"a": map[string]interface{}{"b": 1},
		"c": 2,
	}
	result := At(obj, "a.b", "c", "missing")
	if result[0] != 1 || result[1] != 2 || result[2] != nil {
		t.Errorf("expected [1 2 nil], got %v", result)
	}
}

func TestCreate(t *testing.T) {
	proto := map[string]interface{}{"a": 1}
	props := map[string]interface{}{"b": 2}
	result := Create(proto, props)
	if result["a"] != 1 || result["b"] != 2 {
		t.Errorf("expected {a:1 b:2}, got %v", result)
	}

	result2 := Create(nil, nil)
	if len(result2) != 0 {
		t.Errorf("expected empty, got %v", result2)
	}
}

func TestDefaults(t *testing.T) {
	t.Run("fills nil values", func(t *testing.T) {
		obj := map[string]interface{}{"a": nil, "b": 1}
		result := Defaults(obj, map[string]interface{}{"a": 10, "b": 20, "c": 30})
		if result["a"] != 10 || result["b"] != 1 || result["c"] != 30 {
			t.Errorf("expected a:10 b:1 c:30, got %v", result)
		}
	})

	t.Run("nil object", func(t *testing.T) {
		result := Defaults(nil, map[string]interface{}{"a": 1})
		if result["a"] != 1 {
			t.Errorf("expected {a:1}, got %v", result)
		}
	})

	t.Run("nil source skipped", func(t *testing.T) {
		obj := map[string]interface{}{"a": 1}
		result := Defaults(obj, nil)
		if result["a"] != 1 {
			t.Errorf("expected {a:1}, got %v", result)
		}
	})
}

func TestDefaultsDeep(t *testing.T) {
	t.Run("deep defaults", func(t *testing.T) {
		obj := map[string]interface{}{
			"a": map[string]interface{}{"b": 1},
		}
		src := map[string]interface{}{
			"a": map[string]interface{}{"b": 99, "c": 2},
		}
		result := DefaultsDeep(obj, src)
		inner := result["a"].(map[string]interface{})
		if inner["b"] != 1 || inner["c"] != 2 {
			t.Errorf("expected b:1 c:2, got %v", inner)
		}
	})

	t.Run("nil object", func(t *testing.T) {
		result := DefaultsDeep(nil, map[string]interface{}{"a": 1})
		if result["a"] != 1 {
			t.Errorf("expected {a:1}, got %v", result)
		}
	})

	t.Run("nil source skipped", func(t *testing.T) {
		obj := map[string]interface{}{"a": 1}
		result := DefaultsDeep(obj, nil)
		if result["a"] != 1 {
			t.Errorf("expected {a:1}, got %v", result)
		}
	})
}

func TestFindKey(t *testing.T) {
	obj := map[string]interface{}{"a": 1, "b": 2, "c": 3}
	pred := func(v interface{}) bool {
		return v.(int) > 1
	}
	key := FindKey(obj, pred)
	if key != "b" && key != "c" {
		t.Errorf("expected b or c, got %s", key)
	}

	key2 := FindKey(obj, func(v interface{}) bool { return v.(int) > 10 })
	if key2 != "" {
		t.Errorf("expected empty, got %s", key2)
	}
}

func TestFindLastKey(t *testing.T) {
	obj := map[string]interface{}{"a": 1, "b": 2, "c": 2}
	pred := func(v interface{}) bool {
		return v.(int) == 2
	}
	key := FindLastKey(obj, pred)
	if key == "" {
		t.Errorf("expected a key, got empty")
	}

	key2 := FindLastKey(obj, func(v interface{}) bool { return v.(int) > 10 })
	if key2 != "" {
		t.Errorf("expected empty, got %s", key2)
	}
}

func TestForIn(t *testing.T) {
	obj := map[string]interface{}{"a": 1, "b": 2}
	var keys []string
	ForIn(obj, func(k string, v interface{}) {
		keys = append(keys, k)
	})
	if len(keys) != 2 {
		t.Errorf("expected 2 keys, got %v", keys)
	}
}

func TestForInRight(t *testing.T) {
	obj := map[string]interface{}{"a": 1, "b": 2}
	var keys []string
	ForInRight(obj, func(k string, v interface{}) {
		keys = append(keys, k)
	})
	if len(keys) != 2 {
		t.Errorf("expected 2 keys, got %v", keys)
	}
}

func TestForOwn(t *testing.T) {
	obj := map[string]interface{}{"a": 1}
	var count int
	ForOwn(obj, func(k string, v interface{}) {
		count++
	})
	if count != 1 {
		t.Errorf("expected 1, got %d", count)
	}
}

func TestForOwnRight(t *testing.T) {
	obj := map[string]interface{}{"a": 1, "b": 2}
	var keys []string
	ForOwnRight(obj, func(k string, v interface{}) {
		keys = append(keys, k)
	})
	if len(keys) != 2 {
		t.Errorf("expected 2 keys, got %v", keys)
	}
}

func TestFunctions(t *testing.T) {
	obj := map[string]interface{}{
		"fn": func() {},
		"x":  42,
	}
	fns := Functions(obj)
	if len(fns) != 1 || fns[0] != "fn" {
		t.Errorf("expected [fn], got %v", fns)
	}

	fns2 := Functions(map[string]interface{}{})
	if len(fns2) != 0 {
		t.Errorf("expected empty, got %v", fns2)
	}
}

func TestFunctionsIn(t *testing.T) {
	obj := map[string]interface{}{
		"fn": func() {},
	}
	result := FunctionsIn(obj)
	if len(result) != 1 {
		t.Errorf("expected 1, got %v", result)
	}
}

func TestGet(t *testing.T) {
	obj := map[string]interface{}{
		"a": map[string]interface{}{"b": 1},
	}
	if got := Get(obj, "a.b"); got != 1 {
		t.Errorf("expected 1, got %v", got)
	}
	if got := Get(obj, "missing"); got != nil {
		t.Errorf("expected nil, got %v", got)
	}
	if got := Get(obj, "a.missing"); got != nil {
		t.Errorf("expected nil, got %v", got)
	}
	if got := Get(nil, "a"); got != nil {
		t.Errorf("expected nil, got %v", got)
	}
}

func TestHas(t *testing.T) {
	obj := map[string]interface{}{
		"a": map[string]interface{}{"b": 1},
	}
	if !Has(obj, "a") {
		t.Errorf("expected true")
	}
	if !Has(obj, "a.b") {
		t.Errorf("expected true")
	}
	if Has(obj, "missing") {
		t.Errorf("expected false")
	}
	if Has(obj, "a.missing") {
		t.Errorf("expected false")
	}
	if Has(nil, "a") {
		t.Errorf("expected false")
	}
}

func TestHasIn(t *testing.T) {
	obj := map[string]interface{}{"a": 1}
	if !HasIn(obj, "a") {
		t.Errorf("expected true")
	}
}

func TestInvert(t *testing.T) {
	obj := map[string]interface{}{"a": 1, "b": 2}
	result := Invert(obj)
	if result[1] != "a" || result[2] != "b" {
		t.Errorf("expected {1:a 2:b}, got %v", result)
	}
}

func TestInvertBy(t *testing.T) {
	obj := map[string]interface{}{"a": "odd", "b": "even", "c": "odd"}
	result := InvertBy(obj, func(v interface{}) string {
		return v.(string)
	})
	if len(result["odd"]) != 2 || len(result["even"]) != 1 {
		t.Errorf("expected two odds and one even, got %v", result)
	}
}

func TestInvoke(t *testing.T) {
	obj := map[string]interface{}{
		"fn": func(args ...interface{}) interface{} {
			return "called"
		},
	}
	if got := Invoke(obj, "fn"); got != "called" {
		t.Errorf("expected 'called', got %v", got)
	}

	if got := Invoke(obj, "missing"); got != nil {
		t.Errorf("expected nil, got %v", got)
	}

	if got := Invoke(obj, "a.b"); got != nil {
		t.Errorf("expected nil, got %v", got)
	}

	obj2 := map[string]interface{}{
		"a": map[string]interface{}{"b": 42},
	}
	if got := Invoke(obj2, "a.b"); got != nil {
		t.Errorf("expected nil (not a func), got %v", got)
	}
}

func TestKeys(t *testing.T) {
	obj := map[string]interface{}{"b": 1, "a": 2}
	result := Keys(obj)
	if result[0] != "a" || result[1] != "b" {
		t.Errorf("expected sorted [a b], got %v", result)
	}
}

func TestKeysIn(t *testing.T) {
	obj := map[string]interface{}{"b": 1, "a": 2}
	result := KeysIn(obj)
	if len(result) != 2 {
		t.Errorf("expected 2 keys, got %v", result)
	}
}

func TestMapKeys(t *testing.T) {
	obj := map[string]interface{}{"a": 1, "b": 2}
	result := MapKeys(obj, func(k string, v interface{}) string {
		return k + k
	})
	if result["aa"] != 1 || result["bb"] != 2 {
		t.Errorf("expected {aa:1 bb:2}, got %v", result)
	}
}

func TestMapValues(t *testing.T) {
	obj := map[string]interface{}{"a": 1, "b": 2}
	result := MapValues(obj, func(v interface{}) interface{} {
		return v.(int) * 2
	})
	if result["a"] != 2 || result["b"] != 4 {
		t.Errorf("expected {a:2 b:4}, got %v", result)
	}
}

func TestMerge(t *testing.T) {
	t.Run("deep merges", func(t *testing.T) {
		obj := map[string]interface{}{
			"a": map[string]interface{}{"b": 1},
		}
		src := map[string]interface{}{
			"a": map[string]interface{}{"c": 2},
			"d": 3,
		}
		result := Merge(obj, src)
		inner := result["a"].(map[string]interface{})
		if inner["b"] != 1 || inner["c"] != 2 || result["d"] != 3 {
			t.Errorf("unexpected merge result: %v", result)
		}
	})

	t.Run("nil object", func(t *testing.T) {
		result := Merge(nil, map[string]interface{}{"a": 1})
		if result["a"] != 1 {
			t.Errorf("expected {a:1}, got %v", result)
		}
	})

	t.Run("nil source skipped", func(t *testing.T) {
		obj := map[string]interface{}{"a": 1}
		result := Merge(obj, nil)
		if result["a"] != 1 {
			t.Errorf("expected {a:1}, got %v", result)
		}
	})

	t.Run("nil in source does not overwrite", func(t *testing.T) {
		obj := map[string]interface{}{"a": 1}
		result := Merge(obj, map[string]interface{}{"a": nil})
		if result["a"] != 1 {
			t.Errorf("expected a:1, got %v", result)
		}
	})
}

func TestMergeWith(t *testing.T) {
	t.Run("customizer merges", func(t *testing.T) {
		customizer := func(old, new interface{}) interface{} {
			if old == nil {
				return new
			}
			return old
		}
		obj := map[string]interface{}{"a": 1}
		result := MergeWith(obj, customizer, map[string]interface{}{"a": 99, "b": 2})
		if result["a"] != 1 || result["b"] != 2 {
			t.Errorf("expected a:1 b:2, got %v", result)
		}
	})

	t.Run("nil customizer falls through", func(t *testing.T) {
		obj := map[string]interface{}{"a": 1}
		result := MergeWith(obj, nil, map[string]interface{}{"b": 2})
		if result["a"] != 1 || result["b"] != 2 {
			t.Errorf("expected {a:1 b:2}, got %v", result)
		}
	})

	t.Run("nil object", func(t *testing.T) {
		result := MergeWith(nil, nil, map[string]interface{}{"a": 1})
		if result["a"] != 1 {
			t.Errorf("expected {a:1}, got %v", result)
		}
	})
}

func TestOmit(t *testing.T) {
	obj := map[string]interface{}{"a": 1, "b": 2, "c": 3}
	result := Omit(obj, "a", "c")
	if len(result) != 1 || result["b"] != 2 {
		t.Errorf("expected {b:2}, got %v", result)
	}
}

func TestOmitBy(t *testing.T) {
	obj := map[string]interface{}{"a": 1, "b": 2, "c": 3}
	pred := func(k string, v interface{}) bool {
		return v.(int) > 1
	}
	result := OmitBy(obj, pred)
	if len(result) != 1 || result["a"] != 1 {
		t.Errorf("expected {a:1}, got %v", result)
	}
}

func TestPick(t *testing.T) {
	obj := map[string]interface{}{"a": 1, "b": 2, "c": 3}
	result := Pick(obj, "a", "c")
	if result["a"] != 1 || result["c"] != 3 {
		t.Errorf("expected {a:1 c:3}, got %v", result)
	}
	if _, ok := result["b"]; ok {
		t.Errorf("expected b omitted")
	}
}

func TestPickBy(t *testing.T) {
	obj := map[string]interface{}{"a": 1, "b": 2, "c": 3}
	pred := func(k string, v interface{}) bool {
		return v.(int) > 1
	}
	result := PickBy(obj, pred)
	if result["b"] != 2 || result["c"] != 3 {
		t.Errorf("expected {b:2 c:3}, got %v", result)
	}
	if _, ok := result["a"]; ok {
		t.Errorf("expected a omitted")
	}
}

func TestResult(t *testing.T) {
	t.Run("gets value from path", func(t *testing.T) {
		obj := map[string]interface{}{"a": 1}
		if got := Result(obj, "a", 99); got != 1 {
			t.Errorf("expected 1, got %v", got)
		}
	})

	t.Run("nil value returns default", func(t *testing.T) {
		obj := map[string]interface{}{"a": nil}
		if got := Result(obj, "a", 99); got != 99 {
			t.Errorf("expected 99, got %v", got)
		}
	})

	t.Run("missing key returns default", func(t *testing.T) {
		obj := map[string]interface{}{}
		if got := Result(obj, "missing", 99); got != 99 {
			t.Errorf("expected 99, got %v", got)
		}
	})

	t.Run("default is a function", func(t *testing.T) {
		obj := map[string]interface{}{}
		fn := func() interface{} {
			return "from-fn"
		}
		if got := Result(obj, "missing", fn); got != "from-fn" {
			t.Errorf("expected 'from-fn', got %v", got)
		}
	})
}

func TestSet(t *testing.T) {
	t.Run("sets nested path", func(t *testing.T) {
		obj := map[string]interface{}{}
		result := Set(obj, "a.b.c", 42)
		inner := result["a"].(map[string]interface{})["b"].(map[string]interface{})
		if inner["c"] != 42 {
			t.Errorf("expected 42, got %v", inner["c"])
		}
	})

	t.Run("overwrites existing value", func(t *testing.T) {
		obj := map[string]interface{}{"a": 1}
		result := Set(obj, "a", 2)
		if result["a"] != 2 {
			t.Errorf("expected 2, got %v", result["a"])
		}
	})

	t.Run("nil object", func(t *testing.T) {
		result := Set(nil, "a", 1)
		if result["a"] != 1 {
			t.Errorf("expected {a:1}, got %v", result)
		}
	})

	t.Run("non-map intermediate creates map", func(t *testing.T) {
		obj := map[string]interface{}{"a": 42}
		result := Set(obj, "a.b", 1)
		inner := result["a"].(map[string]interface{})
		if inner["b"] != 1 {
			t.Errorf("expected b:1, got %v", inner)
		}
	})
}

func TestSetWith(t *testing.T) {
	t.Run("customizer creates path objects", func(t *testing.T) {
		customizer := func(key string, val interface{}) interface{} {
			return map[string]interface{}{}
		}
		obj := map[string]interface{}{}
		result := SetWith(obj, "a.b", 42, customizer)
		inner := result["a"].(map[string]interface{})
		if inner["b"] != 42 {
			t.Errorf("expected 42, got %v", inner["b"])
		}
	})

	t.Run("nil customizer creates default map", func(t *testing.T) {
		obj := map[string]interface{}{}
		result := SetWith(obj, "a.b", 42, nil)
		inner := result["a"].(map[string]interface{})
		if inner["b"] != 42 {
			t.Errorf("expected 42, got %v", inner["b"])
		}
	})

	t.Run("nil object", func(t *testing.T) {
		result := SetWith(nil, "a", 1, nil)
		if result["a"] != 1 {
			t.Errorf("expected {a:1}, got %v", result)
		}
	})

	t.Run("non-map intermediate creates map", func(t *testing.T) {
		obj := map[string]interface{}{"a": 42}
		result := SetWith(obj, "a.b", 1, nil)
		inner := result["a"].(map[string]interface{})
		if inner["b"] != 1 {
			t.Errorf("expected b:1, got %v", inner)
		}
	})
}

func TestToPairs(t *testing.T) {
	obj := map[string]interface{}{"b": 2, "a": 1}
	result := ToPairs(obj)
	if len(result) != 2 {
		t.Errorf("expected 2 pairs, got %v", result)
	}
}

func TestToPairsIn(t *testing.T) {
	obj := map[string]interface{}{"a": 1}
	result := ToPairsIn(obj)
	if len(result) != 1 {
		t.Errorf("expected 1 pair, got %v", result)
	}
}

func TestTransform(t *testing.T) {
	obj := map[string]interface{}{"a": 1, "b": 2}
	var acc []interface{}
	Transform(obj, func(accumulator, v interface{}) {
		acc = append(acc, v.(int)*2)
	}, nil)
	if len(acc) != 2 {
		t.Errorf("expected 2 values, got %v", acc)
	}
}

func TestUnset(t *testing.T) {
	t.Run("removes nested property", func(t *testing.T) {
		obj := map[string]interface{}{
			"a": map[string]interface{}{"b": 1, "c": 2},
		}
		if !Unset(obj, "a.b") {
			t.Errorf("expected true")
		}
		inner := obj["a"].(map[string]interface{})
		if _, ok := inner["b"]; ok {
			t.Errorf("expected b removed")
		}
		if inner["c"] != 2 {
			t.Errorf("expected c:2, got %v", inner["c"])
		}
	})

	t.Run("missing path returns false", func(t *testing.T) {
		obj := map[string]interface{}{"a": 1}
		if Unset(obj, "b") {
			t.Errorf("expected false")
		}
	})

	t.Run("nested missing returns false", func(t *testing.T) {
		obj := map[string]interface{}{"a": 1}
		if Unset(obj, "a.b") {
			t.Errorf("expected false")
		}
	})
}

func TestUpdate(t *testing.T) {
	t.Run("updates nested value", func(t *testing.T) {
		obj := map[string]interface{}{
			"a": map[string]interface{}{"b": 1},
		}
		updater := func(v interface{}) interface{} {
			return v.(int) + 1
		}
		result := Update(obj, "a.b", updater)
		inner := result["a"].(map[string]interface{})
		if inner["b"] != 2 {
			t.Errorf("expected 2, got %v", inner["b"])
		}
	})

	t.Run("creates intermediate maps", func(t *testing.T) {
		obj := map[string]interface{}{}
		updater := func(v interface{}) interface{} {
			return 42
		}
		result := Update(obj, "a.b", updater)
		inner := result["a"].(map[string]interface{})
		if inner["b"] != 42 {
			t.Errorf("expected 42, got %v", inner["b"])
		}
	})

	t.Run("nil object", func(t *testing.T) {
		updater := func(v interface{}) interface{} {
			return 1
		}
		result := Update(nil, "a", updater)
		if result["a"] != 1 {
			t.Errorf("expected {a:1}, got %v", result)
		}
	})
}

func TestUpdateWith(t *testing.T) {
	t.Run("customizer creates path objects", func(t *testing.T) {
		customizer := func(key string, val interface{}) interface{} {
			return map[string]interface{}{}
		}
		obj := map[string]interface{}{}
		updater := func(v interface{}) interface{} {
			return 42
		}
		result := UpdateWith(obj, "a.b", updater, customizer)
		inner := result["a"].(map[string]interface{})
		if inner["b"] != 42 {
			t.Errorf("expected 42, got %v", inner["b"])
		}
	})

	t.Run("nil customizer creates default maps", func(t *testing.T) {
		obj := map[string]interface{}{}
		updater := func(v interface{}) interface{} {
			return 42
		}
		result := UpdateWith(obj, "a.b", updater, nil)
		inner := result["a"].(map[string]interface{})
		if inner["b"] != 42 {
			t.Errorf("expected 42, got %v", inner["b"])
		}
	})

	t.Run("nil object", func(t *testing.T) {
		updater := func(v interface{}) interface{} {
			return 1
		}
		result := UpdateWith(nil, "a", updater, nil)
		if result["a"] != 1 {
			t.Errorf("expected {a:1}, got %v", result)
		}
	})
}

func TestValues(t *testing.T) {
	obj := map[string]interface{}{"b": 2, "a": 1}
	result := Values(obj)
	if result[0] != 1 || result[1] != 2 {
		t.Errorf("expected [1 2], got %v", result)
	}
}

func TestValuesIn(t *testing.T) {
	obj := map[string]interface{}{"a": 1}
	result := ValuesIn(obj)
	if len(result) != 1 {
		t.Errorf("expected 1, got %v", result)
	}
}
