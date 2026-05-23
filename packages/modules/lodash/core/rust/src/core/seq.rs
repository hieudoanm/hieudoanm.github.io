/// Seq is a wrapper that enables method chaining.
///
/// Wraps a value and provides chainable methods so that operations can be
/// composed sequentially. Call `value()` to unwrap the final result.
pub struct Seq<T> {
    value: T,
}

impl<T> Seq<T> {
    /// Creates a new `Seq` wrapping the given value.
    pub fn new(value: T) -> Self {
        Seq { value }
    }

    /// Returns the wrapped value, consuming the `Seq`.
    pub fn value(self) -> T {
        self.value
    }

    /// Returns `self` to allow chaining to be re-enabled (identity operation).
    pub fn chain(self) -> Self {
        self
    }

    /// Invokes `interceptor` with the wrapped value, then returns `self`.
    ///
    /// The interceptor receives an immutable reference and cannot modify the
    /// value. Use `thru` to transform the value.
    pub fn tap(self, interceptor: impl Fn(&T)) -> Self {
        interceptor(&self.value);
        self
    }

    /// Invokes `interceptor` with the wrapped value and returns a new `Seq`
    /// wrapping the result.
    pub fn thru<R>(self, interceptor: impl Fn(T) -> R) -> Seq<R> {
        Seq::new(interceptor(self.value))
    }

    /// Returns the wrapped value, consuming the `Seq`.
    ///
    /// Alias for `value` — provided for API compatibility.
    pub fn to_iterator(self) -> T {
        self.value
    }
}

/// Creates a `Seq` wrapper for chaining.
pub fn chain<T>(value: T) -> Seq<T> {
    Seq::new(value)
}

/// Invokes `interceptor` with `value` and returns `value`.
///
/// The interceptor receives an immutable reference. The original value is
/// returned unchanged.
pub fn tap<T>(value: T, interceptor: impl Fn(&T)) -> T {
    interceptor(&value);
    value
}

/// Invokes `interceptor` with `value` and returns the result.
///
/// Unlike `tap`, the interceptor receives ownership and may return a
/// different type.
pub fn thru<T, R>(value: T, interceptor: impl Fn(T) -> R) -> R {
    interceptor(value)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_seq_new_and_value() {
        let s = Seq::new(42);
        assert_eq!(s.value(), 42);
    }

    #[test]
    fn test_seq_chain() {
        let s = Seq::new(10).chain();
        assert_eq!(s.value(), 10);
    }

    #[test]
    fn test_seq_tap() {
        let s = Seq::new(5).tap(|n| { let _ = n; });
        assert_eq!(s.value(), 5);
    }

    #[test]
    fn test_seq_thru() {
        let s = Seq::new(3).thru(|n| n * 2);
        assert_eq!(s.value(), 6);
    }

    #[test]
    fn test_seq_to_iterator() {
        let s = Seq::new("hello");
        assert_eq!(s.to_iterator(), "hello");
    }

    #[test]
    fn test_chain_fn() {
        let s = chain(vec![1, 2, 3]);
        assert_eq!(s.value(), vec![1, 2, 3]);
    }

    #[test]
    fn test_tap_fn() {
        let v = tap(42, |n| { let _ = n; });
        assert_eq!(v, 42);
    }

    #[test]
    fn test_thru_fn() {
        let r = thru(7, |n| n * 3);
        assert_eq!(r, 21);
    }
}
