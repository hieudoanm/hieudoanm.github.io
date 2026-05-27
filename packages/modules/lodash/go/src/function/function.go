package function

import (
	"math"
	"reflect"
	"sync"
	"time"
)

func After(n int, fn func(...interface{}) interface{}) func(...interface{}) interface{} {
	var count int
	return func(args ...interface{}) interface{} {
		count++
		if count >= n {
			return fn(args...)
		}
		return nil
	}
}

func Ary(fn func(...interface{}) interface{}, n int) func(...interface{}) interface{} {
	return func(args ...interface{}) interface{} {
		if len(args) > n {
			args = args[:n]
		}
		return fn(args...)
	}
}

func Before(n int, fn func(...interface{}) interface{}) func(...interface{}) interface{} {
	var count int
	var result interface{}
	return func(args ...interface{}) interface{} {
		count++
		if count < n {
			result = fn(args...)
		}
		return result
	}
}

func Bind(fn func(...interface{}) interface{}, thisArg interface{}, partials ...interface{}) func(...interface{}) interface{} {
	return func(args ...interface{}) interface{} {
		allArgs := append(partials, args...)
		return fn(allArgs...)
	}
}

func Curry(fn func(...interface{}) interface{}, arity int) func(...interface{}) interface{} {
	if arity <= 0 {
		arity = 1
	}
	var collected []interface{}
	var mu sync.Mutex
	var recursive func(...interface{}) interface{}
	recursive = func(args ...interface{}) interface{} {
		mu.Lock()
		collected = append(collected, args...)
		current := make([]interface{}, len(collected))
		copy(current, collected)
		mu.Unlock()
		if len(current) >= arity {
			return fn(current[:arity]...)
		}
		return func(nextArgs ...interface{}) interface{} {
			return recursive(nextArgs...)
		}
	}
	return recursive
}

func CurryRight(fn func(...interface{}) interface{}, arity int) func(...interface{}) interface{} {
	if arity <= 0 {
		arity = 1
	}
	var collected []interface{}
	var mu sync.Mutex
	var recursive func(...interface{}) interface{}
	recursive = func(args ...interface{}) interface{} {
		mu.Lock()
		collected = append(args, collected...)
		current := make([]interface{}, len(collected))
		copy(current, collected)
		mu.Unlock()
		if len(current) >= arity {
			return fn(current[:arity]...)
		}
		return func(nextArgs ...interface{}) interface{} {
			return recursive(nextArgs...)
		}
	}
	return recursive
}

func Debounce(fn func(...interface{}), wait float64) func(...interface{}) {
	var timer *time.Timer
	var mu sync.Mutex
	return func(args ...interface{}) {
		mu.Lock()
		if timer != nil {
			timer.Stop()
		}
		timer = time.AfterFunc(time.Duration(wait)*time.Millisecond, func() {
			fn(args...)
		})
		mu.Unlock()
	}
}

func Defer(fn func(...interface{}), args ...interface{}) {
	go fn(args...)
}

func Delay(fn func(...interface{}), wait float64, args ...interface{}) {
	time.AfterFunc(time.Duration(wait)*time.Millisecond, func() {
		fn(args...)
	})
}

func Flip(fn func(...interface{}) interface{}) func(...interface{}) interface{} {
	return func(args ...interface{}) interface{} {
		n := len(args)
		reversed := make([]interface{}, n)
		for i, v := range args {
			reversed[n-1-i] = v
		}
		return fn(reversed...)
	}
}

func Memoize(fn func(interface{}) interface{}) func(interface{}) interface{} {
	cache := sync.Map{}
	return func(arg interface{}) interface{} {
		if v, ok := cache.Load(arg); ok {
			return v
		}
		result := fn(arg)
		cache.Store(arg, result)
		return result
	}
}

func Negate(predicate func(...interface{}) bool) func(...interface{}) bool {
	return func(args ...interface{}) bool {
		return !predicate(args...)
	}
}

func Once(fn func(...interface{}) interface{}) func(...interface{}) interface{} {
	var once sync.Once
	var result interface{}
	return func(args ...interface{}) interface{} {
		once.Do(func() {
			result = fn(args...)
		})
		return result
	}
}

func OverArgs(fn func(...interface{}) interface{}, transforms ...func(interface{}) interface{}) func(...interface{}) interface{} {
	return func(args ...interface{}) interface{} {
		transformed := make([]interface{}, len(args))
		for i, arg := range args {
			if i < len(transforms) {
				transformed[i] = transforms[i](arg)
			} else {
				transformed[i] = arg
			}
		}
		return fn(transformed...)
	}
}

func Partial(fn func(...interface{}) interface{}, partials ...interface{}) func(...interface{}) interface{} {
	return func(args ...interface{}) interface{} {
		allArgs := append(partials, args...)
		return fn(allArgs...)
	}
}

func PartialRight(fn func(...interface{}) interface{}, partials ...interface{}) func(...interface{}) interface{} {
	return func(args ...interface{}) interface{} {
		allArgs := append(args, partials...)
		return fn(allArgs...)
	}
}

func Rearg(fn func(...interface{}) interface{}, indexes ...int) func(...interface{}) interface{} {
	return func(args ...interface{}) interface{} {
		rearranged := make([]interface{}, len(indexes))
		for i, idx := range indexes {
			if idx >= 0 && idx < len(args) {
				rearranged[i] = args[idx]
			} else {
				rearranged[i] = nil
			}
		}
		return fn(rearranged...)
	}
}

func Rest(fn func(...interface{}) interface{}, start int) func(...interface{}) interface{} {
	return func(args ...interface{}) interface{} {
		if start < 0 {
			start = 0
		}
		if start >= len(args) {
			return fn()
		}
		normal := args[:start]
		restArgs := args[start:]
		all := append(normal, restArgs)
		return fn(all...)
	}
}

func Spread(fn func(...interface{}) interface{}) func(...interface{}) interface{} {
	return func(args ...interface{}) interface{} {
		if len(args) > 0 {
			if arr, ok := args[0].([]interface{}); ok {
				return fn(arr...)
			}
			v := reflect.ValueOf(args[0])
			if v.Kind() == reflect.Slice {
				elems := make([]interface{}, v.Len())
				for i := 0; i < v.Len(); i++ {
					elems[i] = v.Index(i).Interface()
				}
				return fn(elems...)
			}
		}
		return fn()
	}
}

func Throttle(fn func(...interface{}), wait float64) func(...interface{}) {
	var lastTime time.Time
	var mu sync.Mutex
	return func(args ...interface{}) {
		mu.Lock()
		now := time.Now()
		elapsed := now.Sub(lastTime)
		if elapsed >= time.Duration(wait)*time.Millisecond {
			lastTime = now
			mu.Unlock()
			fn(args...)
		} else {
			mu.Unlock()
		}
	}
}

func Unary(fn func(...interface{}) interface{}) func(interface{}) interface{} {
	return func(arg interface{}) interface{} {
		return fn(arg)
	}
}

func Wrap(value interface{}, wrapper func(interface{}, func(...interface{}) interface{}) interface{}) func(...interface{}) interface{} {
	return func(args ...interface{}) interface{} {
		return wrapper(value, func(...interface{}) interface{} {
			if len(args) > 0 {
				return args[0]
			}
			return nil
		})
	}
}

var mathMin = math.Min
