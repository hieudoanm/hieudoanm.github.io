use anyhow::Result;
use reqwest::Client;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq)]
pub enum GeminiModel {
    #[serde(rename = "gemini-2.5-flash")]
    Gemini25Flash,
    #[serde(rename = "gemini-2.0-flash")]
    Gemini20Flash,
    #[serde(rename = "gemini-2.0-flash-lite")]
    Gemini20FlashLite,
    #[serde(rename = "gemini-1.5-flash")]
    Gemini15Flash,
    #[serde(rename = "gemini-1.5-flash-8b")]
    Gemini15Flash8B,
}

impl Default for GeminiModel {
    fn default() -> Self {
        Self::Gemini20Flash
    }
}

impl std::fmt::Display for GeminiModel {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        let s = match self {
            Self::Gemini25Flash => "gemini-2.5-flash",
            Self::Gemini20Flash => "gemini-2.0-flash",
            Self::Gemini20FlashLite => "gemini-2.0-flash-lite",
            Self::Gemini15Flash => "gemini-1.5-flash",
            Self::Gemini15Flash8B => "gemini-1.5-flash-8b",
        };
        write!(f, "{}", s)
    }
}

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq)]
#[serde(rename_all = "snake_case")]
pub enum GeminiRole {
    User,
    Model,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct GeminiPart {
    pub text: String,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct GeminiContent {
    pub role: GeminiRole,
    pub parts: Vec<GeminiPart>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct GeminiCandidateContent {
    pub role: GeminiRole,
    pub parts: Vec<GeminiPart>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct GeminiTokenDetail {
    pub modality: String,
    #[serde(rename = "tokenCount")]
    pub token_count: i32,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct GeminiUsageMetadata {
    #[serde(rename = "promptTokenCount")]
    pub prompt_token_count: i32,
    #[serde(rename = "candidatesTokenCount")]
    pub candidates_token_count: i32,
    #[serde(rename = "totalTokenCount")]
    pub total_token_count: i32,
    #[serde(rename = "promptTokensDetails")]
    pub prompt_tokens_details: Vec<GeminiTokenDetail>,
    #[serde(rename = "candidatesTokensDetails")]
    pub candidates_tokens_details: Vec<GeminiTokenDetail>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct GeminiCandidate {
    pub content: GeminiCandidateContent,
    #[serde(rename = "finishReason")]
    pub finish_reason: String,
    #[serde(rename = "avgLogprobs")]
    pub avg_logprobs: f64,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct GeminiGenerateContentResponse {
    pub candidates: Vec<GeminiCandidate>,
    #[serde(rename = "usageMetadata")]
    pub usage_metadata: GeminiUsageMetadata,
    #[serde(rename = "modelVersion")]
    pub model_version: String,
    #[serde(rename = "responseId")]
    pub response_id: String,
}

pub struct GeminiClient {
    pub client: Client,
    pub api_key: String,
    pub base_url: String,
}

impl GeminiClient {
    pub fn new(api_key: String) -> Self {
        Self {
            client: Client::new(),
            api_key,
            base_url: "https://generativelanguage.googleapis.com".to_string(),
        }
    }

    pub async fn generate_content(
        &self,
        model: &GeminiModel,
        contents: &[GeminiContent],
        timeout_secs: u64,
    ) -> Result<GeminiGenerateContentResponse> {
        let url = format!(
            "{}/v1beta/models/{}:generateContent?key={}",
            self.base_url, model, self.api_key
        );

        let body = serde_json::json!({ "contents": contents });

        let resp = self
            .client
            .post(&url)
            .json(&body)
            .timeout(std::time::Duration::from_secs(timeout_secs))
            .send()
            .await?
            .error_for_status()?
            .json::<GeminiGenerateContentResponse>()
            .await?;

        Ok(resp)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use wiremock::matchers::{method, path, query_param};
    use wiremock::{Mock, MockServer, ResponseTemplate};

    #[tokio::test]
    async fn test_generate_content() {
        let mock_server = MockServer::start().await;

        Mock::given(method("POST"))
            .and(path("/v1beta/models/gemini-2.0-flash:generateContent"))
            .and(query_param("key", "test-key"))
            .respond_with(ResponseTemplate::new(200).set_body_json(serde_json::json!({
                "candidates": [{
                    "content": {
                        "role": "model",
                        "parts": [{"text": "Hello!"}]
                    },
                    "finishReason": "STOP",
                    "avgLogprobs": -0.5
                }],
                "usageMetadata": {
                    "promptTokenCount": 10,
                    "candidatesTokenCount": 5,
                    "totalTokenCount": 15,
                    "promptTokensDetails": [{"modality": "TEXT", "tokenCount": 10}],
                    "candidatesTokensDetails": [{"modality": "TEXT", "tokenCount": 5}]
                },
                "modelVersion": "gemini-2.0-flash",
                "responseId": "test-response-id"
            })))
            .mount(&mock_server)
            .await;

        let client = GeminiClient {
            client: Client::new(),
            api_key: "test-key".to_string(),
            base_url: mock_server.uri(),
        };

        let contents = vec![GeminiContent {
            role: GeminiRole::User,
            parts: vec![GeminiPart {
                text: "Hi".to_string(),
            }],
        }];

        let result = client
            .generate_content(&GeminiModel::Gemini20Flash, &contents, 60)
            .await
            .unwrap();

        assert_eq!(result.candidates.len(), 1);
        assert_eq!(result.candidates[0].content.parts[0].text, "Hello!");
        assert_eq!(result.candidates[0].finish_reason, "STOP");
        assert_eq!(result.usage_metadata.total_token_count, 15);
        assert_eq!(result.model_version, "gemini-2.0-flash");
    }

    #[tokio::test]
    async fn test_generate_content_api_error() {
        let mock_server = MockServer::start().await;

        Mock::given(method("POST"))
            .and(path("/v1beta/models/gemini-2.0-flash:generateContent"))
            .respond_with(ResponseTemplate::new(400).set_body_json(serde_json::json!({
                "error": {"message": "Invalid request"}
            })))
            .mount(&mock_server)
            .await;

        let client = GeminiClient {
            client: Client::new(),
            api_key: "bad-key".to_string(),
            base_url: mock_server.uri(),
        };

        let result = client
            .generate_content(&GeminiModel::Gemini20Flash, &[], 60)
            .await;

        assert!(result.is_err());
    }

    #[tokio::test]
    async fn test_generate_content_sets_model_in_url() {
        let mock_server = MockServer::start().await;

        Mock::given(method("POST"))
            .and(path("/v1beta/models/gemini-2.5-flash:generateContent"))
            .respond_with(ResponseTemplate::new(200).set_body_json(serde_json::json!({
                "candidates": [],
                "usageMetadata": {
                    "promptTokenCount": 0,
                    "candidatesTokenCount": 0,
                    "totalTokenCount": 0,
                    "promptTokensDetails": [],
                    "candidatesTokensDetails": []
                },
                "modelVersion": "gemini-2.5-flash",
                "responseId": "id"
            })))
            .mount(&mock_server)
            .await;

        let client = GeminiClient {
            client: Client::new(),
            api_key: "key".to_string(),
            base_url: mock_server.uri(),
        };

        let result = client
            .generate_content(&GeminiModel::Gemini25Flash, &[], 60)
            .await
            .unwrap();

        assert_eq!(result.model_version, "gemini-2.5-flash");
    }
}
