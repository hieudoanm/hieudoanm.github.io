use wasm_bindgen::prelude::*;

fn leak_closure<F>(f: F) -> js_sys::Function
where
    F: 'static + Fn(),
{
    let closure = Closure::wrap(Box::new(f) as Box<dyn Fn()>);
    closure.into_js_value().dyn_into::<js_sys::Function>().unwrap()
}

#[wasm_bindgen]
pub fn once(func: &js_sys::Function) -> js_sys::Function {
    let called = std::cell::Cell::new(false);
    let func2 = func.clone();
    leak_closure(move || {
        if !called.get() {
            called.set(true);
            let this = JsValue::NULL;
            let _ = func2.call0(&this);
        }
    })
}

#[wasm_bindgen]
pub fn after(n: u32, func: &js_sys::Function) -> js_sys::Function {
    let count = std::cell::Cell::new(0u32);
    let func2 = func.clone();
    leak_closure(move || {
        count.set(count.get() + 1);
        if count.get() > n {
            let this = JsValue::NULL;
            let _ = func2.call0(&this);
        }
    })
}

#[wasm_bindgen]
pub fn before(n: u32, func: &js_sys::Function) -> js_sys::Function {
    let count = std::cell::Cell::new(0u32);
    let func2 = func.clone();
    leak_closure(move || {
        count.set(count.get() + 1);
        if count.get() < n {
            let this = JsValue::NULL;
            let _ = func2.call0(&this);
        }
    })
}
