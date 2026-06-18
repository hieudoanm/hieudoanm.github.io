use clap::ArgMatches;
use rand::seq::SliceRandom;

use super::{format_cards, Card};

#[cfg(test)]
mod tests {
    use super::*;

    fn c(rank: u8, suit: u8) -> Card {
        Card { rank, suit }
    }

    #[test]
    fn test_is_straight_normal() {
        let hand = [c(5, 0), c(6, 1), c(7, 2), c(8, 3), c(9, 0)];
        let (is, high) = is_straight(&hand);
        assert!(is);
        assert_eq!(high, 9);
    }

    #[test]
    fn test_is_straight_wheel() {
        let hand = [c(14, 0), c(2, 1), c(3, 2), c(4, 3), c(5, 0)];
        let (is, high) = is_straight(&hand);
        assert!(is);
        assert_eq!(high, 5);
    }

    #[test]
    fn test_is_straight_false() {
        let hand = [c(2, 0), c(4, 1), c(6, 2), c(8, 3), c(10, 0)];
        let (is, _) = is_straight(&hand);
        assert!(!is);
    }

    #[test]
    fn test_eval5_royal_flush() {
        let hand = [c(10, 0), c(11, 0), c(12, 0), c(13, 0), c(14, 0)];
        assert_eq!(eval5(&hand).rank, HandRank::StraightFlush);
    }

    #[test]
    fn test_eval5_straight_flush() {
        let hand = [c(5, 1), c(6, 1), c(7, 1), c(8, 1), c(9, 1)];
        assert_eq!(eval5(&hand).rank, HandRank::StraightFlush);
    }

    #[test]
    fn test_eval5_four_of_a_kind() {
        let hand = [c(7, 0), c(7, 1), c(7, 2), c(7, 3), c(9, 0)];
        assert_eq!(eval5(&hand).rank, HandRank::FourOfAKind);
    }

    #[test]
    fn test_eval5_full_house() {
        let hand = [c(10, 0), c(10, 1), c(10, 2), c(5, 0), c(5, 1)];
        assert_eq!(eval5(&hand).rank, HandRank::FullHouse);
    }

    #[test]
    fn test_eval5_flush() {
        let hand = [c(2, 0), c(5, 0), c(9, 0), c(11, 0), c(14, 0)];
        assert_eq!(eval5(&hand).rank, HandRank::Flush);
    }

    #[test]
    fn test_eval5_straight() {
        let hand = [c(3, 0), c(4, 1), c(5, 2), c(6, 3), c(7, 0)];
        assert_eq!(eval5(&hand).rank, HandRank::Straight);
    }

    #[test]
    fn test_eval5_three_of_a_kind() {
        let hand = [c(8, 0), c(8, 1), c(8, 2), c(2, 0), c(5, 1)];
        assert_eq!(eval5(&hand).rank, HandRank::ThreeOfAKind);
    }

    #[test]
    fn test_eval5_two_pair() {
        let hand = [c(9, 0), c(9, 1), c(4, 0), c(4, 1), c(2, 0)];
        assert_eq!(eval5(&hand).rank, HandRank::TwoPair);
    }

    #[test]
    fn test_eval5_one_pair() {
        let hand = [c(6, 0), c(6, 1), c(3, 0), c(5, 1), c(9, 2)];
        assert_eq!(eval5(&hand).rank, HandRank::OnePair);
    }

    #[test]
    fn test_eval5_high_card() {
        let hand = [c(2, 0), c(5, 1), c(9, 2), c(11, 3), c(14, 0)];
        assert_eq!(eval5(&hand).rank, HandRank::HighCard);
    }

    #[test]
    fn test_best_hand_selects_best_from_seven() {
        let seven = vec![
            c(14, 0),
            c(14, 1), // pocket aces
            c(2, 0),
            c(5, 1),
            c(9, 2),
            c(11, 3),
            c(3, 0), // board
        ];
        let result = best_hand(&seven);
        assert_eq!(result.rank, HandRank::OnePair);
    }

    #[test]
    fn test_new_poker_deck_52() {
        let deck = new_poker_deck();
        assert_eq!(deck.len(), 52);
    }

    #[test]
    fn test_new_poker_deck_all_ranks() {
        let deck = new_poker_deck();
        let ranks: std::collections::HashSet<u8> = deck.iter().map(|c| c.rank).collect();
        assert_eq!(ranks.len(), 13);
        for r in 2..=14 {
            assert!(ranks.contains(&r));
        }
    }

    #[test]
    fn test_remove_cards() {
        let deck = vec![c(2, 0), c(3, 1), c(4, 2), c(5, 3)];
        let removed = remove_cards(&deck, &[c(3, 1), c(5, 3)]);
        assert_eq!(removed, vec![c(2, 0), c(4, 2)]);
    }

    #[test]
    fn test_sum_high_cards() {
        let hand = [c(14, 0), c(13, 1), c(12, 2), c(11, 3), c(10, 0)];
        assert_eq!(sum_high_cards(&hand), 1413121110);
    }

    #[test]
    fn test_command_definition() {
        let cmd = command();
        assert!(!cmd.get_name().is_empty());
    }

    #[test]
    fn test_calculate_odds_simple() {
        let hole = vec![c(14, 0), c(14, 1)];
        let board = vec![c(14, 2), c(14, 3), c(9, 0), c(9, 1), c(2, 0)];
        let result = calculate_odds(&hole, &board, 1, 100);
        assert!(result.win >= 0.0);
        assert!(result.tie >= 0.0);
        assert!(result.lose >= 0.0);
        assert!((result.win + result.tie + result.lose - 100.0).abs() < 0.01);
    }

    #[tokio::test]
    async fn test_run_valid() {
        let cmd = command();
        let m = cmd
            .try_get_matches_from(vec!["poker", "--hand", "Ah Kh"])
            .unwrap();
        run(&m).await.unwrap();
    }

    #[tokio::test]
    async fn test_run_with_board() {
        let cmd = command();
        let m = cmd
            .try_get_matches_from(vec!["poker", "--hand", "Ah Kh", "--board", "2h 7s Tc"])
            .unwrap();
        run(&m).await.unwrap();
    }

    #[tokio::test]
    async fn test_run_duplicate_cards() {
        let cmd = command();
        let m = cmd
            .try_get_matches_from(vec!["poker", "--hand", "Ah Kh", "--board", "Ah"])
            .unwrap();
        let result = run(&m).await;
        assert!(result.is_err());
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord)]
enum HandRank {
    HighCard,
    OnePair,
    TwoPair,
    ThreeOfAKind,
    Straight,
    Flush,
    FullHouse,
    FourOfAKind,
    StraightFlush,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
struct EvalResult {
    rank: HandRank,
    score: u32,
}

fn is_straight(cards: &[Card; 5]) -> (bool, u8) {
    let mut ranks: [u8; 5] = [0; 5];
    for (i, c) in cards.iter().enumerate() {
        ranks[i] = c.rank;
    }
    ranks.sort();

    let mut straight = true;
    for i in 1..5 {
        if ranks[i] != ranks[i - 1] + 1 {
            straight = false;
            break;
        }
    }
    if straight {
        return (true, ranks[4]);
    }

    if ranks == [2, 3, 4, 5, 14] {
        return (true, 5);
    }
    (false, 0)
}

fn sum_high_cards(cards: &[Card; 5]) -> u32 {
    let mut ranks: [u8; 5] = [0; 5];
    for (i, c) in cards.iter().enumerate() {
        ranks[i] = c.rank;
    }
    ranks.sort_by(|a, b| b.cmp(a));
    let mut s = 0u32;
    for &r in &ranks {
        s = s * 100 + r as u32;
    }
    s
}

fn eval5(cards: &[Card; 5]) -> EvalResult {
    let mut counts: [u8; 15] = [0; 15];
    for c in cards {
        counts[c.rank as usize] += 1;
    }

    let mut pairs: Vec<u8> = Vec::new();
    let mut trips: u8 = 0;
    let mut quads: u8 = 0;
    for r in 2..=14 {
        match counts[r as usize] {
            2 => pairs.push(r),
            3 => trips = r,
            4 => quads = r,
            _ => {}
        }
    }

    let flush = cards.iter().all(|c| c.suit == cards[0].suit);
    let (straight, high) = is_straight(cards);

    if flush && straight && high == 14 {
        return EvalResult {
            rank: HandRank::StraightFlush,
            score: 14,
        };
    }
    if flush && straight {
        return EvalResult {
            rank: HandRank::StraightFlush,
            score: high as u32,
        };
    }
    if quads != 0 {
        return EvalResult {
            rank: HandRank::FourOfAKind,
            score: quads as u32,
        };
    }
    if trips != 0 && pairs.len() == 1 {
        return EvalResult {
            rank: HandRank::FullHouse,
            score: trips as u32 * 100 + pairs[0] as u32,
        };
    }
    if flush {
        return EvalResult {
            rank: HandRank::Flush,
            score: sum_high_cards(cards),
        };
    }
    if straight {
        return EvalResult {
            rank: HandRank::Straight,
            score: high as u32,
        };
    }
    if trips != 0 {
        return EvalResult {
            rank: HandRank::ThreeOfAKind,
            score: trips as u32,
        };
    }
    if pairs.len() == 2 {
        pairs.sort_by(|a, b| b.cmp(a));
        return EvalResult {
            rank: HandRank::TwoPair,
            score: pairs[0] as u32 * 100 + pairs[1] as u32,
        };
    }
    if pairs.len() == 1 {
        return EvalResult {
            rank: HandRank::OnePair,
            score: pairs[0] as u32,
        };
    }
    EvalResult {
        rank: HandRank::HighCard,
        score: sum_high_cards(cards),
    }
}

fn best_hand(cards: &[Card]) -> EvalResult {
    let n = cards.len();
    let mut best = EvalResult {
        rank: HandRank::HighCard,
        score: 0,
    };
    let mut comb = [0usize; 5];

    for (i, c) in comb.iter_mut().enumerate() {
        *c = i;
    }

    loop {
        let mut five = [Card { rank: 0, suit: 0 }; 5];
        for (i, &idx) in comb.iter().enumerate() {
            five[i] = cards[idx];
        }
        let r = eval5(&five);
        if r.rank as u8 > best.rank as u8 || (r.rank == best.rank && r.score > best.score) {
            best = r;
        }

        let mut i = 4i32;
        while i >= 0 && comb[i as usize] == i as usize + n - 5 {
            i -= 1;
        }
        if i < 0 {
            break;
        }
        comb[i as usize] += 1;
        for j in (i as usize + 1)..5 {
            comb[j] = comb[j - 1] + 1;
        }
    }

    best
}

fn new_poker_deck() -> Vec<Card> {
    let mut deck = Vec::with_capacity(52);
    for rank in 2..=14 {
        for suit in 0..4 {
            deck.push(Card { rank, suit });
        }
    }
    deck
}

fn remove_cards(deck: &[Card], remove: &[Card]) -> Vec<Card> {
    deck.iter()
        .filter(|c| !remove.contains(c))
        .copied()
        .collect()
}

struct OddsResult {
    win: f64,
    tie: f64,
    lose: f64,
}

fn calculate_odds(
    hole: &[Card],
    board: &[Card],
    num_opponents: usize,
    simulations: usize,
) -> OddsResult {
    let all_used: Vec<Card> = hole.iter().chain(board.iter()).copied().collect();
    let mut deck = remove_cards(&new_poker_deck(), &all_used);

    let mut wins = 0usize;
    let mut ties = 0usize;

    let mut rng = rand::thread_rng();

    for _ in 0..simulations {
        deck.shuffle(&mut rng);

        let mut full_board: Vec<Card> = board.to_vec();
        let mut idx = 0;
        while full_board.len() < 5 {
            full_board.push(deck[idx]);
            idx += 1;
        }

        let mut hero_cards: Vec<Card> = hole.to_vec();
        hero_cards.extend(&full_board);
        let hero_result = best_hand(&hero_cards);

        let mut best = hero_result;
        let mut best_count = 1usize;

        for _ in 0..num_opponents {
            let opp_cards: Vec<Card> = vec![deck[idx], deck[idx + 1]];
            idx += 2;
            let mut opp_all: Vec<Card> = opp_cards;
            opp_all.extend(&full_board);
            let r = best_hand(&opp_all);

            if r.rank as u8 > best.rank as u8 || (r.rank == best.rank && r.score > best.score) {
                best = r;
                best_count = 1;
            } else if r.rank == best.rank && r.score == best.score {
                best_count += 1;
            }
        }

        if hero_result.rank == best.rank && hero_result.score == best.score {
            if best_count > 1 {
                ties += 1;
            } else {
                wins += 1;
            }
        }
    }

    let total = simulations as f64;
    let win_pct = wins as f64 / total * 100.0;
    let tie_pct = ties as f64 / total * 100.0;
    OddsResult {
        win: win_pct,
        tie: tie_pct,
        lose: 100.0 - win_pct - tie_pct,
    }
}

pub fn command() -> clap::Command {
    clap::Command::new("poker")
        .about("Poker odds calculator")
        .arg(
            clap::Arg::new("hand")
                .help("Hole cards (e.g. \"Ah Kh\")")
                .short('H')
                .long("hand")
                .required(true),
        )
        .arg(
            clap::Arg::new("board")
                .help("Community cards (e.g. \"2h 7s Tc\")")
                .short('b')
                .long("board"),
        )
        .arg(
            clap::Arg::new("opponents")
                .help("Number of opponents")
                .short('o')
                .long("opponents")
                .default_value("1"),
        )
        .arg(
            clap::Arg::new("simulations")
                .help("Number of Monte Carlo simulations")
                .short('n')
                .long("simulations")
                .default_value("10000"),
        )
}

pub async fn run(matches: &ArgMatches) -> anyhow::Result<()> {
    let hand_str = matches.get_one::<String>("hand").unwrap();
    let hole = format_cards(hand_str)?;
    if hole.len() != 2 {
        anyhow::bail!("exactly 2 hole cards required, got {}", hole.len());
    }

    let board: Vec<Card> = if let Some(b) = matches.get_one::<String>("board") {
        let b = format_cards(b)?;
        if b.len() > 5 {
            anyhow::bail!("board can have at most 5 cards, got {}", b.len());
        }
        b
    } else {
        Vec::new()
    };

    let all_cards: Vec<Card> = hole.iter().chain(board.iter()).copied().collect();
    let mut seen = std::collections::HashSet::new();
    for c in &all_cards {
        if !seen.insert(*c) {
            anyhow::bail!("duplicate card: {c}");
        }
    }

    let num_opponents: usize = matches
        .get_one::<String>("opponents")
        .unwrap()
        .parse()
        .unwrap_or(1);
    let num_simulations: usize = matches
        .get_one::<String>("simulations")
        .unwrap()
        .parse()
        .unwrap_or(10000);

    let result = calculate_odds(&hole, &board, num_opponents, num_simulations);

    println!("{}", "─".repeat(48));
    println!("  Your hand:      {} {}", hole[0], hole[1]);
    if !board.is_empty() {
        let board_str: Vec<String> = board.iter().map(|c| c.to_string()).collect();
        println!("  Board:          {}", board_str.join(" "));
    }
    println!("  Opponents:      {num_opponents}");
    println!("  Simulations:    {num_simulations}");
    println!("{}", "─".repeat(48));
    println!("  Win:   {:5.1}%", result.win);
    println!("  Tie:   {:5.1}%", result.tie);
    println!("  Lose:  {:5.1}%", result.lose);
    println!("{}", "─".repeat(48));

    Ok(())
}
