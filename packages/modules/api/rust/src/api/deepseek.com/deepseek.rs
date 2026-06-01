use anyhow::Result;
use reqwest::Client;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct ChatRequest {
    pub model: String,
    pub messages: Vec<Message>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Message {
    pub role: String,
    pub content: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ChatResponse {
    pub choices: Vec<Choice>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Choice {
    pub message: Message,
}

pub struct DeepSeekClient {
    client: Client,
    api_key: String,
    pub base_url: String,
}

impl DeepSeekClient {
    pub fn new(api_key: String, base_url: Option<String>) -> Self {
        Self {
            client: Client::new(),
            api_key,
            base_url: base_url.unwrap_or_else(|| "https://api.deepseek.com".to_string()),
        }
    }

    pub async fn chat(&self, req: &ChatRequest) -> Result<ChatResponse> {
        let resp = self
            .client
            .post(format!("{}/chat/completions", self.base_url))
            .header("Authorization", format!("Bearer {}", self.api_key))
            .json(req)
            .send()
            .await?
            .json::<ChatResponse>()
            .await?;
        Ok(resp)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use wiremock::matchers::{header, method, path};
    use wiremock::{Mock, MockServer, ResponseTemplate};

    #[tokio::test]
    async fn test_chat_success() {
        let mock_server = MockServer::start().await;

        Mock::given(method("POST"))
            .and(path("/chat/completions"))
            .and(header("Authorization", "Bearer test-key"))
            .respond_with(ResponseTemplate::new(200).set_body_json(serde_json::json!({
                "choices": [{
                    "message": {
                        "role": "assistant",
                        "content": "Hello!"
                    }
                }]
            })))
            .mount(&mock_server)
            .await;

        let client = DeepSeekClient::new("test-key".to_string(), Some(mock_server.uri()));
        let req = ChatRequest {
            model: "deepseek-chat".to_string(),
            messages: vec![Message {
                role: "user".to_string(),
                content: "Hi".to_string(),
            }],
        };
        let result = client.chat(&req).await.unwrap();
        assert_eq!(result.choices[0].message.content, "Hello!");
    }
}
