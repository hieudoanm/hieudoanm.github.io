use crate::core;
use wasm_bindgen::prelude::*;

#[wasm_bindgen(js_name = "chessParsePGN")]
pub fn chess_parse_pgn(pgn: &str) -> Result<String, JsValue> {
    let games = core::pgn::parse_pgn(pgn);
    serde_json::to_string(&games).map_err(|e| JsValue::from_str(&e.to_string()))
}

#[wasm_bindgen(js_name = "chessGetMoves")]
pub fn chess_get_moves(pgn: &str) -> Vec<String> {
    core::pgn::get_moves(pgn)
}

#[wasm_bindgen(js_name = "chessGetHeaders")]
pub fn chess_get_headers(pgn: &str) -> Result<String, JsValue> {
    let headers = core::pgn::get_headers(pgn);
    serde_json::to_string(&headers).map_err(|e| JsValue::from_str(&e.to_string()))
}

#[wasm_bindgen(js_name = "chessStateToPgn")]
pub fn chess_state_to_pgn(state_json: &str) -> Result<String, JsValue> {
    let state: core::GameState =
        serde_json::from_str(state_json).map_err(|e| JsValue::from_str(&e.to_string()))?;
    Ok(core::pgn::state_to_pgn(&state))
}

#[wasm_bindgen(js_name = "chessStringifyPgn")]
pub fn chess_stringify_pgn(games_json: &str) -> Result<String, JsValue> {
    let games: Vec<core::PGNGame> =
        serde_json::from_str(games_json).map_err(|e| JsValue::from_str(&e.to_string()))?;
    Ok(core::pgn::stringify_pgn(&games))
}
