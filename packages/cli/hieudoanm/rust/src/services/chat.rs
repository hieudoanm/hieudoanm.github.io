use anyhow::{Context, Result};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize)]
struct Message {
    role: String,
    text: String,
}

#[derive(Debug, Serialize)]
struct RequestPayload {
    model: String,
    messages: Vec<Message>,
}

#[derive(Debug, Deserialize)]
struct ResponsePayload {
    output: String,
}

pub fn generate(model: &str, prompt: &str) -> Result<String> {
    let url = "https://hieudoanm-chat.vercel.app/api/genai";

    let payload = RequestPayload {
        model: model.to_string(),
        messages: vec![Message {
            role: "user".to_string(),
            text: prompt.to_string(),
        }],
    };

    let client = reqwest::blocking::Client::new();
    let resp = client
        .post(url)
        .json(&payload)
        .send()
        .context("failed to send chat request")?;

    let response: ResponsePayload = resp
        .json()
        .context("failed to parse chat response")?;

    Ok(response.output)
}
