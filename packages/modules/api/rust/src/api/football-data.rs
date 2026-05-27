use serde::{Deserialize, Serialize};
use reqwest::Client;
use anyhow::Result;

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
    client: Client,
    api_key: String,
}

impl FootballClient {
    pub fn new(api_key: String) -> Self {
        Self { client: Client::new(), api_key }
    }

    pub async fn get_matches(&self) -> Result<MatchesResponse> {
        let resp = self.client.get("https://api.football-data.org/v4/matches")
            .header("X-Auth-Token", &self.api_key)
            .send()
            .await?
            .json::<MatchesResponse>()
            .await?;
        Ok(resp)
    }
}
