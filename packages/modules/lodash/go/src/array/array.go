package array

import (
	"fmt"
	"strings"
)

// IndexOf returns the index of the first occurrence of value in array,
// or -1 if value is not found. The search starts at fromIndex.
func IndexOf(array []float64, value float64, fromIndex int) int {
	var slice []float64 = array[fromIndex:]
	for idx, v := range slice {
		if v == value {
			return idx + fromIndex
		}
	}
	return -1
}

// LastIndexOf returns the index of the last occurrence of value in array,
// or -1 if value is not found. The search is conducted from the start
// up to and including fromIndex.
func LastIndexOf(array []float64, value float64, fromIndex int) int {
	var index int = -1
	var slice []float64 = array[0 : len(array)-fromIndex]
	for idx, v := range slice {
		if v == value {
			index = idx
		}
	}
	return index
}

// Chunk creates a slice of elements split into groups the length of size.
// If array can't be split evenly, the final chunk will be the remaining elements.
func Chunk(array []interface{}, size int) [][]interface{} {
	if size < 1 {
		return make([][]interface{}, 0)
	}
	length := len(array)
	chunks := make([][]interface{}, 0, (length+size-1)/size)
	for i := 0; i < length; i += size {
		end := i + size
		if end > length {
			end = length
		}
		chunk := make([]interface{}, end-i)
		copy(chunk, array[i:end])
		chunks = append(chunks, chunk)
	}
	return chunks
}

// Compact creates a slice with all falsey values removed.
// The values false, nil, 0, and "" are falsey.
func Compact(array []interface{}) []interface{} {
	result := make([]interface{}, 0, len(array))
	for _, v := range array {
		if v != false && v != nil && v != 0 && v != "" {
			result = append(result, v)
		}
	}
	return result
}

// Concat creates a new slice concatenating array with any additional arrays.
func Concat(array []interface{}, values ...[]interface{}) []interface{} {
	totalLen := len(array)
	for _, v := range values {
		totalLen += len(v)
	}
	result := make([]interface{}, 0, totalLen)
	result = append(result, array...)
	for _, v := range values {
		result = append(result, v...)
	}
	return result
}

// Difference creates a slice of array values not included in the other given array.
func Difference(array []interface{}, values []interface{}) []interface{} {
	valueSet := make(map[interface{}]struct{}, len(values))
	for _, v := range values {
		valueSet[v] = struct{}{}
	}
	result := make([]interface{}, 0, len(array))
	for _, v := range array {
		if _, ok := valueSet[v]; !ok {
			result = append(result, v)
		}
	}
	return result
}

// DifferenceBy creates a slice of array values not included in values,
// where the comparison is done after applying iteratee to each element.
func DifferenceBy(array []interface{}, values []interface{}, iteratee func(interface{}) interface{}) []interface{} {
	computedSet := make(map[interface{}]struct{}, len(values))
	for _, v := range values {
		computedSet[iteratee(v)] = struct{}{}
	}
	result := make([]interface{}, 0, len(array))
	for _, v := range array {
		if _, ok := computedSet[iteratee(v)]; !ok {
			result = append(result, v)
		}
	}
	return result
}

// DifferenceWith creates a slice of array values not included in values,
// using a custom comparator function to compare elements.
func DifferenceWith(array []interface{}, values []interface{}, comparator func(interface{}, interface{}) bool) []interface{} {
	result := make([]interface{}, 0, len(array))
	for _, a := range array {
		found := false
		for _, b := range values {
			if comparator(a, b) {
				found = true
				break
			}
		}
		if !found {
			result = append(result, a)
		}
	}
	return result
}

// Drop creates a slice of array with n elements dropped from the beginning.
func Drop(array []interface{}, n int) []interface{} {
	if n < 0 {
		n = 0
	}
	if n >= len(array) {
		return make([]interface{}, 0)
	}
	result := make([]interface{}, len(array)-n)
	copy(result, array[n:])
	return result
}

// DropRight creates a slice of array with n elements dropped from the end.
func DropRight(array []interface{}, n int) []interface{} {
	if n < 0 {
		n = 0
	}
	if n >= len(array) {
		return make([]interface{}, 0)
	}
	result := make([]interface{}, len(array)-n)
	copy(result, array[:len(array)-n])
	return result
}

// DropRightWhile creates a slice of array excluding elements dropped from the end
// until predicate returns falsey.
func DropRightWhile(array []interface{}, predicate func(interface{}) bool) []interface{} {
	dropEnd := len(array)
	for i := len(array) - 1; i >= 0; i-- {
		if !predicate(array[i]) {
			break
		}
		dropEnd = i
	}
	result := make([]interface{}, dropEnd)
	copy(result, array[:dropEnd])
	return result
}

// DropWhile creates a slice of array excluding elements dropped from the beginning
// until predicate returns falsey.
func DropWhile(array []interface{}, predicate func(interface{}) bool) []interface{} {
	dropStart := 0
	for i := 0; i < len(array); i++ {
		if !predicate(array[i]) {
			break
		}
		dropStart = i + 1
	}
	result := make([]interface{}, len(array)-dropStart)
	copy(result, array[dropStart:])
	return result
}

// Fill fills elements of array with value from start up to, but not including, end.
func Fill(array []interface{}, value interface{}, start int, end int) []interface{} {
	length := len(array)
	if start < 0 {
		start = 0
	}
	if end > length {
		end = length
	}
	result := make([]interface{}, length)
	copy(result, array)
	for i := start; i < end; i++ {
		result[i] = value
	}
	return result
}

// FindIndex returns the index of the first element predicate returns truthy for,
// or -1 if not found. The search starts at fromIndex.
func FindIndex(array []interface{}, predicate func(interface{}) bool, fromIndex int) int {
	for i := fromIndex; i < len(array); i++ {
		if predicate(array[i]) {
			return i
		}
	}
	return -1
}

// FindLastIndex returns the index of the last element predicate returns truthy for,
// or -1 if not found. The search is conducted from fromIndex backwards.
func FindLastIndex(array []interface{}, predicate func(interface{}) bool, fromIndex int) int {
	for i := fromIndex; i >= 0; i-- {
		if predicate(array[i]) {
			return i
		}
	}
	return -1
}

// Flatten flattens array a single level deep.
func Flatten(array []interface{}) []interface{} {
	result := make([]interface{}, 0, len(array))
	for _, v := range array {
		if v, ok := v.([]interface{}); ok {
			result = append(result, v...)
		} else {
			result = append(result, v)
		}
	}
	return result
}

// FlattenDeep recursively flattens array.
func FlattenDeep(array []interface{}) []interface{} {
	result := make([]interface{}, 0, len(array))
	for _, v := range array {
		if v, ok := v.([]interface{}); ok {
			result = append(result, FlattenDeep(v)...)
		} else {
			result = append(result, v)
		}
	}
	return result
}

// FlattenDepth flattens array up to depth times.
func FlattenDepth(array []interface{}, depth int) []interface{} {
	if depth < 1 {
		result := make([]interface{}, len(array))
		copy(result, array)
		return result
	}
	result := make([]interface{}, 0, len(array))
	for _, v := range array {
		if v, ok := v.([]interface{}); ok {
			result = append(result, FlattenDepth(v, depth-1)...)
		} else {
			result = append(result, v)
		}
	}
	return result
}

// FromPairs returns a map from paired elements.
func FromPairs(pairs [][]interface{}) map[interface{}]interface{} {
	result := make(map[interface{}]interface{}, len(pairs))
	for _, pair := range pairs {
		if len(pair) >= 2 {
			result[pair[0]] = pair[1]
		}
	}
	return result
}

// Head returns the first element of array.
func Head(array []interface{}) interface{} {
	if len(array) == 0 {
		return nil
	}
	return array[0]
}

// Initial returns all but the last element of array.
func Initial(array []interface{}) []interface{} {
	if len(array) <= 1 {
		return make([]interface{}, 0)
	}
	result := make([]interface{}, len(array)-1)
	copy(result, array[:len(array)-1])
	return result
}

// Intersection creates a slice of unique values included in all given arrays.
func Intersection(arrays ...[]interface{}) []interface{} {
	if len(arrays) == 0 {
		return make([]interface{}, 0)
	}
	candidates := make(map[interface{}]int)
	for _, v := range arrays[0] {
		candidates[v] = 1
	}
	for i := 1; i < len(arrays); i++ {
		seen := make(map[interface{}]struct{})
		for _, v := range arrays[i] {
			if _, ok := seen[v]; ok {
				continue
			}
			seen[v] = struct{}{}
			if count, ok := candidates[v]; ok && count == i {
				candidates[v] = i + 1
			}
		}
	}
	result := make([]interface{}, 0, len(candidates))
	for k, v := range candidates {
		if v == len(arrays) {
			result = append(result, k)
		}
	}
	return result
}

// IntersectionBy creates a slice of unique values included in all given arrays,
// using iteratee to transform elements before comparison.
func IntersectionBy(iteratee func(interface{}) interface{}, arrays ...[]interface{}) []interface{} {
	if len(arrays) == 0 {
		return make([]interface{}, 0)
	}
	type entry struct {
		original interface{}
	}
	computedMap := make(map[interface{}]*entry)
	for _, v := range arrays[0] {
		cv := iteratee(v)
		if _, ok := computedMap[cv]; !ok {
			computedMap[cv] = &entry{original: v}
		}
	}
	for i := 1; i < len(arrays); i++ {
		seen := make(map[interface{}]struct{})
		for _, v := range arrays[i] {
			cv := iteratee(v)
			if _, ok := seen[cv]; ok {
				continue
			}
			seen[cv] = struct{}{}
			if e, ok := computedMap[cv]; ok {
				if e.original != nil {
					computedMap[cv] = &entry{}
				}
			} else {
				delete(computedMap, cv)
			}
		}
		toDelete := make([]interface{}, 0)
		for k, e := range computedMap {
			if _, ok := seen[k]; !ok && e.original == nil {
				toDelete = append(toDelete, k)
			}
		}
		for _, k := range toDelete {
			delete(computedMap, k)
		}
	}
	result := make([]interface{}, 0, len(computedMap))
	for _, v := range arrays[0] {
		cv := iteratee(v)
		if e, ok := computedMap[cv]; ok && e.original != nil {
			result = append(result, v)
			e.original = nil
		}
	}
	return result
}

// IntersectionWith creates a slice of unique values included in all given arrays,
// using a comparator function to compare elements.
func IntersectionWith(comparator func(interface{}, interface{}) bool, arrays ...[]interface{}) []interface{} {
	if len(arrays) == 0 {
		return make([]interface{}, 0)
	}
	candidates := make([]interface{}, len(arrays[0]))
	copy(candidates, arrays[0])
	for i := 1; i < len(arrays); i++ {
		next := make([]interface{}, 0, len(candidates))
		for _, a := range candidates {
			for _, b := range arrays[i] {
				if comparator(a, b) {
					next = append(next, a)
					break
				}
			}
		}
		candidates = next
	}
	result := make([]interface{}, 0, len(candidates))
	seen := make(map[interface{}]struct{})
	for _, v := range candidates {
		key := v
		if _, ok := seen[key]; !ok {
			seen[key] = struct{}{}
			result = append(result, v)
		}
	}
	return result
}

// Join joins all elements of array into a string separated by separator.
func Join(array []interface{}, separator string) string {
	if len(array) == 0 {
		return ""
	}
	var b strings.Builder
	for i, v := range array {
		if i > 0 {
			b.WriteString(separator)
		}
		b.WriteString(fmt.Sprintf("%v", v))
	}
	return b.String()
}

// Last returns the last element of array.
func Last(array []interface{}) interface{} {
	if len(array) == 0 {
		return nil
	}
	return array[len(array)-1]
}

// Nth returns the element at index n of array. If n is negative, it returns
// the nth element from the end.
func Nth(array []interface{}, n int) interface{} {
	length := len(array)
	if length == 0 {
		return nil
	}
	if n < 0 {
		n = length + n
	}
	if n < 0 || n >= length {
		return nil
	}
	return array[n]
}

// Pull removes all given values from array.
func Pull(array []interface{}, values ...interface{}) []interface{} {
	valueSet := make(map[interface{}]struct{}, len(values))
	for _, v := range values {
		valueSet[v] = struct{}{}
	}
	result := make([]interface{}, 0, len(array))
	for _, v := range array {
		if _, ok := valueSet[v]; !ok {
			result = append(result, v)
		}
	}
	return result
}

// PullAll removes all given values from array.
func PullAll(array []interface{}, values []interface{}) []interface{} {
	return Pull(array, values...)
}

// PullAllBy removes all given values from array using iteratee for comparison.
func PullAllBy(array []interface{}, values []interface{}, iteratee func(interface{}) interface{}) []interface{} {
	computedSet := make(map[interface{}]struct{}, len(values))
	for _, v := range values {
		computedSet[iteratee(v)] = struct{}{}
	}
	result := make([]interface{}, 0, len(array))
	for _, v := range array {
		if _, ok := computedSet[iteratee(v)]; !ok {
			result = append(result, v)
		}
	}
	return result
}

// PullAllWith removes all given values from array using a comparator.
func PullAllWith(array []interface{}, values []interface{}, comparator func(interface{}, interface{}) bool) []interface{} {
	result := make([]interface{}, 0, len(array))
	for _, a := range array {
		found := false
		for _, b := range values {
			if comparator(a, b) {
				found = true
				break
			}
		}
		if !found {
			result = append(result, a)
		}
	}
	return result
}

// PullAt removes elements from array at the specified indexes and returns them.
func PullAt(array []interface{}, indexes ...int) []interface{} {
	indexSet := make(map[int]struct{}, len(indexes))
	for _, idx := range indexes {
		if idx >= 0 && idx < len(array) {
			indexSet[idx] = struct{}{}
		}
	}
	result := make([]interface{}, 0, len(array))
	for i, v := range array {
		if _, ok := indexSet[i]; ok {
			result = append(result, v)
		}
	}
	return result
}

// Remove removes elements from array that predicate returns truthy for and returns them.
func Remove(array []interface{}, predicate func(interface{}) bool) []interface{} {
	result := make([]interface{}, 0, len(array))
	for _, v := range array {
		if predicate(v) {
			result = append(result, v)
		}
	}
	return result
}

// Reverse reverses array so that the first element becomes the last.
func Reverse(array []interface{}) []interface{} {
	result := make([]interface{}, len(array))
	for i, v := range array {
		result[len(array)-1-i] = v
	}
	return result
}

// Slice creates a slice of array from start up to, but not including, end.
func Slice(array []interface{}, start int, end int) []interface{} {
	if start < 0 {
		start = len(array) + start
	}
	if end < 0 {
		end = len(array) + end
	}
	if start < 0 {
		start = 0
	}
	if end > len(array) {
		end = len(array)
	}
	if start >= end {
		return make([]interface{}, 0)
	}
	result := make([]interface{}, end-start)
	copy(result, array[start:end])
	return result
}

// SortedIndex returns the lowest index at which value should be inserted
// into array in order to maintain its sort order.
func SortedIndex(array []float64, value float64) int {
	lo, hi := 0, len(array)
	for lo < hi {
		mid := (lo + hi) / 2
		if array[mid] < value {
			lo = mid + 1
		} else {
			hi = mid
		}
	}
	return lo
}

// SortedIndexBy returns the lowest index at which value should be inserted
// into array in order to maintain its sort order, using iteratee for comparisons.
func SortedIndexBy(array []interface{}, value interface{}, iteratee func(interface{}) interface{}) int {
	cv := iteratee(value)
	lo, hi := 0, len(array)
	for lo < hi {
		mid := (lo + hi) / 2
		if less(iteratee(array[mid]), cv) {
			lo = mid + 1
		} else {
			hi = mid
		}
	}
	return lo
}

func less(a, b interface{}) bool {
	switch a := a.(type) {
	case float64:
		if b, ok := b.(float64); ok {
			return a < b
		}
	case int:
		if b, ok := b.(int); ok {
			return a < b
		}
	case string:
		if b, ok := b.(string); ok {
			return a < b
		}
	}
	return false
}

// SortedIndexOf returns the index of value in a sorted array, or -1 if not found.
func SortedIndexOf(array []float64, value float64) int {
	idx := SortedIndex(array, value)
	if idx < len(array) && array[idx] == value {
		return idx
	}
	return -1
}

// SortedLastIndex returns the highest index at which value should be inserted
// into array in order to maintain its sort order.
func SortedLastIndex(array []float64, value float64) int {
	lo, hi := 0, len(array)
	for lo < hi {
		mid := (lo + hi) / 2
		if array[mid] <= value {
			lo = mid + 1
		} else {
			hi = mid
		}
	}
	return lo
}

// SortedLastIndexBy returns the highest index at which value should be inserted
// into array in order to maintain its sort order, using iteratee for comparisons.
func SortedLastIndexBy(array []interface{}, value interface{}, iteratee func(interface{}) interface{}) int {
	cv := iteratee(value)
	lo, hi := 0, len(array)
	for lo < hi {
		mid := (lo + hi) / 2
		if !less(cv, iteratee(array[mid])) {
			lo = mid + 1
		} else {
			hi = mid
		}
	}
	return lo
}

// SortedLastIndexOf returns the index of the last occurrence of value in a sorted array,
// or -1 if not found.
func SortedLastIndexOf(array []float64, value float64) int {
	idx := SortedLastIndex(array, value)
	if idx > 0 && array[idx-1] == value {
		return idx - 1
	}
	return -1
}

// SortedUniq returns a slice of unique values from a sorted array.
func SortedUniq(array []float64) []float64 {
	if len(array) == 0 {
		return make([]float64, 0)
	}
	result := make([]float64, 0, len(array))
	result = append(result, array[0])
	for i := 1; i < len(array); i++ {
		if array[i] != array[i-1] {
			result = append(result, array[i])
		}
	}
	return result
}

// SortedUniqBy returns a slice of unique values from a sorted array,
// using iteratee for comparisons.
func SortedUniqBy(array []interface{}, iteratee func(interface{}) interface{}) []interface{} {
	if len(array) == 0 {
		return make([]interface{}, 0)
	}
	result := make([]interface{}, 0, len(array))
	result = append(result, array[0])
	for i := 1; i < len(array); i++ {
		if iteratee(array[i]) != iteratee(array[i-1]) {
			result = append(result, array[i])
		}
	}
	return result
}

// Tail returns all but the first element of array.
func Tail(array []interface{}) []interface{} {
	if len(array) <= 1 {
		return make([]interface{}, 0)
	}
	result := make([]interface{}, len(array)-1)
	copy(result, array[1:])
	return result
}

// Take creates a slice of array with n elements taken from the beginning.
func Take(array []interface{}, n int) []interface{} {
	if n < 0 {
		n = 0
	}
	if n > len(array) {
		n = len(array)
	}
	result := make([]interface{}, n)
	copy(result, array[:n])
	return result
}

// TakeRight creates a slice of array with n elements taken from the end.
func TakeRight(array []interface{}, n int) []interface{} {
	if n < 0 {
		n = 0
	}
	if n > len(array) {
		n = len(array)
	}
	result := make([]interface{}, n)
	copy(result, array[len(array)-n:])
	return result
}

// TakeRightWhile creates a slice of array with elements taken from the end
// while predicate returns truthy.
func TakeRightWhile(array []interface{}, predicate func(interface{}) bool) []interface{} {
	start := len(array)
	for i := len(array) - 1; i >= 0; i-- {
		if !predicate(array[i]) {
			break
		}
		start = i
	}
	result := make([]interface{}, len(array)-start)
	copy(result, array[start:])
	return result
}

// TakeWhile creates a slice of array with elements taken from the beginning
// while predicate returns truthy.
func TakeWhile(array []interface{}, predicate func(interface{}) bool) []interface{} {
	end := 0
	for i := 0; i < len(array); i++ {
		if !predicate(array[i]) {
			break
		}
		end = i + 1
	}
	result := make([]interface{}, end)
	copy(result, array[:end])
	return result
}

// Union creates a slice of unique values from all given arrays in order.
func Union(arrays ...[]interface{}) []interface{} {
	seen := make(map[interface{}]struct{})
	result := make([]interface{}, 0)
	for _, arr := range arrays {
		for _, v := range arr {
			if _, ok := seen[v]; !ok {
				seen[v] = struct{}{}
				result = append(result, v)
			}
		}
	}
	return result
}

// UnionBy creates a slice of unique values from all given arrays in order,
// using iteratee for comparisons.
func UnionBy(iteratee func(interface{}) interface{}, arrays ...[]interface{}) []interface{} {
	seen := make(map[interface{}]struct{})
	result := make([]interface{}, 0)
	for _, arr := range arrays {
		for _, v := range arr {
			cv := iteratee(v)
			if _, ok := seen[cv]; !ok {
				seen[cv] = struct{}{}
				result = append(result, v)
			}
		}
	}
	return result
}

// UnionWith creates a slice of unique values from all given arrays in order,
// using a comparator to determine uniqueness.
func UnionWith(comparator func(interface{}, interface{}) bool, arrays ...[]interface{}) []interface{} {
	result := make([]interface{}, 0)
	for _, arr := range arrays {
		for _, v := range arr {
			found := false
			for _, r := range result {
				if comparator(v, r) {
					found = true
					break
				}
			}
			if !found {
				result = append(result, v)
			}
		}
	}
	return result
}

// Uniq creates a slice of unique values from array in order.
func Uniq(array []interface{}) []interface{} {
	seen := make(map[interface{}]struct{}, len(array))
	result := make([]interface{}, 0, len(array))
	for _, v := range array {
		if _, ok := seen[v]; !ok {
			seen[v] = struct{}{}
			result = append(result, v)
		}
	}
	return result
}

// UniqBy creates a slice of unique values from array in order,
// using iteratee for comparisons.
func UniqBy(array []interface{}, iteratee func(interface{}) interface{}) []interface{} {
	seen := make(map[interface{}]struct{}, len(array))
	result := make([]interface{}, 0, len(array))
	for _, v := range array {
		cv := iteratee(v)
		if _, ok := seen[cv]; !ok {
			seen[cv] = struct{}{}
			result = append(result, v)
		}
	}
	return result
}

// UniqWith creates a slice of unique values from array in order,
// using a comparator to determine uniqueness.
func UniqWith(array []interface{}, comparator func(interface{}, interface{}) bool) []interface{} {
	result := make([]interface{}, 0, len(array))
	for _, v := range array {
		found := false
		for _, r := range result {
			if comparator(v, r) {
				found = true
				break
			}
		}
		if !found {
			result = append(result, v)
		}
	}
	return result
}

// Unzip groups elements from each of the grouped arrays, creating an array of
// grouped elements.
func Unzip(array [][]interface{}) [][]interface{} {
	if len(array) == 0 {
		return make([][]interface{}, 0)
	}
	maxLen := 0
	for _, arr := range array {
		if len(arr) > maxLen {
			maxLen = len(arr)
		}
	}
	result := make([][]interface{}, maxLen)
	for i := 0; i < maxLen; i++ {
		group := make([]interface{}, len(array))
		for j, arr := range array {
			if i < len(arr) {
				group[j] = arr[i]
			} else {
				group[j] = nil
			}
		}
		result[i] = group
	}
	return result
}

// UnzipWith combines grouped elements from each of the grouped arrays using
// iteratee, creating an array of combined elements.
func UnzipWith(array [][]interface{}, iteratee func(...interface{}) interface{}) []interface{} {
	unzipped := Unzip(array)
	result := make([]interface{}, len(unzipped))
	for i, group := range unzipped {
		result[i] = iteratee(group...)
	}
	return result
}

// Without creates a slice excluding all given values.
func Without(array []interface{}, values ...interface{}) []interface{} {
	return Pull(array, values...)
}

// Xor creates a slice of values that are in either of the given arrays but not both.
func Xor(arrays ...[]interface{}) []interface{} {
	seen := make(map[interface{}]int)
	for _, arr := range arrays {
		arrSeen := make(map[interface{}]struct{})
		for _, v := range arr {
			if _, ok := arrSeen[v]; ok {
				continue
			}
			arrSeen[v] = struct{}{}
			seen[v]++
		}
	}
	result := make([]interface{}, 0)
	for _, arr := range arrays {
		for _, v := range arr {
			if seen[v] == 1 {
				result = append(result, v)
				seen[v] = 0
			}
		}
	}
	return result
}

// XorBy creates a slice of values that are in either of the given arrays but not both,
// using iteratee for comparisons.
func XorBy(iteratee func(interface{}) interface{}, arrays ...[]interface{}) []interface{} {
	seen := make(map[interface{}]int)
	for _, arr := range arrays {
		arrSeen := make(map[interface{}]struct{})
		for _, v := range arr {
			cv := iteratee(v)
			if _, ok := arrSeen[cv]; ok {
				continue
			}
			arrSeen[cv] = struct{}{}
			seen[cv]++
		}
	}
	result := make([]interface{}, 0)
	for _, arr := range arrays {
		for _, v := range arr {
			cv := iteratee(v)
			if seen[cv] == 1 {
				result = append(result, v)
				seen[cv] = 0
			}
		}
	}
	return result
}

// XorWith creates a slice of values that are in either of the given arrays but not both,
// using a comparator for comparisons.
func XorWith(comparator func(interface{}, interface{}) bool, arrays ...[]interface{}) []interface{} {
	if len(arrays) == 0 {
		return make([]interface{}, 0)
	}
	all := make([]interface{}, 0)
	for _, arr := range arrays {
		for _, v := range arr {
			all = append(all, v)
		}
	}
	result := make([]interface{}, 0, len(all))
	for _, a := range all {
		count := 0
		for _, arr := range arrays {
			for _, b := range arr {
				if comparator(a, b) {
					count++
					break
				}
			}
		}
		if count == 1 {
			found := false
			for _, r := range result {
				if comparator(a, r) {
					found = true
					break
				}
			}
			if !found {
				result = append(result, a)
			}
		}
	}
	return result
}

// Zip groups elements from each of the arrays using their positional indexes.
func Zip(arrays ...[]interface{}) [][]interface{} {
	if len(arrays) == 0 {
		return make([][]interface{}, 0)
	}
	maxLen := 0
	for _, arr := range arrays {
		if len(arr) > maxLen {
			maxLen = len(arr)
		}
	}
	result := make([][]interface{}, maxLen)
	for i := 0; i < maxLen; i++ {
		group := make([]interface{}, len(arrays))
		for j, arr := range arrays {
			if i < len(arr) {
				group[j] = arr[i]
			} else {
				group[j] = nil
			}
		}
		result[i] = group
	}
	return result
}

// ZipObject creates a map given an array of property identifiers and an array of values.
func ZipObject(props []interface{}, values []interface{}) map[interface{}]interface{} {
	result := make(map[interface{}]interface{}, len(props))
	for i, p := range props {
		if i < len(values) {
			result[p] = values[i]
		} else {
			result[p] = nil
		}
	}
	return result
}

// ZipObjectDeep creates a nested map given dot-separated property paths and values.
func ZipObjectDeep(props []string, values []interface{}) map[string]interface{} {
	result := make(map[string]interface{})
	for i, prop := range props {
		var val interface{} = nil
		if i < len(values) {
			val = values[i]
		}
		setDeep(result, parsePath(prop), val)
	}
	return result
}

func parsePath(path string) []string {
	parts := make([]string, 0)
	current := ""
	for i := 0; i < len(path); i++ {
		ch := path[i]
		if ch == '.' {
			if current != "" {
				parts = append(parts, current)
				current = ""
			}
		} else if ch == '[' {
			if current != "" {
				parts = append(parts, current)
				current = ""
			}
			i++
			for i < len(path) && path[i] != ']' {
				current += string(path[i])
				i++
			}
			if current != "" {
				parts = append(parts, current)
				current = ""
			}
		} else {
			current += string(ch)
		}
	}
	if current != "" {
		parts = append(parts, current)
	}
	return parts
}

func setDeep(m map[string]interface{}, path []string, value interface{}) {
	if len(path) == 0 {
		return
	}
	key := path[0]
	if len(path) == 1 {
		m[key] = value
		return
	}
	if next, ok := m[key]; ok {
		if nextMap, ok := next.(map[string]interface{}); ok {
			setDeep(nextMap, path[1:], value)
			return
		}
	}
	nextMap := make(map[string]interface{})
	m[key] = nextMap
	setDeep(nextMap, path[1:], value)
}

// ZipWith combines each positional group using iteratee.
func ZipWith(iteratee func(...interface{}) interface{}, arrays ...[]interface{}) []interface{} {
	zipped := Zip(arrays...)
	result := make([]interface{}, len(zipped))
	for i, group := range zipped {
		result[i] = iteratee(group...)
	}
	return result
}
