use std::any::Any;
use std::collections::HashMap;
use std::fmt::Display;
use std::time::SystemTime;

/// Wraps a value in a Vec.
pub fn cast_array<T>(value: T) -> Vec<T> {
    vec![value]
}

/// Creates a shallow clone of value.
pub fn clone<T: Clone>(value: &T) -> T {
    value.clone()
}

/// Creates a deep clone of value.
pub fn clone_deep<T: Clone>(value: &T) -> T {
    value.clone()
}

/// Checks if object conforms to source by comparing all source properties.
pub fn conforms_to<K: Eq + std::hash::Hash, V: PartialEq>(
    object: &HashMap<K, V>,
    source: &HashMap<K, V>,
) -> bool {
    source.iter().all(|(k, v)| object.get(k) == Some(v))
}

/// Checks if value is the same value as other (SameValueZero equality).
pub fn eq<T: PartialEq>(value: &T, other: &T) -> bool {
    value == other
}

/// Checks if value is greater than other.
pub fn gt<T: PartialOrd>(value: T, other: T) -> bool {
    value > other
}

/// Checks if value is greater than or equal to other.
pub fn gte<T: PartialOrd>(value: T, other: T) -> bool {
    value >= other
}

/// Checks if value is array-like (a slice reference).
pub fn is_array<T>(_value: &[T]) -> bool {
    true
}

/// Checks if value is a boolean.
pub fn is_boolean(value: &dyn Any) -> bool {
    value.is::<bool>()
}

/// Checks if value is a date (SystemTime).
pub fn is_date(value: &dyn Any) -> bool {
    value.is::<SystemTime>()
}

/// Checks if value is empty (empty slice).
pub fn is_empty<T>(value: &[T]) -> bool {
    value.is_empty()
}

/// Checks if values are equivalent (SameValueZero).
pub fn is_equal<T: PartialEq>(value: &T, other: &T) -> bool {
    value == other
}

/// Checks if values are equivalent using a custom comparator.
pub fn is_equal_with<T, F>(value: &T, other: &T, comparator: F) -> bool
where
    F: Fn(&T, &T) -> bool,
{
    comparator(value, other)
}

/// Checks if value is an error.
pub fn is_error(value: &dyn Any) -> bool {
    value.is::<String>() || value.is::<std::io::Error>()
}

/// Checks if value is a finite number.
pub fn is_finite(value: f64) -> bool {
    value.is_finite()
}

/// Checks if value is a function (always false in Rust).
pub fn is_function() -> bool {
    false
}

/// Checks if value is an integer.
pub fn is_integer(value: f64) -> bool {
    value.fract() == 0.0 && value.is_finite()
}

/// Checks if value is a valid array-like length (0 to 2^32-1).
pub fn is_length(value: usize) -> bool {
    value <= u32::MAX as usize
}

/// Checks if value is a HashMap.
pub fn is_map<K, V>(_value: &HashMap<K, V>) -> bool {
    true
}

/// Checks if value is NaN.
pub fn is_nan(value: f64) -> bool {
    value.is_nan()
}

/// Checks if value is None.
pub fn is_nil<T>(value: &Option<T>) -> bool {
    value.is_none()
}

/// Checks if value is None.
pub fn is_null<T>(value: &Option<T>) -> bool {
    value.is_none()
}

/// Checks if value is a number.
pub fn is_number(value: &dyn Any) -> bool {
    value.is::<i8>()
        || value.is::<i16>()
        || value.is::<i32>()
        || value.is::<i64>()
        || value.is::<u8>()
        || value.is::<u16>()
        || value.is::<u32>()
        || value.is::<u64>()
        || value.is::<f32>()
        || value.is::<f64>()
        || value.is::<isize>()
        || value.is::<usize>()
}

/// Checks if value is a number (always true for f64).
pub fn is_number_f64(_value: f64) -> bool {
    true
}

/// Checks if value is object-like.
pub fn is_object<T>(_value: &T) -> bool {
    true
}

/// Checks if value is a plain object.
pub fn is_plain_object<T>(_value: &T) -> bool {
    true
}

/// Checks if value is a RegExp (always false without regex crate).
pub fn is_reg_exp(_value: &dyn Any) -> bool {
    false
}

/// Checks if value is a safe integer.
pub fn is_safe_integer(value: f64) -> bool {
    let max_safe = 9007199254740991.0;
    value.is_finite() && value.fract() == 0.0 && value >= -max_safe && value <= max_safe
}

/// Checks if value is a Set (always false).
pub fn is_set() -> bool {
    false
}

/// Checks if value is a String.
pub fn is_string(value: &dyn Any) -> bool {
    value.is::<String>()
}

/// Checks if value is a Symbol (always false).
pub fn is_symbol() -> bool {
    false
}

/// Checks if value is a typed array (slice reference).
pub fn is_typed_array<T>(_value: &[T]) -> bool {
    true
}

/// Checks if value is undefined (always false in Rust).
pub fn is_undefined() -> bool {
    false
}

/// Checks if value is a WeakMap (always false).
pub fn is_weak_map() -> bool {
    false
}

/// Checks if value is a WeakSet (always false).
pub fn is_weak_set() -> bool {
    false
}

/// Checks if value is less than other.
pub fn lt<T: PartialOrd>(value: T, other: T) -> bool {
    value < other
}

/// Checks if value is less than or equal to other.
pub fn lte<T: PartialOrd>(value: T, other: T) -> bool {
    value <= other
}

/// Converts value to a Vec.
pub fn to_array<T: Clone>(value: &[T]) -> Vec<T> {
    value.to_vec()
}

/// Converts value to a finite number.
pub fn to_finite(value: f64) -> f64 {
    if value.is_finite() {
        value
    } else {
        0.0
    }
}

/// Converts value to an integer.
pub fn to_integer(value: f64) -> i64 {
    value as i64
}

/// Converts value to a valid array-like length (capped at 2^32-1).
pub fn to_length(value: usize) -> usize {
    value.min(u32::MAX as usize)
}

/// Converts a string to a number.
pub fn to_number(value: &str) -> f64 {
    value.parse().unwrap_or(0.0)
}

/// Returns the value as-is (identity function).
pub fn to_plain_object<T>(value: T) -> T {
    value
}

/// Converts value to a safe integer.
pub fn to_safe_integer(value: f64) -> i64 {
    let max_safe: i64 = 9007199254740991;
    let i = value as i64;
    if i >= -max_safe && i <= max_safe {
        i
    } else {
        0
    }
}

/// Converts a value to its string representation.
pub fn to_string(value: &dyn Display) -> String {
    format!("{}", value)
}
