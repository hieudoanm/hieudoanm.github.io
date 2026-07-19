use wasm_bindgen::prelude::*;

#[wasm_bindgen(js_name = "chessCalculateRating")]
pub fn chess_calculate_rating(input_json: &str) -> Result<f64, JsValue> {
    let input: crate::core::types::RatingInput =
        serde_json::from_str(input_json).map_err(|e| JsValue::from_str(&e.to_string()))?;
    Ok(crate::core::rating::calculate_rating(&input))
}

#[wasm_bindgen(js_name = "chessCalculatePerformance")]
pub fn chess_calculate_performance(games_json: &str) -> Result<f64, JsValue> {
    let games: Vec<crate::core::types::RatingGame> =
        serde_json::from_str(games_json).map_err(|e| JsValue::from_str(&e.to_string()))?;
    Ok(crate::core::rating::calculate_performance(&games))
}
