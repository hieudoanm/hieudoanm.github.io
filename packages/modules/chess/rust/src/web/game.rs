use crate::core;
use wasm_bindgen::prelude::*;

#[wasm_bindgen(js_name = "chessCreateGame")]
pub fn chess_create_game(fen: Option<String>) -> Result<String, JsValue> {
    let state = core::game::create_game(fen.as_deref());
    serde_json::to_string(&state).map_err(|e| JsValue::from_str(&e.to_string()))
}

#[wasm_bindgen(js_name = "chessMakeMove")]
pub fn chess_make_move(
    state_json: &str,
    from: u8,
    to: u8,
    promotion: Option<String>,
) -> Result<String, JsValue> {
    let state: core::GameState =
        serde_json::from_str(state_json).map_err(|e| JsValue::from_str(&e.to_string()))?;
    let promo = promotion
        .as_deref()
        .and_then(|p| p.chars().next())
        .and_then(core::PieceType::from_char);
    let mv = core::Move {
        from,
        to,
        promotion: promo,
        captured: None,
    };
    let new_state = core::game::make_move(&state, mv);
    serde_json::to_string(&new_state).map_err(|e| JsValue::from_str(&e.to_string()))
}

#[wasm_bindgen(js_name = "chessUndoMove")]
pub fn chess_undo_move(state_json: &str) -> Result<String, JsValue> {
    let state: core::GameState =
        serde_json::from_str(state_json).map_err(|e| JsValue::from_str(&e.to_string()))?;
    let new_state = core::game::undo_move(&state);
    serde_json::to_string(&new_state).map_err(|e| JsValue::from_str(&e.to_string()))
}

#[wasm_bindgen(js_name = "chessLegalMoves")]
pub fn chess_legal_moves(state_json: &str) -> Result<String, JsValue> {
    let state: core::GameState =
        serde_json::from_str(state_json).map_err(|e| JsValue::from_str(&e.to_string()))?;
    let moves = core::moves::legal_moves(
        &state.board,
        state.turn,
        state.castling_rights,
        state.en_passant,
    );
    serde_json::to_string(&moves).map_err(|e| JsValue::from_str(&e.to_string()))
}

#[wasm_bindgen(js_name = "chessGetStatusMessage")]
pub fn chess_get_status_message(state_json: &str) -> Result<String, JsValue> {
    let state: core::GameState =
        serde_json::from_str(state_json).map_err(|e| JsValue::from_str(&e.to_string()))?;
    Ok(core::game::get_status_message(&state))
}

#[wasm_bindgen(js_name = "chessStartingFen")]
pub fn chess_starting_fen() -> String {
    core::game::STARTING_FEN.to_string()
}
