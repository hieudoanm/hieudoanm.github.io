use crate::core;
use wasm_bindgen::prelude::*;

#[wasm_bindgen(js_name = "chessIsInCheck")]
pub fn chess_is_in_check(state_json: &str) -> Result<bool, JsValue> {
    let state: core::GameState =
        serde_json::from_str(state_json).map_err(|e| JsValue::from_str(&e.to_string()))?;
    Ok(core::attack::is_in_check(&state.board, state.turn))
}

#[wasm_bindgen(js_name = "chessIsSquareAttacked")]
pub fn chess_is_square_attacked(
    state_json: &str,
    sq: u8,
    by_color: String,
) -> Result<bool, JsValue> {
    let state: core::GameState =
        serde_json::from_str(state_json).map_err(|e| JsValue::from_str(&e.to_string()))?;
    let color = match by_color.as_str() {
        "w" => core::Color::White,
        _ => core::Color::Black,
    };
    Ok(core::attack::is_square_attacked(&state.board, sq, color))
}
