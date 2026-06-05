use crate::core;
use wasm_bindgen::prelude::*;

#[wasm_bindgen(js_name = "chessParseFen")]
pub fn chess_parse_fen(fen: &str) -> Result<String, JsValue> {
    let state = core::notation::parse_fen(fen);
    serde_json::to_string(&state).map_err(|e| JsValue::from_str(&e.to_string()))
}

#[wasm_bindgen(js_name = "chessStringifyFen")]
pub fn chess_stringify_fen(state_json: &str) -> Result<String, JsValue> {
    let state: core::GameState =
        serde_json::from_str(state_json).map_err(|e| JsValue::from_str(&e.to_string()))?;
    Ok(core::notation::stringify_fen(&state))
}

#[wasm_bindgen(js_name = "chessParseSan")]
pub fn chess_parse_san(state_json: &str, san: &str) -> Result<String, JsValue> {
    let state: core::GameState =
        serde_json::from_str(state_json).map_err(|e| JsValue::from_str(&e.to_string()))?;
    let mv = core::notation::parse_san(
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
    let state: core::GameState =
        serde_json::from_str(state_json).map_err(|e| JsValue::from_str(&e.to_string()))?;
    let mv = core::Move {
        from,
        to,
        promotion: None,
        captured: None,
    };
    let san = core::notation::move_to_san(
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
    let mv = core::notation::parse_uci(uci);
    serde_json::to_string(&mv).map_err(|e| JsValue::from_str(&e.to_string()))
}

#[wasm_bindgen(js_name = "chessMoveToUci")]
pub fn chess_move_to_uci(from: u8, to: u8, promotion: Option<String>) -> String {
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
    core::notation::move_to_uci(&mv)
}

#[wasm_bindgen(js_name = "chessParseFenFields")]
pub fn chess_parse_fen_fields(fen: &str) -> Result<String, JsValue> {
    let fields = core::fen::parse_fen_fields(fen).map_err(|e| JsValue::from_str(&e))?;
    serde_json::to_string(&fields).map_err(|e| JsValue::from_str(&e.to_string()))
}
