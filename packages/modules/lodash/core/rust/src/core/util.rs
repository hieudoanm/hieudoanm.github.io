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
pub fn matches_property(key: String, value: String) -> impl Fn(&HashMap<String, String>) -> bool {
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

#[cfg(test)]
mod tests {
    use super::*;
    use std::collections::HashMap;

    #[test]
    fn test_attempt_ok() {
        let result = attempt(|| 42);
        assert_eq!(result, Ok(42));
    }

    #[test]
    fn test_attempt_panic() {
        let result = attempt(|| -> i32 { panic!("boom") });
        assert!(result.is_err());
    }

    #[test]
    fn test_cond() {
        fn is_neg(x: &i32) -> bool { *x < 0 }
        fn negate(x: &i32) -> i32 { -*x }
        fn is_pos(x: &i32) -> bool { *x > 0 }
        fn identity(x: &i32) -> i32 { *x }
        let pairs = vec![
            (is_neg as fn(&i32) -> bool, negate as fn(&i32) -> i32),
            (is_pos as fn(&i32) -> bool, identity as fn(&i32) -> i32),
        ];
        let f = cond(pairs);
        assert_eq!(f(&-5), Some(5));
        assert_eq!(f(&3), Some(3));
        assert_eq!(f(&0), None);
    }

    #[test]
    fn test_conforms() {
        fn is_positive(s: &str) -> bool { s.parse::<i32>().unwrap_or(0) > 0 }
        fn is_negative(s: &str) -> bool { s.parse::<i32>().unwrap_or(0) < 0 }
        let mut source = HashMap::new();
        source.insert("p".to_string(), is_positive as fn(&str) -> bool);
        let f = conforms(source);
        let mut obj = HashMap::new();
        obj.insert("p".to_string(), "5".to_string());
        assert!(f(&obj));
        obj.insert("p".to_string(), "-1".to_string());
        assert!(!f(&obj));
        let empty: HashMap<String, String> = HashMap::new();
        assert!(!f(&empty));
    }

    #[test]
    fn test_constant() {
        let f = constant(42);
        assert_eq!(f(), 42);
        assert_eq!(f(), 42);
    }

    #[test]
    fn test_default_to() {
        assert_eq!(default_to(0, 42), 42);
        assert_eq!(default_to(5, 42), 5);
        assert_eq!(default_to(0.0, 1.0), 1.0);
        assert_eq!(default_to(3.0, 1.0), 3.0);
        assert_eq!(default_to(String::new(), "fallback".to_string()), "fallback");
        assert_eq!(default_to("hello".to_string(), "fallback".to_string()), "hello");
    }

    #[test]
    fn test_flow() {
        let fns: Vec<fn(i32) -> i32> = vec![|x| x + 1, |x| x * 2];
        let f = flow(fns);
        assert_eq!(f(5), 12);
    }

    #[test]
    fn test_flow_right() {
        let fns: Vec<fn(i32) -> i32> = vec![|x| x + 1, |x| x * 2];
        let f = flow_right(fns);
        assert_eq!(f(5), 11);
    }

    #[test]
    fn test_identity() {
        assert_eq!(identity(42), 42);
        assert_eq!(identity("hello"), "hello");
    }

    #[test]
    fn test_iteratee() {
        let f = iteratee(|x: i32| x * 2);
        assert_eq!(f(5), 10);
    }

    #[test]
    fn test_matches() {
        let mut source = HashMap::new();
        source.insert("a".to_string(), "1".to_string());
        let f = matches(source);
        let mut obj = HashMap::new();
        obj.insert("a".to_string(), "1".to_string());
        assert!(f(&obj));
        obj.insert("a".to_string(), "2".to_string());
        assert!(!f(&obj));
    }

    #[test]
    fn test_matches_property() {
        let f = matches_property("a".to_string(), "1".to_string());
        let mut obj = HashMap::new();
        obj.insert("a".to_string(), "1".to_string());
        assert!(f(&obj));
        obj.insert("a".to_string(), "2".to_string());
        assert!(!f(&obj));
    }

    #[test]
    fn test_method_and_property() {
        let mut obj = HashMap::new();
        obj.insert("key".to_string(), "val".to_string());
        let m = method("key".to_string());
        assert_eq!(m(&obj), Some(&"val".to_string()));
        let p = property("key".to_string());
        assert_eq!(p(&obj), Some(&"val".to_string()));
        let missing = method("none".to_string());
        assert_eq!(missing(&obj), None);
    }

    #[test]
    fn test_method_of_and_property_of() {
        let mut obj = HashMap::new();
        obj.insert("a".to_string(), "1".to_string());
        let f = method_of(obj);
        assert_eq!(f("a".to_string()), Some("1".to_string()));
        assert_eq!(f("b".to_string()), None);
    }

    #[test]
    fn test_mixin() {
        let mut obj = HashMap::new();
        obj.insert("a".to_string(), "1".to_string());
        let mut src = HashMap::new();
        src.insert("b".to_string(), "2".to_string());
        mixin(&mut obj, &src);
        assert_eq!(obj.len(), 2);
        assert_eq!(obj.get("b").unwrap(), "2");
    }

    #[test]
    fn test_noop() {
        noop();
    }

    #[test]
    fn test_nth_arg() {
        let f = nth_arg(1);
        assert_eq!(f(&[10, 20, 30]), 20);
    }

    #[test]
    fn test_over() {
        let fns: Vec<fn(&i32) -> String> = vec![
            |x| format!("{}", x),
            |x| format!("{}", x * 2),
        ];
        let f = over(fns);
        assert_eq!(f(&5), vec!["5", "10"]);
    }

    #[test]
    fn test_over_every() {
        let predicates: Vec<fn(&i32) -> bool> = vec![
            |x| *x > 0,
            |x| *x < 10,
        ];
        let f = over_every(predicates);
        assert!(f(&5));
        assert!(!f(&-1));
    }

    #[test]
    fn test_over_some() {
        let predicates: Vec<fn(&i32) -> bool> = vec![
            |x| *x < 0,
            |x| *x > 10,
        ];
        let f = over_some(predicates);
        assert!(!f(&5));
        assert!(f(&-1));
    }

    #[test]
    fn test_range_positive() {
        assert_eq!(range(0, 5, 1), vec![0, 1, 2, 3, 4]);
        assert_eq!(range(0, 5, 2), vec![0, 2, 4]);
    }

    #[test]
    fn test_range_negative_step() {
        assert_eq!(range(5, 0, -1), vec![5, 4, 3, 2, 1]);
    }

    #[test]
    fn test_range_zero_step() {
        assert_eq!(range(0, 5, 0), vec![0, 1, 2, 3, 4]);
    }

    #[test]
    fn test_range_empty() {
        let empty: Vec<i32> = vec![];
        assert_eq!(range(0, 0, 1), empty);
        assert_eq!(range(5, 0, 1), empty);
        assert_eq!(range(0, 5, -1), empty);
    }

    #[test]
    fn test_range_right() {
        assert_eq!(range_right(0, 5, 1), vec![4, 3, 2, 1, 0]);
    }

    #[test]
    fn test_stub_functions() {
        assert_eq!(stub_array(), vec![]);
        assert!(!stub_false());
        assert_eq!(stub_object(), HashMap::new());
        assert_eq!(stub_string(), "");
        assert!(stub_true());
    }

    #[test]
    fn test_times() {
        let result = times(3, |i| { let _ = i; });
        assert_eq!(result.len(), 3);
    }

    #[test]
    fn test_to_path() {
        assert_eq!(to_path("a.b.c"), vec!["a", "b", "c"]);
        assert_eq!(to_path("a[0].b"), vec!["a", "0", "b"]);
        assert_eq!(to_path("a.b[0].c"), vec!["a", "b", "0", "c"]);
        assert_eq!(to_path(""), Vec::<String>::new());
    }

    #[test]
    fn test_unique_id() {
        let id1 = unique_id("test_");
        let id2 = unique_id("test_");
        assert_ne!(id1, id2);
        assert!(id1.starts_with("test_"));
        assert!(id2.starts_with("test_"));
    }

    #[test]
    fn test_property_of() {
        let mut obj = HashMap::new();
        obj.insert("a".to_string(), "1".to_string());
        let f = property_of(obj);
        assert_eq!(f("a".to_string()), Some("1".to_string()));
        assert_eq!(f("b".to_string()), None);
    }
}
