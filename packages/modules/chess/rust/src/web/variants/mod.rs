use wasm_bindgen::prelude::*;

#[wasm_bindgen(js_name = "chessChess960Positions")]
pub fn chess_chess960_positions() -> Vec<String> {
    crate::core::variants::CHESS960
        .iter()
        .map(|s| s.to_string())
        .collect()
}

#[wasm_bindgen(js_name = "chessChess960BackRankToInitialFen")]
pub fn chess_chess960_back_rank_to_initial_fen(
    position: &str,
    variant: Option<String>,
) -> Result<String, JsValue> {
    use crate::core::notation::fen::Variant;
    let variant = variant.and_then(|v| match v.as_str() {
        "chess960" => Some(Variant::Chess960),
        _ => Some(Variant::Standard),
    });
    crate::core::notation::fen::chess960_back_rank_to_initial_fen(position, variant)
        .map_err(|e| JsValue::from_str(&e))
}
