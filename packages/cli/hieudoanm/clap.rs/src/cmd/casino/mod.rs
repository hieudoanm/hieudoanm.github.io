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
        Some(("poker", m)) => poker::run(m).await,
        Some(("baccarat", m)) => baccarat::run(m).await,
        Some(("slots", m)) => slots::run(m).await,
        Some(("coin", m)) => coin::run(m).await,
        Some(("dice", m)) => dice::run(m).await,
        Some(("roulette", m)) => roulette::run(m).await,
        _ => Ok(()),
    }
}
