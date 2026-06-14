use anyhow::{Context, Result};
use serde::Deserialize;

#[derive(Debug, Deserialize)]
pub struct CloudEval {
    pub pvs: Option<Vec<Pv>>,
}

#[derive(Debug, Deserialize)]
pub struct Pv {
    pub cp: Option<i32>,
    pub mate: Option<i32>,
}

pub fn cloud_eval_cp(fen: &str, variant: &str) -> Result<i32> {
    let url = format!(
        "https://lichess.org/api/cloud-eval?fen={}&multiPv=1&variant={}",
        urlencoding(fen),
        variant
    );

    let resp = reqwest::blocking::get(&url).context("lichess API request failed")?;
    let data: CloudEval = resp.json().context("failed to parse cloud eval response")?;

    let pvs = match data.pvs {
        Some(p) if !p.is_empty() => p,
        _ => return Ok(0),
    };

    let pv = &pvs[0];

    if let Some(mate) = pv.mate {
        return Ok(if mate > 0 { 10000 } else { -10000 });
    }

    Ok(pv.cp.unwrap_or(0))
}

fn urlencoding(s: &str) -> String {
    url::form_urlencoded::byte_serialize(s.as_bytes()).collect()
}
