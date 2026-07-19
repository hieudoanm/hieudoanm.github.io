package array

import (
	"testing"
)

func TestIndexOf(t *testing.T) {
	t.Run("finds value", func(t *testing.T) {
		if got := IndexOf([]float64{1, 2, 3, 2}, 2, 0); got != 1 {
			t.Errorf("expected 1, got %d", got)
		}
	})

	t.Run("fromIndex", func(t *testing.T) {
		if got := IndexOf([]float64{1, 2, 3, 2}, 2, 2); got != 3 {
			t.Errorf("expected 3, got %d", got)
		}
	})

	t.Run("not found", func(t *testing.T) {
		if got := IndexOf([]float64{1, 2, 3}, 5, 0); got != -1 {
			t.Errorf("expected -1, got %d", got)
		}
	})
}

func TestLastIndexOf(t *testing.T) {
	t.Run("finds last value", func(t *testing.T) {
		if got := LastIndexOf([]float64{1, 2, 3, 2}, 2, 0); got != 3 {
			t.Errorf("expected 3, got %d", got)
		}
	})

	t.Run("fromIndex limits", func(t *testing.T) {
		if got := LastIndexOf([]float64{1, 2, 3, 2}, 2, 2); got != 1 {
			t.Errorf("expected 1, got %d", got)
		}
	})

	t.Run("not found", func(t *testing.T) {
		if got := LastIndexOf([]float64{1, 2, 3}, 5, 0); got != -1 {
			t.Errorf("expected -1, got %d", got)
		}
	})
}

func TestChunk(t *testing.T) {
	t.Run("even chunks", func(t *testing.T) {
		input := []interface{}{1, 2, 3, 4}
		result := Chunk(input, 2)
		if len(result) != 2 || len(result[0]) != 2 || len(result[1]) != 2 {
			t.Errorf("expected 2 chunks of 2, got %v", result)
		}
	})

	t.Run("uneven last chunk", func(t *testing.T) {
		input := []interface{}{1, 2, 3, 4, 5}
		result := Chunk(input, 2)
		if len(result) != 3 || len(result[2]) != 1 {
			t.Errorf("expected 3 chunks with last size 1, got %v", result)
		}
	})

	t.Run("size < 1 returns empty", func(t *testing.T) {
		result := Chunk([]interface{}{1, 2, 3}, 0)
		if len(result) != 0 {
			t.Errorf("expected empty, got %v", result)
		}
	})

	t.Run("empty array", func(t *testing.T) {
		result := Chunk([]interface{}{}, 2)
		if len(result) != 0 {
			t.Errorf("expected empty, got %v", result)
		}
	})
}

func TestCompact(t *testing.T) {
	t.Run("removes falsey values", func(t *testing.T) {
		input := []interface{}{0, 1, false, 2, "", 3, nil}
		result := Compact(input)
		if len(result) != 3 || result[0] != 1 || result[1] != 2 || result[2] != 3 {
			t.Errorf("expected [1 2 3], got %v", result)
		}
	})

	t.Run("all truthy", func(t *testing.T) {
		input := []interface{}{1, "a", true}
		result := Compact(input)
		if len(result) != 3 {
			t.Errorf("expected 3 elements, got %v", result)
		}
	})

	t.Run("all falsey", func(t *testing.T) {
		result := Compact([]interface{}{0, false, nil, ""})
		if len(result) != 0 {
			t.Errorf("expected empty, got %v", result)
		}
	})
}

func TestConcat(t *testing.T) {
	t.Run("concatenates arrays", func(t *testing.T) {
		result := Concat([]interface{}{1, 2}, []interface{}{3, 4}, []interface{}{5})
		if len(result) != 5 || result[0] != 1 || result[4] != 5 {
			t.Errorf("expected [1 2 3 4 5], got %v", result)
		}
	})

	t.Run("no extra arrays", func(t *testing.T) {
		result := Concat([]interface{}{1, 2})
		if len(result) != 2 {
			t.Errorf("expected [1 2], got %v", result)
		}
	})
}

func TestDifference(t *testing.T) {
	result := Difference([]interface{}{1, 2, 3, 4}, []interface{}{2, 4})
	if len(result) != 2 || result[0] != 1 || result[1] != 3 {
		t.Errorf("expected [1 3], got %v", result)
	}

	result2 := Difference([]interface{}{1, 2}, []interface{}{})
	if len(result2) != 2 {
		t.Errorf("expected [1 2], got %v", result2)
	}
}

func TestDifferenceBy(t *testing.T) {
	iteratee := func(v interface{}) interface{} {
		return v.(int)
	}
	result := DifferenceBy([]interface{}{1, 2, 3}, []interface{}{2, 4}, iteratee)
	if len(result) != 2 || result[0] != 1 || result[1] != 3 {
		t.Errorf("expected [1 3], got %v", result)
	}
}

func TestDifferenceWith(t *testing.T) {
	comparator := func(a, b interface{}) bool {
		return a.(int) == b.(int)
	}
	result := DifferenceWith([]interface{}{1, 2, 3}, []interface{}{2, 4}, comparator)
	if len(result) != 2 || result[0] != 1 || result[1] != 3 {
		t.Errorf("expected [1 3], got %v", result)
	}
}

func TestDrop(t *testing.T) {
	t.Run("drops n from start", func(t *testing.T) {
		result := Drop([]interface{}{1, 2, 3, 4}, 2)
		if len(result) != 2 || result[0] != 3 || result[1] != 4 {
			t.Errorf("expected [3 4], got %v", result)
		}
	})

	t.Run("n > len returns empty", func(t *testing.T) {
		result := Drop([]interface{}{1, 2}, 5)
		if len(result) != 0 {
			t.Errorf("expected empty, got %v", result)
		}
	})

	t.Run("negative n", func(t *testing.T) {
		result := Drop([]interface{}{1, 2, 3}, -1)
		if len(result) != 3 {
			t.Errorf("expected [1 2 3], got %v", result)
		}
	})

	t.Run("n=0", func(t *testing.T) {
		result := Drop([]interface{}{1, 2, 3}, 0)
		if len(result) != 3 {
			t.Errorf("expected [1 2 3], got %v", result)
		}
	})
}

func TestDropRight(t *testing.T) {
	result := DropRight([]interface{}{1, 2, 3, 4}, 2)
	if len(result) != 2 || result[0] != 1 || result[1] != 2 {
		t.Errorf("expected [1 2], got %v", result)
	}

	result2 := DropRight([]interface{}{1, 2}, 5)
	if len(result2) != 0 {
		t.Errorf("expected empty, got %v", result2)
	}

	result3 := DropRight([]interface{}{1, 2, 3}, -1)
	if len(result3) != 3 {
		t.Errorf("expected [1 2 3], got %v", result3)
	}
}

func TestDropRightWhile(t *testing.T) {
	pred := func(v interface{}) bool {
		return v.(int) > 2
	}
	result := DropRightWhile([]interface{}{1, 2, 3, 4, 5}, pred)
	if len(result) != 2 || result[0] != 1 || result[1] != 2 {
		t.Errorf("expected [1 2], got %v", result)
	}

	pred2 := func(v interface{}) bool {
		return false
	}
	result2 := DropRightWhile([]interface{}{1, 2, 3}, pred2)
	if len(result2) != 3 {
		t.Errorf("expected [1 2 3], got %v", result2)
	}
}

func TestDropWhile(t *testing.T) {
	pred := func(v interface{}) bool {
		return v.(int) < 3
	}
	result := DropWhile([]interface{}{1, 2, 3, 4, 5}, pred)
	if len(result) != 3 || result[0] != 3 || result[1] != 4 || result[2] != 5 {
		t.Errorf("expected [3 4 5], got %v", result)
	}

	pred2 := func(v interface{}) bool {
		return false
	}
	result2 := DropWhile([]interface{}{1, 2, 3}, pred2)
	if len(result2) != 3 {
		t.Errorf("expected [1 2 3], got %v", result2)
	}
}

func TestFill(t *testing.T) {
	t.Run("fills range", func(t *testing.T) {
		result := Fill([]interface{}{1, 2, 3, 4, 5}, "*", 1, 4)
		if result[0] != 1 || result[1] != "*" || result[2] != "*" || result[3] != "*" || result[4] != 5 {
			t.Errorf("expected [1 * * * 5], got %v", result)
		}
	})

	t.Run("negative start", func(t *testing.T) {
		result := Fill([]interface{}{1, 2, 3}, "*", -1, 2)
		if result[0] != "*" || result[1] != "*" || result[2] != 3 {
			t.Errorf("expected [* * 3], got %v", result)
		}
	})

	t.Run("end > length", func(t *testing.T) {
		result := Fill([]interface{}{1, 2, 3}, "*", 1, 10)
		if result[0] != 1 || result[1] != "*" || result[2] != "*" {
			t.Errorf("expected [1 * *], got %v", result)
		}
	})
}

func TestFindIndex(t *testing.T) {
	pred := func(v interface{}) bool {
		return v.(int) > 2
	}
	if got := FindIndex([]interface{}{1, 2, 3, 4}, pred, 0); got != 2 {
		t.Errorf("expected 2, got %d", got)
	}

	if got := FindIndex([]interface{}{1, 2, 3, 4}, pred, 3); got != 3 {
		t.Errorf("expected 3, got %d", got)
	}

	if got := FindIndex([]interface{}{1, 2, 3}, func(v interface{}) bool {
		return v.(int) > 10
	}, 0); got != -1 {
		t.Errorf("expected -1, got %d", got)
	}
}

func TestFindLastIndex(t *testing.T) {
	pred := func(v interface{}) bool {
		return v.(int) > 2
	}
	if got := FindLastIndex([]interface{}{1, 2, 3, 4, 3}, pred, 4); got != 4 {
		t.Errorf("expected 4, got %d", got)
	}

	if got := FindLastIndex([]interface{}{1, 2, 3, 4}, pred, 2); got != 2 {
		t.Errorf("expected 2, got %d", got)
	}

	if got := FindLastIndex([]interface{}{1, 2, 3}, func(v interface{}) bool {
		return v.(int) > 10
	}, 2); got != -1 {
		t.Errorf("expected -1, got %d", got)
	}
}

func TestFlatten(t *testing.T) {
	result := Flatten([]interface{}{1, []interface{}{2, 3}, 4})
	if len(result) != 4 || result[0] != 1 || result[1] != 2 || result[2] != 3 || result[3] != 4 {
		t.Errorf("expected [1 2 3 4], got %v", result)
	}

	result2 := Flatten([]interface{}{1, 2, 3})
	if len(result2) != 3 {
		t.Errorf("expected [1 2 3], got %v", result2)
	}

	result3 := Flatten([]interface{}{})
	if len(result3) != 0 {
		t.Errorf("expected empty, got %v", result3)
	}
}

func TestFlattenDeep(t *testing.T) {
	result := FlattenDeep([]interface{}{1, []interface{}{2, []interface{}{3, []interface{}{4}}}})
	if len(result) != 4 || result[0] != 1 || result[1] != 2 || result[2] != 3 || result[3] != 4 {
		t.Errorf("expected [1 2 3 4], got %v", result)
	}

	result2 := FlattenDeep([]interface{}{})
	if len(result2) != 0 {
		t.Errorf("expected empty, got %v", result2)
	}
}

func TestFlattenDepth(t *testing.T) {
	t.Run("depth 1", func(t *testing.T) {
		result := FlattenDepth([]interface{}{1, []interface{}{2, []interface{}{3}}}, 1)
		if len(result) != 3 {
			t.Errorf("expected 3, got %v", result)
		}
	})

	t.Run("depth 2", func(t *testing.T) {
		result := FlattenDepth([]interface{}{1, []interface{}{2, []interface{}{3}}}, 2)
		if len(result) != 3 {
			t.Errorf("expected 3 elements, got %v", result)
		}
	})

	t.Run("depth < 1 returns copy", func(t *testing.T) {
		result := FlattenDepth([]interface{}{1, []interface{}{2}}, 0)
		if len(result) != 2 {
			t.Errorf("expected 2, got %v", result)
		}
	})
}

func TestFromPairs(t *testing.T) {
	pairs := [][]interface{}{{"a", 1}, {"b", 2}}
	result := FromPairs(pairs)
	if result["a"] != 1 || result["b"] != 2 {
		t.Errorf("expected {a:1 b:2}, got %v", result)
	}

	pairs2 := [][]interface{}{{"a"}}
	result2 := FromPairs(pairs2)
	if len(result2) != 0 {
		t.Errorf("expected empty, got %v", result2)
	}
}

func TestHead(t *testing.T) {
	if got := Head([]interface{}{1, 2, 3}); got != 1 {
		t.Errorf("expected 1, got %v", got)
	}
	if got := Head([]interface{}{}); got != nil {
		t.Errorf("expected nil, got %v", got)
	}
}

func TestInitial(t *testing.T) {
	result := Initial([]interface{}{1, 2, 3})
	if len(result) != 2 || result[0] != 1 || result[1] != 2 {
		t.Errorf("expected [1 2], got %v", result)
	}

	result2 := Initial([]interface{}{1})
	if len(result2) != 0 {
		t.Errorf("expected empty, got %v", result2)
	}
}

func TestIntersection(t *testing.T) {
	result := Intersection([]interface{}{1, 2, 3}, []interface{}{2, 3, 4})
	if len(result) != 2 {
		t.Errorf("expected 2 elements, got %v", result)
	}

	result2 := Intersection()
	if len(result2) != 0 {
		t.Errorf("expected empty, got %v", result2)
	}
}

func TestIntersectionBy(t *testing.T) {
	iteratee := func(v interface{}) interface{} {
		return v.(int)
	}
	result := IntersectionBy(iteratee, []interface{}{1, 2}, []interface{}{2, 3})
	if len(result) == 0 {
		t.Errorf("expected non-empty result, got %v", result)
	}

	result2 := IntersectionBy(iteratee)
	if len(result2) != 0 {
		t.Errorf("expected empty, got %v", result2)
	}
}

func TestIntersectionWith(t *testing.T) {
	comparator := func(a, b interface{}) bool {
		return a.(int) == b.(int)
	}
	result := IntersectionWith(comparator, []interface{}{1, 2, 3}, []interface{}{2, 3, 4})
	if len(result) != 2 {
		t.Errorf("expected 2 elements, got %v", result)
	}

	result2 := IntersectionWith(comparator)
	if len(result2) != 0 {
		t.Errorf("expected empty, got %v", result2)
	}
}

func TestJoin(t *testing.T) {
	if got := Join([]interface{}{1, 2, 3}, ","); got != "1,2,3" {
		t.Errorf("expected '1,2,3', got %s", got)
	}

	if got := Join([]interface{}{}, ","); got != "" {
		t.Errorf("expected '', got '%s'", got)
	}

	if got := Join([]interface{}{"a"}, "-"); got != "a" {
		t.Errorf("expected 'a', got '%s'", got)
	}
}

func TestLast(t *testing.T) {
	if got := Last([]interface{}{1, 2, 3}); got != 3 {
		t.Errorf("expected 3, got %v", got)
	}
	if got := Last([]interface{}{}); got != nil {
		t.Errorf("expected nil, got %v", got)
	}
}

func TestNth(t *testing.T) {
	if got := Nth([]interface{}{1, 2, 3}, 1); got != 2 {
		t.Errorf("expected 2, got %v", got)
	}
	if got := Nth([]interface{}{1, 2, 3}, -1); got != 3 {
		t.Errorf("expected 3, got %v", got)
	}
	if got := Nth([]interface{}{}, 0); got != nil {
		t.Errorf("expected nil, got %v", got)
	}
	if got := Nth([]interface{}{1, 2}, 5); got != nil {
		t.Errorf("expected nil, got %v", got)
	}
	if got := Nth([]interface{}{1, 2}, -5); got != nil {
		t.Errorf("expected nil, got %v", got)
	}
}

func TestPull(t *testing.T) {
	result := Pull([]interface{}{1, 2, 3, 2, 4}, 2)
	if len(result) != 3 || result[0] != 1 || result[1] != 3 || result[2] != 4 {
		t.Errorf("expected [1 3 4], got %v", result)
	}

	result2 := Pull([]interface{}{1, 2, 3})
	if len(result2) != 3 {
		t.Errorf("expected [1 2 3], got %v", result2)
	}
}

func TestPullAll(t *testing.T) {
	result := PullAll([]interface{}{1, 2, 3, 2, 4}, []interface{}{2, 4})
	if len(result) != 2 || result[0] != 1 || result[1] != 3 {
		t.Errorf("expected [1 3], got %v", result)
	}
}

func TestPullAllBy(t *testing.T) {
	iteratee := func(v interface{}) interface{} {
		return v.(int)
	}
	result := PullAllBy([]interface{}{1, 2, 3, 4}, []interface{}{2, 4}, iteratee)
	if len(result) != 2 || result[0] != 1 || result[1] != 3 {
		t.Errorf("expected [1 3], got %v", result)
	}
}

func TestPullAllWith(t *testing.T) {
	comparator := func(a, b interface{}) bool {
		return a.(int) == b.(int)
	}
	result := PullAllWith([]interface{}{1, 2, 3, 4}, []interface{}{2, 4}, comparator)
	if len(result) != 2 || result[0] != 1 || result[1] != 3 {
		t.Errorf("expected [1 3], got %v", result)
	}
}

func TestPullAt(t *testing.T) {
	result := PullAt([]interface{}{1, 2, 3, 4, 5}, 1, 3)
	if len(result) != 2 || result[0] != 2 || result[1] != 4 {
		t.Errorf("expected [2 4], got %v", result)
	}

	result2 := PullAt([]interface{}{1, 2}, 5)
	if len(result2) != 0 {
		t.Errorf("expected empty, got %v", result2)
	}

	result3 := PullAt([]interface{}{1, 2, 3}, -1)
	if len(result3) != 0 {
		t.Errorf("expected empty, got %v", result3)
	}
}

func TestRemove(t *testing.T) {
	pred := func(v interface{}) bool {
		return v.(int)%2 == 0
	}
	result := Remove([]interface{}{1, 2, 3, 4, 5}, pred)
	if len(result) != 2 || result[0] != 2 || result[1] != 4 {
		t.Errorf("expected [2 4], got %v", result)
	}
}

func TestReverse(t *testing.T) {
	result := Reverse([]interface{}{1, 2, 3, 4})
	if len(result) != 4 || result[0] != 4 || result[1] != 3 || result[2] != 2 || result[3] != 1 {
		t.Errorf("expected [4 3 2 1], got %v", result)
	}

	result2 := Reverse([]interface{}{})
	if len(result2) != 0 {
		t.Errorf("expected empty, got %v", result2)
	}
}

func TestSlice(t *testing.T) {
	result := Slice([]interface{}{1, 2, 3, 4, 5}, 1, 4)
	if len(result) != 3 || result[0] != 2 || result[1] != 3 || result[2] != 4 {
		t.Errorf("expected [2 3 4], got %v", result)
	}

	result2 := Slice([]interface{}{1, 2, 3}, -2, -1)
	if len(result2) != 1 || result2[0] != 2 {
		t.Errorf("expected [2], got %v", result2)
	}

	result3 := Slice([]interface{}{1, 2, 3}, 2, 1)
	if len(result3) != 0 {
		t.Errorf("expected empty, got %v", result3)
	}

	result4 := Slice([]interface{}{1, 2, 3}, -10, 10)
	if len(result4) != 3 {
		t.Errorf("expected [1 2 3], got %v", result4)
	}
}

func TestSortedIndex(t *testing.T) {
	if got := SortedIndex([]float64{10, 20, 30, 40}, 25); got != 2 {
		t.Errorf("expected 2, got %d", got)
	}
	if got := SortedIndex([]float64{10, 20, 30}, 5); got != 0 {
		t.Errorf("expected 0, got %d", got)
	}
	if got := SortedIndex([]float64{10, 20, 30}, 50); got != 3 {
		t.Errorf("expected 3, got %d", got)
	}
}

func TestSortedIndexBy(t *testing.T) {
	iteratee := func(v interface{}) interface{} {
		return v.(int)
	}
	if got := SortedIndexBy([]interface{}{10, 20, 30}, 25, iteratee); got != 2 {
		t.Errorf("expected 2, got %d", got)
	}
}

func TestSortedIndexOf(t *testing.T) {
	if got := SortedIndexOf([]float64{10, 20, 30}, 20); got != 1 {
		t.Errorf("expected 1, got %d", got)
	}
	if got := SortedIndexOf([]float64{10, 20, 30}, 25); got != -1 {
		t.Errorf("expected -1, got %d", got)
	}
}

func TestSortedLastIndex(t *testing.T) {
	if got := SortedLastIndex([]float64{10, 20, 20, 30}, 20); got != 3 {
		t.Errorf("expected 3, got %d", got)
	}
	if got := SortedLastIndex([]float64{10, 20, 30}, 5); got != 0 {
		t.Errorf("expected 0, got %d", got)
	}
}

func TestSortedLastIndexBy(t *testing.T) {
	iteratee := func(v interface{}) interface{} {
		return v.(int)
	}
	if got := SortedLastIndexBy([]interface{}{10, 20, 20, 30}, 20, iteratee); got != 3 {
		t.Errorf("expected 3, got %d", got)
	}
}

func TestSortedLastIndexOf(t *testing.T) {
	if got := SortedLastIndexOf([]float64{10, 20, 20, 30}, 20); got != 2 {
		t.Errorf("expected 2, got %d", got)
	}
	if got := SortedLastIndexOf([]float64{10, 20, 30}, 25); got != -1 {
		t.Errorf("expected -1, got %d", got)
	}
}

func TestSortedUniq(t *testing.T) {
	result := SortedUniq([]float64{1, 1, 2, 3, 3, 4})
	if len(result) != 4 || result[0] != 1 || result[1] != 2 || result[2] != 3 || result[3] != 4 {
		t.Errorf("expected [1 2 3 4], got %v", result)
	}

	result2 := SortedUniq([]float64{})
	if len(result2) != 0 {
		t.Errorf("expected empty, got %v", result2)
	}
}

func TestSortedUniqBy(t *testing.T) {
	iteratee := func(v interface{}) interface{} {
		return v.(int)
	}
	result := SortedUniqBy([]interface{}{1, 1, 2, 3, 3}, iteratee)
	if len(result) != 3 {
		t.Errorf("expected 3 elements, got %v", result)
	}

	result2 := SortedUniqBy([]interface{}{}, iteratee)
	if len(result2) != 0 {
		t.Errorf("expected empty, got %v", result2)
	}
}

func TestTail(t *testing.T) {
	result := Tail([]interface{}{1, 2, 3})
	if len(result) != 2 || result[0] != 2 || result[1] != 3 {
		t.Errorf("expected [2 3], got %v", result)
	}

	result2 := Tail([]interface{}{1})
	if len(result2) != 0 {
		t.Errorf("expected empty, got %v", result2)
	}
}

func TestTake(t *testing.T) {
	result := Take([]interface{}{1, 2, 3, 4}, 2)
	if len(result) != 2 || result[0] != 1 || result[1] != 2 {
		t.Errorf("expected [1 2], got %v", result)
	}

	result2 := Take([]interface{}{1, 2, 3}, 0)
	if len(result2) != 0 {
		t.Errorf("expected empty, got %v", result2)
	}

	result3 := Take([]interface{}{1, 2, 3}, -1)
	if len(result3) != 0 {
		t.Errorf("expected empty, got %v", result3)
	}

	result4 := Take([]interface{}{1, 2}, 10)
	if len(result4) != 2 {
		t.Errorf("expected [1 2], got %v", result4)
	}
}

func TestTakeRight(t *testing.T) {
	result := TakeRight([]interface{}{1, 2, 3, 4}, 2)
	if len(result) != 2 || result[0] != 3 || result[1] != 4 {
		t.Errorf("expected [3 4], got %v", result)
	}

	result2 := TakeRight([]interface{}{1, 2, 3}, 0)
	if len(result2) != 0 {
		t.Errorf("expected empty, got %v", result2)
	}

	result3 := TakeRight([]interface{}{1, 2, 3}, -1)
	if len(result3) != 0 {
		t.Errorf("expected empty, got %v", result3)
	}

	result4 := TakeRight([]interface{}{1, 2}, 10)
	if len(result4) != 2 {
		t.Errorf("expected [1 2], got %v", result4)
	}
}

func TestTakeRightWhile(t *testing.T) {
	pred := func(v interface{}) bool {
		return v.(int) > 2
	}
	result := TakeRightWhile([]interface{}{1, 2, 3, 4, 5}, pred)
	if len(result) != 3 || result[0] != 3 || result[1] != 4 || result[2] != 5 {
		t.Errorf("expected [3 4 5], got %v", result)
	}

	pred2 := func(v interface{}) bool {
		return false
	}
	result2 := TakeRightWhile([]interface{}{1, 2, 3}, pred2)
	if len(result2) != 0 {
		t.Errorf("expected empty, got %v", result2)
	}
}

func TestTakeWhile(t *testing.T) {
	pred := func(v interface{}) bool {
		return v.(int) < 3
	}
	result := TakeWhile([]interface{}{1, 2, 3, 4}, pred)
	if len(result) != 2 || result[0] != 1 || result[1] != 2 {
		t.Errorf("expected [1 2], got %v", result)
	}

	pred2 := func(v interface{}) bool {
		return false
	}
	result2 := TakeWhile([]interface{}{1, 2, 3}, pred2)
	if len(result2) != 0 {
		t.Errorf("expected empty, got %v", result2)
	}
}

func TestUnion(t *testing.T) {
	result := Union([]interface{}{1, 2}, []interface{}{2, 3}, []interface{}{3, 4})
	if len(result) != 4 {
		t.Errorf("expected 4 unique elements, got %v", result)
	}
}

func TestUnionBy(t *testing.T) {
	iteratee := func(v interface{}) interface{} {
		return v.(int)
	}
	result := UnionBy(iteratee, []interface{}{1, 2}, []interface{}{2, 3}, []interface{}{3, 4})
	if len(result) != 4 {
		t.Errorf("expected 4 elements, got %v", result)
	}
}

func TestUnionWith(t *testing.T) {
	comparator := func(a, b interface{}) bool {
		return a.(int) == b.(int)
	}
	result := UnionWith(comparator, []interface{}{1, 2}, []interface{}{2, 3})
	if len(result) != 3 {
		t.Errorf("expected 3 elements, got %v", result)
	}
}

func TestUniq(t *testing.T) {
	result := Uniq([]interface{}{1, 2, 2, 3, 1, 4})
	if len(result) != 4 {
		t.Errorf("expected 4 unique elements, got %v", result)
	}
}

func TestUniqBy(t *testing.T) {
	iteratee := func(v interface{}) interface{} {
		return v.(int)
	}
	result := UniqBy([]interface{}{1, 2, 2, 3}, iteratee)
	if len(result) != 3 {
		t.Errorf("expected 3, got %v", result)
	}
}

func TestUniqWith(t *testing.T) {
	comparator := func(a, b interface{}) bool {
		return a.(int) == b.(int)
	}
	result := UniqWith([]interface{}{1, 2, 2, 3}, comparator)
	if len(result) != 3 {
		t.Errorf("expected 3, got %v", result)
	}
}

func TestUnzip(t *testing.T) {
	input := [][]interface{}{{"a", 1, true}, {"b", 2, false}}
	result := Unzip(input)
	if len(result) != 3 {
		t.Errorf("expected 3 groups, got %v", result)
	}

	result2 := Unzip([][]interface{}{})
	if len(result2) != 0 {
		t.Errorf("expected empty, got %v", result2)
	}

	input3 := [][]interface{}{{"a", 1}, {"b"}}
	result3 := Unzip(input3)
	if len(result3) != 2 {
		t.Errorf("expected 2 groups, got %v", result3)
	}
	if result3[1][1] != nil {
		t.Errorf("expected nil for missing element, got %v", result3[1][1])
	}
}

func TestUnzipWith(t *testing.T) {
	input := [][]interface{}{{1, 2}, {3, 4}}
	iteratee := func(args ...interface{}) interface{} {
		var sum int
		for _, a := range args {
			if v, ok := a.(int); ok {
				sum += v
			}
		}
		return sum
	}
	result := UnzipWith(input, iteratee)
	if len(result) != 2 || result[0] != 4 || result[1] != 6 {
		t.Errorf("expected [4 6], got %v", result)
	}
}

func TestWithout(t *testing.T) {
	result := Without([]interface{}{1, 2, 3, 2, 4}, 2)
	if len(result) != 3 || result[0] != 1 || result[1] != 3 || result[2] != 4 {
		t.Errorf("expected [1 3 4], got %v", result)
	}
}

func TestXor(t *testing.T) {
	result := Xor([]interface{}{1, 2}, []interface{}{2, 3})
	if len(result) != 2 {
		t.Errorf("expected 2 elements, got %v", result)
	}

	result2 := Xor([]interface{}{1, 1, 2}, []interface{}{2, 3})
	if len(result2) != 2 {
		t.Errorf("expected 2 elements, got %v", result2)
	}
}

func TestXorBy(t *testing.T) {
	iteratee := func(v interface{}) interface{} {
		return v.(int)
	}
	result := XorBy(iteratee, []interface{}{1, 2}, []interface{}{2, 3})
	if len(result) != 2 {
		t.Errorf("expected 2 elements, got %v", result)
	}
}

func TestXorWith(t *testing.T) {
	comparator := func(a, b interface{}) bool {
		return a.(int) == b.(int)
	}
	result := XorWith(comparator, []interface{}{1, 2}, []interface{}{2, 3})
	if len(result) != 2 {
		t.Errorf("expected 2 elements, got %v", result)
	}

	result2 := XorWith(comparator)
	if len(result2) != 0 {
		t.Errorf("expected empty, got %v", result2)
	}
}

func TestZip(t *testing.T) {
	result := Zip([]interface{}{"a", 1, true}, []interface{}{"b", 2, false})
	if len(result) != 3 {
		t.Errorf("expected 3 groups, got %v", result)
	}

	result2 := Zip()
	if len(result2) != 0 {
		t.Errorf("expected empty, got %v", result2)
	}

	result3 := Zip([]interface{}{"a", 1}, []interface{}{"b"})
	if len(result3) != 2 || result3[1][1] != nil {
		t.Errorf("expected nil padding at [1][1], got %v", result3)
	}
}

func TestZipObject(t *testing.T) {
	result := ZipObject([]interface{}{"a", "b"}, []interface{}{1, 2})
	if result["a"] != 1 || result["b"] != 2 {
		t.Errorf("expected {a:1 b:2}, got %v", result)
	}

	result2 := ZipObject([]interface{}{"a", "b"}, []interface{}{1})
	if result2["b"] != nil {
		t.Errorf("expected nil for missing value, got %v", result2["b"])
	}
}

func TestZipObjectDeep(t *testing.T) {
	result := ZipObjectDeep([]string{"a.b.c", "x"}, []interface{}{1, 2})
	inner := result["a"].(map[string]interface{})["b"].(map[string]interface{})
	if inner["c"] != 1 || result["x"] != 2 {
		t.Errorf("expected nested {a:{b:{c:1}} x:2}, got %v", result)
	}
}

func TestZipWith(t *testing.T) {
	iteratee := func(args ...interface{}) interface{} {
		var sum int
		for _, a := range args {
			if v, ok := a.(int); ok {
				sum += v
			}
		}
		return sum
	}
	result := ZipWith(iteratee, []interface{}{1, 2}, []interface{}{3, 4})
	if len(result) != 2 || result[0] != 4 || result[1] != 6 {
		t.Errorf("expected [4 6], got %v", result)
	}
}
