package function

import (
	"testing"
)

func add(args ...interface{}) interface{} {
	var sum float64
	for _, a := range args {
		if v, ok := a.(float64); ok {
			sum += v
		}
	}
	return sum
}

func sumInt(args ...interface{}) interface{} {
	var total int
	for _, a := range args {
		if v, ok := a.(int); ok {
			total += v
		}
	}
	return total
}

func isPositive(args ...interface{}) bool {
	for _, a := range args {
		if v, ok := a.(float64); ok && v <= 0 {
			return false
		}
	}
	return true
}

func TestAfter(t *testing.T) {
	t.Run("calls after n times", func(t *testing.T) {
		var count int
		fn := After(3, func(args ...interface{}) interface{} {
			count++
			return "called"
		})
		if got := fn(); got != nil {
			t.Errorf("expected nil, got %v", got)
		}
		if got := fn(); got != nil {
			t.Errorf("expected nil, got %v", got)
		}
		if got := fn(); got != "called" {
			t.Errorf("expected 'called', got %v", got)
		}
		if count != 1 {
			t.Errorf("expected count 1, got %d", count)
		}
	})

	t.Run("n=1 calls immediately", func(t *testing.T) {
		fn := After(1, func(args ...interface{}) interface{} {
			return "ok"
		})
		if got := fn(); got != "ok" {
			t.Errorf("expected 'ok', got %v", got)
		}
	})

	t.Run("n=0", func(t *testing.T) {
		fn := After(0, func(args ...interface{}) interface{} {
			return "ok"
		})
		if got := fn(); got != "ok" {
			t.Errorf("expected 'ok', got %v", got)
		}
	})
}

func TestAry(t *testing.T) {
	t.Run("limits args to n", func(t *testing.T) {
		fn := Ary(func(args ...interface{}) interface{} {
			return len(args)
		}, 2)
		if got := fn(1, 2, 3, 4); got != 2 {
			t.Errorf("expected 2, got %v", got)
		}
	})

	t.Run("n greater than args", func(t *testing.T) {
		fn := Ary(func(args ...interface{}) interface{} {
			return len(args)
		}, 5)
		if got := fn(1, 2); got != 2 {
			t.Errorf("expected 2, got %v", got)
		}
	})

	t.Run("n=0", func(t *testing.T) {
		fn := Ary(func(args ...interface{}) interface{} {
			return len(args)
		}, 0)
		if got := fn(1, 2); got != 0 {
			t.Errorf("expected 0, got %v", got)
		}
	})
}

func TestBefore(t *testing.T) {
	t.Run("stops after n-1 calls", func(t *testing.T) {
		var count int
		fn := Before(3, func(args ...interface{}) interface{} {
			count++
			return count
		})
		if got := fn(); got != 1 {
			t.Errorf("expected 1, got %v", got)
		}
		if got := fn(); got != 2 {
			t.Errorf("expected 2, got %v", got)
		}
		if got := fn(); got != 2 {
			t.Errorf("expected 2 (cached), got %v", got)
		}
		if count != 2 {
			t.Errorf("expected count 2, got %d", count)
		}
	})

	t.Run("n=1 never calls", func(t *testing.T) {
		var called bool
		fn := Before(1, func(args ...interface{}) interface{} {
			called = true
			return "x"
		})
		if got := fn(); got != nil {
			t.Errorf("expected nil, got %v", got)
		}
		if called {
			t.Errorf("expected not called")
		}
	})
}

func TestBind(t *testing.T) {
	t.Run("prepends partials", func(t *testing.T) {
		fn := Bind(func(args ...interface{}) interface{} {
			return len(args)
		}, nil, "a", "b")
		if got := fn("c"); got != 3 {
			t.Errorf("expected 3, got %v", got)
		}
	})

	t.Run("no partials", func(t *testing.T) {
		fn := Bind(func(args ...interface{}) interface{} {
			return len(args)
		}, nil)
		if got := fn("a", "b"); got != 2 {
			t.Errorf("expected 2, got %v", got)
		}
	})
}

func TestCurry(t *testing.T) {
	t.Run("curries until arity met", func(t *testing.T) {
		fn := Curry(func(args ...interface{}) interface{} {
			return add(args...)
		}, 3)
		fn1 := fn(1.0)
		fn2 := fn1.(func(...interface{}) interface{})(2.0)
		result := fn2.(func(...interface{}) interface{})(3.0)
		if got := result.(float64); got != 6 {
			t.Errorf("expected 6, got %v", got)
		}
	})

	t.Run("arity <= 0 defaults to 1", func(t *testing.T) {
		fn := Curry(func(args ...interface{}) interface{} {
			return len(args)
		}, 0)
		result := fn("a")
		if got := result.(int); got != 1 {
			t.Errorf("expected 1, got %d", got)
		}
	})

	t.Run("all args at once", func(t *testing.T) {
		fn := Curry(func(args ...interface{}) interface{} {
			return add(args...)
		}, 3)
		result := fn(1.0, 2.0, 3.0)
		if got := result.(float64); got != 6 {
			t.Errorf("expected 6, got %v", got)
		}
	})

	t.Run("more args than arity", func(t *testing.T) {
		fn := Curry(func(args ...interface{}) interface{} {
			return len(args)
		}, 2)
		result := fn("a", "b", "c")
		if got := result.(int); got != 2 {
			t.Errorf("expected 2, got %d", got)
		}
	})
}

func TestCurryRight(t *testing.T) {
	t.Run("curries from right", func(t *testing.T) {
		fn := CurryRight(func(args ...interface{}) interface{} {
			return add(args...)
		}, 3)
		fn1 := fn(3.0)
		fn2 := fn1.(func(...interface{}) interface{})(2.0)
		result := fn2.(func(...interface{}) interface{})(1.0)
		if got := result.(float64); got != 6 {
			t.Errorf("expected 6, got %v", got)
		}
	})

	t.Run("all args at once", func(t *testing.T) {
		fn := CurryRight(func(args ...interface{}) interface{} {
			return add(args...)
		}, 3)
		result := fn(1.0, 2.0, 3.0)
		if got := result.(float64); got != 6 {
			t.Errorf("expected 6, got %v", got)
		}
	})
}

func TestDebounce(t *testing.T) {
	t.Run("delays execution", func(t *testing.T) {
		fn := Debounce(func(args ...interface{}) {
		}, 50)
		fn()
	})
}

func TestDefer(t *testing.T) {
	t.Run("runs in goroutine", func(t *testing.T) {
		ch := make(chan bool, 1)
		Defer(func(args ...interface{}) {
			ch <- true
		})
		<-ch
	})
}

func TestDelay(t *testing.T) {
	t.Run("schedules execution", func(t *testing.T) {
		Delay(func(args ...interface{}) {}, 1)
	})
}

func TestFlip(t *testing.T) {
	t.Run("reverses arguments", func(t *testing.T) {
		fn := Flip(func(args ...interface{}) interface{} {
			return args
		})
		result := fn(1, 2, 3).([]interface{})
		if result[0] != 3 || result[1] != 2 || result[2] != 1 {
			t.Errorf("expected [3 2 1], got %v", result)
		}
	})

	t.Run("empty args", func(t *testing.T) {
		fn := Flip(func(args ...interface{}) interface{} {
			return len(args)
		})
		if got := fn(); got != 0 {
			t.Errorf("expected 0, got %v", got)
		}
	})
}

func TestMemoize(t *testing.T) {
	t.Run("caches results", func(t *testing.T) {
		var callCount int
		fn := Memoize(func(arg interface{}) interface{} {
			callCount++
			return arg.(int) * 2
		})
		if got := fn(5); got != 10 {
			t.Errorf("expected 10, got %v", got)
		}
		if got := fn(5); got != 10 {
			t.Errorf("expected 10 (cached), got %v", got)
		}
		if callCount != 1 {
			t.Errorf("expected 1 call, got %d", callCount)
		}
		if got := fn(7); got != 14 {
			t.Errorf("expected 14, got %v", got)
		}
		if callCount != 2 {
			t.Errorf("expected 2 calls, got %d", callCount)
		}
	})

	t.Run("different args", func(t *testing.T) {
		fn := Memoize(func(arg interface{}) interface{} {
			return arg.(int) * 2
		})
		if got := fn(1); got != 2 {
			t.Errorf("expected 2, got %v", got)
		}
		if got := fn(2); got != 4 {
			t.Errorf("expected 4, got %v", got)
		}
	})
}

func TestNegate(t *testing.T) {
	t.Run("negates predicate", func(t *testing.T) {
		neg := Negate(isPositive)
		if got := neg(-1.0); got != true {
			t.Errorf("expected true, got %v", got)
		}
		if got := neg(1.0); got != false {
			t.Errorf("expected false, got %v", got)
		}
	})
}

func TestOnce(t *testing.T) {
	t.Run("only calls once", func(t *testing.T) {
		var callCount int
		fn := Once(func(args ...interface{}) interface{} {
			callCount++
			return callCount
		})
		if got := fn(); got != 1 {
			t.Errorf("expected 1, got %v", got)
		}
		if got := fn(); got != 1 {
			t.Errorf("expected 1 (cached), got %v", got)
		}
		if got := fn(); got != 1 {
			t.Errorf("expected 1 (cached), got %v", got)
		}
		if callCount != 1 {
			t.Errorf("expected 1 call, got %d", callCount)
		}
	})

	t.Run("returns nil when fn returns nil", func(t *testing.T) {
		fn := Once(func(args ...interface{}) interface{} {
			return nil
		})
		if got := fn(); got != nil {
			t.Errorf("expected nil, got %v", got)
		}
	})
}

func TestOverArgs(t *testing.T) {
	t.Run("transforms arguments", func(t *testing.T) {
		double := func(v interface{}) interface{} {
			return v.(int) * 2
		}
		square := func(v interface{}) interface{} {
			return v.(int) * v.(int)
		}
		fn := OverArgs(func(args ...interface{}) interface{} {
			return args
		}, double, square)

		result := fn(3, 4).([]interface{})
		if result[0] != 6 || result[1] != 16 {
			t.Errorf("expected [6 16], got %v", result)
		}
	})

	t.Run("fewer transforms than args", func(t *testing.T) {
		double := func(v interface{}) interface{} {
			return v.(int) * 2
		}
		fn := OverArgs(func(args ...interface{}) interface{} {
			return args
		}, double)

		result := fn(3, 4).([]interface{})
		if result[0] != 6 || result[1] != 4 {
			t.Errorf("expected [6 4], got %v", result)
		}
	})

	t.Run("no transforms", func(t *testing.T) {
		fn := OverArgs(func(args ...interface{}) interface{} {
			return args
		})
		result := fn(3, 4).([]interface{})
		if result[0] != 3 || result[1] != 4 {
			t.Errorf("expected [3 4], got %v", result)
		}
	})
}

func TestPartial(t *testing.T) {
	t.Run("prepends partials", func(t *testing.T) {
		fn := Partial(func(args ...interface{}) interface{} {
			return len(args)
		}, "a", "b")
		if got := fn("c"); got != 3 {
			t.Errorf("expected 3, got %v", got)
		}
	})

	t.Run("no partials", func(t *testing.T) {
		fn := Partial(func(args ...interface{}) interface{} {
			return len(args)
		})
		if got := fn("a"); got != 1 {
			t.Errorf("expected 1, got %v", got)
		}
	})
}

func TestPartialRight(t *testing.T) {
	t.Run("appends partials", func(t *testing.T) {
		fn := PartialRight(func(args ...interface{}) interface{} {
			return args
		}, "b", "c")
		result := fn("a").([]interface{})
		if result[0] != "a" || result[1] != "b" || result[2] != "c" {
			t.Errorf("expected [a b c], got %v", result)
		}
	})
}

func TestRearg(t *testing.T) {
	t.Run("rearranges arguments by index", func(t *testing.T) {
		fn := Rearg(func(args ...interface{}) interface{} {
			return args
		}, 2, 0, 1)
		result := fn("a", "b", "c").([]interface{})
		if result[0] != "c" || result[1] != "a" || result[2] != "b" {
			t.Errorf("expected [c a b], got %v", result)
		}
	})

	t.Run("out of range index", func(t *testing.T) {
		fn := Rearg(func(args ...interface{}) interface{} {
			return args
		}, 5)
		result := fn("a").([]interface{})
		if result[0] != nil {
			t.Errorf("expected nil, got %v", result[0])
		}
	})

	t.Run("negative index", func(t *testing.T) {
		fn := Rearg(func(args ...interface{}) interface{} {
			return args
		}, -1)
		result := fn("a").([]interface{})
		if result[0] != nil {
			t.Errorf("expected nil, got %v", result[0])
		}
	})
}

func TestRest(t *testing.T) {
	t.Run("groups rest from start", func(t *testing.T) {
		fn := Rest(func(args ...interface{}) interface{} {
			return args
		}, 1)
		result := fn("a", "b", "c").([]interface{})
		if len(result) != 2 {
			t.Errorf("expected 2 args, got %d", len(result))
		}
	})

	t.Run("start >= len(args)", func(t *testing.T) {
		fn := Rest(func(args ...interface{}) interface{} {
			return len(args)
		}, 5)
		if got := fn("a"); got != 0 {
			t.Errorf("expected 0, got %v", got)
		}
	})

	t.Run("negative start", func(t *testing.T) {
		fn := Rest(func(args ...interface{}) interface{} {
			return args
		}, -1)
		result := fn("a", "b").([]interface{})
		if len(result) != 2 {
			t.Errorf("expected 2 args, got %d", len(result))
		}
	})

	t.Run("start=0", func(t *testing.T) {
		fn := Rest(func(args ...interface{}) interface{} {
			return args
		}, 0)
		result := fn("a", "b").([]interface{})
		if len(result) != 2 {
			t.Errorf("expected 2 args, got %d", len(result))
		}
	})
}

func TestSpread(t *testing.T) {
	t.Run("spreads slice arg", func(t *testing.T) {
		fn := Spread(func(args ...interface{}) interface{} {
			return add(args...)
		})
		if got := fn([]interface{}{1.0, 2.0, 3.0}); got != 6.0 {
			t.Errorf("expected 6, got %v", got)
		}
	})

	t.Run("no args", func(t *testing.T) {
		fn := Spread(func(args ...interface{}) interface{} {
			return len(args)
		})
		if got := fn(); got != 0 {
			t.Errorf("expected 0, got %v", got)
		}
	})

	t.Run("non-slice arg", func(t *testing.T) {
		fn := Spread(func(args ...interface{}) interface{} {
			return len(args)
		})
		if got := fn(42); got != 0 {
			t.Errorf("expected 0, got %v", got)
		}
	})

	t.Run("typed slice", func(t *testing.T) {
		fn := Spread(func(args ...interface{}) interface{} {
			return add(args...)
		})
		nums := []float64{1.0, 2.0, 3.0}
		if got := fn(nums); got != 6.0 {
			t.Errorf("expected 6, got %v", got)
		}
	})
}

func TestThrottle(t *testing.T) {
	t.Run("calls within throttle window", func(t *testing.T) {
		var called bool
		fn := Throttle(func(args ...interface{}) {
			called = true
		}, 50)
		fn()
		if !called {
			t.Errorf("expected immediate call")
		}
	})
}

func TestUnary(t *testing.T) {
	t.Run("accepts only one arg", func(t *testing.T) {
		fn := Unary(func(args ...interface{}) interface{} {
			return len(args)
		})
		if got := fn(1); got != 1 {
			t.Errorf("expected 1, got %v", got)
		}
	})
}

func TestWrap(t *testing.T) {
	t.Run("wraps value with wrapper", func(t *testing.T) {
		wrapper := func(value interface{}, fn func(...interface{}) interface{}) interface{} {
			return value.(string) + " " + fn().(string)
		}
		wrapped := Wrap("hello", wrapper)
		if got := wrapped("world"); got != "hello world" {
			t.Errorf("expected 'hello world', got %v", got)
		}
	})

	t.Run("wrapper with no extra args", func(t *testing.T) {
		wrapper := func(value interface{}, fn func(...interface{}) interface{}) interface{} {
			return value
		}
		wrapped := Wrap(42, wrapper)
		if got := wrapped(); got != 42 {
			t.Errorf("expected 42, got %v", got)
		}
	})
}
