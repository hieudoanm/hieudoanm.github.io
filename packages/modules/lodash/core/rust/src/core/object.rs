use std::collections::HashMap;

/// Copies own enumerable string keyed properties of source objects to the destination object.
pub fn assign(
    mut object: HashMap<String, String>,
    sources: &[HashMap<String, String>],
) -> HashMap<String, String> {
    for source in sources {
        for (k, v) in source {
            object.insert(k.clone(), v.clone());
        }
    }
    object
}

/// Like `assign` but iterates over own and inherited source properties.
/// Implementation is identical to `assign` for `HashMap<String, String>`.
pub fn assign_in(
    mut object: HashMap<String, String>,
    sources: &[HashMap<String, String>],
) -> HashMap<String, String> {
    for source in sources {
        for (k, v) in source {
            object.insert(k.clone(), v.clone());
        }
    }
    object
}

/// Like `assign_in` but accepts a customizer that determines the assigned value.
/// The customizer receives the existing value and the source value.
pub fn assign_in_with<F>(
    mut object: HashMap<String, String>,
    sources: &[HashMap<String, String>],
    customizer: F,
) -> HashMap<String, String>
where
    F: Fn(&str, &str) -> String,
{
    for source in sources {
        for (k, v) in source {
            let existing = object.get(k).map(|s| s.as_str()).unwrap_or("");
            let new_value = customizer(existing, v);
            object.insert(k.clone(), new_value);
        }
    }
    object
}

/// Like `assign` but accepts a customizer that determines the assigned value.
/// The customizer receives the existing value and the source value.
pub fn assign_with<F>(
    mut object: HashMap<String, String>,
    sources: &[HashMap<String, String>],
    customizer: F,
) -> HashMap<String, String>
where
    F: Fn(&str, &str) -> String,
{
    for source in sources {
        for (k, v) in source {
            let existing = object.get(k).map(|s| s.as_str()).unwrap_or("");
            let new_value = customizer(existing, v);
            object.insert(k.clone(), new_value);
        }
    }
    object
}

/// Creates a slice of values corresponding to `paths` of the object.
pub fn at<'a>(object: &'a HashMap<String, String>, paths: &[String]) -> Vec<Option<&'a String>> {
    paths.iter().map(|p| object.get(p)).collect()
}

/// Creates an object that inherits from the given prototype.
/// Returns the prototype directly since `HashMap` doesn't support prototypal inheritance.
pub fn create(prototype: HashMap<String, String>) -> HashMap<String, String> {
    prototype
}

/// Assigns own enumerable string keyed properties of source objects to the destination object
/// for all destination properties that resolve to undefined.
pub fn defaults(
    mut object: HashMap<String, String>,
    sources: &[HashMap<String, String>],
) -> HashMap<String, String> {
    for source in sources {
        for (k, v) in source {
            if !object.contains_key(k) {
                object.insert(k.clone(), v.clone());
            }
        }
    }
    object
}

/// Like `defaults` but recursively assigns. Simplified to match `defaults` behavior.
pub fn defaults_deep(
    mut object: HashMap<String, String>,
    sources: &[HashMap<String, String>],
) -> HashMap<String, String> {
    for source in sources {
        for (k, v) in source {
            if !object.contains_key(k) {
                object.insert(k.clone(), v.clone());
            }
        }
    }
    object
}

/// Finds the first key for which the predicate returns true.
pub fn find_key<F>(object: &HashMap<String, String>, predicate: F) -> Option<String>
where
    F: Fn(&str) -> bool,
{
    for (k, v) in object {
        if predicate(v) {
            return Some(k.clone());
        }
    }
    None
}

/// Like `find_key` but iterates from right to left.
/// Identical to `find_key` since `HashMap` is unordered.
pub fn find_last_key<F>(object: &HashMap<String, String>, predicate: F) -> Option<String>
where
    F: Fn(&str) -> bool,
{
    find_key(object, predicate)
}

/// Iterates over own and inherited enumerable string keyed properties of an object.
pub fn for_in<F>(object: &HashMap<String, String>, iteratee: F)
where
    F: Fn(&str, &str),
{
    for (k, v) in object {
        iteratee(k, v);
    }
}

/// Like `for_in` but iterates from right to left.
/// Identical to `for_in` since `HashMap` is unordered.
pub fn for_in_right<F>(object: &HashMap<String, String>, iteratee: F)
where
    F: Fn(&str, &str),
{
    for_in(object, iteratee);
}

/// Iterates over own enumerable string keyed properties of an object.
pub fn for_own<F>(object: &HashMap<String, String>, iteratee: F)
where
    F: Fn(&str, &str),
{
    for (k, v) in object {
        iteratee(k, v);
    }
}

/// Like `for_own` but iterates from right to left.
/// Identical to `for_own` since `HashMap` is unordered.
pub fn for_own_right<F>(object: &HashMap<String, String>, iteratee: F)
where
    F: Fn(&str, &str),
{
    for_own(object, iteratee);
}

/// Gets the function names of an object. Always returns an empty vec for `HashMap`.
pub fn functions(_object: &HashMap<String, String>) -> Vec<String> {
    vec![]
}

/// Gets the function names of an object, including inherited functions.
/// Always returns an empty vec for `HashMap`.
pub fn functions_in(_object: &HashMap<String, String>) -> Vec<String> {
    vec![]
}

/// Gets the value at `path` of `object`. If the value is not found, returns `None`.
/// The `default_value` parameter is accepted for API compatibility but cannot be
/// returned due to type constraints (`&str` vs `&String`).
pub fn get<'a>(
    object: &'a HashMap<String, String>,
    path: &str,
    _default_value: Option<&'a str>,
) -> Option<&'a String> {
    object.get(path)
}

/// Checks if `path` is a direct property of `object`.
pub fn has(object: &HashMap<String, String>, path: &str) -> bool {
    object.contains_key(path)
}

/// Checks if `path` is a direct or inherited property of `object`.
pub fn has_in(object: &HashMap<String, String>, path: &str) -> bool {
    object.contains_key(path)
}

/// Creates an object composed of the inverted keys and values of `object`.
/// If duplicate values are encountered, later keys overwrite earlier ones.
pub fn invert(object: &HashMap<String, String>) -> HashMap<String, String> {
    let mut result = HashMap::new();
    for (k, v) in object {
        result.insert(v.clone(), k.clone());
    }
    result
}

/// Like `invert` but the inverted keys are generated by running each value through `iteratee`.
pub fn invert_by<F>(object: &HashMap<String, String>, iteratee: F) -> HashMap<String, String>
where
    F: Fn(&str) -> String,
{
    let mut result = HashMap::new();
    for (k, v) in object {
        let new_key = iteratee(v);
        result.insert(new_key, k.clone());
    }
    result
}

/// Invokes the method at `path` of `object`.
/// Simplified to just get the value at path.
pub fn invoke<'a>(object: &'a HashMap<String, String>, path: &str) -> Option<&'a String> {
    object.get(path)
}

/// Gets the own enumerable property names of `object`.
pub fn keys(object: &HashMap<String, String>) -> Vec<String> {
    object.keys().cloned().collect()
}

/// Gets the own and inherited enumerable property names of `object`.
pub fn keys_in(object: &HashMap<String, String>) -> Vec<String> {
    object.keys().cloned().collect()
}

/// Creates an object with the same values as `object` and keys generated by running
/// each own enumerable string keyed property through `iteratee`.
pub fn map_keys<F>(object: &HashMap<String, String>, iteratee: F) -> HashMap<String, String>
where
    F: Fn(&str) -> String,
{
    let mut result = HashMap::new();
    for (k, v) in object {
        result.insert(iteratee(k), v.clone());
    }
    result
}

/// Creates an object with the same keys as `object` and values generated by running
/// each own enumerable string keyed property through `iteratee`.
pub fn map_values<F>(object: &HashMap<String, String>, iteratee: F) -> HashMap<String, String>
where
    F: Fn(&str) -> String,
{
    let mut result = HashMap::new();
    for (k, v) in object {
        result.insert(k.clone(), iteratee(v));
    }
    result
}

/// Recursively merges own and inherited enumerable string keyed properties of source
/// objects into the destination object. Simplified to match `assign` behavior.
pub fn merge(
    mut object: HashMap<String, String>,
    sources: &[HashMap<String, String>],
) -> HashMap<String, String> {
    for source in sources {
        for (k, v) in source {
            object.insert(k.clone(), v.clone());
        }
    }
    object
}

/// Like `merge` but accepts a customizer that determines the merged value.
/// The customizer receives the existing value and the source value.
pub fn merge_with<F>(
    mut object: HashMap<String, String>,
    sources: &[HashMap<String, String>],
    customizer: F,
) -> HashMap<String, String>
where
    F: Fn(&str, &str) -> String,
{
    for source in sources {
        for (k, v) in source {
            let existing = object.get(k).map(|s| s.as_str()).unwrap_or("");
            let new_value = customizer(existing, v);
            object.insert(k.clone(), new_value);
        }
    }
    object
}

/// Creates an object composed of the own enumerable property paths of `object`
/// that are not omitted.
pub fn omit(object: &HashMap<String, String>, paths: &[String]) -> HashMap<String, String> {
    let mut result = HashMap::new();
    for (k, v) in object {
        if !paths.contains(k) {
            result.insert(k.clone(), v.clone());
        }
    }
    result
}

/// Creates an object composed of the own enumerable property paths of `object`
/// that are not omitted, excluding properties for which the predicate returns truthy.
pub fn omit_by<F>(object: &HashMap<String, String>, predicate: F) -> HashMap<String, String>
where
    F: Fn(&str) -> bool,
{
    let mut result = HashMap::new();
    for (k, v) in object {
        if !predicate(k) {
            result.insert(k.clone(), v.clone());
        }
    }
    result
}

/// Creates an object composed of the picked `paths` of `object`.
pub fn pick(object: &HashMap<String, String>, paths: &[String]) -> HashMap<String, String> {
    let mut result = HashMap::new();
    for path in paths {
        if let Some(v) = object.get(path) {
            result.insert(path.clone(), v.clone());
        }
    }
    result
}

/// Creates an object composed of the own enumerable property paths of `object`
/// for which the predicate returns truthy.
pub fn pick_by<F>(object: &HashMap<String, String>, predicate: F) -> HashMap<String, String>
where
    F: Fn(&str) -> bool,
{
    let mut result = HashMap::new();
    for (k, v) in object {
        if predicate(k) {
            result.insert(k.clone(), v.clone());
        }
    }
    result
}

/// Gets the value at `path` of `object`. Simplified: same as `get`.
pub fn result<'a>(object: &'a HashMap<String, String>, path: &str) -> Option<&'a String> {
    object.get(path)
}

/// Sets the value at `path` of `object`.
pub fn set(object: &mut HashMap<String, String>, path: &str, value: String) {
    object.insert(path.to_string(), value);
}

/// Like `set` but accepts a customizer that determines the value to set.
/// The customizer receives the existing value (or "") and the new value.
pub fn set_with<F>(object: &mut HashMap<String, String>, path: &str, value: String, customizer: F)
where
    F: Fn(&str, &str) -> String,
{
    let existing = object.get(path).map(|s| s.as_str()).unwrap_or("");
    let new_value = customizer(existing, &value);
    object.insert(path.to_string(), new_value);
}

/// Creates a vector of key-value pairs for `object`.
pub fn to_pairs(object: &HashMap<String, String>) -> Vec<(String, String)> {
    object.iter().map(|(k, v)| (k.clone(), v.clone())).collect()
}

/// Creates a vector of key-value pairs for `object`, including inherited properties.
pub fn to_pairs_in(object: &HashMap<String, String>) -> Vec<(String, String)> {
    object.iter().map(|(k, v)| (k.clone(), v.clone())).collect()
}

/// An alternative to a reducer for objects, transforming an object into a new accumulator.
pub fn transform<F>(
    object: &HashMap<String, String>,
    iteratee: F,
    mut accumulator: HashMap<String, String>,
) -> HashMap<String, String>
where
    F: Fn(&str, &str, &mut HashMap<String, String>),
{
    for (k, v) in object {
        iteratee(k, v, &mut accumulator);
    }
    accumulator
}

/// Removes the property at `path` of `object`. Returns true if the property was deleted.
pub fn unset(object: &mut HashMap<String, String>, path: &str) -> bool {
    object.remove(path).is_some()
}

/// Updates the value at `path` of `object` using the `updater` function.
/// The updater receives the current value (or `None` if not present) and returns the new value.
pub fn update<F>(object: &mut HashMap<String, String>, path: &str, updater: F)
where
    F: Fn(Option<&str>) -> String,
{
    let current = object.get(path).map(|s| s.as_str());
    let new_value = updater(current);
    object.insert(path.to_string(), new_value);
}

/// Like `update` but accepts a customizer that transforms the result of the updater
/// before setting it. The customizer receives the existing value and the updater result.
pub fn update_with<F, G>(
    object: &mut HashMap<String, String>,
    path: &str,
    updater: F,
    customizer: G,
) where
    F: Fn(Option<&str>) -> String,
    G: Fn(&str, &str) -> String,
{
    let current = object.get(path).map(|s| s.as_str());
    let updated = updater(current);
    let existing = object.get(path).map(|s| s.as_str()).unwrap_or("");
    let final_value = customizer(existing, &updated);
    object.insert(path.to_string(), final_value);
}

/// Gets the own enumerable string keyed property values of `object`.
pub fn values(object: &HashMap<String, String>) -> Vec<String> {
    object.values().cloned().collect()
}

/// Gets the own and inherited enumerable string keyed property values of `object`.
pub fn values_in(object: &HashMap<String, String>) -> Vec<String> {
    object.values().cloned().collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    fn make_map(pairs: &[(&str, &str)]) -> HashMap<String, String> {
        pairs.iter().map(|(k, v)| (k.to_string(), v.to_string())).collect()
    }

    #[test]
    fn test_assign() {
        let mut src = HashMap::new();
        src.insert("b".to_string(), "2".to_string());
        let obj = make_map(&[("a", "1")]);
        let result = assign(obj, &[src]);
        assert_eq!(result.get("a").unwrap(), "1");
        assert_eq!(result.get("b").unwrap(), "2");
    }

    #[test]
    fn test_assign_in() {
        let mut src = HashMap::new();
        src.insert("b".to_string(), "2".to_string());
        let obj = make_map(&[("a", "1")]);
        let result = assign_in(obj, &[src]);
        assert_eq!(result.get("a").unwrap(), "1");
        assert_eq!(result.get("b").unwrap(), "2");
    }

    #[test]
    fn test_assign_in_with() {
        let mut src = HashMap::new();
        src.insert("a".to_string(), "2".to_string());
        let obj = make_map(&[("a", "1")]);
        let result = assign_in_with(obj, &[src], |old, new| format!("{}{}", old, new));
        assert_eq!(result.get("a").unwrap(), "12");
    }

    #[test]
    fn test_assign_with() {
        let mut src = HashMap::new();
        src.insert("a".to_string(), "2".to_string());
        let obj = make_map(&[("a", "1")]);
        let result = assign_with(obj, &[src], |old, new| format!("{}{}", old, new));
        assert_eq!(result.get("a").unwrap(), "12");
    }

    #[test]
    fn test_at() {
        let obj = make_map(&[("a", "1"), ("b", "2")]);
        let paths = vec!["a".to_string(), "c".to_string()];
        let result = at(&obj, &paths);
        assert_eq!(result[0], Some(&"1".to_string()));
        assert_eq!(result[1], None);
    }

    #[test]
    fn test_create() {
        let proto = make_map(&[("a", "1")]);
        let result = create(proto);
        assert_eq!(result.get("a").unwrap(), "1");
    }

    #[test]
    fn test_defaults() {
        let obj = make_map(&[("a", "1")]);
        let mut src = HashMap::new();
        src.insert("b".to_string(), "2".to_string());
        src.insert("a".to_string(), "3".to_string());
        let result = defaults(obj, &[src]);
        assert_eq!(result.get("a").unwrap(), "1");
        assert_eq!(result.get("b").unwrap(), "2");
    }

    #[test]
    fn test_defaults_deep() {
        let obj = make_map(&[("a", "1")]);
        let mut src = HashMap::new();
        src.insert("b".to_string(), "2".to_string());
        let result = defaults_deep(obj, &[src]);
        assert_eq!(result.get("a").unwrap(), "1");
        assert_eq!(result.get("b").unwrap(), "2");
    }

    #[test]
    fn test_find_key() {
        let obj = make_map(&[("a", "hello"), ("b", "world")]);
        assert_eq!(find_key(&obj, |v| v.starts_with("w")), Some("b".to_string()));
        assert_eq!(find_key(&obj, |v| v == "x"), None);
    }

    #[test]
    fn test_find_last_key() {
        let obj = make_map(&[("a", "x"), ("b", "x")]);
        let result = find_last_key(&obj, |v| *v == *"x");
        assert!(result.is_some());
    }

    #[test]
    fn test_for_in() {
        let obj = make_map(&[("a", "1"), ("b", "2")]);
        for_in(&obj, |k, v| { drop((k, v)); });
    }

    #[test]
    fn test_for_in_right() {
        let obj = make_map(&[("a", "1"), ("b", "2")]);
        for_in_right(&obj, |k, v| { drop((k, v)); });
    }

    #[test]
    fn test_for_own() {
        let obj = make_map(&[("x", "10")]);
        for_own(&obj, |_, _| {});
    }

    #[test]
    fn test_for_own_right() {
        let obj = make_map(&[("x", "10")]);
        for_own_right(&obj, |_, _| {});
    }

    #[test]
    fn test_functions() {
        let obj = make_map(&[("a", "1")]);
        assert!(functions(&obj).is_empty());
        assert!(functions_in(&obj).is_empty());
    }

    #[test]
    fn test_get() {
        let obj = make_map(&[("a", "1")]);
        assert_eq!(get(&obj, "a", None), Some(&"1".to_string()));
        assert_eq!(get(&obj, "b", None), None);
    }

    #[test]
    fn test_has() {
        let obj = make_map(&[("a", "1")]);
        assert!(has(&obj, "a"));
        assert!(!has(&obj, "b"));
        assert!(has_in(&obj, "a"));
    }

    #[test]
    fn test_invert() {
        let obj = make_map(&[("a", "1"), ("b", "2")]);
        let inv = invert(&obj);
        assert_eq!(inv.get("1").unwrap(), "a");
        assert_eq!(inv.get("2").unwrap(), "b");
    }

    #[test]
    fn test_invert_by() {
        let obj = make_map(&[("a", "hello"), ("b", "world")]);
        let inv = invert_by(&obj, |v| v.to_uppercase());
        assert_eq!(inv.get("HELLO").unwrap(), "a");
    }

    #[test]
    fn test_invoke() {
        let obj = make_map(&[("a", "1")]);
        assert_eq!(invoke(&obj, "a"), Some(&"1".to_string()));
        assert_eq!(invoke(&obj, "b"), None);
    }

    #[test]
    fn test_keys() {
        let obj = make_map(&[("a", "1"), ("b", "2")]);
        let mut k = keys(&obj);
        k.sort();
        assert_eq!(k, vec!["a", "b"]);
        let mut ki = keys_in(&obj);
        ki.sort();
        assert_eq!(ki, vec!["a", "b"]);
    }

    #[test]
    fn test_map_keys() {
        let obj = make_map(&[("a", "1"), ("b", "2")]);
        let mapped = map_keys(&obj, |k| format!("_{}", k));
        assert!(mapped.contains_key("_a"));
        assert_eq!(mapped.get("_a").unwrap(), "1");
    }

    #[test]
    fn test_map_values() {
        let obj = make_map(&[("a", "1"), ("b", "2")]);
        let mapped = map_values(&obj, |v| format!("{}!", v));
        assert_eq!(mapped.get("a").unwrap(), "1!");
    }

    #[test]
    fn test_merge() {
        let mut src = HashMap::new();
        src.insert("b".to_string(), "2".to_string());
        let obj = make_map(&[("a", "1")]);
        let merged = merge(obj, &[src]);
        assert_eq!(merged.get("a").unwrap(), "1");
        assert_eq!(merged.get("b").unwrap(), "2");
    }

    #[test]
    fn test_merge_with() {
        let mut src = HashMap::new();
        src.insert("a".to_string(), "2".to_string());
        let obj = make_map(&[("a", "1")]);
        let merged = merge_with(obj, &[src], |_, new| format!("merged:{}", new));
        assert_eq!(merged.get("a").unwrap(), "merged:2");
    }

    #[test]
    fn test_omit() {
        let obj = make_map(&[("a", "1"), ("b", "2"), ("c", "3")]);
        let result = omit(&obj, &["a".to_string(), "c".to_string()]);
        assert_eq!(result.len(), 1);
        assert_eq!(result.get("b").unwrap(), "2");
    }

    #[test]
    fn test_omit_by() {
        let obj = make_map(&[("a", "1"), ("b", "2")]);
        let result = omit_by(&obj, |k| k == "a");
        assert_eq!(result.len(), 1);
        assert_eq!(result.get("b").unwrap(), "2");
    }

    #[test]
    fn test_pick() {
        let obj = make_map(&[("a", "1"), ("b", "2"), ("c", "3")]);
        let result = pick(&obj, &["a".to_string(), "c".to_string()]);
        assert_eq!(result.len(), 2);
        assert_eq!(result.get("a").unwrap(), "1");
        assert_eq!(result.get("c").unwrap(), "3");
    }

    #[test]
    fn test_pick_by() {
        let obj = make_map(&[("a", "1"), ("b", "2")]);
        let result = pick_by(&obj, |k| k == "a");
        assert_eq!(result.len(), 1);
        assert_eq!(result.get("a").unwrap(), "1");
    }

    #[test]
    fn test_result() {
        let obj = make_map(&[("a", "1")]);
        assert_eq!(result(&obj, "a"), Some(&"1".to_string()));
        assert_eq!(result(&obj, "b"), None);
    }

    #[test]
    fn test_set() {
        let mut obj = make_map(&[("a", "1")]);
        set(&mut obj, "b", "2".to_string());
        assert_eq!(obj.get("b").unwrap(), "2");
    }

    #[test]
    fn test_set_with() {
        let mut obj = make_map(&[("a", "hello")]);
        set_with(&mut obj, "a", "!".to_string(), |old, new| format!("{}{}", old, new));
        assert_eq!(obj.get("a").unwrap(), "hello!");
    }

    #[test]
    fn test_to_pairs() {
        let obj = make_map(&[("a", "1"), ("b", "2")]);
        let mut pairs = to_pairs(&obj);
        pairs.sort();
        assert_eq!(pairs, vec![("a".to_string(), "1".to_string()), ("b".to_string(), "2".to_string())]);
        let mut pairs_in = to_pairs_in(&obj);
        pairs_in.sort();
        assert_eq!(pairs_in, pairs);
    }

    #[test]
    fn test_transform() {
        let obj = make_map(&[("a", "1"), ("b", "2")]);
        let acc = HashMap::new();
        let result = transform(&obj, |k, v, acc| { acc.insert(k.to_string(), format!("{}!", v)); }, acc);
        assert_eq!(result.get("a").unwrap(), "1!");
    }

    #[test]
    fn test_unset() {
        let mut obj = make_map(&[("a", "1"), ("b", "2")]);
        assert!(unset(&mut obj, "a"));
        assert!(!unset(&mut obj, "c"));
        assert_eq!(obj.len(), 1);
    }

    #[test]
    fn test_update() {
        let mut obj = make_map(&[("a", "hello")]);
        update(&mut obj, "a", |v| format!("{}!", v.unwrap_or("")));
        assert_eq!(obj.get("a").unwrap(), "hello!");
        update(&mut obj, "b", |v| format!("new:{}", v.unwrap_or("default")));
        assert_eq!(obj.get("b").unwrap(), "new:default");
    }

    #[test]
    fn test_update_with() {
        let mut obj = make_map(&[("a", "hello")]);
        update_with(&mut obj, "a", |v| v.unwrap_or("").to_string(), |old, new| format!("{}-{}", old, new));
        assert_eq!(obj.get("a").unwrap(), "hello-hello");
    }

    #[test]
    fn test_values() {
        let obj = make_map(&[("a", "1"), ("b", "2")]);
        let mut v = values(&obj);
        v.sort();
        assert_eq!(v, vec!["1", "2"]);
        let mut vi = values_in(&obj);
        vi.sort();
        assert_eq!(vi, vec!["1", "2"]);
    }
}
