package collection

import (
	"testing"
)

func TestCountBy(t *testing.T) {
	t.Run("counts by iteratee", func(t *testing.T) {
		input := []interface{}{1, 2, 3, 4, 5}
		iteratee := func(v interface{}) interface{} {
			return v.(int) % 2
		}
		result := CountBy(input, iteratee)
		if result[0] != 2 || result[1] != 3 {
			t.Errorf("expected map[0:2 1:3], got %v", result)
		}
	})

	t.Run("empty collection", func(t *testing.T) {
		result := CountBy([]interface{}{}, func(v interface{}) interface{} {
			return v
		})
		if len(result) != 0 {
			t.Errorf("expected empty map, got %v", result)
		}
	})
}

func TestEvery(t *testing.T) {
	t.Run("all match", func(t *testing.T) {
		input := []interface{}{2, 4, 6}
		pred := func(v interface{}) bool {
			return v.(int)%2 == 0
		}
		if !Every(input, pred) {
			t.Errorf("expected true")
		}
	})

	t.Run("some dont match", func(t *testing.T) {
		input := []interface{}{2, 3, 4}
		pred := func(v interface{}) bool {
			return v.(int)%2 == 0
		}
		if Every(input, pred) {
			t.Errorf("expected false")
		}
	})

	t.Run("empty collection", func(t *testing.T) {
		if !Every([]interface{}{}, func(v interface{}) bool { return false }) {
			t.Errorf("expected true for empty")
		}
	})
}

func TestFilter(t *testing.T) {
	t.Run("filters matching elements", func(t *testing.T) {
		input := []interface{}{1, 2, 3, 4, 5}
		pred := func(v interface{}) bool {
			return v.(int)%2 == 0
		}
		result := Filter(input, pred)
		if len(result) != 2 || result[0] != 2 || result[1] != 4 {
			t.Errorf("expected [2 4], got %v", result)
		}
	})

	t.Run("no matches", func(t *testing.T) {
		result := Filter([]interface{}{1, 3, 5}, func(v interface{}) bool {
			return v.(int)%2 == 0
		})
		if len(result) != 0 {
			t.Errorf("expected empty, got %v", result)
		}
	})

	t.Run("empty collection", func(t *testing.T) {
		result := Filter([]interface{}{}, func(v interface{}) bool { return true })
		if len(result) != 0 {
			t.Errorf("expected empty, got %v", result)
		}
	})
}

func TestFind(t *testing.T) {
	t.Run("finds first match", func(t *testing.T) {
		input := []interface{}{1, 2, 3, 4}
		pred := func(v interface{}) bool {
			return v.(int) > 2
		}
		if got := Find(input, pred); got != 3 {
			t.Errorf("expected 3, got %v", got)
		}
	})

	t.Run("no match", func(t *testing.T) {
		if got := Find([]interface{}{1, 2}, func(v interface{}) bool { return v.(int) > 5 }); got != nil {
			t.Errorf("expected nil, got %v", got)
		}
	})
}

func TestFindLast(t *testing.T) {
	t.Run("finds last match", func(t *testing.T) {
		input := []interface{}{1, 2, 3, 4, 5}
		pred := func(v interface{}) bool {
			return v.(int)%2 == 0
		}
		if got := FindLast(input, pred); got != 4 {
			t.Errorf("expected 4, got %v", got)
		}
	})

	t.Run("no match", func(t *testing.T) {
		if got := FindLast([]interface{}{1, 3}, func(v interface{}) bool { return v.(int)%2 == 0 }); got != nil {
			t.Errorf("expected nil, got %v", got)
		}
	})
}

func TestFlatMap(t *testing.T) {
	t.Run("flattens mapped results", func(t *testing.T) {
		input := []interface{}{1, 2, 3}
		iteratee := func(v interface{}) []interface{} {
			return []interface{}{v, v}
		}
		result := FlatMap(input, iteratee)
		if len(result) != 6 {
			t.Errorf("expected 6 elements, got %d", len(result))
		}
	})
}

func TestFlatMapDeep(t *testing.T) {
	t.Run("flattens deeply", func(t *testing.T) {
		input := []interface{}{1}
		iteratee := func(v interface{}) []interface{} {
			return []interface{}{[]interface{}{v, v}}
		}
		result := FlatMapDeep(input, iteratee)
		if len(result) != 2 {
			t.Errorf("expected 2 elements, got %d", len(result))
		}
	})
}

func TestFlatMapDepth(t *testing.T) {
	t.Run("flattens to depth", func(t *testing.T) {
		input := []interface{}{1}
		iteratee := func(v interface{}) []interface{} {
			return []interface{}{[]interface{}{v, v}}
		}
		result := FlatMapDepth(input, iteratee, 1)
		if len(result) != 2 {
			t.Errorf("expected 2 elements, got %d", len(result))
		}
	})

	t.Run("depth 0 no flatten", func(t *testing.T) {
		input := []interface{}{1}
		iteratee := func(v interface{}) []interface{} {
			return []interface{}{[]interface{}{v, v}}
		}
		result := FlatMapDepth(input, iteratee, 0)
		if len(result) != 1 {
			t.Errorf("expected 1 element, got %d", len(result))
		}
	})
}

func TestForEach(t *testing.T) {
	t.Run("iterates over all elements", func(t *testing.T) {
		var sum int
		ForEach([]interface{}{1, 2, 3}, func(v interface{}) {
			sum += v.(int)
		})
		if sum != 6 {
			t.Errorf("expected 6, got %d", sum)
		}
	})
}

func TestForEachRight(t *testing.T) {
	t.Run("iterates in reverse", func(t *testing.T) {
		var result []int
		ForEachRight([]interface{}{1, 2, 3}, func(v interface{}) {
			result = append(result, v.(int))
		})
		if len(result) != 3 || result[0] != 3 || result[1] != 2 || result[2] != 1 {
			t.Errorf("expected [3 2 1], got %v", result)
		}
	})
}

func TestGroupBy(t *testing.T) {
	t.Run("groups by iteratee", func(t *testing.T) {
		input := []interface{}{1, 2, 3, 4, 5, 6}
		iteratee := func(v interface{}) interface{} {
			return v.(int) % 2
		}
		result := GroupBy(input, iteratee)
		if len(result[0]) != 3 || len(result[1]) != 3 {
			t.Errorf("expected 3 evens and 3 odds, got %v", result)
		}
	})
}

func TestIncludes(t *testing.T) {
	t.Run("finds value", func(t *testing.T) {
		input := []interface{}{1, 2, 3, 4, 5}
		if !Includes(input, 3, 0) {
			t.Errorf("expected true")
		}
	})

	t.Run("not found", func(t *testing.T) {
		if Includes([]interface{}{1, 2, 3}, 5, 0) {
			t.Errorf("expected false")
		}
	})

	t.Run("fromIndex at exact position", func(t *testing.T) {
		if !Includes([]interface{}{1, 2, 3, 2}, 2, 3) {
			t.Errorf("expected true (2 is at index 3)")
		}
	})

	t.Run("fromIndex beyond array", func(t *testing.T) {
		if Includes([]interface{}{1, 2, 3}, 3, 3) {
			t.Errorf("expected false (fromIndex beyond array)")
		}
	})

	t.Run("negative fromIndex", func(t *testing.T) {
		if !Includes([]interface{}{1, 2, 3}, 3, -1) {
			t.Errorf("expected true")
		}
	})

	t.Run("negative fromIndex beyond start", func(t *testing.T) {
		if !Includes([]interface{}{1, 2, 3}, 1, -10) {
			t.Errorf("expected true")
		}
	})
}

func TestInvokeMap(t *testing.T) {
	t.Run("invokes functions", func(t *testing.T) {
		fn1 := func(args ...interface{}) interface{} {
			return "a"
		}
		fn2 := func(args ...interface{}) interface{} {
			return "b"
		}
		input := []interface{}{fn1, fn2}
		result := InvokeMap(input, "")
		if result[0] != "a" || result[1] != "b" {
			t.Errorf("expected [a b], got %v", result)
		}
	})

	t.Run("non-fn values get nil", func(t *testing.T) {
		result := InvokeMap([]interface{}{42, "hello"}, "")
		if result[0] != nil || result[1] != nil {
			t.Errorf("expected [nil nil], got %v", result)
		}
	})
}

func TestKeyBy(t *testing.T) {
	t.Run("keys by iteratee", func(t *testing.T) {
		input := []interface{}{"a", "bb", "ccc"}
		iteratee := func(v interface{}) interface{} {
			return len(v.(string))
		}
		result := KeyBy(input, iteratee)
		if result[1] != "a" || result[2] != "bb" || result[3] != "ccc" {
			t.Errorf("unexpected keyBy result: %v", result)
		}
	})
}

func TestMap(t *testing.T) {
	t.Run("transforms elements", func(t *testing.T) {
		input := []interface{}{1, 2, 3}
		iteratee := func(v interface{}) interface{} {
			return v.(int) * 2
		}
		result := Map(input, iteratee)
		if result[0] != 2 || result[1] != 4 || result[2] != 6 {
			t.Errorf("expected [2 4 6], got %v", result)
		}
	})
}

func TestOrderBy(t *testing.T) {
	t.Run("sorts ascending", func(t *testing.T) {
		input := []interface{}{3, 1, 2}
		result := OrderBy(input, []func(interface{}) interface{}{
			func(v interface{}) interface{} {
				return v.(int)
			},
		}, []string{"asc"})
		if result[0] != 1 || result[1] != 2 || result[2] != 3 {
			t.Errorf("expected [1 2 3], got %v", result)
		}
	})

	t.Run("sorts descending", func(t *testing.T) {
		input := []interface{}{1, 3, 2}
		result := OrderBy(input, []func(interface{}) interface{}{
			func(v interface{}) interface{} {
				return v.(int)
			},
		}, []string{"desc"})
		if result[0] != 3 || result[1] != 2 || result[2] != 1 {
			t.Errorf("expected [3 2 1], got %v", result)
		}
	})

	t.Run("empty collection", func(t *testing.T) {
		result := OrderBy([]interface{}{}, nil, nil)
		if len(result) != 0 {
			t.Errorf("expected empty, got %v", result)
		}
	})
}

func TestPartition(t *testing.T) {
	t.Run("splits by predicate", func(t *testing.T) {
		input := []interface{}{1, 2, 3, 4, 5, 6}
		pred := func(v interface{}) bool {
			return v.(int)%2 == 0
		}
		result := Partition(input, pred)
		if len(result[0]) != 3 || len(result[1]) != 3 {
			t.Errorf("expected [3 3], got [%d %d]", len(result[0]), len(result[1]))
		}
	})
}

func TestReduce(t *testing.T) {
	t.Run("accumulates left to right", func(t *testing.T) {
		input := []interface{}{1, 2, 3, 4}
		iteratee := func(acc, v interface{}) interface{} {
			return acc.(int) + v.(int)
		}
		if got := Reduce(input, iteratee, 0); got != 10 {
			t.Errorf("expected 10, got %v", got)
		}
	})
}

func TestReduceRight(t *testing.T) {
	t.Run("accumulates right to left", func(t *testing.T) {
		input := []interface{}{1, 2, 3, 4}
		iteratee := func(acc, v interface{}) interface{} {
			return acc.(int) + v.(int)
		}
		if got := ReduceRight(input, iteratee, 0); got != 10 {
			t.Errorf("expected 10, got %v", got)
		}
	})
}

func TestReject(t *testing.T) {
	t.Run("rejects matching elements", func(t *testing.T) {
		input := []interface{}{1, 2, 3, 4, 5}
		pred := func(v interface{}) bool {
			return v.(int)%2 == 0
		}
		result := Reject(input, pred)
		if len(result) != 3 || result[0] != 1 || result[1] != 3 || result[2] != 5 {
			t.Errorf("expected [1 3 5], got %v", result)
		}
	})
}

func TestSample(t *testing.T) {
	t.Run("returns element from collection", func(t *testing.T) {
		input := []interface{}{42}
		if got := Sample(input); got != 42 {
			t.Errorf("expected 42, got %v", got)
		}
	})

	t.Run("empty returns nil", func(t *testing.T) {
		if got := Sample([]interface{}{}); got != nil {
			t.Errorf("expected nil, got %v", got)
		}
	})

	t.Run("returns valid element", func(t *testing.T) {
		input := []interface{}{1, 2, 3, 4, 5}
		got := Sample(input)
		found := false
		for _, v := range input {
			if v == got {
				found = true
				break
			}
		}
		if !found {
			t.Errorf("sample %v not in collection", got)
		}
	})
}

func TestSampleSize(t *testing.T) {
	t.Run("returns n elements", func(t *testing.T) {
		input := []interface{}{1, 2, 3, 4, 5}
		result := SampleSize(input, 3)
		if len(result) != 3 {
			t.Errorf("expected 3 elements, got %d", len(result))
		}
	})

	t.Run("n > len returns all", func(t *testing.T) {
		input := []interface{}{1, 2}
		result := SampleSize(input, 5)
		if len(result) != 2 {
			t.Errorf("expected 2 elements, got %d", len(result))
		}
	})

	t.Run("n <= 0 returns empty", func(t *testing.T) {
		result := SampleSize([]interface{}{1, 2}, 0)
		if len(result) != 0 {
			t.Errorf("expected empty, got %v", result)
		}
	})

	t.Run("empty collection returns empty", func(t *testing.T) {
		result := SampleSize([]interface{}{}, 3)
		if len(result) != 0 {
			t.Errorf("expected empty, got %v", result)
		}
	})
}

func TestShuffle(t *testing.T) {
	t.Run("returns same length", func(t *testing.T) {
		input := []interface{}{1, 2, 3, 4, 5}
		result := Shuffle(input)
		if len(result) != 5 {
			t.Errorf("expected 5 elements, got %d", len(result))
		}
	})

	t.Run("contains all elements", func(t *testing.T) {
		input := []interface{}{1, 2, 3, 4, 5}
		result := Shuffle(input)
		m := make(map[interface{}]int)
		for _, v := range result {
			m[v]++
		}
		for _, v := range input {
			if m[v] != 1 {
				t.Errorf("element %v missing or duplicated", v)
			}
		}
	})
}

func TestSize(t *testing.T) {
	if Size([]interface{}{1, 2, 3}) != 3 {
		t.Errorf("expected 3")
	}
	if Size([]interface{}{}) != 0 {
		t.Errorf("expected 0")
	}
}

func TestSome(t *testing.T) {
	t.Run("some match", func(t *testing.T) {
		input := []interface{}{1, 2, 3}
		pred := func(v interface{}) bool {
			return v.(int)%2 == 0
		}
		if !Some(input, pred) {
			t.Errorf("expected true")
		}
	})

	t.Run("none match", func(t *testing.T) {
		if Some([]interface{}{1, 3, 5}, func(v interface{}) bool {
			return v.(int)%2 == 0
		}) {
			t.Errorf("expected false")
		}
	})

	t.Run("empty collection", func(t *testing.T) {
		if Some([]interface{}{}, func(v interface{}) bool { return true }) {
			t.Errorf("expected false")
		}
	})
}

func TestSortBy(t *testing.T) {
	t.Run("sorts ascending", func(t *testing.T) {
		input := []interface{}{3, 1, 2}
		result := SortBy(input, []func(interface{}) interface{}{
			func(v interface{}) interface{} {
				return v.(int)
			},
		})
		if result[0] != 1 || result[1] != 2 || result[2] != 3 {
			t.Errorf("expected [1 2 3], got %v", result)
		}
	})
}
