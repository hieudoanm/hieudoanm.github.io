use anyhow::Result;
use reqwest::Client;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Match {
    pub id: i32,
    pub home_team: Team,
    pub away_team: Team,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Team {
    pub name: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct MatchesResponse {
    pub matches: Vec<Match>,
}

pub struct FootballClient {
    pub client: Client,
    pub api_key: String,
    pub base_url: String,
}

impl FootballClient {
    pub fn new(api_key: String, base_url: Option<String>) -> Self {
        Self {
            client: Client::new(),
            api_key,
            base_url: base_url.unwrap_or_else(|| "https://api.football-data.org".to_string()),
        }
    }

    pub async fn get_matches(&self) -> Result<MatchesResponse> {
        let resp = self
            .client
            .get(format!("{}/v4/matches", self.base_url))
            .header("X-Auth-Token", &self.api_key)
            .send()
            .await?
            .json::<MatchesResponse>()
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
    async fn test_get_matches_success() {
        let mock_server = MockServer::start().await;

        Mock::given(method("GET"))
            .and(path("/v4/matches"))
            .and(header("X-Auth-Token", "test-key"))
            .respond_with(ResponseTemplate::new(200).set_body_json(serde_json::json!({
                "matches": [
                    {
                        "id": 1,
                        "home_team": { "name": "Team A" },
                        "away_team": { "name": "Team B" }
                    }
                ]
            })))
            .mount(&mock_server)
            .await;

        let client = FootballClient::new("test-key".to_string(), Some(mock_server.uri()));
        let result = client.get_matches().await.unwrap();
        assert_eq!(result.matches.len(), 1);
        assert_eq!(result.matches[0].home_team.name, "Team A");
        assert_eq!(result.matches[0].away_team.name, "Team B");
    }
}
