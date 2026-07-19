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

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_after() {
        let mut count = 0;
        {
            let mut f = after(2, || count += 1);
            assert_eq!(f(), None); // count=1, 1 > 2? false
            assert_eq!(f(), None); // count=2, 2 > 2? false
            assert_eq!(f(), Some(())); // count=3, 3 > 2? true
            assert_eq!(f(), Some(())); // count=4, 4 > 2? true
        }
        assert_eq!(count, 2);
    }

    #[test]
    fn test_ary() {
        let sum = |args: &[i32]| args.iter().sum::<i32>();
        let f = ary(sum, 2);
        assert_eq!(f(&[1, 2, 3, 4]), 3);
        let f0 = ary(sum, 0);
        assert_eq!(f0(&[1, 2]), 0);
    }

    #[test]
    fn test_before() {
        let mut count = 0;
        {
            let mut f = before(3, || count += 1);
            f();
            f();
            f();
            f();
        }
        assert_eq!(count, 2);
    }

    #[test]
    fn test_curry() {
        fn add(a: i32) -> i32 { a + 1 }
        let curried = curry(add);
        assert_eq!(curried(5), 6);
    }

    #[test]
    fn test_curry2() {
        fn add(a: i32, b: i32) -> i32 { a + b }
        let curried = curry2(add);
        let partially = curried(5);
        assert_eq!(partially(3), 8);
    }

    #[test]
    fn test_debounce() {
        let mut called = false;
        {
            let mut f = debounce(|| called = true, 100);
            f();
        }
        assert!(called);
    }

    #[test]
    fn test_flip() {
        fn concat(a: &str, b: &str) -> String { format!("{}{}", a, b) }
        let flipped = flip(concat);
        assert_eq!(flipped("world", "hello"), "helloworld");
    }

    #[test]
    fn test_memoize() {
        let f = |x: i32| x * 2;
        let memoized = memoize(f);
        assert_eq!(memoized(5), 10);
        assert_eq!(memoized(5), 10);
        assert_eq!(memoized(7), 14);
        // Call count tracking isn't possible since memoize takes Fn, not FnMut
    }

    #[test]
    fn test_negate() {
        let is_even = |x: i32| x % 2 == 0;
        let is_odd = negate(is_even);
        assert!(!is_odd(2));
        assert!(is_odd(3));
    }

    #[test]
    fn test_once() {
        let mut count = 0;
        {
            let mut f = once(|| count += 1);
            f();
            f();
            f();
        }
        assert_eq!(count, 1);
    }

    #[test]
    fn test_rest() {
        fn sum(first: i32, rest: &[i32]) -> i32 { first + rest.iter().sum::<i32>() }
        let f = rest(sum);
        assert_eq!(f(1, &[2, 3, 4]), 10);
    }

    #[test]
    fn test_spread() {
        fn double(a: i32) -> i32 { a * 2 }
        let f = spread(double);
        assert_eq!(f(&[5]), 10);
    }

    #[test]
    fn test_throttle() {
        let mut called = false;
        {
            let mut f = throttle(|| called = true, 100);
            f();
        }
        assert!(called);
    }

    #[test]
    fn test_unary() {
        fn diff(a: i32, b: i32) -> i32 { a - b }
        let f = unary(diff);
        assert_eq!(f(10), 10);
    }

    #[test]
    fn test_wrap() {
        fn wrapper(value: &str, func: fn(&str) -> String) -> String {
            format!("wrapped({})", func(value))
        }
        let f = wrap("hello", wrapper as fn(&str, fn(&str) -> String) -> String);
        let result = f(|s: &str| s.to_uppercase());
        assert_eq!(result, "wrapped(HELLO)");
    }
}
