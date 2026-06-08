use wasm_bindgen::prelude::*;

fn js_date_to_naive(d: &js_sys::Date) -> chrono::NaiveDateTime {
    let millis = d.get_time() as i64;
    chrono::DateTime::from_timestamp_millis(millis)
        .map(|dt| dt.naive_utc())
        .unwrap_or_default()
}

fn js_date_to_naive_date(d: &js_sys::Date) -> chrono::NaiveDate {
    js_date_to_naive(d).date()
}

// ---------------------------------------------------------------------------
// Diff
// ---------------------------------------------------------------------------

#[wasm_bindgen]
pub struct WasmDiff {
    inner: crate::core::date::Diff,
}

#[wasm_bindgen]
impl WasmDiff {
    pub fn days(&self) -> i64 { self.inner.days() }
    pub fn hours(&self) -> i64 { self.inner.hours() }
    pub fn minutes(&self) -> i64 { self.inner.minutes() }
    pub fn seconds(&self) -> i64 { self.inner.seconds() }
}

#[wasm_bindgen]
pub fn diff(a: &js_sys::Date, b: &js_sys::Date) -> WasmDiff {
    WasmDiff { inner: crate::core::date::diff(js_date_to_naive(a), js_date_to_naive(b)) }
}

#[wasm_bindgen]
pub fn diff_millis(a: &js_sys::Date, b: &js_sys::Date) -> i64 {
    crate::core::date::diff_millis(js_date_to_naive(a), js_date_to_naive(b))
}

#[wasm_bindgen]
pub fn diff_days(a: &js_sys::Date, b: &js_sys::Date) -> i64 {
    crate::core::date::diff_days(js_date_to_naive(a), js_date_to_naive(b))
}

#[wasm_bindgen]
pub fn diff_hours(a: &js_sys::Date, b: &js_sys::Date) -> i64 {
    crate::core::date::diff_hours(js_date_to_naive(a), js_date_to_naive(b))
}

#[wasm_bindgen]
pub fn diff_minutes(a: &js_sys::Date, b: &js_sys::Date) -> i64 {
    crate::core::date::diff_minutes(js_date_to_naive(a), js_date_to_naive(b))
}

#[wasm_bindgen]
pub fn diff_seconds(a: &js_sys::Date, b: &js_sys::Date) -> i64 {
    crate::core::date::diff_seconds(js_date_to_naive(a), js_date_to_naive(b))
}

// ---------------------------------------------------------------------------
// Format
// ---------------------------------------------------------------------------

#[wasm_bindgen]
pub struct WasmFormat {
    inner: crate::core::date::Format,
}

#[wasm_bindgen]
impl WasmFormat {
    pub fn date(&self, separator: &str) -> String { self.inner.date(separator) }
    pub fn time(&self, with_seconds: bool) -> String { self.inner.time(with_seconds) }
    pub fn date_time(&self) -> String { self.inner.date_time() }
}

#[wasm_bindgen]
pub fn format(d: &js_sys::Date) -> WasmFormat {
    WasmFormat { inner: crate::core::date::format(js_date_to_naive(d)) }
}

#[wasm_bindgen]
pub fn format_date(d: &js_sys::Date, separator: &str) -> String {
    crate::core::date::format_date(js_date_to_naive_date(d), separator)
}

#[wasm_bindgen]
pub fn format_time(d: &js_sys::Date, with_seconds: bool) -> String {
    crate::core::date::format_time(js_date_to_naive(d), with_seconds)
}

#[wasm_bindgen]
pub fn format_date_time(d: &js_sys::Date) -> String {
    crate::core::date::format_date_time(js_date_to_naive(d))
}

// ---------------------------------------------------------------------------
// Calendar
// ---------------------------------------------------------------------------

#[wasm_bindgen]
pub fn calendar(year: i32, month: u32) -> JsValue {
    let grid = crate::core::date::calendar(year, month);
    serde_wasm_bindgen::to_value(&grid).unwrap_or(JsValue::NULL)
}

#[wasm_bindgen]
pub fn week_of_year(d: &js_sys::Date) -> u32 {
    crate::core::date::week_of_year(js_date_to_naive_date(d))
}

// ---------------------------------------------------------------------------
// LunarCalendar
// ---------------------------------------------------------------------------

#[wasm_bindgen]
pub struct WasmLunarCalendar {
    inner: crate::core::date::LunarCalendar,
}

#[wasm_bindgen]
impl WasmLunarCalendar {
    pub fn new() -> WasmLunarCalendar {
        WasmLunarCalendar { inner: crate::core::date::LunarCalendar }
    }

    pub fn leap_days(&self, y: i32) -> i32 { self.inner.leap_days(y) }
    pub fn leap_month(&self, y: i32) -> i32 { self.inner.leap_month(y) }
    pub fn l_year_days(&self, y: i32) -> i32 { self.inner.l_year_days(y) }
    pub fn month_days(&self, y: i32, m: i32) -> i32 { self.inner.month_days(y, m) }

    pub fn solar_to_lunar(&self, y: i32, m: i32, d: i32) -> JsValue {
        match self.inner.solar_to_lunar(y, m, d) {
            Ok(result) => serde_wasm_bindgen::to_value(&result).unwrap_or(JsValue::NULL),
            Err(_) => JsValue::from_f64(-1.0),
        }
    }
}
