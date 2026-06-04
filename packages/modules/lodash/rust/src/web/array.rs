use wasm_bindgen::prelude::*;
use crate::core::array;

fn f64s_to_array(vals: &[f64]) -> js_sys::Array {
    let arr = js_sys::Array::new();
    for v in vals {
        arr.push(&JsValue::from_f64(*v));
    }
    arr
}

fn strings_to_array(vals: &[String]) -> js_sys::Array {
    let arr = js_sys::Array::new();
    for v in vals {
        arr.push(&JsValue::from_str(v));
    }
    arr
}

#[wasm_bindgen]
pub fn chunk(array: &[f64], size: usize) -> js_sys::Array {
    let result = array::chunk(array, size);
    let outer = js_sys::Array::new();
    for chunk in &result {
        outer.push(&f64s_to_array(chunk));
    }
    outer
}

#[wasm_bindgen(js_name = "chunkStrings")]
pub fn chunk_string(array: Vec<String>, size: usize) -> js_sys::Array {
    let result = array::chunk(&array, size);
    let outer = js_sys::Array::new();
    for chunk in &result {
        outer.push(&strings_to_array(chunk));
    }
    outer
}

#[wasm_bindgen]
pub fn compact(array: &[f64]) -> js_sys::Array {
    f64s_to_array(&array::compact(array))
}

#[wasm_bindgen(js_name = "compactStrings")]
pub fn compact_string(array: Vec<String>) -> Vec<String> {
    array::compact(&array)
}

#[wasm_bindgen]
pub fn drop(array: &[f64], n: usize) -> js_sys::Array {
    f64s_to_array(&array::drop(array, n))
}

#[wasm_bindgen(js_name = "dropStrings")]
pub fn drop_string(array: Vec<String>, n: usize) -> Vec<String> {
    array::drop(&array, n)
}

#[wasm_bindgen(js_name = "dropRight")]
pub fn drop_right(array: &[f64], n: usize) -> js_sys::Array {
    f64s_to_array(&array::drop_right(array, n))
}

#[wasm_bindgen(js_name = "dropRightStrings")]
pub fn drop_right_string(array: Vec<String>, n: usize) -> Vec<String> {
    array::drop_right(&array, n)
}

#[wasm_bindgen(js_name = "findIndex")]
pub fn find_index(array: &[f64], predicate: &js_sys::Function, from_index: usize) -> i32 {
    array::find_index(array, |x| {
        let this = JsValue::NULL;
        let val = JsValue::from_f64(*x);
        predicate.call1(&this, &val).map(|r| r.is_truthy()).unwrap_or(false)
    }, from_index)
}

#[wasm_bindgen(js_name = "findIndexStrings")]
pub fn find_index_string(array: Vec<String>, predicate: &js_sys::Function, from_index: usize) -> i32 {
    array::find_index(&array, |x| {
        let this = JsValue::NULL;
        let val = JsValue::from_str(x);
        predicate.call1(&this, &val).map(|r| r.is_truthy()).unwrap_or(false)
    }, from_index)
}

#[wasm_bindgen(js_name = "findLastIndex")]
pub fn find_last_index(array: &[f64], predicate: &js_sys::Function, from_index: usize) -> i32 {
    array::find_last_index(array, |x| {
        let this = JsValue::NULL;
        let val = JsValue::from_f64(*x);
        predicate.call1(&this, &val).map(|r| r.is_truthy()).unwrap_or(false)
    }, from_index)
}

#[wasm_bindgen(js_name = "findLastIndexStrings")]
pub fn find_last_index_string(array: Vec<String>, predicate: &js_sys::Function, from_index: usize) -> i32 {
    array::find_last_index(&array, |x| {
        let this = JsValue::NULL;
        let val = JsValue::from_str(x);
        predicate.call1(&this, &val).map(|r| r.is_truthy()).unwrap_or(false)
    }, from_index)
}

#[wasm_bindgen]
pub fn head(array: &[f64]) -> f64 {
    array::head(array).copied().unwrap_or(f64::NAN)
}

#[wasm_bindgen(js_name = "headString")]
pub fn head_string(array: Vec<String>) -> Option<String> {
    array::head(&array).cloned()
}

#[wasm_bindgen(js_name = "indexOf")]
pub fn index_of(array: &[f64], value: f64, from_index: usize) -> i32 {
    array::index_of(array, &value, from_index)
}

#[wasm_bindgen(js_name = "indexOfStrings")]
pub fn index_of_string(array: Vec<String>, value: String, from_index: usize) -> i32 {
    array::index_of(&array, &value, from_index)
}

#[wasm_bindgen]
pub fn initial(array: &[f64]) -> js_sys::Array {
    f64s_to_array(&array::initial(array))
}

#[wasm_bindgen(js_name = "initialStrings")]
pub fn initial_string(array: Vec<String>) -> Vec<String> {
    array::initial(&array)
}

#[wasm_bindgen]
pub fn join(array: &[f64], separator: &str) -> String {
    array::join(array, separator)
}

#[wasm_bindgen(js_name = "joinStrings")]
pub fn join_string(array: Vec<String>, separator: &str) -> String {
    array::join(&array, separator)
}

#[wasm_bindgen]
pub fn last(array: &[f64]) -> f64 {
    array::last(array).copied().unwrap_or(f64::NAN)
}

#[wasm_bindgen(js_name = "lastString")]
pub fn last_string(array: Vec<String>) -> Option<String> {
    array::last(&array).cloned()
}

#[wasm_bindgen(js_name = "lastIndexOf")]
pub fn last_index_of(array: &[f64], value: f64, from_index: usize) -> i32 {
    array::last_index_of(array, &value, from_index)
}

#[wasm_bindgen(js_name = "lastIndexOfStrings")]
pub fn last_index_of_string(array: Vec<String>, value: String, from_index: usize) -> i32 {
    array::last_index_of(&array, &value, from_index)
}

#[wasm_bindgen]
pub fn nth(array: &[f64], n: i32) -> f64 {
    array::nth(array, n).copied().unwrap_or(f64::NAN)
}

#[wasm_bindgen(js_name = "nthString")]
pub fn nth_string(array: Vec<String>, n: i32) -> Option<String> {
    array::nth(&array, n).cloned()
}

#[wasm_bindgen]
pub fn reverse(array: &[f64]) -> js_sys::Array {
    f64s_to_array(&array::reverse(array))
}

#[wasm_bindgen(js_name = "reverseStrings")]
pub fn reverse_string(array: Vec<String>) -> Vec<String> {
    array::reverse(&array)
}

#[wasm_bindgen]
pub fn slice(array: &[f64], start: usize, end: usize) -> js_sys::Array {
    f64s_to_array(&array::slice(array, start, end))
}

#[wasm_bindgen(js_name = "sliceStrings")]
pub fn slice_string(array: Vec<String>, start: usize, end: usize) -> Vec<String> {
    array::slice(&array, start, end)
}

#[wasm_bindgen]
pub fn tail(array: &[f64]) -> js_sys::Array {
    f64s_to_array(&array::tail(array))
}

#[wasm_bindgen(js_name = "tailStrings")]
pub fn tail_string(array: Vec<String>) -> Vec<String> {
    array::tail(&array)
}

#[wasm_bindgen]
pub fn take(array: &[f64], n: usize) -> js_sys::Array {
    f64s_to_array(&array::take(array, n))
}

#[wasm_bindgen(js_name = "takeStrings")]
pub fn take_string(array: Vec<String>, n: usize) -> Vec<String> {
    array::take(&array, n)
}

#[wasm_bindgen(js_name = "takeRight")]
pub fn take_right(array: &[f64], n: usize) -> js_sys::Array {
    f64s_to_array(&array::take_right(array, n))
}

#[wasm_bindgen(js_name = "takeRightStrings")]
pub fn take_right_string(array: Vec<String>, n: usize) -> Vec<String> {
    array::take_right(&array, n)
}

#[wasm_bindgen]
pub fn without(array: &[f64], values: &[f64]) -> js_sys::Array {
    f64s_to_array(&array::without(array, values))
}

#[wasm_bindgen(js_name = "withoutStrings")]
pub fn without_string(array: Vec<String>, values: Vec<String>) -> Vec<String> {
    array::without(&array, &values)
}

// === String-only (Eq/Hash/Ord required, no f64 version) ===

#[wasm_bindgen(js_name = "difference")]
pub fn difference_string(array: Vec<String>, values: Vec<String>) -> Vec<String> {
    array::difference(&array, &values)
}

#[wasm_bindgen(js_name = "intersection")]
pub fn intersection_string(array: Vec<String>, values: Vec<String>) -> Vec<String> {
    array::intersection(&array, &values)
}

#[wasm_bindgen(js_name = "sortedIndex")]
pub fn sorted_index_string(array: Vec<String>, value: String) -> usize {
    array::sorted_index(&array, &value)
}

#[wasm_bindgen(js_name = "sortedIndexOf")]
pub fn sorted_index_of_string(array: Vec<String>, value: String) -> Option<usize> {
    array::sorted_index_of(&array, &value)
}

#[wasm_bindgen(js_name = "sortedLastIndex")]
pub fn sorted_last_index_string(array: Vec<String>, value: String) -> usize {
    array::sorted_last_index(&array, &value)
}

#[wasm_bindgen(js_name = "sortedLastIndexOf")]
pub fn sorted_last_index_of_string(array: Vec<String>, value: String) -> Option<usize> {
    array::sorted_last_index_of(&array, &value)
}

#[wasm_bindgen(js_name = "sortedUniq")]
pub fn sorted_uniq_string(array: Vec<String>) -> Vec<String> {
    array::sorted_uniq(&array)
}

#[wasm_bindgen(js_name = "union")]
pub fn union_string(array: Vec<String>, values: Vec<String>) -> Vec<String> {
    array::union(&array, &values)
}

#[wasm_bindgen(js_name = "uniq")]
pub fn uniq_string(array: Vec<String>) -> Vec<String> {
    array::uniq(&array)
}

#[wasm_bindgen(js_name = "xor")]
pub fn xor_string(array: Vec<String>, values: Vec<String>) -> Vec<String> {
    array::xor(&array, &values)
}

// === Closure-based f64 + String ===

#[wasm_bindgen(js_name = "differenceWith")]
pub fn difference_with(array: &[f64], values: &[f64], comparator: &js_sys::Function) -> js_sys::Array {
    f64s_to_array(&array::difference_with(array, values, |a, b| {
        let this = JsValue::NULL;
        let val_a = JsValue::from_f64(*a);
        let val_b = JsValue::from_f64(*b);
        comparator.call2(&this, &val_a, &val_b).map(|r| r.is_truthy()).unwrap_or(false)
    }))
}

#[wasm_bindgen(js_name = "differenceWithStrings")]
pub fn difference_with_string(array: Vec<String>, values: Vec<String>, comparator: &js_sys::Function) -> Vec<String> {
    array::difference_with(&array, &values, |a, b| {
        let this = JsValue::NULL;
        let val_a = JsValue::from_str(a);
        let val_b = JsValue::from_str(b);
        comparator.call2(&this, &val_a, &val_b).map(|r| r.is_truthy()).unwrap_or(false)
    })
}

#[wasm_bindgen(js_name = "dropWhile")]
pub fn drop_while(array: &[f64], predicate: &js_sys::Function) -> js_sys::Array {
    f64s_to_array(&array::drop_while(array, |x| {
        let this = JsValue::NULL;
        let val = JsValue::from_f64(*x);
        predicate.call1(&this, &val).map(|r| r.is_truthy()).unwrap_or(false)
    }))
}

#[wasm_bindgen(js_name = "dropWhileStrings")]
pub fn drop_while_string(array: Vec<String>, predicate: &js_sys::Function) -> Vec<String> {
    array::drop_while(&array, |x| {
        let this = JsValue::NULL;
        let val = JsValue::from_str(x);
        predicate.call1(&this, &val).map(|r| r.is_truthy()).unwrap_or(false)
    })
}

#[wasm_bindgen(js_name = "dropRightWhile")]
pub fn drop_right_while(array: &[f64], predicate: &js_sys::Function) -> js_sys::Array {
    f64s_to_array(&array::drop_right_while(array, |x| {
        let this = JsValue::NULL;
        let val = JsValue::from_f64(*x);
        predicate.call1(&this, &val).map(|r| r.is_truthy()).unwrap_or(false)
    }))
}

#[wasm_bindgen(js_name = "dropRightWhileStrings")]
pub fn drop_right_while_string(array: Vec<String>, predicate: &js_sys::Function) -> Vec<String> {
    array::drop_right_while(&array, |x| {
        let this = JsValue::NULL;
        let val = JsValue::from_str(x);
        predicate.call1(&this, &val).map(|r| r.is_truthy()).unwrap_or(false)
    })
}

#[wasm_bindgen(js_name = "intersectionWith")]
pub fn intersection_with(array: &[f64], values: &[f64], comparator: &js_sys::Function) -> js_sys::Array {
    f64s_to_array(&array::intersection_with(array, values, |a, b| {
        let this = JsValue::NULL;
        let val_a = JsValue::from_f64(*a);
        let val_b = JsValue::from_f64(*b);
        comparator.call2(&this, &val_a, &val_b).map(|r| r.is_truthy()).unwrap_or(false)
    }))
}

#[wasm_bindgen(js_name = "intersectionWithStrings")]
pub fn intersection_with_string(array: Vec<String>, values: Vec<String>, comparator: &js_sys::Function) -> Vec<String> {
    array::intersection_with(&array, &values, |a, b| {
        let this = JsValue::NULL;
        let val_a = JsValue::from_str(a);
        let val_b = JsValue::from_str(b);
        comparator.call2(&this, &val_a, &val_b).map(|r| r.is_truthy()).unwrap_or(false)
    })
}

#[wasm_bindgen(js_name = "takeWhile")]
pub fn take_while(array: &[f64], predicate: &js_sys::Function) -> js_sys::Array {
    f64s_to_array(&array::take_while(array, |x| {
        let this = JsValue::NULL;
        let val = JsValue::from_f64(*x);
        predicate.call1(&this, &val).map(|r| r.is_truthy()).unwrap_or(false)
    }))
}

#[wasm_bindgen(js_name = "takeWhileStrings")]
pub fn take_while_string(array: Vec<String>, predicate: &js_sys::Function) -> Vec<String> {
    array::take_while(&array, |x| {
        let this = JsValue::NULL;
        let val = JsValue::from_str(x);
        predicate.call1(&this, &val).map(|r| r.is_truthy()).unwrap_or(false)
    })
}

#[wasm_bindgen(js_name = "takeRightWhile")]
pub fn take_right_while(array: &[f64], predicate: &js_sys::Function) -> js_sys::Array {
    f64s_to_array(&array::take_right_while(array, |x| {
        let this = JsValue::NULL;
        let val = JsValue::from_f64(*x);
        predicate.call1(&this, &val).map(|r| r.is_truthy()).unwrap_or(false)
    }))
}

#[wasm_bindgen(js_name = "takeRightWhileStrings")]
pub fn take_right_while_string(array: Vec<String>, predicate: &js_sys::Function) -> Vec<String> {
    array::take_right_while(&array, |x| {
        let this = JsValue::NULL;
        let val = JsValue::from_str(x);
        predicate.call1(&this, &val).map(|r| r.is_truthy()).unwrap_or(false)
    })
}

#[wasm_bindgen(js_name = "unionWith")]
pub fn union_with(array: &[f64], values: &[f64], comparator: &js_sys::Function) -> js_sys::Array {
    f64s_to_array(&array::union_with(array, values, |a, b| {
        let this = JsValue::NULL;
        let val_a = JsValue::from_f64(*a);
        let val_b = JsValue::from_f64(*b);
        comparator.call2(&this, &val_a, &val_b).map(|r| r.is_truthy()).unwrap_or(false)
    }))
}

#[wasm_bindgen(js_name = "unionWithStrings")]
pub fn union_with_string(array: Vec<String>, values: Vec<String>, comparator: &js_sys::Function) -> Vec<String> {
    array::union_with(&array, &values, |a, b| {
        let this = JsValue::NULL;
        let val_a = JsValue::from_str(a);
        let val_b = JsValue::from_str(b);
        comparator.call2(&this, &val_a, &val_b).map(|r| r.is_truthy()).unwrap_or(false)
    })
}

#[wasm_bindgen(js_name = "uniqWith")]
pub fn uniq_with(array: &[f64], comparator: &js_sys::Function) -> js_sys::Array {
    f64s_to_array(&array::uniq_with(array, |a, b| {
        let this = JsValue::NULL;
        let val_a = JsValue::from_f64(*a);
        let val_b = JsValue::from_f64(*b);
        comparator.call2(&this, &val_a, &val_b).map(|r| r.is_truthy()).unwrap_or(false)
    }))
}

#[wasm_bindgen(js_name = "uniqWithStrings")]
pub fn uniq_with_string(array: Vec<String>, comparator: &js_sys::Function) -> Vec<String> {
    array::uniq_with(&array, |a, b| {
        let this = JsValue::NULL;
        let val_a = JsValue::from_str(a);
        let val_b = JsValue::from_str(b);
        comparator.call2(&this, &val_a, &val_b).map(|r| r.is_truthy()).unwrap_or(false)
    })
}

#[wasm_bindgen(js_name = "xorWith")]
pub fn xor_with(array: &[f64], values: &[f64], comparator: &js_sys::Function) -> js_sys::Array {
    f64s_to_array(&array::xor_with(array, values, |a, b| {
        let this = JsValue::NULL;
        let val_a = JsValue::from_f64(*a);
        let val_b = JsValue::from_f64(*b);
        comparator.call2(&this, &val_a, &val_b).map(|r| r.is_truthy()).unwrap_or(false)
    }))
}

#[wasm_bindgen(js_name = "xorWithStrings")]
pub fn xor_with_string(array: Vec<String>, values: Vec<String>, comparator: &js_sys::Function) -> Vec<String> {
    array::xor_with(&array, &values, |a, b| {
        let this = JsValue::NULL;
        let val_a = JsValue::from_str(a);
        let val_b = JsValue::from_str(b);
        comparator.call2(&this, &val_a, &val_b).map(|r| r.is_truthy()).unwrap_or(false)
    })
}
