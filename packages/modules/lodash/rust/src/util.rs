use std::collections::HashMap;
use std::sync::atomic::{AtomicU64, Ordering};

static ID_COUNTER: AtomicU64 = AtomicU64::new(0);

/// Attempts to execute `func`, returning `Ok(result)` on success or
/// `Err(message)` if the function panics.
pub fn attempt<F, R>(func: F) -> Result<R, String>
where
    F: Fn() -> R,
{
    match std::panic::catch_unwind(std::panic::AssertUnwindSafe(func)) {
        Ok(result) => Ok(result),
        Err(e) => Err(format!("{:?}", e)),
    }
}

/// Creates a function that iterates over `pairs` and invokes the
/// corresponding function for the first predicate that returns `true`.
pub fn cond<A, R>(pairs: Vec<(fn(&A) -> bool, fn(&A) -> R)>) -> impl Fn(&A) -> Option<R> {
    move |obj| {
        for (predicate, func) in &pairs {
            if predicate(obj) {
                return Some(func(obj));
            }
        }
        None
    }
}

/// Creates a function that checks whether every key in `source` satisfies
/// its corresponding predicate when looked up on the target object.
pub fn conforms(
    source: HashMap<String, fn(&str) -> bool>,
) -> impl Fn(&HashMap<String, String>) -> bool {
    move |obj| {
        for (key, predicate) in &source {
            match obj.get(key) {
                Some(value) => {
                    if !predicate(value) {
                        return false;
                    }
                }
                None => return false,
            }
        }
        true
    }
}

/// Creates a function that always returns the same `value`.
pub fn constant<T: Clone>(value: T) -> impl Fn() -> T {
    move || value.clone()
}

/// Returns `default_value` when `value` is equal to its default, otherwise
/// returns `value`.
pub fn default_to<T: Default + PartialEq>(value: T, default_value: T) -> T {
    if value == T::default() {
        default_value
    } else {
        value
    }
}

/// Creates a function that pipes a value through each function in
/// left-to-right order.
pub fn flow(funcs: Vec<fn(i32) -> i32>) -> impl Fn(i32) -> i32 {
    move |mut val| {
        for f in &funcs {
            val = f(val);
        }
        val
    }
}

/// Creates a function that pipes a value through each function in
/// right-to-left order.
pub fn flow_right(funcs: Vec<fn(i32) -> i32>) -> impl Fn(i32) -> i32 {
    move |mut val| {
        for f in funcs.iter().rev() {
            val = f(val);
        }
        val
    }
}

/// Returns the given `value` unchanged.
pub fn identity<T>(value: T) -> T {
    value
}

/// Wraps `func` in a new function that delegates to `func`.
pub fn iteratee<A, R>(func: fn(A) -> R) -> impl Fn(A) -> R {
    move |arg| func(arg)
}

/// Creates a function that checks whether an object has all key-value
/// pairs from `source`.
pub fn matches(source: HashMap<String, String>) -> impl Fn(&HashMap<String, String>) -> bool {
    move |obj| {
        for (key, value) in &source {
            if obj.get(key) != Some(value) {
                return false;
            }
        }
        true
    }
}

/// Creates a function that checks whether `key` in an object equals
/// `value`.
pub fn matches_property(
    key: String,
    value: String,
) -> impl Fn(&HashMap<String, String>) -> bool {
    move |obj| obj.get(&key) == Some(&value)
}

/// Creates a function that looks up `path` in an object.
pub fn method(path: String) -> impl Fn(&HashMap<String, String>) -> Option<&String> {
    move |obj| obj.get(&path)
}

/// Creates a function that looks up a path in the bound `object`.
pub fn method_of(object: HashMap<String, String>) -> impl Fn(String) -> Option<String> {
    move |path| object.get(&path).cloned()
}

/// Copies all key-value pairs from `source` into `object`.
pub fn mixin(object: &mut HashMap<String, String>, source: &HashMap<String, String>) {
    for (key, value) in source {
        object.insert(key.clone(), value.clone());
    }
}

/// A no-op function that does nothing.
pub fn noop() {}

/// Creates a function that returns its `n`-th argument from a slice.
pub fn nth_arg(n: usize) -> impl Fn(&[i32]) -> i32 {
    move |args| args[n]
}

/// Creates a function that invokes every iteratee with the same argument
/// and collects the results.
pub fn over<A, R: Clone>(iteratees: Vec<fn(&A) -> R>) -> impl Fn(&A) -> Vec<R> {
    move |obj| iteratees.iter().map(|f| f(obj)).collect()
}

/// Creates a function that returns `true` when **all** predicates return
/// `true` for the given object.
pub fn over_every<A>(predicates: Vec<fn(&A) -> bool>) -> impl Fn(&A) -> bool {
    move |obj| predicates.iter().all(|f| f(obj))
}

/// Creates a function that returns `true` when **any** predicate returns
/// `true` for the given object.
pub fn over_some<A>(predicates: Vec<fn(&A) -> bool>) -> impl Fn(&A) -> bool {
    move |obj| predicates.iter().any(|f| f(obj))
}

/// Creates a function that looks up `path` in an object.
pub fn property(path: String) -> impl Fn(&HashMap<String, String>) -> Option<&String> {
    move |obj| obj.get(&path)
}

/// Creates a function that looks up a path in the bound `object`.
pub fn property_of(object: HashMap<String, String>) -> impl Fn(String) -> Option<String> {
    move |path| object.get(&path).cloned()
}

/// Returns a `Vec` of numbers from `start` (inclusive) to `end` (exclusive)
/// incremented by `step`.
pub fn range(start: i32, end: i32, step: i32) -> Vec<i32> {
    let step = if step == 0 { 1 } else { step };
    let mut result = Vec::new();
    let mut i = start;
    if step > 0 {
        while i < end {
            result.push(i);
            i += step;
        }
    } else {
        while i > end {
            result.push(i);
            i += step;
        }
    }
    result
}

/// Like `range` but the returned `Vec` is in reverse order.
pub fn range_right(start: i32, end: i32, step: i32) -> Vec<i32> {
    let mut v = range(start, end, step);
    v.reverse();
    v
}

/// Returns an empty `Vec`.
pub fn stub_array() -> Vec<i32> {
    vec![]
}

/// Returns `false`.
pub fn stub_false() -> bool {
    false
}

/// Returns an empty `HashMap`.
pub fn stub_object() -> HashMap<String, String> {
    HashMap::new()
}

/// Returns an empty `String`.
pub fn stub_string() -> String {
    String::new()
}

/// Returns `true`.
pub fn stub_true() -> bool {
    true
}

/// Invokes `iteratee` `n` times with the index (0-based) and returns a
/// `Vec` of `()` results.
pub fn times<F>(n: usize, iteratee: F) -> Vec<()>
where
    F: Fn(usize),
{
    let mut result = Vec::with_capacity(n);
    for i in 0..n {
        iteratee(i);
        result.push(());
    }
    result
}

/// Converts a property string (dot / bracket notation) into a `Vec` of
/// path segments.
pub fn to_path(prop_string: &str) -> Vec<String> {
    prop_string
        .replace('[', ".")
        .replace(']', "")
        .split('.')
        .filter(|s| !s.is_empty())
        .map(String::from)
        .collect()
}

/// Generates a unique identifier with an optional `prefix`.
pub fn unique_id(prefix: &str) -> String {
    let id = ID_COUNTER.fetch_add(1, Ordering::SeqCst);
    format!("{}{}", prefix, id)
}
