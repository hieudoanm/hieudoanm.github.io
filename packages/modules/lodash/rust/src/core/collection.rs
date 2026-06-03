use std::collections::HashMap;
use std::hash::Hash;
use std::time::{SystemTime, UNIX_EPOCH};

/// A minimal pseudo-random number generator (xorshift64).
struct SimpleRng(u64);

impl SimpleRng {
    fn new() -> Self {
        let seed = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .unwrap_or_default()
            .as_nanos() as u64;
        SimpleRng(seed)
    }

    fn next_u64(&mut self) -> u64 {
        let mut x = self.0;
        x ^= x << 13;
        x ^= x >> 7;
        x ^= x << 17;
        self.0 = x;
        x
    }

    fn next_usize(&mut self, max: usize) -> usize {
        if max == 0 {
            return 0;
        }
        (self.next_u64() as usize) % max
    }
}

/// Creates a map composed of keys generated from the results of running each
/// element of `collection` through `iteratee`. The corresponding value of each
/// key is the number of times the key was returned by `iteratee`.
pub fn count_by<T, F, K>(collection: &[T], iteratee: F) -> HashMap<K, i32>
where
    F: Fn(&T) -> K,
    K: Eq + Hash,
{
    let mut result = HashMap::new();
    for item in collection {
        let key = iteratee(item);
        *result.entry(key).or_insert(0) += 1;
    }
    result
}

/// Checks if `predicate` returns `true` for **all** elements of `collection`.
/// Iteration is stopped early if a `false` result is found.
pub fn every<T, F>(collection: &[T], predicate: F) -> bool
where
    F: Fn(&T) -> bool,
{
    collection.iter().all(predicate)
}

/// Iterates over elements of `collection`, returning an owned vector of all
/// elements for which `predicate` returns `true`.
pub fn filter<T, F>(collection: Vec<T>, predicate: F) -> Vec<T>
where
    F: Fn(&T) -> bool,
{
    collection.into_iter().filter(predicate).collect()
}

/// Iterates over elements of `collection`, returning the **first** element
/// for which `predicate` returns `true`. Returns `None` if no element passes.
pub fn find<T, F>(collection: &[T], predicate: F) -> Option<&T>
where
    F: Fn(&T) -> bool,
{
    collection.iter().find(|x| predicate(x))
}

/// Iterates over elements of `collection` from right to left, returning the
/// **last** element for which `predicate` returns `true`.
pub fn find_last<T, F>(collection: &[T], predicate: F) -> Option<&T>
where
    F: Fn(&T) -> bool,
{
    collection.iter().rev().find(|x| predicate(x))
}

/// Creates a flattened array of values by running each element in `collection`
/// through `iteratee` and flattening the mapped results by one level.
pub fn flat_map<T, U, F>(collection: &[T], iteratee: F) -> Vec<U>
where
    F: Fn(&T) -> Vec<U>,
{
    collection.iter().flat_map(iteratee).collect()
}

/// Creates a flattened array of values by running each element in `collection`
/// through `iteratee` and recursively flattening the mapped results.
///
/// Note: due to the single-level `Vec<U>` return type, this is functionally
/// equivalent to [`flat_map`] — Rust's type system prevents recursive
/// flattening beyond one level without a recursive type or specialization.
pub fn flat_map_deep<T, U, F>(collection: &[T], iteratee: F) -> Vec<U>
where
    F: Fn(&T) -> Vec<U>,
    U: Clone,
{
    collection.iter().flat_map(iteratee).collect()
}

/// Creates a flattened array of values by running each element in `collection`
/// through `iteratee` and flattening the mapped results up to `depth` levels.
///
/// Note: due to the single-level `Vec<U>` return type, depths beyond 1 behave
/// identically to a depth of 1. The `depth` parameter is accepted for API
/// compatibility but cannot drive additional recursion without a recursive
/// type or specialization.
pub fn flat_map_depth<T, U, F>(collection: &[T], iteratee: F, depth: i32) -> Vec<U>
where
    F: Fn(&T) -> Vec<U>,
    U: Clone,
{
    if depth <= 0 {
        return Vec::new();
    }
    collection.iter().flat_map(iteratee).collect()
}

/// Iterates over elements of `collection` and invokes `iteratee` on each
/// element **in place** (receiving `&mut T`). The iteratee is called for each
/// element in order.
pub fn for_each<T, F>(collection: &mut [T], iteratee: F)
where
    F: Fn(&mut T),
{
    for item in collection.iter_mut() {
        iteratee(item);
    }
}

/// Iterates over elements of `collection` from right to left and invokes
/// `iteratee` on each element **in place**.
pub fn for_each_right<T, F>(collection: &mut [T], iteratee: F)
where
    F: Fn(&mut T),
{
    for item in collection.iter_mut().rev() {
        iteratee(item);
    }
}

/// Creates a map composed of keys generated from the results of running each
/// element of `collection` through `iteratee`. The corresponding value of each
/// key is a vector of references to the elements that produced the key.
pub fn group_by<'a, T, F, K>(collection: &'a [T], iteratee: F) -> HashMap<K, Vec<&'a T>>
where
    F: Fn(&T) -> K,
    K: Eq + Hash,
{
    let mut result: HashMap<K, Vec<&T>> = HashMap::new();
    for item in collection {
        let key = iteratee(item);
        result.entry(key).or_default().push(item);
    }
    result
}

/// Checks if `value` is in `collection` using linear search.
///
/// If `from_index` is negative, it is used as an offset from the end of the
/// collection — for example, `-1` starts the search from the last element.
pub fn includes<T: PartialEq>(collection: &[T], value: T, from_index: i32) -> bool {
    let len = collection.len() as i64;
    let mut start = from_index as i64;
    if start < 0 {
        start = len + start;
        if start < 0 {
            start = 0;
        }
    }
    let start = start as usize;
    collection[start..].iter().any(|x| *x == value)
}

/// Invokes `iteratee` on each element of `collection` and returns a vector of
/// the results. This is an alias for [`map`].
pub fn invoke_map<T, F, R>(collection: &[T], iteratee: F) -> Vec<R>
where
    F: Fn(&T) -> R,
{
    collection.iter().map(iteratee).collect()
}

/// Creates a map composed of keys generated from the results of running each
/// element of `collection` through `iteratee`. The corresponding value of each
/// key is the **last** element that produced the key (if duplicate keys occur,
/// earlier values are overwritten).
pub fn key_by<'a, T, F, K>(collection: &'a [T], iteratee: F) -> HashMap<K, &'a T>
where
    F: Fn(&T) -> K,
    K: Eq + Hash,
{
    let mut result = HashMap::new();
    for item in collection {
        let key = iteratee(item);
        result.insert(key, item);
    }
    result
}

/// Creates a vector of values by running each element in `collection` through
/// `iteratee`.
pub fn map<T, U, F>(collection: &[T], iteratee: F) -> Vec<U>
where
    F: Fn(&T) -> U,
{
    collection.iter().map(iteratee).collect()
}

/// Sorts `collection` by the results of running each element through
/// `iteratee`, applying the order directions specified in `orders`.
///
/// If `orders` is empty or the first element is `"asc"`, the sort is
/// ascending. If the first element is `"desc"`, the sort is descending.
/// Additional order strings beyond the first are ignored since a single
/// sort key is used.
pub fn order_by<T, F, K: Ord>(collection: Vec<T>, iteratee: F, orders: &[&str]) -> Vec<T>
where
    F: Fn(&T) -> K,
{
    let mut vec = collection;
    let ascending = orders.first().map_or(true, |o| *o != "desc");
    vec.sort_by(|a, b| {
        let ka = iteratee(a);
        let kb = iteratee(b);
        if ascending {
            ka.cmp(&kb)
        } else {
            kb.cmp(&ka)
        }
    });
    vec
}

/// Creates a tuple of two vectors: the first contains elements for which
/// `predicate` returns `true`, and the second contains elements for which
/// `predicate` returns `false`.
pub fn partition<T, F>(collection: Vec<T>, predicate: F) -> (Vec<T>, Vec<T>)
where
    F: Fn(&T) -> bool,
{
    let mut pass = Vec::new();
    let mut fail = Vec::new();
    for item in collection {
        if predicate(&item) {
            pass.push(item);
        } else {
            fail.push(item);
        }
    }
    (pass, fail)
}

/// Reduces `collection` to a value which is the accumulated result of running
/// each element in order through `iteratee`, where each successive invocation
/// is supplied the return value of the previous.
pub fn reduce<T, U, F>(collection: &[T], iteratee: F, accumulator: U) -> U
where
    F: Fn(U, &T) -> U,
{
    collection.iter().fold(accumulator, iteratee)
}

/// Reduces `collection` from right to left.
pub fn reduce_right<T, U, F>(collection: &[T], iteratee: F, accumulator: U) -> U
where
    F: Fn(U, &T) -> U,
{
    collection.iter().rev().fold(accumulator, iteratee)
}

/// The opposite of [`filter`]: returns a vector of all elements for which
/// `predicate` returns `false`.
pub fn reject<T, F>(collection: Vec<T>, predicate: F) -> Vec<T>
where
    F: Fn(&T) -> bool,
{
    collection.into_iter().filter(|x| !predicate(x)).collect()
}

/// Gets a random element from `collection`. Returns `None` if the collection
/// is empty.
pub fn sample<T: Clone>(collection: &[T]) -> Option<T> {
    let len = collection.len();
    if len == 0 {
        return None;
    }
    let mut rng = SimpleRng::new();
    let idx = rng.next_usize(len);
    Some(collection[idx].clone())
}

/// Gets `n` random distinct elements from `collection`. If `n` exceeds the
/// length of the collection, all elements are returned (shuffled).
pub fn sample_size<T: Clone>(collection: &[T], n: usize) -> Vec<T> {
    let len = collection.len();
    let count = n.min(len);
    let mut rng = SimpleRng::new();
    let mut result: Vec<T> = collection.to_vec();
    // Partial Fisher-Yates shuffle: only do `count` swaps
    for i in 0..count {
        let j = i + rng.next_usize(len - i);
        result.swap(i, j);
    }
    result.truncate(count);
    result
}

/// Creates a shuffled copy of `collection` using Fisher-Yates shuffle.
pub fn shuffle<T: Clone>(collection: &[T]) -> Vec<T> {
    let mut rng = SimpleRng::new();
    let mut result = collection.to_vec();
    let len = result.len();
    // Fisher-Yates (Knuth) shuffle, descending variant
    for i in (1..len).rev() {
        let j = rng.next_usize(i + 1);
        result.swap(i, j);
    }
    result
}

/// Returns the number of elements in `collection`.
pub fn size<T>(collection: &[T]) -> usize {
    collection.len()
}

/// Checks if `predicate` returns `true` for **any** element of `collection`.
/// Iteration is stopped early if a `true` result is found.
pub fn some<T, F>(collection: &[T], predicate: F) -> bool
where
    F: Fn(&T) -> bool,
{
    collection.iter().any(predicate)
}

/// Sorts `collection` in ascending order according to the results of running
/// each element through `iteratee`. The sort is stable.
pub fn sort_by<T, F, K: Ord>(collection: Vec<T>, iteratee: F) -> Vec<T>
where
    F: Fn(&T) -> K,
{
    let mut vec = collection;
    vec.sort_by(|a, b| iteratee(a).cmp(&iteratee(b)));
    vec
}
