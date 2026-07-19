use wasm_bindgen::prelude::*;

use crate::core::types::{GameState, Move, PieceType};

fn parse_state(json: &str) -> Result<GameState, JsValue> {
    serde_json::from_str(json).map_err(|e| JsValue::from_str(&e.to_string()))
}

#[wasm_bindgen(js_name = "chessCreateGame")]
pub fn chess_create_game(fen: Option<String>) -> Result<String, JsValue> {
    let state = crate::core::game::create_game(fen.as_deref());
    serde_json::to_string(&state).map_err(|e| JsValue::from_str(&e.to_string()))
}

#[wasm_bindgen(js_name = "chessMakeMove")]
pub fn chess_make_move(
    state_json: &str,
    from: u8,
    to: u8,
    promotion: Option<String>,
) -> Result<String, JsValue> {
    let state = parse_state(state_json)?;
    let promo = promotion
        .as_deref()
        .and_then(|p| p.chars().next())
        .and_then(PieceType::from_char);
    let mv = Move {
        from,
        to,
        promotion: promo,
        captured: None,
    };
    let new_state = crate::core::game::make_move(&state, mv);
    serde_json::to_string(&new_state).map_err(|e| JsValue::from_str(&e.to_string()))
}

#[wasm_bindgen(js_name = "chessUndoMove")]
pub fn chess_undo_move(state_json: &str) -> Result<String, JsValue> {
    let state = parse_state(state_json)?;
    let new_state = crate::core::game::undo_move(&state);
    serde_json::to_string(&new_state).map_err(|e| JsValue::from_str(&e.to_string()))
}

#[wasm_bindgen(js_name = "chessLegalMoves")]
pub fn chess_legal_moves(state_json: &str) -> Result<String, JsValue> {
    let state = parse_state(state_json)?;
    let moves = crate::core::moves::legal_moves(
        &state.board,
        state.turn,
        state.castling_rights,
        state.en_passant,
    );
    serde_json::to_string(&moves).map_err(|e| JsValue::from_str(&e.to_string()))
}

#[wasm_bindgen(js_name = "chessGetStatusMessage")]
pub fn chess_get_status_message(state_json: &str) -> Result<String, JsValue> {
    let state = parse_state(state_json)?;
    Ok(crate::core::game::get_status_message(&state))
}

#[wasm_bindgen(js_name = "chessStartingFen")]
pub fn chess_starting_fen() -> String {
    crate::core::game::STARTING_FEN.to_string()
}

#[wasm_bindgen(js_name = "chessPerft")]
pub fn chess_perft(fen: &str, depth: u32) -> f64 {
    let state = crate::core::notation::parse_fen(fen);
    crate::core::game::perft::perft(&state, depth) as f64
}

#[wasm_bindgen(js_name = "chessDivide")]
pub fn chess_divide(fen: &str, depth: u32) -> Result<String, JsValue> {
    let state = crate::core::notation::parse_fen(fen);
    let result = crate::core::game::perft::divide(&state, depth);
    serde_json::to_string(&result).map_err(|e| JsValue::from_str(&e.to_string()))
}
