use std::collections::{HashMap, HashSet};
use std::hash::Hash;

/// Creates an array of elements split into groups the length of `size`.
pub fn chunk<T: Clone>(array: &[T], size: usize) -> Vec<Vec<T>> {
    let mut result = Vec::new();
    let mut i = 0;
    while i < array.len() {
        let end = (i + size).min(array.len());
        result.push(array[i..end].to_vec());
        i = end;
    }
    result
}

/// Creates an array with all falsy values removed.
pub fn compact<T: Default + PartialEq + Clone>(array: &[T]) -> Vec<T> {
    array
        .iter()
        .filter(|x| **x != T::default())
        .cloned()
        .collect()
}

/// Creates a new array concatenating `array` with any additional arrays.
pub fn concat<T: Clone>(array: &[T], values: &[&[T]]) -> Vec<T> {
    let mut result = array.to_vec();
    for v in values {
        result.extend_from_slice(v);
    }
    result
}

/// Creates an array of `array` values not included in `values`.
pub fn difference<T: Eq + Hash + Clone>(array: &[T], values: &[T]) -> Vec<T> {
    let set: HashSet<&T> = values.iter().collect();
    array.iter().filter(|x| !set.contains(x)).cloned().collect()
}

/// Creates an array of `array` values not included in `values`, using an iteratee.
pub fn difference_by<T: Clone, U: Eq + Hash, F: Fn(&T) -> U>(
    array: &[T],
    values: &[T],
    iteratee: F,
) -> Vec<T> {
    let mapped: HashSet<U> = values.iter().map(&iteratee).collect();
    array
        .iter()
        .filter(|x| !mapped.contains(&iteratee(x)))
        .cloned()
        .collect()
}

/// Creates an array of `array` values not included in `values`, using a comparator.
pub fn difference_with<T: Clone, F: Fn(&T, &T) -> bool>(
    array: &[T],
    values: &[T],
    comparator: F,
) -> Vec<T> {
    array
        .iter()
        .filter(|x| !values.iter().any(|y| comparator(x, y)))
        .cloned()
        .collect()
}

/// Creates a slice of `array` with `n` elements dropped from the beginning.
pub fn drop<T: Clone>(array: &[T], n: usize) -> Vec<T> {
    if n >= array.len() {
        Vec::new()
    } else {
        array[n..].to_vec()
    }
}

/// Creates a slice of `array` with `n` elements dropped from the end.
pub fn drop_right<T: Clone>(array: &[T], n: usize) -> Vec<T> {
    if n >= array.len() {
        Vec::new()
    } else {
        array[..array.len() - n].to_vec()
    }
}

/// Creates a slice of `array` excluding elements dropped from the end until predicate fails.
pub fn drop_right_while<T: Clone, F: Fn(&T) -> bool>(array: &[T], predicate: F) -> Vec<T> {
    let end = array
        .iter()
        .rposition(|x| !predicate(x))
        .map_or(0, |i| i + 1);
    array[..end].to_vec()
}

/// Creates a slice of `array` excluding elements dropped from the beginning until predicate fails.
pub fn drop_while<T: Clone, F: Fn(&T) -> bool>(array: &[T], predicate: F) -> Vec<T> {
    let start = array
        .iter()
        .position(|x| !predicate(x))
        .unwrap_or(array.len());
    array[start..].to_vec()
}

/// Fills elements of `array` with `value` from `start` up to, but not including, `end`.
pub fn fill<T: Clone>(array: &mut [T], value: T, start: usize, end: usize) {
    let end = end.min(array.len());
    for i in start..end {
        array[i] = value.clone();
    }
}

/// Finds the index of the first element predicate returns truthy for.
pub fn find_index<T, F: Fn(&T) -> bool>(array: &[T], predicate: F, from_index: usize) -> i32 {
    for i in from_index..array.len() {
        if predicate(&array[i]) {
            return i as i32;
        }
    }
    -1
}

/// Finds the index of the last element predicate returns truthy for.
pub fn find_last_index<T, F: Fn(&T) -> bool>(array: &[T], predicate: F, from_index: usize) -> i32 {
    let end = (from_index + 1).min(array.len());
    for i in (0..end).rev() {
        if predicate(&array[i]) {
            return i as i32;
        }
    }
    -1
}

/// Flattens `array` a single level deep.
pub fn flatten<T: Clone>(array: &[Vec<T>]) -> Vec<T> {
    let mut result = Vec::new();
    for inner in array {
        result.extend(inner.iter().cloned());
    }
    result
}

/// Recursively flattens `array`.
pub fn flatten_deep<T: Clone>(array: &[Vec<Vec<T>>]) -> Vec<T> {
    let mut result = Vec::new();
    for inner in array {
        for item in inner {
            result.extend(item.iter().cloned());
        }
    }
    result
}

/// Flattens `array` up to `depth` levels deep.
pub fn flatten_depth<T: Clone>(array: &[Vec<T>], _depth: usize) -> Vec<T> {
    let mut result = Vec::new();
    for inner in array {
        result.extend(inner.iter().cloned());
    }
    result
}

/// Creates an object composed from key-value pairs.
pub fn from_pairs<K: Eq + Hash + Clone, V: Clone>(pairs: &[(K, V)]) -> HashMap<K, V> {
    let mut result = HashMap::new();
    for (k, v) in pairs {
        result.insert((*k).clone(), (*v).clone());
    }
    result
}

/// Gets the first element of `array`.
pub fn head<T>(array: &[T]) -> Option<&T> {
    array.first()
}

/// Gets the index at which `value` is found in `array`.
pub fn index_of<T: PartialEq>(array: &[T], value: &T, from_index: usize) -> i32 {
    for i in from_index..array.len() {
        if &array[i] == value {
            return i as i32;
        }
    }
    -1
}

/// Gets all but the last element of `array`.
pub fn initial<T: Clone>(array: &[T]) -> Vec<T> {
    if array.is_empty() {
        Vec::new()
    } else {
        array[..array.len() - 1].to_vec()
    }
}

/// Creates an array of unique values that are included in all given arrays.
pub fn intersection<T: Eq + Hash + Clone>(array: &[T], values: &[T]) -> Vec<T> {
    let set: HashSet<&T> = values.iter().collect();
    let mut result = Vec::new();
    for x in array {
        if set.contains(x) && !result.contains(x) {
            result.push(x.clone());
        }
    }
    result
}

/// Creates an array of unique values that are included in all given arrays using an iteratee.
pub fn intersection_by<T: Clone, U: Eq + Hash, F: Fn(&T) -> U>(
    array: &[T],
    values: &[T],
    iteratee: F,
) -> Vec<T> {
    let mapped: HashSet<U> = values.iter().map(&iteratee).collect();
    let mut result = Vec::new();
    for x in array {
        let key = iteratee(x);
        if mapped.contains(&key) && !result.iter().any(|r: &T| iteratee(r) == key) {
            result.push(x.clone());
        }
    }
    result
}

/// Creates an array of unique values that are included in all given arrays using a comparator.
pub fn intersection_with<T: Clone, F: Fn(&T, &T) -> bool>(
    array: &[T],
    values: &[T],
    comparator: F,
) -> Vec<T> {
    array
        .iter()
        .filter(|x| values.iter().any(|y| comparator(x, y)))
        .cloned()
        .collect()
}

/// Converts all elements in `array` into a string separated by `separator`.
pub fn join<T: ToString>(array: &[T], separator: &str) -> String {
    let mut result = String::new();
    for (i, item) in array.iter().enumerate() {
        if i > 0 {
            result.push_str(separator);
        }
        result.push_str(&item.to_string());
    }
    result
}

/// Gets the last element of `array`.
pub fn last<T>(array: &[T]) -> Option<&T> {
    array.last()
}

/// Gets the index at which `value` is to be found in `array` searching from right to left.
pub fn last_index_of<T: PartialEq>(array: &[T], value: &T, from_index: usize) -> i32 {
    let end = (from_index + 1).min(array.len());
    for i in (0..end).rev() {
        if &array[i] == value {
            return i as i32;
        }
    }
    -1
}

/// Gets the element at index `n` of `array`. Supports negative indexing.
pub fn nth<T>(array: &[T], n: i32) -> Option<&T> {
    if n >= 0 {
        array.get(n as usize)
    } else {
        let idx = array.len() as i32 + n;
        if idx >= 0 {
            array.get(idx as usize)
        } else {
            None
        }
    }
}

/// Removes all given values from `array`.
pub fn pull<T: PartialEq + Clone>(array: &mut Vec<T>, values: &[T]) {
    array.retain(|x| !values.contains(x));
}

/// Removes all given values from `array`.
pub fn pull_all<T: PartialEq + Clone>(array: &mut Vec<T>, values: &[T]) {
    array.retain(|x| !values.contains(x));
}

/// Removes all given values from `array` using an iteratee.
pub fn pull_all_by<T: Clone, U: Eq, F: Fn(&T) -> U>(array: &mut Vec<T>, values: &[T], iteratee: F) {
    let mapped: Vec<U> = values.iter().map(&iteratee).collect();
    array.retain(|x| !mapped.contains(&iteratee(x)));
}

/// Removes all given values from `array` using a comparator.
pub fn pull_all_with<T: Clone, F: Fn(&T, &T) -> bool>(
    array: &mut Vec<T>,
    values: &[T],
    comparator: F,
) {
    array.retain(|x| !values.iter().any(|y| comparator(x, y)));
}

/// Removes elements from `array` corresponding to `indices` and returns them.
pub fn pull_at<T: Clone>(array: &mut Vec<T>, indices: &[usize]) -> Vec<T> {
    let mut removed = Vec::new();
    let mut sorted: Vec<usize> = indices.to_vec();
    sorted.sort_unstable_by(|a, b| b.cmp(a));
    for &idx in &sorted {
        if idx < array.len() {
            removed.push(array.remove(idx));
        }
    }
    removed.reverse();
    removed
}

/// Removes all elements from `array` that predicate returns truthy for and returns them.
pub fn remove<T: Clone, F: Fn(&T) -> bool>(array: &mut Vec<T>, predicate: F) -> Vec<T> {
    let mut removed = Vec::new();
    let mut i = 0;
    while i < array.len() {
        if predicate(&array[i]) {
            removed.push(array.remove(i));
        } else {
            i += 1;
        }
    }
    removed
}

/// Reverses `array`.
pub fn reverse<T: Clone>(array: &[T]) -> Vec<T> {
    let mut result = array.to_vec();
    result.reverse();
    result
}

/// Creates a slice of `array` from `start` up to, but not including, `end`.
pub fn slice<T: Clone>(array: &[T], start: usize, end: usize) -> Vec<T> {
    let end = end.min(array.len());
    if start >= end {
        Vec::new()
    } else {
        array[start..end].to_vec()
    }
}

/// Uses a binary search to determine the lowest index at which value should be inserted.
pub fn sorted_index<T: Ord>(array: &[T], value: &T) -> usize {
    array.binary_search(value).unwrap_or_else(|x| x)
}

/// Uses a binary search and an iteratee to determine the lowest index for value.
pub fn sorted_index_by<T, U: Ord, F: Fn(&T) -> U>(array: &[T], value: &T, iteratee: F) -> usize {
    let mapped_value = iteratee(value);
    let mut left = 0;
    let mut right = array.len();
    while left < right {
        let mid = left + (right - left) / 2;
        if iteratee(&array[mid]) < mapped_value {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    left
}

/// Returns the index of the first occurrence of value in a sorted array.
pub fn sorted_index_of<T: Ord>(array: &[T], value: &T) -> Option<usize> {
    let idx = array.binary_search(value).ok()?;
    let mut result = idx;
    while result > 0 && &array[result - 1] == value {
        result -= 1;
    }
    Some(result)
}

/// Uses a binary search to determine the highest index at which value should be inserted.
pub fn sorted_last_index<T: Ord>(array: &[T], value: &T) -> usize {
    let mut left = 0;
    let mut right = array.len();
    while left < right {
        let mid = left + (right - left) / 2;
        if &array[mid] <= value {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    left
}

/// Uses a binary search and an iteratee for the highest insertion index.
pub fn sorted_last_index_by<T, U: Ord, F: Fn(&T) -> U>(
    array: &[T],
    value: &T,
    iteratee: F,
) -> usize {
    let mapped_value = iteratee(value);
    let mut left = 0;
    let mut right = array.len();
    while left < right {
        let mid = left + (right - left) / 2;
        if iteratee(&array[mid]) <= mapped_value {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    left
}

/// Returns the index of the last occurrence of value in a sorted array.
pub fn sorted_last_index_of<T: Ord>(array: &[T], value: &T) -> Option<usize> {
    let idx = array.binary_search(value).ok()?;
    let mut result = idx;
    while result + 1 < array.len() && &array[result + 1] == value {
        result += 1;
    }
    Some(result)
}

/// Returns a deduped sorted array.
pub fn sorted_uniq<T: Eq + Clone>(array: &[T]) -> Vec<T> {
    let mut result = Vec::new();
    let mut iter = array.iter();
    if let Some(first) = iter.next() {
        result.push(first.clone());
    }
    for x in iter {
        if x != result.last().unwrap() {
            result.push(x.clone());
        }
    }
    result
}

/// Returns a deduped sorted array using an iteratee.
pub fn sorted_uniq_by<T: Clone, U: Eq, F: Fn(&T) -> U>(array: &[T], iteratee: F) -> Vec<T> {
    let mut result = Vec::new();
    let mut iter = array.iter();
    if let Some(first) = iter.next() {
        result.push(first.clone());
    }
    for x in iter {
        if iteratee(x) != iteratee(result.last().unwrap()) {
            result.push(x.clone());
        }
    }
    result
}

/// Gets all but the first element of `array`.
pub fn tail<T: Clone>(array: &[T]) -> Vec<T> {
    if array.is_empty() {
        Vec::new()
    } else {
        array[1..].to_vec()
    }
}

/// Creates a slice of `array` with `n` elements taken from the beginning.
pub fn take<T: Clone>(array: &[T], n: usize) -> Vec<T> {
    let end = n.min(array.len());
    array[..end].to_vec()
}

/// Creates a slice of `array` with `n` elements taken from the end.
pub fn take_right<T: Clone>(array: &[T], n: usize) -> Vec<T> {
    if n >= array.len() {
        array.to_vec()
    } else {
        array[array.len() - n..].to_vec()
    }
}

/// Creates a slice of `array` with elements taken from the end until predicate fails.
pub fn take_right_while<T: Clone, F: Fn(&T) -> bool>(array: &[T], predicate: F) -> Vec<T> {
    let mut result: Vec<T> = array
        .iter()
        .rev()
        .take_while(|x| predicate(x))
        .cloned()
        .collect();
    result.reverse();
    result
}

/// Creates a slice of `array` with elements taken from the beginning until predicate fails.
pub fn take_while<T: Clone, F: Fn(&T) -> bool>(array: &[T], predicate: F) -> Vec<T> {
    array.iter().take_while(|x| predicate(x)).cloned().collect()
}

/// Creates an array of unique values, in order, from all given arrays.
pub fn union<T: Eq + Hash + Clone>(array: &[T], values: &[T]) -> Vec<T> {
    let mut seen = HashSet::new();
    let mut result = Vec::new();
    for x in array.iter().chain(values.iter()) {
        if seen.insert(x.clone()) {
            result.push(x.clone());
        }
    }
    result
}

/// Creates an array of unique values using an iteratee.
pub fn union_by<T: Clone, U: Eq + Hash, F: Fn(&T) -> U>(
    array: &[T],
    values: &[T],
    iteratee: F,
) -> Vec<T> {
    let mut seen = HashSet::new();
    let mut result = Vec::new();
    for x in array.iter().chain(values.iter()) {
        let key = iteratee(x);
        if seen.insert(key) {
            result.push(x.clone());
        }
    }
    result
}

/// Creates an array of unique values using a comparator.
pub fn union_with<T: Clone, F: Fn(&T, &T) -> bool>(
    array: &[T],
    values: &[T],
    comparator: F,
) -> Vec<T> {
    let mut result: Vec<T> = array.to_vec();
    for x in values {
        if !result.iter().any(|y| comparator(x, y)) {
            result.push(x.clone());
        }
    }
    result
}

/// Creates a duplicate-free version of an array.
pub fn uniq<T: Eq + Hash + Clone>(array: &[T]) -> Vec<T> {
    let mut seen = HashSet::new();
    let mut result = Vec::new();
    for x in array {
        if seen.insert(x.clone()) {
            result.push(x.clone());
        }
    }
    result
}

/// Creates a duplicate-free version of an array using an iteratee.
pub fn uniq_by<T: Clone, U: Eq + Hash, F: Fn(&T) -> U>(array: &[T], iteratee: F) -> Vec<T> {
    let mut seen = HashSet::new();
    let mut result = Vec::new();
    for x in array {
        let key = iteratee(x);
        if seen.insert(key) {
            result.push(x.clone());
        }
    }
    result
}

/// Creates a duplicate-free version of an array using a comparator.
pub fn uniq_with<T: Clone, F: Fn(&T, &T) -> bool>(array: &[T], is_equal: F) -> Vec<T> {
    let mut result = Vec::new();
    for x in array {
        if !result.iter().any(|y| is_equal(x, y)) {
            result.push(x.clone());
        }
    }
    result
}

/// Creates an array of grouped elements, the inverse of `zip`.
pub fn unzip<T: Clone>(array: &[Vec<T>]) -> Vec<Vec<T>> {
    if array.is_empty() {
        return Vec::new();
    }
    let cols = array.iter().map(|a| a.len()).max().unwrap_or(0);
    let mut result = vec![Vec::with_capacity(array.len()); cols];
    for row in array {
        for (j, x) in row.iter().enumerate() {
            if j < cols {
                result[j].push(x.clone());
            }
        }
    }
    result
}

/// Creates an array of grouped elements and applies iteratee to each group.
pub fn unzip_with<T: Clone, U, F: Fn(&[T]) -> U>(array: &[Vec<T>], iteratee: F) -> Vec<U> {
    if array.is_empty() {
        return Vec::new();
    }
    let cols = array.iter().map(|a| a.len()).max().unwrap_or(0);
    let mut result = Vec::with_capacity(cols);
    for j in 0..cols {
        let mut group = Vec::with_capacity(array.len());
        for row in array {
            if j < row.len() {
                group.push(row[j].clone());
            }
        }
        result.push(iteratee(&group));
    }
    result
}

/// Creates an array excluding all given values.
pub fn without<T: PartialEq + Clone>(array: &[T], values: &[T]) -> Vec<T> {
    array
        .iter()
        .filter(|x| !values.contains(x))
        .cloned()
        .collect()
}

/// Creates an array of unique values that is the symmetric difference of the given arrays.
pub fn xor<T: Eq + Hash + Clone>(array: &[T], values: &[T]) -> Vec<T> {
    let set_a: HashSet<&T> = array.iter().collect();
    let set_b: HashSet<&T> = values.iter().collect();
    let mut result = Vec::new();
    for x in array {
        if !set_b.contains(x) && !result.contains(x) {
            result.push(x.clone());
        }
    }
    for x in values {
        if !set_a.contains(x) && !result.contains(x) {
            result.push(x.clone());
        }
    }
    result
}

/// Creates an array of unique symmetric difference values using an iteratee.
pub fn xor_by<T: Clone, U: Eq + Hash, F: Fn(&T) -> U>(
    array: &[T],
    values: &[T],
    iteratee: F,
) -> Vec<T> {
    let mapped_a: HashSet<U> = array.iter().map(&iteratee).collect();
    let mapped_b: HashSet<U> = values.iter().map(&iteratee).collect();
    let mut result = Vec::new();
    for x in array {
        let key = iteratee(x);
        if !mapped_b.contains(&key) && !result.iter().any(|r: &T| iteratee(r) == key) {
            result.push(x.clone());
        }
    }
    for x in values {
        let key = iteratee(x);
        if !mapped_a.contains(&key) && !result.iter().any(|r: &T| iteratee(r) == key) {
            result.push(x.clone());
        }
    }
    result
}

/// Creates an array of unique symmetric difference values using a comparator.
pub fn xor_with<T: Clone, F: Fn(&T, &T) -> bool>(
    array: &[T],
    values: &[T],
    comparator: F,
) -> Vec<T> {
    let mut result = Vec::new();
    for x in array {
        if !values.iter().any(|y| comparator(x, y)) {
            result.push(x.clone());
        }
    }
    for x in values {
        if !array.iter().any(|y| comparator(x, y)) {
            result.push(x.clone());
        }
    }
    result
}

/// Creates an array of grouped elements, the first of each at index 0, etc.
pub fn zip<T: Clone>(arrays: &[&[T]]) -> Vec<Vec<T>> {
    if arrays.is_empty() {
        return Vec::new();
    }
    let max_len = arrays.iter().map(|a| a.len()).max().unwrap_or(0);
    let mut result = Vec::with_capacity(max_len);
    for i in 0..max_len {
        let mut group = Vec::with_capacity(arrays.len());
        for arr in arrays {
            if i < arr.len() {
                group.push(arr[i].clone());
            }
        }
        result.push(group);
    }
    result
}

/// Creates an object composed from arrays of keys and values.
pub fn zip_object<K, V>(props: &[K], values: &[V]) -> HashMap<K, V>
where
    K: Eq + Hash + Clone,
    V: Clone,
{
    let mut result = HashMap::new();
    for (i, key) in props.iter().enumerate() {
        if i < values.len() {
            result.insert(key.clone(), values[i].clone());
        }
    }
    result
}

/// Creates an object composed from arrays of property paths and values.
pub fn zip_object_deep<K: ToString + Clone, V: Clone>(
    props: &[K],
    values: &[V],
) -> HashMap<String, V> {
    let mut result = HashMap::new();
    for (i, key) in props.iter().enumerate() {
        if i < values.len() {
            result.insert(key.to_string(), values[i].clone());
        }
    }
    result
}

/// Creates an array of grouped elements and applies iteratee to each group.
pub fn zip_with<T: Clone, U, F: Fn(&[&T]) -> U>(arrays: &[&[T]], iteratee: F) -> Vec<U> {
    if arrays.is_empty() {
        return Vec::new();
    }
    let max_len = arrays.iter().map(|a| a.len()).max().unwrap_or(0);
    let mut result = Vec::with_capacity(max_len);
    for i in 0..max_len {
        let mut group = Vec::with_capacity(arrays.len());
        for arr in arrays {
            if i < arr.len() {
                group.push(&arr[i]);
            }
        }
        result.push(iteratee(&group));
    }
    result
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_chunk() {
        assert_eq!(chunk(&[1, 2, 3, 4], 2), vec![vec![1, 2], vec![3, 4]]);
        assert_eq!(chunk(&[1, 2, 3], 2), vec![vec![1, 2], vec![3]]);
        assert_eq!(chunk::<i32>(&[], 2), Vec::<Vec<i32>>::new());
        assert_eq!(chunk(&[1], 5), vec![vec![1]]);
    }

    #[test]
    fn test_compact() {
        assert_eq!(compact(&[0, 1, 0, 2, 3]), vec![1, 2, 3]);
        assert_eq!(compact::<i32>(&[]), vec![]);
        assert_eq!(compact(&[0, 0, 0]), vec![]);
    }

    #[test]
    fn test_concat() {
        let result = concat(&[1, 2], &[&[3, 4], &[5]]);
        assert_eq!(result, vec![1, 2, 3, 4, 5]);
    }

    #[test]
    fn test_difference() {
        assert_eq!(difference(&[1, 2, 3, 1], &[2, 3]), vec![1, 1]);
    }

    #[test]
    fn test_difference_by() {
        let result = difference_by(&[1, 2, 3, 4], &[2, 4], |x| x % 2);
        assert_eq!(result, vec![1, 3]);
    }

    #[test]
    fn test_difference_with() {
        let result = difference_with(&[1, 2, 3], &[1, 4], |a, b| a == b);
        assert_eq!(result, vec![2, 3]);
    }

    #[test]
    fn test_drop() {
        assert_eq!(drop(&[1, 2, 3], 2), vec![3]);
        assert_eq!(drop(&[1, 2], 5), Vec::<i32>::new());
        assert_eq!(drop(&[1, 2, 3], 0), vec![1, 2, 3]);
    }

    #[test]
    fn test_drop_right() {
        assert_eq!(drop_right(&[1, 2, 3], 1), vec![1, 2]);
        assert_eq!(drop_right(&[1, 2], 5), Vec::<i32>::new());
    }

    #[test]
    fn test_drop_right_while() {
        assert_eq!(drop_right_while(&[1, 2, 3, 2, 1], |x| *x < 3), vec![1, 2, 3]);
        assert_eq!(drop_right_while(&[1, 2, 3], |x| *x > 0), Vec::<i32>::new());
    }

    #[test]
    fn test_drop_while() {
        assert_eq!(drop_while(&[1, 2, 3, 4, 5], |x| *x < 3), vec![3, 4, 5]);
        assert_eq!(drop_while(&[1, 2], |x| *x > 0), Vec::<i32>::new());
    }

    #[test]
    fn test_fill() {
        let mut arr = vec![1, 2, 3, 4];
        fill(&mut arr, 0, 1, 3);
        assert_eq!(arr, vec![1, 0, 0, 4]);
        fill(&mut arr, 9, 0, 100);
        assert_eq!(arr, vec![9, 9, 9, 9]);
    }

    #[test]
    fn test_find_index() {
        let arr = [1, 3, 5, 7];
        assert_eq!(find_index(&arr, |x| *x > 3, 0), 2);
        assert_eq!(find_index(&arr, |x| *x > 10, 0), -1);
        assert_eq!(find_index(&arr, |x| *x > 3, 3), 3);
    }

    #[test]
    fn test_find_last_index() {
        let arr = [1, 3, 5, 3, 7];
        assert_eq!(find_last_index(&arr, |x| *x == 3, 4), 3);
        assert_eq!(find_last_index(&arr, |x| *x > 10, 4), -1);
    }

    #[test]
    fn test_flatten() {
        assert_eq!(flatten(&[vec![1, 2], vec![3, 4]]), vec![1, 2, 3, 4]);
        assert_eq!(flatten::<i32>(&[]), Vec::<i32>::new());
    }

    #[test]
    fn test_flatten_deep() {
        let data = [vec![vec![1, 2], vec![3]], vec![vec![4, 5]]];
        assert_eq!(flatten_deep(&data), vec![1, 2, 3, 4, 5]);
    }

    #[test]
    fn test_flatten_depth() {
        let data = [vec![1, 2], vec![3, 4]];
        assert_eq!(flatten_depth(&data, 1), vec![1, 2, 3, 4]);
    }

    #[test]
    fn test_from_pairs() {
        let pairs = vec![("a", 1), ("b", 2)];
        let map = from_pairs(&pairs);
        assert_eq!(map.get("a"), Some(&1));
        assert_eq!(map.get("b"), Some(&2));
    }

    #[test]
    fn test_head() {
        assert_eq!(head(&[1, 2, 3]), Some(&1));
        assert_eq!(head::<i32>(&[]), None);
    }

    #[test]
    fn test_index_of() {
        assert_eq!(index_of(&[1, 2, 3, 2], &2, 0), 1);
        assert_eq!(index_of(&[1, 2, 3, 2], &2, 2), 3);
        assert_eq!(index_of(&[1, 2, 3], &4, 0), -1);
    }

    #[test]
    fn test_initial() {
        assert_eq!(initial(&[1, 2, 3]), vec![1, 2]);
        assert_eq!(initial::<i32>(&[]), Vec::<i32>::new());
        assert_eq!(initial(&[1]), vec![]);
    }

    #[test]
    fn test_intersection() {
        assert_eq!(intersection(&[1, 2, 3], &[2, 3, 4]), vec![2, 3]);
        assert_eq!(intersection::<i32>(&[1], &[2]), vec![]);
    }

    #[test]
    fn test_intersection_by() {
        let result = intersection_by(&[1, 2, 3], &[2, 4, 6], |x| x % 2);
        assert_eq!(result, vec![2]);
    }

    #[test]
    fn test_intersection_with() {
        let result = intersection_with(&[1, 2, 3], &[2, 4], |a, b| a == b);
        assert_eq!(result, vec![2]);
    }

    #[test]
    fn test_join() {
        assert_eq!(join(&[1, 2, 3], ","), "1,2,3");
        assert_eq!(join::<i32>(&[], ","), "");
        assert_eq!(join(&[1], ","), "1");
    }

    #[test]
    fn test_last() {
        assert_eq!(last(&[1, 2, 3]), Some(&3));
        assert_eq!(last::<i32>(&[]), None);
    }

    #[test]
    fn test_last_index_of() {
        assert_eq!(last_index_of(&[1, 2, 3, 2], &2, 3), 3);
        assert_eq!(last_index_of(&[1, 2, 3, 2], &2, 1), 1);
        assert_eq!(last_index_of(&[1, 2, 3], &4, 3), -1);
    }

    #[test]
    fn test_nth() {
        assert_eq!(nth(&[1, 2, 3], 1), Some(&2));
        assert_eq!(nth(&[1, 2, 3], -1), Some(&3));
        assert_eq!(nth(&[1, 2, 3], 10), None);
        assert_eq!(nth(&[1, 2, 3], -10), None);
    }

    #[test]
    fn test_pull() {
        let mut v = vec![1, 2, 3, 1, 2];
        pull(&mut v, &[1, 2]);
        assert_eq!(v, vec![3]);
    }

    #[test]
    fn test_pull_all() {
        let mut v = vec![1, 2, 3, 1, 2];
        pull_all(&mut v, &[1, 2]);
        assert_eq!(v, vec![3]);
    }

    #[test]
    fn test_pull_all_by() {
        let mut v = vec![1.1, 2.2, 3.3, 4.4];
        pull_all_by(&mut v, &[1.1, 3.3], |x| (x * 10.0) as i32);
        assert_eq!(v, vec![2.2, 4.4]);
    }

    #[test]
    fn test_pull_all_with() {
        let mut v = vec![1, 2, 3, 4];
        pull_all_with(&mut v, &[2, 4], |a, b| a == b);
        assert_eq!(v, vec![1, 3]);
    }

    #[test]
    fn test_pull_at() {
        let mut v = vec![10, 20, 30, 40];
        let removed = pull_at(&mut v, &[1, 3]);
        assert_eq!(removed, vec![20, 40]);
        assert_eq!(v, vec![10, 30]);
        let mut empty = vec![1];
        let r = pull_at(&mut empty, &[5]);
        assert!(r.is_empty());
    }

    #[test]
    fn test_remove() {
        let mut v = vec![1, 2, 3, 4, 5];
        let removed = remove(&mut v, |x| x % 2 == 0);
        assert_eq!(removed, vec![2, 4]);
        assert_eq!(v, vec![1, 3, 5]);
    }

    #[test]
    fn test_reverse() {
        assert_eq!(reverse(&[1, 2, 3]), vec![3, 2, 1]);
        assert_eq!(reverse::<i32>(&[]), Vec::<i32>::new());
    }

    #[test]
    fn test_slice() {
        assert_eq!(slice(&[1, 2, 3, 4], 1, 3), vec![2, 3]);
        assert_eq!(slice(&[1, 2], 3, 5), Vec::<i32>::new());
        assert_eq!(slice(&[1, 2, 3], 2, 2), Vec::<i32>::new());
    }

    #[test]
    fn test_sorted_index() {
        assert_eq!(sorted_index(&[10, 20, 30, 40], &25), 2);
        assert_eq!(sorted_index(&[10, 20, 30], &5), 0);
        assert_eq!(sorted_index(&[10, 20, 30], &40), 3);
    }

    #[test]
    fn test_sorted_index_by() {
        let arr = [(1, "a"), (3, "b"), (5, "c")];
        let idx = sorted_index_by(&arr, &(4, "d"), |x| x.0);
        assert_eq!(idx, 2);
    }

    #[test]
    fn test_sorted_index_of() {
        assert_eq!(sorted_index_of(&[1, 2, 2, 3], &2), Some(1));
        assert_eq!(sorted_index_of(&[1, 2, 3], &4), None);
        assert_eq!(sorted_index_of(&[2, 2, 2], &2), Some(0));
    }

    #[test]
    fn test_sorted_last_index() {
        assert_eq!(sorted_last_index(&[10, 20, 30, 30, 40], &30), 4);
        assert_eq!(sorted_last_index(&[10, 20, 30], &5), 0);
        assert_eq!(sorted_last_index(&[10, 20, 30], &40), 3);
    }

    #[test]
    fn test_sorted_last_index_by() {
        let arr = [(1, "a"), (3, "b"), (3, "c"), (5, "d")];
        let idx = sorted_last_index_by(&arr, &(3, "x"), |x| x.0);
        assert_eq!(idx, 3);
    }

    #[test]
    fn test_sorted_last_index_of() {
        assert_eq!(sorted_last_index_of(&[1, 2, 2, 3], &2), Some(2));
        assert_eq!(sorted_last_index_of(&[1, 2, 3], &4), None);
        assert_eq!(sorted_last_index_of(&[2, 2, 2], &2), Some(2));
    }

    #[test]
    fn test_sorted_uniq() {
        assert_eq!(sorted_uniq(&[1, 1, 2, 3, 3]), vec![1, 2, 3]);
        assert_eq!(sorted_uniq::<i32>(&[]), Vec::<i32>::new());
        assert_eq!(sorted_uniq(&[1]), vec![1]);
    }

    #[test]
    fn test_sorted_uniq_by() {
        let arr = [(1, "a"), (1, "b"), (2, "c")];
        let result = sorted_uniq_by(&arr, |x| x.0);
        assert_eq!(result.len(), 2);
    }

    #[test]
    fn test_tail() {
        assert_eq!(tail(&[1, 2, 3]), vec![2, 3]);
        assert_eq!(tail::<i32>(&[]), Vec::<i32>::new());
        assert_eq!(tail(&[1]), vec![]);
    }

    #[test]
    fn test_take() {
        assert_eq!(take(&[1, 2, 3], 2), vec![1, 2]);
        assert_eq!(take(&[1, 2], 5), vec![1, 2]);
        assert_eq!(take::<i32>(&[], 3), Vec::<i32>::new());
    }

    #[test]
    fn test_take_right() {
        assert_eq!(take_right(&[1, 2, 3], 2), vec![2, 3]);
        assert_eq!(take_right(&[1, 2], 5), vec![1, 2]);
        assert_eq!(take_right::<i32>(&[], 3), Vec::<i32>::new());
    }

    #[test]
    fn test_take_right_while() {
        assert_eq!(take_right_while(&[1, 2, 3, 2, 1], |x| *x < 3), vec![2, 1]);
        assert_eq!(take_right_while::<i32, _>(&[], |_| true), Vec::<i32>::new());
    }

    #[test]
    fn test_take_while() {
        assert_eq!(take_while(&[1, 2, 3, 4], |x| *x < 3), vec![1, 2]);
        assert_eq!(take_while::<i32, _>(&[], |_| true), Vec::<i32>::new());
    }

    #[test]
    fn test_union() {
        let result = union(&[1, 2, 3], &[2, 3, 4]);
        assert_eq!(result, vec![1, 2, 3, 4]);
    }

    #[test]
    fn test_union_by() {
        let result = union_by(&[1, 3, 5], &[2, 4, 6], |x| x % 2);
        assert_eq!(result, vec![1, 2]);
    }

    #[test]
    fn test_union_with() {
        let result = union_with(&[1, 2], &[2, 3], |a, b| a == b);
        assert_eq!(result, vec![1, 2, 3]);
    }

    #[test]
    fn test_uniq() {
        assert_eq!(uniq(&[1, 2, 1, 3, 2]), vec![1, 2, 3]);
        assert_eq!(uniq::<i32>(&[]), Vec::<i32>::new());
    }

    #[test]
    fn test_uniq_by() {
        let result = uniq_by(&[1, 2, 1, 3], |x| x % 2);
        assert_eq!(result.len(), 2);
    }

    #[test]
    fn test_uniq_with() {
        let result = uniq_with(&[1, 2, 1, 3], |a, b| a == b);
        assert_eq!(result, vec![1, 2, 3]);
    }

    #[test]
    fn test_unzip() {
        let data = vec![vec![1, 2], vec![3, 4], vec![5, 6]];
        let result = unzip(&data);
        assert_eq!(result, vec![vec![1, 3, 5], vec![2, 4, 6]]);
        assert_eq!(unzip::<i32>(&[]), Vec::<Vec<i32>>::new());
    }

    #[test]
    fn test_unzip_with() {
        let data = vec![vec![1, 2], vec![3, 4]];
        let result = unzip_with(&data, |group| group.iter().sum::<i32>());
        assert_eq!(result, vec![4, 6]);
        assert_eq!(unzip_with::<i32, i32, _>(&[], |_| 0), Vec::<i32>::new());
    }

    #[test]
    fn test_without() {
        assert_eq!(without(&[1, 2, 3, 1, 2], &[1, 2]), vec![3]);
    }

    #[test]
    fn test_xor() {
        let result = xor(&[1, 2, 3], &[2, 3, 4]);
        assert_eq!(result, vec![1, 4]);
    }

    #[test]
    fn test_xor_by() {
        let result = xor_by(&[1, 3], &[2, 4], |x| x % 2);
        assert_eq!(result, vec![1, 2]);
    }

    #[test]
    fn test_xor_with() {
        let result = xor_with(&[1, 2, 3], &[2, 3, 4], |a, b| a == b);
        assert_eq!(result, vec![1, 4]);
    }

    #[test]
    fn test_zip() {
        let result = zip(&[&[1, 2], &[3, 4], &[5, 6]]);
        assert_eq!(result, vec![vec![1, 3, 5], vec![2, 4, 6]]);
        let result2 = zip::<i32>(&[]);
        assert!(result2.is_empty());
    }

    #[test]
    fn test_zip_object() {
        let result = zip_object(&["a", "b"], &[1, 2]);
        assert_eq!(result.get("a"), Some(&1));
        assert_eq!(result.get("b"), Some(&2));
        let result2 = zip_object(&["a", "b", "c"], &[1]);
        assert_eq!(result2.len(), 1);
    }

    #[test]
    fn test_zip_object_deep() {
        let keys = ["a".to_string(), "b".to_string()];
        let vals = ["1".to_string(), "2".to_string()];
        let result = zip_object_deep(&keys, &vals);
        assert_eq!(result.get("a"), Some(&"1".to_string()));
    }

    #[test]
    fn test_zip_with() {
        let result = zip_with(&[&[1, 2], &[3, 4], &[5, 6]], |group| group.iter().copied().sum::<i32>());
        assert_eq!(result, vec![9, 12]);
        let result2 = zip_with::<i32, i32, _>(&[], |_| 0);
        assert!(result2.is_empty());
    }
}
