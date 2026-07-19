use wasm_bindgen::prelude::*;

#[wasm_bindgen(js_name = "chessFindBestMove")]
pub fn chess_find_best_move(state_json: &str) -> Result<String, JsValue> {
    let state: crate::core::types::GameState =
        serde_json::from_str(state_json).map_err(|e| JsValue::from_str(&e.to_string()))?;
    let result = crate::core::engine::search::find_best_move(
        &state.board,
        state.turn,
        state.castling_rights,
        state.en_passant,
        (Some(3), None),
    );
    serde_json::to_string(&result).map_err(|e| JsValue::from_str(&e.to_string()))
}

#[wasm_bindgen(js_name = "chessEvaluate")]
pub fn chess_evaluate(state_json: &str) -> Result<i32, JsValue> {
    let state: crate::core::types::GameState =
        serde_json::from_str(state_json).map_err(|e| JsValue::from_str(&e.to_string()))?;
    Ok(crate::core::engine::evaluate::evaluate_board(&state.board, state.turn))
}
