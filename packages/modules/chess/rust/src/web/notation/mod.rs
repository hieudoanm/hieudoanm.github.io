use wasm_bindgen::prelude::*;

use crate::core::types::{GameState, Move, PieceType};

fn parse_state(json: &str) -> Result<GameState, JsValue> {
    serde_json::from_str(json).map_err(|e| JsValue::from_str(&e.to_string()))
}

#[wasm_bindgen(js_name = "chessParseFen")]
pub fn chess_parse_fen(fen: &str) -> Result<String, JsValue> {
    let state = crate::core::notation::parse_fen(fen);
    serde_json::to_string(&state).map_err(|e| JsValue::from_str(&e.to_string()))
}

#[wasm_bindgen(js_name = "chessStringifyFen")]
pub fn chess_stringify_fen(state_json: &str) -> Result<String, JsValue> {
    let state = parse_state(state_json)?;
    Ok(crate::core::notation::stringify_fen(&state))
}

#[wasm_bindgen(js_name = "chessParseSan")]
pub fn chess_parse_san(state_json: &str, san: &str) -> Result<String, JsValue> {
    let state = parse_state(state_json)?;
    let mv = crate::core::notation::parse_san(
        san,
        &state.board,
        state.turn,
        state.castling_rights,
        state.en_passant,
    );
    serde_json::to_string(&mv).map_err(|e| JsValue::from_str(&e.to_string()))
}

#[wasm_bindgen(js_name = "chessMoveToSan")]
pub fn chess_move_to_san(state_json: &str, from: u8, to: u8) -> Result<String, JsValue> {
    let state = parse_state(state_json)?;
    let mv = Move {
        from,
        to,
        promotion: None,
        captured: None,
    };
    let san = crate::core::notation::move_to_san(
        &state.board,
        &mv,
        state.turn,
        state.castling_rights,
        state.en_passant,
    );
    Ok(san)
}

#[wasm_bindgen(js_name = "chessParseUci")]
pub fn chess_parse_uci(uci: &str) -> Result<String, JsValue> {
    let mv = crate::core::notation::parse_uci(uci);
    serde_json::to_string(&mv).map_err(|e| JsValue::from_str(&e.to_string()))
}

#[wasm_bindgen(js_name = "chessMoveToUci")]
pub fn chess_move_to_uci(from: u8, to: u8, promotion: Option<String>) -> String {
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
    crate::core::notation::move_to_uci(&mv)
}

#[wasm_bindgen(js_name = "chessParseFenFields")]
pub fn chess_parse_fen_fields(fen: &str) -> Result<String, JsValue> {
    let fields =
        crate::core::notation::fen::parse_fen_fields(fen).map_err(|e| JsValue::from_str(&e))?;
    serde_json::to_string(&fields).map_err(|e| JsValue::from_str(&e.to_string()))
}

#[wasm_bindgen(js_name = "chessParsePGN")]
pub fn chess_parse_pgn(pgn: &str) -> Result<String, JsValue> {
    let games = crate::core::notation::pgn::parse_pgn(pgn);
    serde_json::to_string(&games).map_err(|e| JsValue::from_str(&e.to_string()))
}

#[wasm_bindgen(js_name = "chessGetMoves")]
pub fn chess_get_moves(pgn: &str) -> Vec<String> {
    crate::core::notation::pgn::get_moves(pgn)
}

#[wasm_bindgen(js_name = "chessGetHeaders")]
pub fn chess_get_headers(pgn: &str) -> Result<String, JsValue> {
    let headers = crate::core::notation::pgn::get_headers(pgn);
    serde_json::to_string(&headers).map_err(|e| JsValue::from_str(&e.to_string()))
}

#[wasm_bindgen(js_name = "chessStateToPgn")]
pub fn chess_state_to_pgn(state_json: &str) -> Result<String, JsValue> {
    let state: crate::core::types::GameState =
        serde_json::from_str(state_json).map_err(|e| JsValue::from_str(&e.to_string()))?;
    Ok(crate::core::notation::pgn::state_to_pgn(&state))
}

#[wasm_bindgen(js_name = "chessStringifyPgn")]
pub fn chess_stringify_pgn(games_json: &str) -> Result<String, JsValue> {
    let games: Vec<crate::core::types::PGNGame> =
        serde_json::from_str(games_json).map_err(|e| JsValue::from_str(&e.to_string()))?;
    Ok(crate::core::notation::pgn::stringify_pgn(&games))
}
