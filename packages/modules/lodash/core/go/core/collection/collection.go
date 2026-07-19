package collection

import (
	"fmt"
	"math/rand"
	"sort"
)

// CountBy iterates over elements of collection, returning a map of counts
// keyed by the results of running each element through iteratee.
func CountBy(collection []interface{}, iteratee func(interface{}) interface{}) map[interface{}]int {
	result := make(map[interface{}]int)
	for _, v := range collection {
		key := iteratee(v)
		result[key]++
	}
	return result
}

// Every checks if predicate returns truthy for all elements of collection.
func Every(collection []interface{}, predicate func(interface{}) bool) bool {
	for _, v := range collection {
		if !predicate(v) {
			return false
		}
	}
	return true
}

// Filter iterates over elements of collection, returning an array of all
// elements predicate returns truthy for.
func Filter(collection []interface{}, predicate func(interface{}) bool) []interface{} {
	result := make([]interface{}, 0)
	for _, v := range collection {
		if predicate(v) {
			result = append(result, v)
		}
	}
	return result
}

// Find iterates over elements of collection, returning the first element
// predicate returns truthy for.
func Find(collection []interface{}, predicate func(interface{}) bool) interface{} {
	for _, v := range collection {
		if predicate(v) {
			return v
		}
	}
	return nil
}

// FindLast is like Find except it iterates over elements from right to left.
func FindLast(collection []interface{}, predicate func(interface{}) bool) interface{} {
	for i := len(collection) - 1; i >= 0; i-- {
		if predicate(collection[i]) {
			return collection[i]
		}
	}
	return nil
}

// FlatMap creates a flattened array of values by running each element in
// collection through iteratee and flattening the mapped results by 1 level.
func FlatMap(collection []interface{}, iteratee func(interface{}) []interface{}) []interface{} {
	result := make([]interface{}, 0)
	for _, v := range collection {
		result = append(result, iteratee(v)...)
	}
	return result
}

// flatFlatten flattens an array of nested slices to the given depth.
func flatFlatten(arr []interface{}, depth int) []interface{} {
	if depth <= 0 {
		return arr
	}
	result := make([]interface{}, 0)
	for _, v := range arr {
		if sub, ok := v.([]interface{}); ok && depth > 0 {
			result = append(result, flatFlatten(sub, depth-1)...)
		} else {
			result = append(result, v)
		}
	}
	return result
}

// FlatMapDeep is like FlatMap except it recursively flattens the mapped results.
func FlatMapDeep(collection []interface{}, iteratee func(interface{}) []interface{}) []interface{} {
	return FlatMapDepth(collection, iteratee, -1)
}

// FlatMapDepth is like FlatMap except it flattens the mapped results up to
// the given depth.
func FlatMapDepth(collection []interface{}, iteratee func(interface{}) []interface{}, depth int) []interface{} {
	mapped := make([]interface{}, 0)
	for _, v := range collection {
		mapped = append(mapped, iteratee(v)...)
	}
	if depth == -1 {
		return flattenDeep(mapped)
	}
	return flatFlatten(mapped, depth)
}

// flattenDeep recursively flattens an array of nested slices completely.
func flattenDeep(arr []interface{}) []interface{} {
	result := make([]interface{}, 0)
	for _, v := range arr {
		if sub, ok := v.([]interface{}); ok {
			result = append(result, flattenDeep(sub)...)
		} else {
			result = append(result, v)
		}
	}
	return result
}

// ForEach iterates over elements of collection and invokes iteratee for each
// element.
func ForEach(collection []interface{}, iteratee func(interface{})) {
	for _, v := range collection {
		iteratee(v)
	}
}

// ForEachRight is like ForEach except it iterates over elements from right
// to left.
func ForEachRight(collection []interface{}, iteratee func(interface{})) {
	for i := len(collection) - 1; i >= 0; i-- {
		iteratee(collection[i])
	}
}

// GroupBy creates a map of slices keyed by the results of running each
// element through iteratee.
func GroupBy(collection []interface{}, iteratee func(interface{}) interface{}) map[interface{}][]interface{} {
	result := make(map[interface{}][]interface{})
	for _, v := range collection {
		key := iteratee(v)
		result[key] = append(result[key], v)
	}
	return result
}

// Includes checks if value is in collection. If fromIndex is negative, it is
// used as the offset from the end of collection.
func Includes(collection []interface{}, value interface{}, fromIndex int) bool {
	if fromIndex < 0 {
		fromIndex = len(collection) + fromIndex
	}
	if fromIndex < 0 {
		fromIndex = 0
	}
	for i := fromIndex; i < len(collection); i++ {
		if collection[i] == value {
			return true
		}
	}
	return false
}

// InvokeMap invokes the method named by path on each element in collection,
// returning an array of the results of each invoked method.
func InvokeMap(collection []interface{}, path string, args ...interface{}) []interface{} {
	result := make([]interface{}, len(collection))
	for i, v := range collection {
		if fn, ok := v.(func(...interface{}) interface{}); ok {
			result[i] = fn(args...)
		} else {
			result[i] = nil
		}
	}
	return result
}

// KeyBy creates a map keyed by the results of running each element through
// iteratee.
func KeyBy(collection []interface{}, iteratee func(interface{}) interface{}) map[interface{}]interface{} {
	result := make(map[interface{}]interface{})
	for _, v := range collection {
		key := iteratee(v)
		result[key] = v
	}
	return result
}

// Map creates an array of values by running each element in collection
// through iteratee.
func Map(collection []interface{}, iteratee func(interface{}) interface{}) []interface{} {
	result := make([]interface{}, len(collection))
	for i, v := range collection {
		result[i] = iteratee(v)
	}
	return result
}

type sortableItem struct {
	value interface{}
	keys  []interface{}
}

type multiSorter struct {
	items    []sortableItem
	orders   []string
}

func (ms *multiSorter) Len() int { return len(ms.items) }

func (ms *multiSorter) Less(i, j int) bool {
	a, b := ms.items[i], ms.items[j]
	for k := range a.keys {
		// Compare keys lexicographically by string representation.
		var cmp bool
		switch va := a.keys[k].(type) {
		case int:
			vb := b.keys[k].(int)
			if ms.orders[k] == "desc" {
				cmp = va > vb
			} else {
				cmp = va < vb
			}
		case float64:
			vb := b.keys[k].(float64)
			if ms.orders[k] == "desc" {
				cmp = va > vb
			} else {
				cmp = va < vb
			}
		case string:
			vb := b.keys[k].(string)
			if ms.orders[k] == "desc" {
				cmp = va > vb
			} else {
				cmp = va < vb
			}
		default:
			sa := toString(a.keys[k])
			sb := toString(b.keys[k])
			if ms.orders[k] == "desc" {
				cmp = sa > sb
			} else {
				cmp = sa < sb
			}
		}
		if cmp {
			return true
		}
		// If equal at this key, continue to next key.
		eq := a.keys[k] == b.keys[k]
		if !eq {
			return false
		}
	}
	return false
}

func (ms *multiSorter) Swap(i, j int) {
	ms.items[i], ms.items[j] = ms.items[j], ms.items[i]
}

// toString converts a value to its string representation for comparison.
func toString(v interface{}) string {
	return fmt.Sprintf("%v", v)
}

// OrderBy is like SortBy except that it allows specifying the sort orders
// of the iteratees. If orders is unspecified, all values are sorted in
// ascending order.
func OrderBy(collection []interface{}, iteratees []func(interface{}) interface{}, orders []string) []interface{} {
	if len(collection) == 0 {
		return []interface{}{}
	}

	items := make([]sortableItem, len(collection))
	for i, v := range collection {
		keys := make([]interface{}, len(iteratees))
		for j, fn := range iteratees {
			keys[j] = fn(v)
		}
		items[i] = sortableItem{value: v, keys: keys}
	}

	ord := orders
	if ord == nil {
		ord = make([]string, len(iteratees))
		for i := range ord {
			ord[i] = "asc"
		}
	}

	sort.Sort(&multiSorter{items: items, orders: ord})

	result := make([]interface{}, len(items))
	for i, item := range items {
		result[i] = item.value
	}
	return result
}

// Partition creates an array of elements split into two groups, the first of
// which contains elements predicate returns truthy for, the second of which
// contains elements predicate returns falsey for.
func Partition(collection []interface{}, predicate func(interface{}) bool) [][]interface{} {
	truthy := make([]interface{}, 0)
	falsy := make([]interface{}, 0)
	for _, v := range collection {
		if predicate(v) {
			truthy = append(truthy, v)
		} else {
			falsy = append(falsy, v)
		}
	}
	return [][]interface{}{truthy, falsy}
}

// Reduce reduces collection to a value which is the accumulated result of
// running each element through iteratee, where each successive invocation is
// supplied the return value of the previous.
func Reduce(collection []interface{}, iteratee func(interface{}, interface{}) interface{}, accumulator interface{}) interface{} {
	acc := accumulator
	for _, v := range collection {
		acc = iteratee(acc, v)
	}
	return acc
}

// ReduceRight is like Reduce except it iterates over elements from right to
// left.
func ReduceRight(collection []interface{}, iteratee func(interface{}, interface{}) interface{}, accumulator interface{}) interface{} {
	acc := accumulator
	for i := len(collection) - 1; i >= 0; i-- {
		acc = iteratee(acc, collection[i])
	}
	return acc
}

// Reject is the opposite of Filter; it returns the elements that predicate
// does NOT return truthy for.
func Reject(collection []interface{}, predicate func(interface{}) bool) []interface{} {
	result := make([]interface{}, 0)
	for _, v := range collection {
		if !predicate(v) {
			result = append(result, v)
		}
	}
	return result
}

// Sample gets a random element from collection.
func Sample(collection []interface{}) interface{} {
	if len(collection) == 0 {
		return nil
	}
	return collection[rand.Intn(len(collection))]
}

// SampleSize gets n random elements from collection.
func SampleSize(collection []interface{}, n int) []interface{} {
	if n <= 0 || len(collection) == 0 {
		return []interface{}{}
	}
	if n > len(collection) {
		n = len(collection)
	}
	indices := rand.Perm(len(collection))
	result := make([]interface{}, n)
	for i := 0; i < n; i++ {
		result[i] = collection[indices[i]]
	}
	return result
}

// Shuffle creates an array of shuffled values.
func Shuffle(collection []interface{}) []interface{} {
	result := make([]interface{}, len(collection))
	perm := rand.Perm(len(collection))
	for i, j := range perm {
		result[i] = collection[j]
	}
	return result
}

// Size gets the size of collection by returning its length.
func Size(collection []interface{}) int {
	return len(collection)
}

// Some checks if predicate returns truthy for any element of collection.
func Some(collection []interface{}, predicate func(interface{}) bool) bool {
	for _, v := range collection {
		if predicate(v) {
			return true
		}
	}
	return false
}

// SortBy sorts the elements of collection in ascending order by the results
// of running each element through each iteratee.
func SortBy(collection []interface{}, iteratees []func(interface{}) interface{}) []interface{} {
	return OrderBy(collection, iteratees, nil)
}
