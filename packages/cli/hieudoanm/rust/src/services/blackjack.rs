use rand::seq::SliceRandom;

#[derive(Debug, Clone, PartialEq)]
pub struct Card {
    pub rank: String,
    pub value: i32,
}

#[derive(Debug, Clone)]
pub struct Blackjack {
    pub deck: Vec<Card>,
    pub current_card: Option<Card>,
    pub count: i32,
    pub reveal: bool,
}

impl Blackjack {
    pub fn new() -> Self {
        Self {
            deck: new_deck(),
            current_card: None,
            count: 0,
            reveal: false,
        }
    }

    pub fn deal(&mut self) {
        if self.deck.is_empty() {
            self.deck = new_deck();
        }
        let card = self.deck.remove(0);
        self.count += card.value;
        self.current_card = Some(card);
        self.reveal = false;
    }

    pub fn reveal_count(&mut self) {
        self.reveal = true;
    }
}

fn hi_lo_value(rank: &str) -> i32 {
    match rank {
        "2" | "3" | "4" | "5" | "6" => 1,
        "7" | "8" | "9" => 0,
        _ => -1,
    }
}

fn new_deck() -> Vec<Card> {
    let ranks = [
        "A", "2", "3", "4", "5", "6",
        "7", "8", "9", "10", "J", "Q", "K",
    ];

    let mut deck: Vec<Card> = ranks
        .iter()
        .map(|r| Card {
            rank: r.to_string(),
            value: hi_lo_value(r),
        })
        .collect();

    let mut rng = rand::thread_rng();
    deck.shuffle(&mut rng);

    deck
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_new_deck_has_13_cards() {
        let deck = new_deck();
        assert_eq!(deck.len(), 13);
    }

    #[test]
    fn test_hi_lo_values() {
        assert_eq!(hi_lo_value("2"), 1);
        assert_eq!(hi_lo_value("7"), 0);
        assert_eq!(hi_lo_value("A"), -1);
        assert_eq!(hi_lo_value("K"), -1);
    }

    #[test]
    fn test_deal_updates_count() {
        let mut bj = Blackjack::new();
        let initial_count = bj.count;
        bj.deal();
        assert!(bj.current_card.is_some());
        assert_eq!(bj.count, initial_count + bj.current_card.as_ref().unwrap().value);
    }

    #[test]
    fn test_deal_empty_deck_reshuffles() {
        let mut bj = Blackjack::new();
        bj.deck.clear();
        bj.deal();
        assert!(bj.current_card.is_some());
        assert_eq!(bj.deck.len(), 12);
    }

    #[test]
    fn test_reveal_count() {
        let mut bj = Blackjack::new();
        assert!(!bj.reveal);
        bj.reveal_count();
        assert!(bj.reveal);
    }
}
