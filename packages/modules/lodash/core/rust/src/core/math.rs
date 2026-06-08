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
