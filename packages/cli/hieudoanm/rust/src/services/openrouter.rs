use anyhow::{Context, Result};
use serde::{Deserialize, Serialize};
use std::time::Instant;

pub const BASE_URL: &str = "https://openrouter.ai/api/v1";

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Pricing {
    pub prompt: String,
    pub completion: String,
    pub request: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Model {
    pub id: String,
    pub name: String,
    pub description: String,
    pub context_length: i64,
    pub pricing: Pricing,
}

#[derive(Debug, Deserialize)]
struct ModelsResponse {
    data: Vec<Model>,
}

pub fn fetch_free_models() -> Result<Vec<Model>> {
    let url = format!("{}/models", BASE_URL);
    let resp = reqwest::blocking::get(&url).context("request failed")?;

    if !resp.status().is_success() {
        anyhow::bail!("OpenRouter returned HTTP {}", resp.status());
    }

    let payload: ModelsResponse = resp.json().context("decode error")?;

    let mut free: Vec<Model> = payload.data.into_iter().filter(|m| is_free(&m.pricing)).collect();
    free.sort_by(|a, b| a.id.cmp(&b.id));

    Ok(free)
}

fn is_free(p: &Pricing) -> bool {
    (p.prompt == "0" || p.prompt.is_empty())
        && (p.completion == "0" || p.completion.is_empty())
}

pub fn resolve_model(query: &str, models: &[Model]) -> Option<Model> {
    let q = query.to_lowercase();

    // Exact match
    for m in models {
        if m.id.to_lowercase() == q {
            return Some(m.clone());
        }
    }

    // Exact match with :free suffix
    let with_free = format!("{}:free", q);
    for m in models {
        if m.id.to_lowercase() == with_free {
            return Some(m.clone());
        }
    }

    // Partial match on ID
    let id_matches: Vec<&Model> = models.iter().filter(|m| m.id.to_lowercase().contains(&q)).collect();
    if id_matches.len() == 1 {
        return Some(id_matches[0].clone());
    }
    if id_matches.len() > 1 {
        let mut sorted = id_matches.clone();
        sorted.sort_by(|a, b| {
            let a_free = a.id.ends_with(":free");
            let b_free = b.id.ends_with(":free");
            if a_free != b_free {
                return b_free.cmp(&a_free);
            }
            a.id.len().cmp(&b.id.len())
        });
        return Some(sorted[0].clone());
    }

    // Partial match on Name
    let name_matches: Vec<&Model> = models.iter().filter(|m| m.name.to_lowercase().contains(&q)).collect();
    if !name_matches.is_empty() {
        let mut sorted = name_matches.clone();
        sorted.sort_by(|a, b| a.id.len().cmp(&b.id.len()));
        return Some(sorted[0].clone());
    }

    None
}

#[derive(Debug, Clone, Copy, PartialEq)]
pub enum ProbeStatus {
    Ok,
    RateLimited,
    Restricted,
    Error,
}

#[derive(Debug, Clone)]
pub struct ProbeResult {
    pub model: Model,
    pub status: ProbeStatus,
    pub message: String,
    pub latency_ms: i64,
}

pub fn probe_model(model: &Model, api_key: &str) -> ProbeResult {
    let payload = serde_json::json!({
        "model": model.id,
        "messages": [
            {"role": "user", "content": "hi"}
        ],
        "max_tokens": 1,
        "provider": {
            "allow_fallbacks": false,
            "data_collection": "allow"
        }
    });

    let url = format!("{}/chat/completions", BASE_URL);
    let client = reqwest::blocking::Client::new();

    let start = Instant::now();
    let resp = match client
        .post(&url)
        .json(&payload)
        .header("Authorization", format!("Bearer {}", api_key))
        .header("HTTP-Referer", "https://github.com/freerouter/freerouter")
        .header("X-Title", "freerouter")
        .send()
    {
        Ok(r) => r,
        Err(e) => {
            return ProbeResult {
                model: model.clone(),
                status: ProbeStatus::Error,
                message: e.to_string(),
                latency_ms: 0,
            }
        }
    };
    let elapsed = start.elapsed().as_millis() as i64;
    let status_code = resp.status().as_u16();
    let body = resp.text().unwrap_or_default();

    match status_code {
        200 => ProbeResult {
            model: model.clone(),
            status: ProbeStatus::Ok,
            message: String::new(),
            latency_ms: elapsed,
        },
        429 => ProbeResult {
            model: model.clone(),
            status: ProbeStatus::RateLimited,
            message: extract_error_message(&body),
            latency_ms: elapsed,
        },
        404 => ProbeResult {
            model: model.clone(),
            status: ProbeStatus::Restricted,
            message: extract_error_message(&body),
            latency_ms: elapsed,
        },
        code => {
            let msg = extract_error_message(&body);
            ProbeResult {
                model: model.clone(),
                status: ProbeStatus::Error,
                message: if msg.is_empty() { format!("HTTP {}", code) } else { msg },
                latency_ms: elapsed,
            }
        }
    }
}

fn extract_error_message(body: &str) -> String {
    if let Ok(envelope) = serde_json::from_str::<serde_json::Value>(body) {
        if let Some(msg) = envelope.get("error").and_then(|e| e.get("message")).and_then(|m| m.as_str()) {
            let mut s = msg.to_string();
            if s.len() > 80 {
                s.truncate(77);
                s.push_str("...");
            }
            return s;
        }
    }
    String::new()
}
