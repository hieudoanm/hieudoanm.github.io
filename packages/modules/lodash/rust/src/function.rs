use std::cell::RefCell;
use std::collections::HashMap;
use std::hash::Hash;

/// Creates a function that invokes `func` once it's been called `n` or more times.
pub fn after<F>(n: u32, func: F) -> impl FnMut() -> Option<()>
where
    F: FnMut(),
{
    let mut count = 0u32;
    let mut func = func;
    move || {
        count += 1;
        if count > n {
            func();
            Some(())
        } else {
            None
        }
    }
}

/// Creates a function that invokes `func` with up to `n` arguments, ignoring any additional arguments.
pub fn ary<F, R>(func: F, n: usize) -> impl Fn(&[i32]) -> R
where
    F: Fn(&[i32]) -> R,
{
    move |args: &[i32]| {
        let end = n.min(args.len());
        func(&args[..end])
    }
}

/// Creates a function that invokes `func` while it's called less than `n` times.
/// Subsequent calls to the returned function will not invoke `func`.
pub fn before<F>(n: u32, func: F) -> impl FnMut()
where
    F: FnMut(),
{
    let mut count = 0u32;
    let mut func = func;
    move || {
        count += 1;
        if count < n {
            func();
        }
    }
}

/// Creates a function that accepts arguments until fully applied (one-argument version).
pub fn curry<A, R>(func: fn(A) -> R) -> impl Fn(A) -> R {
    move |a: A| func(a)
}

/// Creates a function that accepts arguments until fully applied (two-argument version).
pub fn curry2<A, B, R>(func: fn(A, B) -> R) -> impl Fn(A) -> Box<dyn Fn(B) -> R>
where
    A: Clone + 'static,
    B: 'static,
    R: 'static,
{
    move |a: A| Box::new(move |b: B| func(a.clone(), b))
}

/// Creates a debounced function that delays invoking `func`.
/// Simplified version — calls `func` directly without actual timer.
pub fn debounce<F>(func: F, _wait: u64) -> impl FnMut()
where
    F: FnMut(),
{
    func
}

/// Creates a function that invokes `func` with arguments reversed.
pub fn flip<A, B, R>(func: fn(A, B) -> R) -> impl Fn(B, A) -> R {
    move |b: B, a: A| func(a, b)
}

/// Creates a function that memoizes the result of `func`.
pub fn memoize<A, B>(func: impl Fn(A) -> B) -> impl Fn(A) -> B
where
    A: Eq + Hash + Clone + 'static,
    B: Clone + 'static,
{
    let cache: RefCell<HashMap<A, B>> = RefCell::new(HashMap::new());
    move |arg: A| {
        let mut cache = cache.borrow_mut();
        if let Some(result) = cache.get(&arg) {
            result.clone()
        } else {
            let result = func(arg.clone());
            cache.insert(arg, result.clone());
            result
        }
    }
}

/// Creates a function that negates the result of the predicate.
pub fn negate<F>(predicate: F) -> impl Fn(i32) -> bool
where
    F: Fn(i32) -> bool,
{
    move |x: i32| !predicate(x)
}

/// Creates a function that is restricted to invoking `func` once.
/// Subsequent calls to the returned function will not invoke `func`.
pub fn once<F>(func: F) -> impl FnMut()
where
    F: FnMut(),
{
    let mut called = false;
    let mut func = func;
    move || {
        if !called {
            called = true;
            func();
        }
    }
}

/// Creates a function that invokes `func` with all arguments after the first.
pub fn rest<A, R>(func: fn(A, &[A]) -> R) -> impl Fn(A, &[A]) -> R {
    move |a: A, args: &[A]| func(a, args)
}

/// Creates a function that invokes `func` with an array of arguments.
pub fn spread<A, R>(func: fn(A) -> R) -> impl Fn(&[A]) -> R
where
    A: Clone,
{
    move |args: &[A]| func(args[0].clone())
}

/// Creates a throttled function that only invokes `func` at most once per `wait` milliseconds.
/// Simplified version — calls `func` directly without actual timer.
pub fn throttle<F>(func: F, _wait: u64) -> impl FnMut()
where
    F: FnMut(),
{
    func
}

/// Creates a function that accepts up to one argument, ignoring any additional arguments.
pub fn unary<A, R>(func: fn(A, A) -> R) -> impl Fn(A) -> R
where
    A: Default,
{
    move |a: A| func(a, A::default())
}

/// Creates a function that provides `value` to `wrapper` as its first argument.
pub fn wrap<A, B, R>(value: A, wrapper: fn(A, B) -> R) -> impl Fn(B) -> R
where
    A: Clone,
{
    move |b: B| wrapper(value.clone(), b)
}
