use wasm_bindgen::prelude::*;
use crate::core::collection;

#[wasm_bindgen]
pub fn every(array: &[f64], predicate: &js_sys::Function) -> bool {
    collection::every(array, |x| {
        let this = JsValue::NULL;
        let val = JsValue::from_f64(*x);
        predicate.call1(&this, &val).map(|r| r.is_truthy()).unwrap_or(false)
    })
}

#[wasm_bindgen(js_name = "everyStrings")]
pub fn every_string(array: Vec<String>, predicate: &js_sys::Function) -> bool {
    collection::every(&array, |x| {
        let this = JsValue::NULL;
        let val = JsValue::from_str(x);
        predicate.call1(&this, &val).map(|r| r.is_truthy()).unwrap_or(false)
    })
}

#[wasm_bindgen]
pub fn filter(array: Vec<f64>, predicate: &js_sys::Function) -> Vec<f64> {
    collection::filter(array, |x| {
        let this = JsValue::NULL;
        let val = JsValue::from_f64(*x);
        predicate.call1(&this, &val).map(|r| r.is_truthy()).unwrap_or(false)
    })
}

#[wasm_bindgen(js_name = "filterStrings")]
pub fn filter_string(array: Vec<String>, predicate: &js_sys::Function) -> Vec<String> {
    collection::filter(array, |x| {
        let this = JsValue::NULL;
        let val = JsValue::from_str(x);
        predicate.call1(&this, &val).map(|r| r.is_truthy()).unwrap_or(false)
    })
}

#[wasm_bindgen]
pub fn find(array: &[f64], predicate: &js_sys::Function) -> f64 {
    collection::find(array, |x| {
        let this = JsValue::NULL;
        let val = JsValue::from_f64(*x);
        predicate.call1(&this, &val).map(|r| r.is_truthy()).unwrap_or(false)
    }).copied().unwrap_or(f64::NAN)
}

#[wasm_bindgen(js_name = "findString")]
pub fn find_string(array: Vec<String>, predicate: &js_sys::Function) -> Option<String> {
    collection::find(&array, |x| {
        let this = JsValue::NULL;
        let val = JsValue::from_str(x);
        predicate.call1(&this, &val).map(|r| r.is_truthy()).unwrap_or(false)
    }).cloned()
}

#[wasm_bindgen(js_name = "findLast")]
pub fn find_last(array: &[f64], predicate: &js_sys::Function) -> f64 {
    collection::find_last(array, |x| {
        let this = JsValue::NULL;
        let val = JsValue::from_f64(*x);
        predicate.call1(&this, &val).map(|r| r.is_truthy()).unwrap_or(false)
    }).copied().unwrap_or(f64::NAN)
}

#[wasm_bindgen(js_name = "findLastString")]
pub fn find_last_string(array: Vec<String>, predicate: &js_sys::Function) -> Option<String> {
    collection::find_last(&array, |x| {
        let this = JsValue::NULL;
        let val = JsValue::from_str(x);
        predicate.call1(&this, &val).map(|r| r.is_truthy()).unwrap_or(false)
    }).cloned()
}

#[wasm_bindgen(js_name = "forEach")]
pub fn for_each(mut array: Vec<f64>, iteratee: &js_sys::Function) {
    collection::for_each(&mut array, |x| {
        let this = JsValue::NULL;
        let val = JsValue::from_f64(*x);
        let _ = iteratee.call1(&this, &val);
    });
}

#[wasm_bindgen(js_name = "forEachStrings")]
pub fn for_each_string(mut array: Vec<String>, iteratee: &js_sys::Function) {
    collection::for_each(&mut array, |x| {
        let this = JsValue::NULL;
        let val = JsValue::from_str(x);
        let _ = iteratee.call1(&this, &val);
    });
}

#[wasm_bindgen]
pub fn includes(array: &[f64], value: f64, from_index: i32) -> bool {
    collection::includes(array, value, from_index)
}

#[wasm_bindgen(js_name = "includesStrings")]
pub fn includes_string(array: Vec<String>, value: String, from_index: i32) -> bool {
    collection::includes(&array, value, from_index)
}

#[wasm_bindgen]
pub fn map(array: &[f64], iteratee: &js_sys::Function) -> Vec<f64> {
    collection::map(array, |x| {
        let this = JsValue::NULL;
        let val = JsValue::from_f64(*x);
        iteratee.call1(&this, &val).ok().and_then(|r| r.as_f64()).unwrap_or(f64::NAN)
    })
}

#[wasm_bindgen(js_name = "mapStrings")]
pub fn map_string(array: Vec<String>, iteratee: &js_sys::Function) -> Vec<String> {
    collection::map(&array, |x| {
        let this = JsValue::NULL;
        let val = JsValue::from_str(x);
        iteratee.call1(&this, &val).ok().and_then(|r| r.as_string()).unwrap_or_default()
    })
}

#[wasm_bindgen]
pub fn reduce(array: &[f64], iteratee: &js_sys::Function, accumulator: f64) -> f64 {
    collection::reduce(array, |acc, x| {
        let this = JsValue::NULL;
        let acc_val = JsValue::from_f64(acc);
        let x_val = JsValue::from_f64(*x);
        iteratee.call2(&this, &acc_val, &x_val).ok().and_then(|r| r.as_f64()).unwrap_or(f64::NAN)
    }, accumulator)
}

#[wasm_bindgen(js_name = "reduceStrings")]
pub fn reduce_string(array: Vec<String>, iteratee: &js_sys::Function, accumulator: String) -> String {
    collection::reduce(&array, |acc, x| {
        let this = JsValue::NULL;
        let acc_val = JsValue::from_str(&acc);
        let x_val = JsValue::from_str(x);
        iteratee.call2(&this, &acc_val, &x_val).ok().and_then(|r| r.as_string()).unwrap_or_default()
    }, accumulator)
}

#[wasm_bindgen]
pub fn reject(array: Vec<f64>, predicate: &js_sys::Function) -> Vec<f64> {
    collection::reject(array, |x| {
        let this = JsValue::NULL;
        let val = JsValue::from_f64(*x);
        predicate.call1(&this, &val).map(|r| r.is_truthy()).unwrap_or(false)
    })
}

#[wasm_bindgen(js_name = "rejectStrings")]
pub fn reject_string(array: Vec<String>, predicate: &js_sys::Function) -> Vec<String> {
    collection::reject(array, |x| {
        let this = JsValue::NULL;
        let val = JsValue::from_str(x);
        predicate.call1(&this, &val).map(|r| r.is_truthy()).unwrap_or(false)
    })
}

#[wasm_bindgen]
pub fn sample(array: &[f64]) -> f64 {
    collection::sample(array).unwrap_or(f64::NAN)
}

#[wasm_bindgen(js_name = "sampleString")]
pub fn sample_string(array: Vec<String>) -> Option<String> {
    collection::sample(&array)
}

#[wasm_bindgen(js_name = "sampleSize")]
pub fn sample_size(array: &[f64], n: usize) -> Vec<f64> {
    collection::sample_size(array, n)
}

#[wasm_bindgen(js_name = "sampleSizeStrings")]
pub fn sample_size_string(array: Vec<String>, n: usize) -> Vec<String> {
    collection::sample_size(&array, n)
}

#[wasm_bindgen]
pub fn shuffle(array: &[f64]) -> Vec<f64> {
    collection::shuffle(array)
}

#[wasm_bindgen(js_name = "shuffleStrings")]
pub fn shuffle_string(array: Vec<String>) -> Vec<String> {
    collection::shuffle(&array)
}

#[wasm_bindgen]
pub fn size(array: &[f64]) -> usize {
    collection::size(array)
}

#[wasm_bindgen(js_name = "sizeStrings")]
pub fn size_string(array: Vec<String>) -> usize {
    collection::size(&array)
}

#[wasm_bindgen]
pub fn some(array: &[f64], predicate: &js_sys::Function) -> bool {
    collection::some(array, |x| {
        let this = JsValue::NULL;
        let val = JsValue::from_f64(*x);
        predicate.call1(&this, &val).map(|r| r.is_truthy()).unwrap_or(false)
    })
}

#[wasm_bindgen(js_name = "someStrings")]
pub fn some_string(array: Vec<String>, predicate: &js_sys::Function) -> bool {
    collection::some(&array, |x| {
        let this = JsValue::NULL;
        let val = JsValue::from_str(x);
        predicate.call1(&this, &val).map(|r| r.is_truthy()).unwrap_or(false)
    })
}

#[wasm_bindgen(js_name = "reduceRight")]
pub fn reduce_right(array: &[f64], iteratee: &js_sys::Function, accumulator: f64) -> f64 {
    collection::reduce_right(array, |acc, x| {
        let this = JsValue::NULL;
        let acc_val = JsValue::from_f64(acc);
        let x_val = JsValue::from_f64(*x);
        iteratee.call2(&this, &acc_val, &x_val).ok().and_then(|r| r.as_f64()).unwrap_or(f64::NAN)
    }, accumulator)
}

#[wasm_bindgen(js_name = "reduceRightStrings")]
pub fn reduce_right_string(array: Vec<String>, iteratee: &js_sys::Function, accumulator: String) -> String {
    collection::reduce_right(&array, |acc, x| {
        let this = JsValue::NULL;
        let acc_val = JsValue::from_str(&acc);
        let x_val = JsValue::from_str(x);
        iteratee.call2(&this, &acc_val, &x_val).ok().and_then(|r| r.as_string()).unwrap_or_default()
    }, accumulator)
}

#[wasm_bindgen(js_name = "partition")]
pub fn partition(array: Vec<f64>, predicate: &js_sys::Function) -> js_sys::Array {
    let (pass, fail) = collection::partition(array, |x| {
        let this = JsValue::NULL;
        let val = JsValue::from_f64(*x);
        predicate.call1(&this, &val).map(|r| r.is_truthy()).unwrap_or(false)
    });
    let result = js_sys::Array::new();
    let pass_arr = js_sys::Array::new();
    for v in &pass {
        pass_arr.push(&JsValue::from_f64(*v));
    }
    let fail_arr = js_sys::Array::new();
    for v in &fail {
        fail_arr.push(&JsValue::from_f64(*v));
    }
    result.push(&pass_arr);
    result.push(&fail_arr);
    result
}

#[wasm_bindgen(js_name = "partitionStrings")]
pub fn partition_string(array: Vec<String>, predicate: &js_sys::Function) -> js_sys::Array {
    let (pass, fail) = collection::partition(array, |x| {
        let this = JsValue::NULL;
        let val = JsValue::from_str(x);
        predicate.call1(&this, &val).map(|r| r.is_truthy()).unwrap_or(false)
    });
    let result = js_sys::Array::new();
    let pass_arr = js_sys::Array::new();
    for v in &pass {
        pass_arr.push(&JsValue::from_str(v));
    }
    let fail_arr = js_sys::Array::new();
    for v in &fail {
        fail_arr.push(&JsValue::from_str(v));
    }
    result.push(&pass_arr);
    result.push(&fail_arr);
    result
}
