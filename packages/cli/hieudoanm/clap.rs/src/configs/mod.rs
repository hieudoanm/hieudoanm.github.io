use std::collections::HashMap;

const SERVICES_JSON: &str = include_str!("services.json");

pub fn services() -> HashMap<String, HashMap<String, String>> {
    serde_json::from_str(SERVICES_JSON).expect("services.json is valid")
}
