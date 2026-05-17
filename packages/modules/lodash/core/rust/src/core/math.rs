pub fn add(a: f64, b: f64) -> f64 {
    a + b
}

pub fn ceil(n: f64, precision: i32) -> f64 {
    if precision >= 0 {
        let factor = 10.0_f64.powi(precision);
        (n * factor).ceil() / factor
    } else {
        let factor = 10.0_f64.powi(-precision);
        (n / factor).ceil() * factor
    }
}

pub fn divide(a: f64, b: f64) -> f64 {
    a / b
}

pub fn floor(n: f64, precision: i32) -> f64 {
    if precision >= 0 {
        let factor = 10.0_f64.powi(precision);
        (n * factor).floor() / factor
    } else {
        let factor = 10.0_f64.powi(-precision);
        (n / factor).floor() * factor
    }
}

pub fn max<T: PartialOrd + Clone>(collection: &[T]) -> Option<T> {
    if collection.is_empty() {
        return None;
    }
    let mut result = collection[0].clone();
    for item in &collection[1..] {
        if *item > result {
            result = item.clone();
        }
    }
    Some(result)
}

pub fn max_by<T: Clone, F>(collection: &[T], iteratee: F) -> Option<T>
where
    F: Fn(&T) -> f64,
{
    if collection.is_empty() {
        return None;
    }
    let mut result = collection[0].clone();
    let mut best = iteratee(&result);
    for item in &collection[1..] {
        let val = iteratee(item);
        if val > best {
            best = val;
            result = item.clone();
        }
    }
    Some(result)
}

pub fn mean(collection: &[f64]) -> f64 {
    sum(collection) / collection.len() as f64
}

pub fn mean_by<T, F>(collection: &[T], iteratee: F) -> f64
where
    F: Fn(&T) -> f64,
{
    sum_by(collection, iteratee) / collection.len() as f64
}

pub fn min<T: PartialOrd + Clone>(collection: &[T]) -> Option<T> {
    if collection.is_empty() {
        return None;
    }
    let mut result = collection[0].clone();
    for item in &collection[1..] {
        if *item < result {
            result = item.clone();
        }
    }
    Some(result)
}

pub fn min_by<T: Clone, F>(collection: &[T], iteratee: F) -> Option<T>
where
    F: Fn(&T) -> f64,
{
    if collection.is_empty() {
        return None;
    }
    let mut result = collection[0].clone();
    let mut best = iteratee(&result);
    for item in &collection[1..] {
        let val = iteratee(item);
        if val < best {
            best = val;
            result = item.clone();
        }
    }
    Some(result)
}

pub fn multiply(a: f64, b: f64) -> f64 {
    a * b
}

pub fn round(n: f64, precision: i32) -> f64 {
    if precision >= 0 {
        let factor = 10.0_f64.powi(precision);
        ((n * factor) + 0.5).floor() / factor
    } else {
        let factor = 10.0_f64.powi(-precision);
        ((n / factor) + 0.5).floor() * factor
    }
}

pub fn subtract(a: f64, b: f64) -> f64 {
    a - b
}

pub fn sum(collection: &[f64]) -> f64 {
    collection.iter().sum()
}

pub fn sum_by<T, F>(collection: &[T], iteratee: F) -> f64
where
    F: Fn(&T) -> f64,
{
    collection.iter().map(|item| iteratee(item)).sum()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_add() {
        assert_eq!(add(2.0, 3.0), 5.0);
        assert_eq!(add(-1.0, 1.0), 0.0);
    }

    #[test]
    fn test_ceil() {
        assert_eq!(ceil(4.006, 0), 5.0);
        assert_eq!(ceil(4.006, 2), 4.01);
        assert_eq!(ceil(4060.0, -2), 4100.0);
        assert_eq!(ceil(4.0, 0), 4.0);
    }

    #[test]
    fn test_divide() {
        assert_eq!(divide(6.0, 3.0), 2.0);
        assert_eq!(divide(5.0, 2.0), 2.5);
        assert!(divide(1.0, 0.0).is_infinite());
    }

    #[test]
    fn test_floor() {
        assert_eq!(floor(4.006, 0), 4.0);
        assert_eq!(floor(4.006, 2), 4.00);
        assert_eq!(floor(4060.0, -2), 4000.0);
        assert_eq!(floor(0.046, 2), 0.04);
    }

    #[test]
    fn test_max() {
        assert_eq!(max(&[1, 5, 3]), Some(5));
        assert_eq!(max::<i32>(&[]), None);
        assert_eq!(max(&[7]), Some(7));
    }

    #[test]
    fn test_max_by() {
        let items = [(-3.0, "a"), (5.0, "b"), (2.0, "c")];
        let result = max_by(&items, |(n, _)| *n);
        assert_eq!(result, Some((5.0, "b")));
        let empty: Vec<(f64, &str)> = vec![];
        assert_eq!(max_by(&empty, |(n, _)| *n), None);
    }

    #[test]
    fn test_mean() {
        assert_eq!(mean(&[1.0, 2.0, 3.0]), 2.0);
        assert_eq!(mean(&[5.0]), 5.0);
    }

    #[test]
    fn test_mean_by() {
        let items = [1, 2, 3];
        assert_eq!(mean_by(&items, |x| *x as f64), 2.0);
    }

    #[test]
    fn test_min() {
        assert_eq!(min(&[3, 1, 5]), Some(1));
        assert_eq!(min::<i32>(&[]), None);
        assert_eq!(min(&[7]), Some(7));
    }

    #[test]
    fn test_min_by() {
        let items = [(-3.0, "a"), (5.0, "b"), (2.0, "c")];
        let result = min_by(&items, |(n, _)| *n);
        assert_eq!(result, Some((-3.0, "a")));
        let empty: Vec<(f64, &str)> = vec![];
        assert_eq!(min_by(&empty, |(n, _)| *n), None);
    }

    #[test]
    fn test_multiply() {
        assert_eq!(multiply(3.0, 4.0), 12.0);
        assert_eq!(multiply(-2.0, 3.0), -6.0);
    }

    #[test]
    fn test_round() {
        assert_eq!(round(4.006, 0), 4.0);
        assert_eq!(round(4.006, 2), 4.01);
        assert_eq!(round(4060.0, -2), 4100.0);
        assert_eq!(round(4.5, 0), 5.0);
    }

    #[test]
    fn test_subtract() {
        assert_eq!(subtract(10.0, 3.0), 7.0);
        assert_eq!(subtract(3.0, 10.0), -7.0);
    }

    #[test]
    fn test_sum() {
        assert_eq!(sum(&[1.0, 2.0, 3.0]), 6.0);
        assert_eq!(sum(&[]), 0.0);
    }

    #[test]
    fn test_sum_by() {
        let items = [1.0, 2.0, 3.0];
        assert_eq!(sum_by(&items, |x| x * 2.0), 12.0);
    }
}
