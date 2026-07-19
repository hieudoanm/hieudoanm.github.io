use std::sync::OnceLock;

use crate::core::types::{Board, CastlingRights, Color, Move, Square};
use crate::core::utils::file_of;

// ── Zobrist Keys ──

pub struct Zobrist {
    pub piece_keys: [[[u64; 64]; 2]; 6],
    pub side_key: u64,
    pub castling_keys: [u64; 4],
    pub ep_keys: [u64; 8],
}

fn splitmix64(seed: &mut u64) -> u64 {
    *seed = seed.wrapping_add(0x9E3779B97F4A7C15);
    let mut z = *seed;
    z = (z ^ (z >> 30)).wrapping_mul(0xBF58476D1CE4E5B9);
    z = (z ^ (z >> 27)).wrapping_mul(0x94D049BB133111EB);
    z ^ (z >> 31)
}

fn init_zobrist() -> Zobrist {
    let mut seed: u64 = 123456789;
    let mut next = || splitmix64(&mut seed);

    let mut piece_keys = [[[0u64; 64]; 2]; 6];
    for pt in 0..6 {
        for c in 0..2 {
            for sq in 0..64 {
                piece_keys[pt][c][sq] = next();
            }
        }
    }

    Zobrist {
        piece_keys,
        side_key: next(),
        castling_keys: [next(), next(), next(), next()],
        ep_keys: [
            next(), next(), next(), next(),
            next(), next(), next(), next(),
        ],
    }
}

fn zobrist() -> &'static Zobrist {
    static KEYS: OnceLock<Zobrist> = OnceLock::new();
    KEYS.get_or_init(init_zobrist)
}

pub fn compute_hash(
    board: &Board,
    turn: Color,
    castling_rights: CastlingRights,
    en_passant: Option<Square>,
) -> u64 {
    let keys = zobrist();
    let mut hash = 0u64;
    for sq in 0..64u8 {
        if let Some(piece) = board[sq as usize] {
            hash ^= keys.piece_keys[piece.piece_type as usize][piece.color as usize][sq as usize];
        }
    }
    if turn == Color::Black {
        hash ^= keys.side_key;
    }
    if castling_rights.K {
        hash ^= keys.castling_keys[0];
    }
    if castling_rights.Q {
        hash ^= keys.castling_keys[1];
    }
    if castling_rights.k {
        hash ^= keys.castling_keys[2];
    }
    if castling_rights.q {
        hash ^= keys.castling_keys[3];
    }
    if let Some(ep) = en_passant {
        hash ^= keys.ep_keys[file_of(ep) as usize];
    }
    hash
}

// ── Transposition Table ──

const TT_SIZE: usize = 1 << 20;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum TTFlag {
    Exact,
    Alpha,
    Beta,
}

#[derive(Debug, Clone, Copy)]
pub struct TTEntry {
    pub key: u64,
    pub depth: u8,
    pub score: i32,
    pub flag: TTFlag,
    pub best_move: Option<Move>,
}

pub struct TranspositionTable {
    entries: Vec<TTEntry>,
}

impl TranspositionTable {
    pub fn new() -> Self {
        Self {
            entries: vec![
                TTEntry {
                    key: 0,
                    depth: 0,
                    score: 0,
                    flag: TTFlag::Exact,
                    best_move: None,
                };
                TT_SIZE
            ],
        }
    }

    fn index(&self, hash: u64) -> usize {
        hash as usize & (TT_SIZE - 1)
    }

    pub fn probe(&self, hash: u64) -> Option<TTEntry> {
        let entry = self.entries[self.index(hash)];
        if entry.key == hash {
            Some(entry)
        } else {
            None
        }
    }

    pub fn get_cutoff(&self, hash: u64, depth: u8, alpha: i32, beta: i32) -> Option<(i32, Option<Move>)> {
        let entry = self.entries[self.index(hash)];
        if entry.key == hash && entry.depth >= depth {
            match entry.flag {
                TTFlag::Exact => return Some((entry.score, entry.best_move)),
                TTFlag::Alpha if entry.score <= alpha => {
                    return Some((entry.score, entry.best_move))
                }
                TTFlag::Beta if entry.score >= beta => {
                    return Some((entry.score, entry.best_move))
                }
                _ => {}
            }
        }
        None
    }

    pub fn store(
        &mut self,
        hash: u64,
        depth: u8,
        score: i32,
        flag: TTFlag,
        best_move: Option<Move>,
    ) {
        let idx = self.index(hash);
        self.entries[idx] = TTEntry {
            key: hash,
            depth,
            score,
            flag,
            best_move,
        };
    }

    pub fn clear(&mut self) {
        for entry in self.entries.iter_mut() {
            entry.key = 0;
        }
    }
}
