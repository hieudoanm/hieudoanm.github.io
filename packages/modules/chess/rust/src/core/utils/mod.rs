use crate::core::types::{Color, Square};

pub const FILES: [char; 8] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

#[inline]
pub fn rank_of(sq: Square) -> u8 {
    sq / 8
}

#[inline]
pub fn file_of(sq: Square) -> u8 {
    sq % 8
}

#[inline]
pub fn square(rank: u8, file: u8) -> Square {
    rank * 8 + file
}

#[inline]
pub fn is_valid_square(sq: u8) -> bool {
    sq <= 63
}

pub fn square_name(sq: Square) -> String {
    format!("{}{}", FILES[file_of(sq) as usize], rank_of(sq) + 1)
}

pub fn parse_square(name: &str) -> Option<Square> {
    let mut chars = name.chars();
    let f_char = chars.next()?;
    let r_char = chars.next()?;
    let file = FILES.iter().position(|&c| c == f_char)? as u8;
    let rank = r_char.to_digit(10)? - 1;
    if rank > 7 {
        return None;
    }
    Some(square(rank as u8, file))
}

pub fn opposite_color(c: Color) -> Color {
    c.opposite()
}

pub fn square_color(sq: Square) -> &'static str {
    if (rank_of(sq) + file_of(sq)).is_multiple_of(2) {
        "dark"
    } else {
        "light"
    }
}
