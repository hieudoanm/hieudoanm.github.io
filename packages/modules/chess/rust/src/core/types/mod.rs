use serde::{Deserialize, Serialize};
use std::fmt;

pub type Square = u8;
pub type Board = [Option<Piece>; 64];

pub(crate) mod board_serde {
    use serde::de::{self, SeqAccess, Visitor};
    use serde::ser::SerializeSeq;
    use serde::{Deserializer, Serializer};
    use std::fmt;

    use super::{Board, Piece};

    pub fn serialize<S>(board: &Board, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        let mut seq = serializer.serialize_seq(Some(64))?;
        for piece in board.iter() {
            seq.serialize_element(piece)?;
        }
        seq.end()
    }

    pub fn deserialize<'de, D>(deserializer: D) -> Result<Board, D::Error>
    where
        D: Deserializer<'de>,
    {
        struct BoardVisitor;

        impl<'de> Visitor<'de> for BoardVisitor {
            type Value = Board;

            fn expecting(&self, formatter: &mut fmt::Formatter) -> fmt::Result {
                formatter.write_str("an array of 64 optional pieces")
            }

            fn visit_seq<A>(self, mut seq: A) -> Result<Board, A::Error>
            where
                A: SeqAccess<'de>,
            {
                let mut board = [None; 64];
                let mut i = 0;
                while let Some(piece) = seq.next_element::<Option<Piece>>()? {
                    if i >= 64 {
                        return Err(de::Error::custom("expected exactly 64 elements"));
                    }
                    board[i] = piece;
                    i += 1;
                }
                if i != 64 {
                    return Err(de::Error::custom(format!(
                        "expected 64 elements, got {}",
                        i
                    )));
                }
                Ok(board)
            }
        }

        deserializer.deserialize_seq(BoardVisitor)
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum Color {
    #[serde(rename = "w")]
    White,
    #[serde(rename = "b")]
    Black,
}

impl Color {
    pub fn opposite(self) -> Self {
        match self {
            Color::White => Color::Black,
            Color::Black => Color::White,
        }
    }

    pub fn from_char(ch: char) -> Option<Self> {
        match ch {
            'w' => Some(Color::White),
            'b' => Some(Color::Black),
            _ => None,
        }
    }

    pub fn to_char(self) -> char {
        match self {
            Color::White => 'w',
            Color::Black => 'b',
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum PieceType {
    #[serde(rename = "p")]
    Pawn,
    #[serde(rename = "n")]
    Knight,
    #[serde(rename = "b")]
    Bishop,
    #[serde(rename = "r")]
    Rook,
    #[serde(rename = "q")]
    Queen,
    #[serde(rename = "k")]
    King,
}

impl PieceType {
    pub fn from_char(ch: char) -> Option<Self> {
        match ch {
            'p' | 'P' => Some(PieceType::Pawn),
            'n' | 'N' => Some(PieceType::Knight),
            'b' | 'B' => Some(PieceType::Bishop),
            'r' | 'R' => Some(PieceType::Rook),
            'q' | 'Q' => Some(PieceType::Queen),
            'k' | 'K' => Some(PieceType::King),
            _ => None,
        }
    }

    pub fn to_char(self) -> char {
        match self {
            PieceType::Pawn => 'p',
            PieceType::Knight => 'n',
            PieceType::Bishop => 'b',
            PieceType::Rook => 'r',
            PieceType::Queen => 'q',
            PieceType::King => 'k',
        }
    }

    pub fn to_upper_char(self) -> char {
        match self {
            PieceType::Pawn => 'P',
            PieceType::Knight => 'N',
            PieceType::Bishop => 'B',
            PieceType::Rook => 'R',
            PieceType::Queen => 'Q',
            PieceType::King => 'K',
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub struct Piece {
    pub color: Color,
    #[serde(rename = "type")]
    pub piece_type: PieceType,
}

impl Piece {
    pub fn new(color: Color, piece_type: PieceType) -> Self {
        Self { color, piece_type }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub struct Move {
    pub from: Square,
    pub to: Square,
    pub promotion: Option<PieceType>,
    pub captured: Option<Piece>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[allow(non_snake_case)]
pub struct CastlingRights {
    pub K: bool,
    pub Q: bool,
    pub k: bool,
    pub q: bool,
}

impl CastlingRights {
    pub fn all() -> Self {
        Self {
            K: true,
            Q: true,
            k: true,
            q: true,
        }
    }

    pub fn none() -> Self {
        Self {
            K: false,
            Q: false,
            k: false,
            q: false,
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum GameStatus {
    Playing,
    Checkmate,
    Stalemate,
    Draw,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum GameResult {
    WhiteWins,
    BlackWins,
    Draw,
    Ongoing,
}

impl fmt::Display for GameResult {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            GameResult::WhiteWins => write!(f, "1-0"),
            GameResult::BlackWins => write!(f, "0-1"),
            GameResult::Draw => write!(f, "1/2-1/2"),
            GameResult::Ongoing => write!(f, "*"),
        }
    }
}

impl Serialize for GameResult {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        serializer.serialize_str(&self.to_string())
    }
}

impl<'de> Deserialize<'de> for GameResult {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        let s = String::deserialize(deserializer)?;
        match s.as_str() {
            "1-0" => Ok(GameResult::WhiteWins),
            "0-1" => Ok(GameResult::BlackWins),
            "1/2-1/2" => Ok(GameResult::Draw),
            "*" => Ok(GameResult::Ongoing),
            _ => Err(serde::de::Error::custom(format!(
                "invalid game result: {}",
                s
            ))),
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct HistoryEntry {
    #[serde(rename = "move")]
    pub move_: Move,
    pub state_before: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct GameState {
    #[serde(with = "board_serde")]
    pub board: Board,
    pub turn: Color,
    pub castling_rights: CastlingRights,
    pub en_passant: Option<Square>,
    pub half_move_clock: u32,
    pub full_move_number: u32,
    pub history: Vec<HistoryEntry>,
    pub status: GameStatus,
    pub result: GameResult,
    pub in_check: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct FenFields {
    pub piece_placement: String,
    pub active_color: Color,
    pub castling_availability: String,
    pub en_passant_target: String,
    pub half_move_clock: u32,
    pub full_move_number: u32,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PGNGame {
    pub headers: std::collections::HashMap<String, String>,
    pub moves: Vec<PGNMove>,
    pub result: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PGNMove {
    pub move_number: u32,
    pub color: Color,
    pub san: String,
    pub nag: Option<Vec<String>>,
    pub comment: Option<String>,
    pub variations: Option<Vec<Vec<PGNMove>>>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum TimeClass {
    Classical,
    Rapid,
    Blitz,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "UPPERCASE")]
pub enum Score {
    Win,
    Draw,
    Loss,
}

pub type DevelopmentCoefficient = u32;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RatingGame {
    pub rating_opponent: u32,
    pub score: Score,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RatingInput {
    pub rating_player: u32,
    pub rating_opponent: u32,
    pub less_than_30_games: bool,
    pub over_rating_2400: bool,
    pub over_age_18: bool,
    pub score: Score,
    pub time_class: TimeClass,
}

impl Default for RatingInput {
    fn default() -> Self {
        Self {
            rating_player: 1000,
            rating_opponent: 1000,
            less_than_30_games: false,
            over_rating_2400: false,
            over_age_18: true,
            score: Score::Draw,
            time_class: TimeClass::Classical,
        }
    }
}
