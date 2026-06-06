use wasm_bindgen::prelude::*;
use crate::core::types::GameState;

fn parse_state(json: &str) -> Result<GameState, JsValue> {
    serde_json::from_str(json).map_err(|e| JsValue::from_str(&e.to_string()))
}

#[wasm_bindgen(js_name = "chessIsInCheck")]
pub fn chess_is_in_check(state_json: &str) -> Result<bool, JsValue> {
    let state = parse_state(state_json)?;
    Ok(crate::core::moves::attack::is_in_check(&state.board, state.turn))
}

#[wasm_bindgen(js_name = "chessIsSquareAttacked")]
pub fn chess_is_square_attacked(
    state_json: &str,
    sq: u8,
    by_color: String,
) -> Result<bool, JsValue> {
    let state = parse_state(state_json)?;
    let color = match by_color.as_str() {
        "w" => crate::core::types::Color::White,
        _ => crate::core::types::Color::Black,
    };
    Ok(crate::core::moves::attack::is_square_attacked(
        &state.board, sq, color,
    ))
}
