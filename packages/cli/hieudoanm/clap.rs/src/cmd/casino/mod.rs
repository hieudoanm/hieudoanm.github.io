use clap::FromArgMatches;
pub mod baccarat;
pub mod blackjack;
mod coin;
mod dice;
mod poker;
mod roulette;
mod slots;

use std::fmt;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub struct Card {
    pub rank: u8,
    pub suit: u8,
}

impl fmt::Display for Card {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let r = match self.rank {
            2..=9 => char::from(b'0' + self.rank),
            10 => 'T',
            11 => 'J',
            12 => 'Q',
            13 => 'K',
            14 => 'A',
            _ => unreachable!(),
        };
        let s = match self.suit {
            0 => 'c',
            1 => 'd',
            2 => 'h',
            3 => 's',
            _ => unreachable!(),
        };
        write!(f, "{r}{s}")
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_card_display() {
        assert_eq!(format!("{}", Card { rank: 14, suit: 0 }), "Ac");
        assert_eq!(format!("{}", Card { rank: 10, suit: 3 }), "Ts");
        assert_eq!(format!("{}", Card { rank: 2, suit: 1 }), "2d");
    }

    #[test]
    fn test_parse_card_number() {
        let c = parse_card("7c");
        assert_eq!(c.rank, 7);
        assert_eq!(c.suit, 0);
    }

    #[test]
    fn test_parse_card_face() {
        assert_eq!(parse_card("Jd").rank, 11);
        assert_eq!(parse_card("Qh").rank, 12);
        assert_eq!(parse_card("Ks").rank, 13);
    }

    #[test]
    fn test_parse_card_ace() {
        let c = parse_card("Ac");
        assert_eq!(c.rank, 14);
    }

    #[test]
    fn test_parse_card_ten() {
        let c = parse_card("Tc");
        assert_eq!(c.rank, 10);
    }

    #[test]
    fn test_format_cards_basic() {
        let cards = format_cards("Ac Kd").unwrap();
        assert_eq!(cards.len(), 2);
        assert_eq!(cards[0].rank, 14);
        assert_eq!(cards[1].rank, 13);
    }

    #[test]
    fn test_format_cards_sorts_by_rank_descending() {
        let cards = format_cards("7c 5d Ah").unwrap();
        assert_eq!(cards.len(), 3);
        assert_eq!(cards[0].rank, 14);
        assert_eq!(cards[1].rank, 7);
        assert_eq!(cards[2].rank, 5);
    }
}

pub fn parse_card(s: &str) -> Card {
    let chars: Vec<char> = s.chars().collect();
    let rank = match chars[0] {
        '2'..='9' => chars[0] as u8 - b'0',
        'T' => 10,
        'J' => 11,
        'Q' => 12,
        'K' => 13,
        'A' => 14,
        _ => unreachable!(),
    };
    let suit = match chars[1] {
        'c' => 0,
        'd' => 1,
        'h' => 2,
        's' => 3,
        _ => unreachable!(),
    };
    Card { rank, suit }
}

pub fn format_cards(s: &str) -> anyhow::Result<Vec<Card>> {
    let mut cards: Vec<Card> = s.split_whitespace().map(parse_card).collect();
    cards.sort_by(|a, b| b.rank.cmp(&a.rank).then(a.suit.cmp(&b.suit)));
    Ok(cards)
}

pub fn new_shuffled_deck() -> Vec<Card> {
    use rand::seq::SliceRandom;
    let mut deck = Vec::with_capacity(52);
    for rank in 2..=14 {
        for suit in 0..4 {
            deck.push(Card { rank, suit });
        }
    }
    let mut rng = rand::thread_rng();
    deck.shuffle(&mut rng);
    deck
}

pub fn deal_card(deck: &mut Vec<Card>) -> Card {
    deck.remove(0)
}

pub fn command() -> clap::Command {
    clap::Command::new("casino")
        .about("Casino games: blackjack, poker odds, and more")
        .subcommand_required(true)
        .subcommand(blackjack::command())
        .subcommand(poker::command())
        .subcommand(baccarat::command())
        .subcommand(slots::command())
        .subcommand(coin::command())
        .subcommand(dice::command())
        .subcommand(roulette::command())
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("blackjack", m)) => blackjack::run(m).await,
        Some(("poker", m)) => poker::run(&poker::Args::from_arg_matches(m)?).await,
        Some(("baccarat", m)) => baccarat::run(&baccarat::Args::from_arg_matches(m)?).await,
        Some(("slots", m)) => slots::run(&slots::Args::from_arg_matches(m)?).await,
        Some(("coin", m)) => coin::run(&coin::Args::from_arg_matches(m)?).await,
        Some(("dice", m)) => dice::run(&dice::Args::from_arg_matches(m)?).await,
        Some(("roulette", m)) => roulette::run(&roulette::Args::from_arg_matches(m)?).await,
        _ => Ok(()),
    }
}
