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

#[derive(Debug, Deserialize)]
pub struct CloudEvalPV {
    pub moves: String,
    pub cp: i32,
}

#[derive(Debug, Deserialize)]
pub struct CloudEvalResponse {
    pub fen: String,
    pub depth: i32,
    pub knodes: i32,
    pub pvs: Vec<CloudEvalPV>,
}

pub fn cloud_eval(fen: &str, multi_pv: i32) -> Result<CloudEvalResponse> {
    let url = format!(
        "https://lichess.org/api/cloud-eval?fen={}&multiPv={}&variant=standard",
        urlencoding(fen),
        multi_pv
    );

    let resp = reqwest::blocking::get(&url).context("lichess API request failed")?;
    let data: CloudEvalResponse = resp.json().context("failed to parse cloud eval response")?;
    Ok(data)
}

#[derive(Debug, Deserialize)]
pub struct PlayerProfile {
    pub username: String,
    #[serde(default)]
    pub name: String,
    #[serde(default)]
    pub country: String,
    #[serde(default)]
    pub title: String,
    #[serde(default)]
    pub fide: i32,
    #[serde(default)]
    pub followers: i32,
    #[serde(default)]
    pub joined: i64,
    #[serde(default)]
    pub last_online: i64,
}

#[derive(Debug, Deserialize)]
pub struct ChessRatingLast {
    pub rating: i32,
    pub date: i32,
    pub rd: i32,
}

#[derive(Debug, Deserialize)]
pub struct ChessRatingBest {
    pub rating: i32,
    pub date: i32,
    pub game: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct ChessRatingRecord {
    pub win: i32,
    pub draw: i32,
    pub loss: i32,
}

#[derive(Debug, Deserialize)]
pub struct ChessRating {
    pub last: ChessRatingLast,
    pub best: ChessRatingBest,
    pub record: ChessRatingRecord,
}

#[derive(Debug, Deserialize)]
pub struct PlayerStats {
    pub chess_bullet: Option<ChessRating>,
    pub chess_blitz: Option<ChessRating>,
    pub chess_rapid: Option<ChessRating>,
}

#[derive(Debug, Deserialize, Clone)]
pub struct Player {
    pub rank: i32,
    pub username: String,
    #[serde(default)]
    pub name: String,
    pub score: i32,
    #[serde(default)]
    pub country: String,
    #[serde(default)]
    pub title: String,
    pub win_count: i32,
    pub draw_count: i32,
    pub loss_count: i32,
}

#[derive(Debug, Deserialize)]
pub struct LeaderboardsResponse {
    pub live_bullet: Vec<Player>,
    pub live_blitz: Vec<Player>,
    pub live_rapid: Vec<Player>,
    pub live_blitz960: Vec<Player>,
}

#[derive(Debug, Deserialize)]
pub struct TitledResponse {
    pub players: Vec<String>,
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_country_code_empty_returns_dash() {
        assert_eq!(country_code(""), "-");
    }

    #[test]
    fn test_country_code_extracts_code() {
        assert_eq!(country_code("https://api.chess.com/pub/country/US"), "US");
        assert_eq!(
            country_code("https://api.chess.com/pub/country/VIETNAM"),
            "VIETNAM"
        );
    }

    #[test]
    fn test_country_code_trims_trailing_slash() {
        assert_eq!(country_code("https://api.chess.com/pub/country/FR/"), "FR");
    }

    #[test]
    fn test_country_code_empty_url_returns_dash() {
        assert_eq!(country_code(""), "-");
    }
}

pub fn country_code(url: &str) -> String {
    if url.is_empty() {
        return "-".to_string();
    }
    let trimmed = url.trim_end_matches('/');
    match trimmed.rsplit('/').next() {
        Some(code) => code.to_uppercase(),
        None => "-".to_string(),
    }
}

pub const TITLES: &[&str] = &[
    "GM", "IM", "FM", "CM", "NM", "WGM", "WIM", "WFM", "WCM", "WNM",
];

pub const POSITIONS: &[&str] = &[
    "BBQNNRKR", "BQNBNRKR", "BQNNRBKR", "BQNNRKRB", "QBBNNRKR", "QNBBNRKR", "QNBNRBKR", "QNBNRKRB",
    "QBNNBRKR", "QNNBBRKR", "QNNRBBKR", "QNNRBKRB", "QBNNRKBR", "QNNBRKBR", "QNNRKBBR", "QNNRKRBB",
    "BBNQNRKR", "BNQBNRKR", "BNQNRBKR", "BNQNRKRB", "NBBQNRKR", "NQBBNRKR", "NQBNRBKR", "NQBNRKRB",
    "NBQNBRKR", "NQNBBRKR", "NQNRBBKR", "NQNRBKRB", "NBQNRKBR", "NQNBRKBR", "NQNRKBBR", "NQNRKRBB",
    "BBNNQRKR", "BNNBQRKR", "BNNQRBKR", "BNNQRKRB", "NBBNQRKR", "NNBBQRKR", "NNBQRBKR", "NNBQRKRB",
    "NBNQBRKR", "NNQBBRKR", "NNQRBBKR", "NNQRBKRB", "NBNQRKBR", "NNQBRKBR", "NNQRKBBR", "NNQRKRBB",
    "BBNNRQKR", "BNNBRQKR", "BNNRQBKR", "BNNRQKRB", "NBBNRQKR", "NNBBRQKR", "NNBRQBKR", "NNBRQKRB",
    "NBNRBQKR", "NNRBBQKR", "NNRQBBKR", "NNRQBKRB", "NBNRQKBR", "NNRBQKBR", "NNRQKBBR", "NNRQKRBB",
    "BBNNRKQR", "BNNBRKQR", "BNNRKBQR", "BNNRKQRB", "NBBNRKQR", "NNBBRKQR", "NNBRKBQR", "NNBRKQRB",
    "NBNRBKQR", "NNRBBKQR", "NNRKBBQR", "NNRKBQRB", "NBNRKQBR", "NNRBKQBR", "NNRKQBBR", "NNRKQRBB",
    "BBNNRKRQ", "BNNBRKRQ", "BNNRKBRQ", "BNNRKRQB", "NBBNRKRQ", "NNBBRKRQ", "NNBRKBRQ", "NNBRKRQB",
    "NBNRBKRQ", "NNRBBKRQ", "NNRKBBRQ", "NNRKBRQB", "NBNRKRBQ", "NNRBKRBQ", "NNRKRBBQ", "NNRKRQBB",
    "BBQNRNKR", "BQNBRNKR", "BQNRNBKR", "BQNRNKRB", "QBBNRNKR", "QNBBRNKR", "QNBRNBKR", "QNBRNKRB",
    "QBNRBNKR", "QNRBBNKR", "QNRNBBKR", "QNRNBKRB", "QBNRNKBR", "QNRBNKBR", "QNRNKBBR", "QNRNKRBB",
    "BBNQRNKR", "BNQBRNKR", "BNQRNBKR", "BNQRNKRB", "NBBQRNKR", "NQBBRNKR", "NQBRNBKR", "NQBRNKRB",
    "NBQRBNKR", "NQRBBNKR", "NQRNBBKR", "NQRNBKRB", "NBQRNKBR", "NQRBNKBR", "NQRNKBBR", "NQRNKRBB",
    "BBNRQNKR", "BNRBQNKR", "BNRQNBKR", "BNRQNKRB", "NBBRQNKR", "NRBBQNKR", "NRBQNBKR", "NRBQNKRB",
    "NBRQBNKR", "NRQBBNKR", "NRQNBBKR", "NRQNBKRB", "NBRQNKBR", "NRQBNKBR", "NRQNKBBR", "NRQNKRBB",
    "BBNRNQKR", "BNRBNQKR", "BNRNQBKR", "BNRNQKRB", "NBBRNQKR", "NRBBNQKR", "NRBNQBKR", "NRBNQKRB",
    "NBRNBQKR", "NRNBBQKR", "NRNQBBKR", "NRNQBKRB", "NBRNQKBR", "NRNBQKBR", "NRNQKBBR", "NRNQKRBB",
    "BBNRNKQR", "BNRBNKQR", "BNRNKBQR", "BNRNKQRB", "NBBRNKQR", "NRBBNKQR", "NRBNKBQR", "NRBNKQRB",
    "NBRNBKQR", "NRNBBKQR", "NRNKBBQR", "NRNKBQRB", "NBRNKQBR", "NRNBKQBR", "NRNKQBBR", "NRNKQRBB",
    "BBNRNKRQ", "BNRBNKRQ", "BNRNKBRQ", "BNRNKRQB", "NBBRNKRQ", "NRBBNKRQ", "NRBNKBRQ", "NRBNKRQB",
    "NBRNBKRQ", "NRNBBKRQ", "NRNKBBRQ", "NRNKBRQB", "NBRNKRBQ", "NRNBKRBQ", "NRNKRBBQ", "NRNKRQBB",
    "BBQNRKNR", "BQNBRKNR", "BQNRKBNR", "BQNRKNRB", "QBBNRKNR", "QNBBRKNR", "QNBRKBNR", "QNBRKNRB",
    "QBNRBKNR", "QNRBBKNR", "QNRKBBNR", "QNRKBNRB", "QBNRKNBR", "QNRBKNBR", "QNRKNBBR", "QNRKNRBB",
    "BBNQRKNR", "BNQBRKNR", "BNQRKBNR", "BNQRKNRB", "NBBQRKNR", "NQBBRKNR", "NQBRKBNR", "NQBRKNRB",
    "NBQRBKNR", "NQRBBKNR", "NQRKBBNR", "NQRKBNRB", "NBQRKNBR", "NQRBKNBR", "NQRKNBBR", "NQRKNRBB",
    "BBNRQKNR", "BNRBQKNR", "BNRQKBNR", "BNRQKNRB", "NBBRQKNR", "NRBBQKNR", "NRBQKBNR", "NRBQKNRB",
    "NBRQBKNR", "NRQBBKNR", "NRQKBBNR", "NRQKBNRB", "NBRQKNBR", "NRQBKNBR", "NRQKNBBR", "NRQKNRBB",
    "BBNRKQNR", "BNRBKQNR", "BNRKQBNR", "BNRKQNRB", "NBBRKQNR", "NRBBKQNR", "NRBKQBNR", "NRBKQNRB",
    "NBRKBQNR", "NRKBBQNR", "NRKQBBNR", "NRKQBNRB", "NBRKQNBR", "NRKBQNBR", "NRKQNBBR", "NRKQNRBB",
    "BBNRKNQR", "BNRBKNQR", "BNRKNBQR", "BNRKNQRB", "NBBRKNQR", "NRBBKNQR", "NRBKNBQR", "NRBKNQRB",
    "NBRKBNQR", "NRKBBNQR", "NRKNBBQR", "NRKNBQRB", "NBRKNQBR", "NRKBNQBR", "NRKNQBBR", "NRKNQRBB",
    "BBNRKNRQ", "BNRBKNRQ", "BNRKNBRQ", "BNRKNRQB", "NBBRKNRQ", "NRBBKNRQ", "NRBKNBRQ", "NRBKNRQB",
    "NBRKBNRQ", "NRKBBNRQ", "NRKNBBRQ", "NRKNBRQB", "NBRKNRBQ", "NRKBNRBQ", "NRKNRBBQ", "NRKNRQBB",
    "BBQNRKRN", "BQNBRKRN", "BQNRKBRN", "BQNRKRNB", "QBBNRKRN", "QNBBRKRN", "QNBRKBRN", "QNBRKRNB",
    "QBNRBKRN", "QNRBBKRN", "QNRKBBRN", "QNRKBRNB", "QBNRKRBN", "QNRBKRBN", "QNRKRBBN", "QNRKRNBB",
    "BBNQRKRN", "BNQBRKRN", "BNQRKBRN", "BNQRKRNB", "NBBQRKRN", "NQBBRKRN", "NQBRKBRN", "NQBRKRNB",
    "NBQRBKRN", "NQRBBKRN", "NQRKBBRN", "NQRKBRNB", "NBQRKRBN", "NQRBKRBN", "NQRKRBBN", "NQRKRNBB",
    "BBNRQKRN", "BNRBQKRN", "BNRQKBRN", "BNRQKRNB", "NBBRQKRN", "NRBBQKRN", "NRBQKBRN", "NRBQKRNB",
    "NBRQBKRN", "NRQBBKRN", "NRQKBBRN", "NRQKBRNB", "NBRQKRBN", "NRQBKRBN", "NRQKRBBN", "NRQKRNBB",
    "BBNRKQRN", "BNRBKQRN", "BNRKQBRN", "BNRKQRNB", "NBBRKQRN", "NRBBKQRN", "NRBKQBRN", "NRBKQRNB",
    "NBRKBQRN", "NRKBBQRN", "NRKQBBRN", "NRKQBRNB", "NBRKQRBN", "NRKBQRBN", "NRKQRBBN", "NRKQRNBB",
    "BBNRKRQN", "BNRBKRQN", "BNRKRBQN", "BNRKRQNB", "NBBRKRQN", "NRBBKRQN", "NRBKRBQN", "NRBKRQNB",
    "NBRKBRQN", "NRKBBRQN", "NRKRBBQN", "NRKRBQNB", "NBRKRQBN", "NRKBRQBN", "NRKRQBBN", "NRKRQNBB",
    "BBNRKRNQ", "BNRBKRNQ", "BNRKRBNQ", "BNRKRNQB", "NBBRKRNQ", "NRBBKRNQ", "NRBKRBNQ", "NRBKRNQB",
    "NBRKBRNQ", "NRKBBRNQ", "NRKRBBNQ", "NRKRBNQB", "NBRKRNBQ", "NRKBRNBQ", "NRKRNBBQ", "NRKRNQBB",
    "BBQRNNKR", "BQRBNNKR", "BQRNNBKR", "BQRNNKRB", "QBBRNNKR", "QRBBNNKR", "QRBNNBKR", "QRBNNKRB",
    "QBRNBNKR", "QRNBBNKR", "QRNNBBKR", "QRNNBKRB", "QBRNNKBR", "QRNBNKBR", "QRNNKBBR", "QRNNKRBB",
    "BBRQNNKR", "BRQBNNKR", "BRQNNBKR", "BRQNNKRB", "RBBQNNKR", "RQBBNNKR", "RQBNNBKR", "RQBNNKRB",
    "RBQNBNKR", "RQNBBNKR", "RQNNBBKR", "RQNNBKRB", "RBQNNKBR", "RQNBNKBR", "RQNNKBBR", "RQNNKRBB",
    "BBRNQNKR", "BRNBQNKR", "BRNQNBKR", "BRNQNKRB", "RBBNQNKR", "RNBBQNKR", "RNBQNBKR", "RNBQNKRB",
    "RBNQBNKR", "RNQBBNKR", "RNQNBBKR", "RNQNBKRB", "RBNQNKBR", "RNQBNKBR", "RNQNKBBR", "RNQNKRBB",
    "BBRNNQKR", "BRNBNQKR", "BRNNQBKR", "BRNNQKRB", "RBBNNQKR", "RNBBNQKR", "RNBNQBKR", "RNBNQKRB",
    "RBNNBQKR", "RNNBBQKR", "RNNQBBKR", "RNNQBKRB", "RBNNQKBR", "RNNBQKBR", "RNNQKBBR", "RNNQKRBB",
    "BBRNNKQR", "BRNBNKQR", "BRNNKBQR", "BRNNKQRB", "RBBNNKQR", "RNBBNKQR", "RNBNKBQR", "RNBNKQRB",
    "RBNNBKQR", "RNNBBKQR", "RNNKBBQR", "RNNKBQRB", "RBNNKQBR", "RNNBKQBR", "RNNKQBBR", "RNNKQRBB",
    "BBRNNKRQ", "BRNBNKRQ", "BRNNKBRQ", "BRNNKRQB", "RBBNNKRQ", "RNBBNKRQ", "RNBNKBRQ", "RNBNKRQB",
    "RBNNBKRQ", "RNNBBKRQ", "RNNKBBRQ", "RNNKBRQB", "RBNNKRBQ", "RNNBKRBQ", "RNNKRBBQ", "RNNKRQBB",
    "BBQRNKNR", "BQRBNKNR", "BQRNKBNR", "BQRNKNRB", "QBBRNKNR", "QRBBNKNR", "QRBNKBNR", "QRBNKNRB",
    "QBRNBKNR", "QRNBBKNR", "QRNKBBNR", "QRNKBNRB", "QBRNKNBR", "QRNBKNBR", "QRNKNBBR", "QRNKNRBB",
    "BBRQNKNR", "BRQBNKNR", "BRQNKBNR", "BRQNKNRB", "RBBQNKNR", "RQBBNKNR", "RQBNKBNR", "RQBNKNRB",
    "RBQNBKNR", "RQNBBKNR", "RQNKBBNR", "RQNKBNRB", "RBQNKNBR", "RQNBKNBR", "RQNKNBBR", "RQNKNRBB",
    "BBRNQKNR", "BRNBQKNR", "BRNQKBNR", "BRNQKNRB", "RBBNQKNR", "RNBBQKNR", "RNBQKBNR", "RNBQKNRB",
    "RBNQBKNR", "RNQBBKNR", "RNQKBBNR", "RNQKBNRB", "RBNQKNBR", "RNQBKNBR", "RNQKNBBR", "RNQKNRBB",
    "BBRNKQNR", "BRNBKQNR", "BRNKQBNR", "BRNKQNRB", "RBBNKQNR", "RNBBKQNR", "RNBKQBNR", "RNBKQNRB",
    "RBNKBQNR", "RNKBBQNR", "RNKQBBNR", "RNKQBNRB", "RBNKQNBR", "RNKBQNBR", "RNKQNBBR", "RNKQNRBB",
    "BBRNKNQR", "BRNBKNQR", "BRNKNBQR", "BRNKNQRB", "RBBNKNQR", "RNBBKNQR", "RNBKNBQR", "RNBKNQRB",
    "RBNKBNQR", "RNKBBNQR", "RNKNBBQR", "RNKNBQRB", "RBNKNQBR", "RNKBNQBR", "RNKNQBBR", "RNKNQRBB",
    "BBRNKNRQ", "BRNBKNRQ", "BRNKNBRQ", "BRNKNRQB", "RBBNKNRQ", "RNBBKNRQ", "RNBKNBRQ", "RNBKNRQB",
    "RBNKBNRQ", "RNKBBNRQ", "RNKNBBRQ", "RNKNBRQB", "RBNKNRBQ", "RNKBNRBQ", "RNKNRBBQ", "RNKNRQBB",
    "BBQRNKRN", "BQRBNKRN", "BQRNKBRN", "BQRNKRNB", "QBBRNKRN", "QRBBNKRN", "QRBNKBRN", "QRBNKRNB",
    "QBRNBKRN", "QRNBBKRN", "QRNKBBRN", "QRNKBRNB", "QBRNKRBN", "QRNBKRBN", "QRNKRBBN", "QRNKRNBB",
    "BBRQNKRN", "BRQBNKRN", "BRQNKBRN", "BRQNKRNB", "RBBQNKRN", "RQBBNKRN", "RQBNKBRN", "RQBNKRNB",
    "RBQNBKRN", "RQNBBKRN", "RQNKBBRN", "RQNKBRNB", "RBQNKRBN", "RQNBKRBN", "RQNKRBBN", "RQNKRNBB",
    "BBRNQKRN", "BRNBQKRN", "BRNQKBRN", "BRNQKRNB", "RBBNQKRN", "RNBBQKRN", "RNBQKBRN", "RNBQKRNB",
    "RBNQBKRN", "RNQBBKRN", "RNQKBBRN", "RNQKBRNB", "RBNQKRBN", "RNQBKRBN", "RNQKRBBN", "RNQKRNBB",
    "BBRNKQRN", "BRNBKQRN", "BRNKQBRN", "BRNKQRNB", "RBBNKQRN", "RNBBKQRN", "RNBKQBRN", "RNBKQRNB",
    "RBNKBQRN", "RNKBBQRN", "RNKQBBRN", "RNKQBRNB", "RBNKQRBN", "RNKBQRBN", "RNKQRBBN", "RNKQRNBB",
    "BBRNKRQN", "BRNBKRQN", "BRNKRBQN", "BRNKRQNB", "RBBNKRQN", "RNBBKRQN", "RNBKRBQN", "RNBKRQNB",
    "RBNKBRQN", "RNKBBRQN", "RNKRBBQN", "RNKRBQNB", "RBNKRQBN", "RNKBRQBN", "RNKRQBBN", "RNKRQNBB",
    "BBRNKRNQ", "BRNBKRNQ", "BRNKRBNQ", "BRNKRNQB", "RBBNKRNQ", "RNBBKRNQ", "RNBKRBNQ", "RNBKRNQB",
    "RBNKBRNQ", "RNKBBRNQ", "RNKRBBNQ", "RNKRBNQB", "RBNKRNBQ", "RNKBRNBQ", "RNKRNBBQ", "RNKRNQBB",
    "BBQRKNNR", "BQRBKNNR", "BQRKNBNR", "BQRKNNRB", "QBBRKNNR", "QRBBKNNR", "QRBKNBNR", "QRBKNNRB",
    "QBRKBNNR", "QRKBBNNR", "QRKNBBNR", "QRKNBNRB", "QBRKNNBR", "QRKBNNBR", "QRKNNBBR", "QRKNNRBB",
    "BBRQKNNR", "BRQBKNNR", "BRQKNBNR", "BRQKNNRB", "RBBQKNNR", "RQBBKNNR", "RQBKNBNR", "RQBKNNRB",
    "RBQKBNNR", "RQKBBNNR", "RQKNBBNR", "RQKNBNRB", "RBQKNNBR", "RQKBNNBR", "RQKNNBBR", "RQKNNRBB",
    "BBRKQNNR", "BRKBQNNR", "BRKQNBNR", "BRKQNNRB", "RBBKQNNR", "RKBBQNNR", "RKBQNBNR", "RKBQNNRB",
    "RBKQBNNR", "RKQBBNNR", "RKQNBBNR", "RKQNBNRB", "RBKQNNBR", "RKQBNNBR", "RKQNNBBR", "RKQNNRBB",
    "BBRKNQNR", "BRKBNQNR", "BRKNQBNR", "BRKNQNRB", "RBBKNQNR", "RKBBNQNR", "RKBNQBNR", "RKBNQNRB",
    "RBKNBQNR", "RKNBBQNR", "RKNQBBNR", "RKNQBNRB", "RBKNQNBR", "RKNBQNBR", "RKNQNBBR", "RKNQNRBB",
    "BBRKNNQR", "BRKBNNQR", "BRKNNBQR", "BRKNNQRB", "RBBKNNQR", "RKBBNNQR", "RKBNNBQR", "RKBNNQRB",
    "RBKNBNQR", "RKNBBNQR", "RKNNBBQR", "RKNNBQRB", "RBKNNQBR", "RKNBNQBR", "RKNNQBBR", "RKNNQRBB",
    "BBRKNNRQ", "BRKBNNRQ", "BRKNNBRQ", "BRKNNRQB", "RBBKNNRQ", "RKBBNNRQ", "RKBNNBRQ", "RKBNNRQB",
    "RBKNBNRQ", "RKNBBNRQ", "RKNNBBRQ", "RKNNBRQB", "RBKNNRBQ", "RKNBNRBQ", "RKNNRBBQ", "RKNNRQBB",
    "BBQRKNRN", "BQRBKNRN", "BQRKNBRN", "BQRKNRNB", "QBBRKNRN", "QRBBKNRN", "QRBKNBRN", "QRBKNRNB",
    "QBRKBNRN", "QRKBBNRN", "QRKNBBRN", "QRKNBRNB", "QBRKNRBN", "QRKBNRBN", "QRKNRBBN", "QRKNRNBB",
    "BBRQKNRN", "BRQBKNRN", "BRQKNBRN", "BRQKNRNB", "RBBQKNRN", "RQBBKNRN", "RQBKNBRN", "RQBKNRNB",
    "RBQKBNRN", "RQKBBNRN", "RQKNBBRN", "RQKNBRNB", "RBQKNRBN", "RQKBNRBN", "RQKNRBBN", "RQKNRNBB",
    "BBRKQNRN", "BRKBQNRN", "BRKQNBRN", "BRKQNRNB", "RBBKQNRN", "RKBBQNRN", "RKBQNBRN", "RKBQNRNB",
    "RBKQBNRN", "RKQBBNRN", "RKQNBBRN", "RKQNBRNB", "RBKQNRBN", "RKQBNRBN", "RKQNRBBN", "RKQNRNBB",
    "BBRKNQRN", "BRKBNQRN", "BRKNQBRN", "BRKNQRNB", "RBBKNQRN", "RKBBNQRN", "RKBNQBRN", "RKBNQRNB",
    "RBKNBQRN", "RKNBBQRN", "RKNQBBRN", "RKNQBRNB", "RBKNQRBN", "RKNBQRBN", "RKNQRBBN", "RKNQRNBB",
    "BBRKNRQN", "BRKBNRQN", "BRKNRBQN", "BRKNRQNB", "RBBKNRQN", "RKBBNRQN", "RKBNRBQN", "RKBNRQNB",
    "RBKNBRQN", "RKNBBRQN", "RKNRBBQN", "RKNRBQNB", "RBKNRQBN", "RKNBRQBN", "RKNRQBBN", "RKNRQNBB",
    "BBRKNRNQ", "BRKBNRNQ", "BRKNRBNQ", "BRKNRNQB", "RBBKNRNQ", "RKBBNRNQ", "RKBNRBNQ", "RKBNRNQB",
    "RBKNBRNQ", "RKNBBRNQ", "RKNRBBNQ", "RKNRBNQB", "RBKNRNBQ", "RKNBRNBQ", "RKNRNBBQ", "RKNRNQBB",
    "BBQRKRNN", "BQRBKRNN", "BQRKRBNN", "BQRKRNNB", "QBBRKRNN", "QRBBKRNN", "QRBKRBNN", "QRBKRNNB",
    "QBRKBRNN", "QRKBBRNN", "QRKRBBNN", "QRKRBNNB", "QBRKRNBN", "QRKBRNBN", "QRKRNBBN", "QRKRNNBB",
    "BBRQKRNN", "BRQBKRNN", "BRQKRBNN", "BRQKRNNB", "RBBQKRNN", "RQBBKRNN", "RQBKRBNN", "RQBKRNNB",
    "RBQKBRNN", "RQKBBRNN", "RQKRBBNN", "RQKRBNNB", "RBQKRNBN", "RQKBRNBN", "RQKRNBBN", "RQKRNNBB",
    "BBRKQRNN", "BRKBQRNN", "BRKQRBNN", "BRKQRNNB", "RBBKQRNN", "RKBBQRNN", "RKBQRBNN", "RKBQRNNB",
    "RBKQBRNN", "RKQBBRNN", "RKQRBBNN", "RKQRBNNB", "RBKQRNBN", "RKQBRNBN", "RKQRNBBN", "RKQRNNBB",
    "BBRKRQNN", "BRKBRQNN", "BRKRQBNN", "BRKRQNNB", "RBBKRQNN", "RKBBRQNN", "RKBRQBNN", "RKBRQNNB",
    "RBKRBQNN", "RKRBBQNN", "RKRQBBNN", "RKRQBNNB", "RBKRQNBN", "RKRBQNBN", "RKRQNBBN", "RKRQNNBB",
    "BBRKRNQN", "BRKBRNQN", "BRKRNBQN", "BRKRNQNB", "RBBKRNQN", "RKBBRNQN", "RKBRNBQN", "RKBRNQNB",
    "RBKRBNQN", "RKRBBNQN", "RKRNBBQN", "RKRNBQNB", "RBKRNQBN", "RKRBNQBN", "RKRNQBBN", "RKRNQNBB",
    "BBRKRNNQ", "BRKBRNNQ", "BRKRNBNQ", "BRKRNNQB", "RBBKRNNQ", "RKBBRNNQ", "RKBRNBNQ", "RKBRNNQB",
    "RBKRBNNQ", "RKRBBNNQ", "RKRNBBNQ", "RKRNBNQB", "RBKRNNBQ", "RKRBNNBQ", "RKRNNBBQ", "RKRNNQBB",
];

#[derive(Debug, Clone)]
pub struct Opening {
    pub eco: &'static str,
    pub group: &'static str,
    pub subgroup: &'static str,
    pub name: &'static str,
    pub pgn: &'static str,
}

pub static OPENINGS: &[Opening] = &[
    Opening { eco: "B02", group: "Alekhine Defense", subgroup: "", name: "Alekhine Defense", pgn: "1. e4 Nf6" },
    Opening { eco: "B03", group: "Alekhine Defense", subgroup: "", name: "Alekhine Defense", pgn: "1. e4 Nf6 2. e5 Nd5 3. d4" },
    Opening { eco: "B03", group: "Alekhine Defense", subgroup: "", name: "Alekhine Defense", pgn: "1. e4 Nf6 2. e5 Nd5 3. d4 d6" },
    Opening { eco: "B03", group: "Alekhine Defense", subgroup: "", name: "Alekhine Defense", pgn: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. c4" },
    Opening { eco: "B03", group: "Alekhine Defense", subgroup: "Balogh Variation", name: "Alekhine Defense: Balogh Variation", pgn: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. Bc4" },
    Opening { eco: "B02", group: "Alekhine Defense", subgroup: "Brooklyn Variation", name: "Alekhine Defense: Brooklyn Variation", pgn: "1. e4 Nf6 2. e5 Ng8" },
    Opening { eco: "B02", group: "Alekhine Defense", subgroup: "Brooklyn Variation", name: "Alekhine Defense: Brooklyn Variation, Everglades Variation", pgn: "1. e4 Nf6 2. e5 Ng8 3. d4 f5" },
    Opening { eco: "B02", group: "Alekhine Defense", subgroup: "Buckley Attack", name: "Alekhine Defense: Buckley Attack", pgn: "1. e4 Nf6 2. e5 Nd5 3. Na3" },
    Opening { eco: "B03", group: "Alekhine Defense", subgroup: "Exchange Variation", name: "Alekhine Defense: Exchange Variation", pgn: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. c4 Nb6 5. exd6" },
    Opening { eco: "B03", group: "Alekhine Defense", subgroup: "Exchange Variation", name: "Alekhine Defense: Exchange Variation, Karpov Variation", pgn: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. c4 Nb6 5. exd6 cxd6 6. Nc3 g6 7. h3 Bg7 8. Nf3 O-O 9. Be2 Nc6 10. O-O Bf5 11. Bf4" },
    Opening { eco: "B03", group: "Alekhine Defense", subgroup: "Exchange Variation", name: "Alekhine Defense: Exchange Variation, Voronezh Variation", pgn: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. c4 Nb6 5. exd6 cxd6 6. Nc3 g6 7. Be3 Bg7 8. Rc1 O-O 9. b3" },
    Opening { eco: "B03", group: "Alekhine Defense", subgroup: "Four Pawns Attack", name: "Alekhine Defense: Four Pawns Attack", pgn: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. c4 Nb6 5. f4" },
    Opening { eco: "B03", group: "Alekhine Defense", subgroup: "Four Pawns Attack", name: "Alekhine Defense: Four Pawns Attack, Cambridge Gambit", pgn: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. c4 Nb6 5. f4 g5" },
    Opening { eco: "B03", group: "Alekhine Defense", subgroup: "Four Pawns Attack", name: "Alekhine Defense: Four Pawns Attack, Fianchetto Variation", pgn: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. c4 Nb6 5. f4 g6" },
    Opening { eco: "B03", group: "Alekhine Defense", subgroup: "Four Pawns Attack", name: "Alekhine Defense: Four Pawns Attack, Ilyin-Zhenevsky Variation", pgn: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. c4 Nb6 5. f4 dxe5 6. fxe5 Nc6 7. Nf3 Bg4 8. e6 fxe6 9. c5" },
    Opening { eco: "B03", group: "Alekhine Defense", subgroup: "Four Pawns Attack", name: "Alekhine Defense: Four Pawns Attack, Korchnoi Variation", pgn: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. c4 Nb6 5. f4 dxe5 6. fxe5 Bf5 7. Nc3 e6 8. Nf3 Be7 9. Be2 O-O 10. O-O f6" },
    Opening { eco: "B03", group: "Alekhine Defense", subgroup: "Four Pawns Attack", name: "Alekhine Defense: Four Pawns Attack, Main Line", pgn: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. c4 Nb6 5. f4 dxe5 6. fxe5 Nc6 7. Be3" },
    Opening { eco: "B03", group: "Alekhine Defense", subgroup: "Four Pawns Attack", name: "Alekhine Defense: Four Pawns Attack, Tartakower Variation", pgn: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. c4 Nb6 5. f4 dxe5 6. fxe5 Nc6 7. Be3 Bf5 8. Nc3 e6 9. Nf3 Qd7 10. Be2 O-O-O 11. O-O Be7" },
    Opening { eco: "B03", group: "Alekhine Defense", subgroup: "Four Pawns Attack", name: "Alekhine Defense: Four Pawns Attack, Trifunovic Variation", pgn: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. c4 Nb6 5. f4 Bf5" },
    Opening { eco: "B03", group: "Alekhine Defense", subgroup: "Hunt Variation", name: "Alekhine Defense: Hunt Variation", pgn: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. c4 Nb6 5. c5" },
    Opening { eco: "B02", group: "Alekhine Defense", subgroup: "Hunt Variation", name: "Alekhine Defense: Hunt Variation, Lasker Simul Gambit", pgn: "1. e4 Nf6 2. e5 Nd5 3. c4 Nb6 4. c5 Nd5 5. Bc4 e6 6. Nc3" },
    Opening { eco: "B02", group: "Alekhine Defense", subgroup: "Hunt Variation", name: "Alekhine Defense: Hunt Variation, Matsukevich Gambit", pgn: "1. e4 Nf6 2. e5 Nd5 3. c4 Nb6 4. c5 Nd5 5. Nc3 Nxc3 6. dxc3 d6 7. Bg5" },
    Opening { eco: "B02", group: "Alekhine Defense", subgroup: "Hunt Variation", name: "Alekhine Defense: Hunt Variation, Mikenas Gambit", pgn: "1. e4 Nf6 2. e5 Nd5 3. c4 Nb6 4. c5 Nd5 5. Bc4 e6 6. Nc3 d6 7. Nxd5 exd5 8. Bxd5" },
    Opening { eco: "B02", group: "Alekhine Defense", subgroup: "Kmoch Variation", name: "Alekhine Defense: Kmoch Variation", pgn: "1. e4 Nf6 2. e5 Nd5 3. Bc4 Nb6 4. Bb3 c5 5. d3" },
    Opening { eco: "B02", group: "Alekhine Defense", subgroup: "Krejcik Variation", name: "Alekhine Defense: Krejcik Variation", pgn: "1. e4 Nf6 2. Bc4" },
    Opening { eco: "B02", group: "Alekhine Defense", subgroup: "Krejcik Variation", name: "Alekhine Defense: Krejcik Variation, Krejcik Gambit", pgn: "1. e4 Nf6 2. Bc4 Nxe4 3. Bxf7+" },
    Opening { eco: "B02", group: "Alekhine Defense", subgroup: "Maróczy Variation", name: "Alekhine Defense: Maróczy Variation", pgn: "1. e4 Nf6 2. d3" },
    Opening { eco: "B04", group: "Alekhine Defense", subgroup: "Modern Variation", name: "Alekhine Defense: Modern Variation", pgn: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. Nf3" },
    Opening { eco: "B04", group: "Alekhine Defense", subgroup: "Modern Variation", name: "Alekhine Defense: Modern Variation, Alburt Variation", pgn: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. Nf3 g6" },
    Opening { eco: "B03", group: "Alekhine Defense", subgroup: "Modern Variation", name: "Alekhine Defense: Modern Variation, Alekhine Gambit", pgn: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. c4 Nb6 5. Nf3 Bg4 6. Be2" },
    Opening { eco: "B05", group: "Alekhine Defense", subgroup: "Modern Variation", name: "Alekhine Defense: Modern Variation, Alekhine Variation", pgn: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. Nf3 Bg4 5. c4" },
];
