use crate::core;
use wasm_bindgen::prelude::*;

#[wasm_bindgen(js_name = "chessBoardToFen")]
pub fn chess_board_to_fen(state_json: &str) -> Result<String, JsValue> {
    let state: core::GameState =
        serde_json::from_str(state_json).map_err(|e| JsValue::from_str(&e.to_string()))?;
    Ok(core::board::board_to_fen(&state.board))
}

#[wasm_bindgen(js_name = "chessBoardFromFen")]
pub fn chess_board_from_fen(fen_part: &str) -> Result<String, JsValue> {
    let board = core::board::board_from_fen(fen_part);
    serde_json::to_string(&board.as_slice()).map_err(|e| JsValue::from_str(&e.to_string()))
}

#[wasm_bindgen(js_name = "chessEmptyBoard")]
pub fn chess_empty_board() -> Result<String, JsValue> {
    let board = core::board::empty_board();
    serde_json::to_string(&board.as_slice()).map_err(|e| JsValue::from_str(&e.to_string()))
}

#[wasm_bindgen(js_name = "chessPieceValue")]
pub fn chess_piece_value(piece_type: String) -> Result<u32, JsValue> {
    let pt = piece_type
        .chars()
        .next()
        .and_then(core::PieceType::from_char)
        .ok_or_else(|| JsValue::from_str("invalid piece type"))?;
    Ok(core::board::piece_value(pt))
}

#[wasm_bindgen(js_name = "chessPieceUnicode")]
pub fn chess_piece_unicode(state_json: &str, sq: u8) -> Result<String, JsValue> {
    let state: core::GameState =
        serde_json::from_str(state_json).map_err(|e| JsValue::from_str(&e.to_string()))?;
    let piece = state.board[sq as usize].ok_or_else(|| JsValue::from_str("no piece on square"))?;
    Ok(core::board::piece_unicode(piece).to_string())
}
