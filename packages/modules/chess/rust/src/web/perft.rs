use crate::core;
use wasm_bindgen::prelude::*;

#[wasm_bindgen(js_name = "chessPerft")]
pub fn chess_perft(fen: &str, depth: u32) -> f64 {
    let state = core::notation::parse_fen(fen);
    core::perft::perft(&state, depth) as f64
}

#[wasm_bindgen(js_name = "chessDivide")]
pub fn chess_divide(fen: &str, depth: u32) -> Result<String, JsValue> {
    let state = core::notation::parse_fen(fen);
    let result = core::perft::divide(&state, depth);
    serde_json::to_string(&result).map_err(|e| JsValue::from_str(&e.to_string()))
}
