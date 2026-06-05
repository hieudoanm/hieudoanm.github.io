use crate::core;
use wasm_bindgen::prelude::*;

#[wasm_bindgen(js_name = "chessChess960Positions")]
pub fn chess_chess960_positions() -> Vec<String> {
    core::chess960::CHESS960
        .iter()
        .map(|s| s.to_string())
        .collect()
}

#[wasm_bindgen(js_name = "chessChess960BackRankToInitialFen")]
pub fn chess_chess960_back_rank_to_initial_fen(
    position: &str,
    variant: Option<String>,
) -> Result<String, JsValue> {
    let variant = variant.and_then(|v| match v.as_str() {
        "chess960" => Some(core::fen::Variant::Chess960),
        _ => Some(core::fen::Variant::Standard),
    });
    core::fen::chess960_back_rank_to_initial_fen(position, variant)
        .map_err(|e| JsValue::from_str(&e))
}
