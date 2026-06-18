use clap::ArgMatches;
use rand::seq::SliceRandom;

use super::{deal_card, new_shuffled_deck, Card};

#[cfg(test)]
mod tests {
    use super::*;

    fn c(rank: u8, suit: u8) -> Card { Card { rank, suit } }

    #[test]
    fn test_card_value_number() {
        assert_eq!(card_value(&c(5, 0)), 5);
        assert_eq!(card_value(&c(10, 1)), 10);
    }

    #[test]
    fn test_card_value_face() {
        assert_eq!(card_value(&c(11, 0)), 10);
        assert_eq!(card_value(&c(12, 1)), 10);
        assert_eq!(card_value(&c(13, 2)), 10);
    }

    #[test]
    fn test_card_value_ace() {
        assert_eq!(card_value(&c(14, 3)), 11);
    }

    #[test]
    fn test_hand_value_soft() {
        let hand = vec![c(14, 0), c(6, 1)];
        assert_eq!(hand_value(&hand), 17);
    }

    #[test]
    fn test_hand_value_hard() {
        let hand = vec![c(14, 0), c(10, 1), c(5, 2)];
        assert_eq!(hand_value(&hand), 16);
    }

    #[test]
    fn test_hand_value_multiple_aces() {
        let hand = vec![c(14, 0), c(14, 1)];
        assert_eq!(hand_value(&hand), 12);
    }

    #[test]
    fn test_hand_value_bust() {
        let hand = vec![c(10, 0), c(10, 1), c(5, 2)];
        assert_eq!(hand_value(&hand), 25);
    }

    #[test]
    fn test_hi_lo_value_low() {
        assert_eq!(hi_lo_value(&c(2, 0)), 1);
        assert_eq!(hi_lo_value(&c(6, 1)), 1);
    }

    #[test]
    fn test_hi_lo_value_neutral() {
        assert_eq!(hi_lo_value(&c(7, 0)), 0);
        assert_eq!(hi_lo_value(&c(8, 1)), 0);
        assert_eq!(hi_lo_value(&c(9, 2)), 0);
    }

    #[test]
    fn test_hi_lo_value_high() {
        assert_eq!(hi_lo_value(&c(10, 0)), -1);
        assert_eq!(hi_lo_value(&c(11, 1)), -1);
        assert_eq!(hi_lo_value(&c(13, 2)), -1);
        assert_eq!(hi_lo_value(&c(14, 3)), -1);
    }

    #[test]
    fn test_card_display_number() {
        assert_eq!(card_display(&c(7, 0)), "7c");
        assert_eq!(card_display(&c(10, 3)), "10s");
    }

    #[test]
    fn test_card_display_face() {
        assert_eq!(card_display(&c(11, 1)), "Jd");
        assert_eq!(card_display(&c(12, 2)), "Qh");
        assert_eq!(card_display(&c(13, 3)), "Ks");
    }

    #[test]
    fn test_card_display_ace() {
        assert_eq!(card_display(&c(14, 0)), "Ac");
    }

    #[test]
    fn test_hand_display_all_visible() {
        let hand = vec![c(7, 0), c(8, 1)];
        assert_eq!(hand_display(&hand, false), "7c 8d");
    }

    #[test]
    fn test_hand_display_hide_first() {
        let hand = vec![c(7, 0), c(8, 1)];
        assert_eq!(hand_display(&hand, true), "?? 8d");
    }

    #[test]
    fn test_hand_display_empty() {
        assert_eq!(hand_display(&[], false), "");
    }
}

fn card_value(c: &Card) -> u8 {
    match c.rank {
        11..=13 => 10,
        14 => 11,
        r => r,
    }
}

fn hand_value(cards: &[Card]) -> u8 {
    let mut val = 0u8;
    let mut aces = 0u8;
    for c in cards {
        let v = card_value(c);
        if c.rank == 14 {
            aces += 1;
        }
        val += v;
    }
    while aces > 0 && val > 21 {
        val -= 10;
        aces -= 1;
    }
    val
}

fn hi_lo_value(c: &Card) -> i32 {
    match c.rank {
        2..=6 => 1,
        7..=9 => 0,
        _ => -1,
    }
}

fn card_display(c: &Card) -> String {
    let r = match c.rank {
        2..=9 => c.rank.to_string(),
        10 => "10".to_string(),
        11 => "J".to_string(),
        12 => "Q".to_string(),
        13 => "K".to_string(),
        14 => "A".to_string(),
        _ => unreachable!(),
    };
    let sym = match c.suit {
        0 => "c",
        1 => "d",
        2 => "h",
        3 => "s",
        _ => unreachable!(),
    };
    format!("{r}{sym}")
}

fn hand_display(cards: &[Card], hide_first: bool) -> String {
    cards
        .iter()
        .enumerate()
        .map(|(i, c)| {
            if hide_first && i == 0 {
                "??".to_string()
            } else {
                card_display(c)
            }
        })
        .collect::<Vec<_>>()
        .join(" ")
}

fn run_dealer(deck: &mut Vec<Card>, hand: &mut Vec<Card>) {
    while hand_value(hand) < 17 {
        hand.push(deal_card(deck));
    }
}

async fn play_blackjack() -> anyhow::Result<()> {
    let mut deck = new_shuffled_deck();
    let mut player: Vec<Card> = vec![deal_card(&mut deck), deal_card(&mut deck)];
    let mut dealer: Vec<Card> = vec![deal_card(&mut deck), deal_card(&mut deck)];

    let pv = hand_value(&player);
    let dv = hand_value(&dealer);

    if pv == 21 && dv == 21 {
        println!("Both have blackjack! Push.");
        return Ok(());
    }
    if pv == 21 {
        println!("Player: {} ({})", hand_display(&player, false), pv);
        println!("Blackjack! You win!");
        return Ok(());
    }
    if dv == 21 {
        println!("Dealer: {} ({})", hand_display(&dealer, false), dv);
        println!("Player: {} ({})", hand_display(&player, false), pv);
        println!("Dealer has blackjack. You lose.");
        return Ok(());
    }

    loop {
        println!();
        println!(
            "Dealer: {} ({})",
            hand_display(&dealer, true),
            hand_value(&dealer[1..])
        );
        println!(
            "Player: {} ({})",
            hand_display(&player, false),
            hand_value(&player)
        );
        println!("(h)it, (s)tand, (d)ouble down");

        let mut input = String::new();
        std::io::stdin().read_line(&mut input)?;
        match input.trim() {
            "h" => {
                player.push(deal_card(&mut deck));
                if hand_value(&player) > 21 {
                    println!(
                        "Player: {} ({})",
                        hand_display(&player, false),
                        hand_value(&player)
                    );
                    println!("Bust! You lose.");
                    return Ok(());
                }
            }
            "s" => break,
            "d" => {
                if player.len() == 2 {
                    player.push(deal_card(&mut deck));
                    if hand_value(&player) > 21 {
                        println!(
                            "Player: {} ({})",
                            hand_display(&player, false),
                            hand_value(&player)
                        );
                        println!("Bust! You lose.");
                        return Ok(());
                    }
                    break;
                }
            }
            _ => continue,
        }
    }

    run_dealer(&mut deck, &mut dealer);
    let pv = hand_value(&player);
    let dv = hand_value(&dealer);

    println!();
    println!("Dealer: {} ({})", hand_display(&dealer, false), dv);
    println!("Player: {} ({})", hand_display(&player, false), pv);

    if dv > 21 || pv > dv {
        println!("You win!");
    } else if pv == dv {
        println!("Push.");
    } else {
        println!("Dealer wins.");
    }

    Ok(())
}

async fn count_cards() -> anyhow::Result<()> {
    let ranks = [
        "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K",
    ];
    let mut deck: Vec<&str> = ranks.to_vec();
    let mut rng = rand::thread_rng();
    deck.shuffle(&mut rng);
    let mut count = 0i32;

    loop {
        if deck.is_empty() {
            deck = ranks.to_vec();
            deck.shuffle(&mut rng);
            count = 0;
            println!("\nDeck reshuffled. Count reset.\n");
        }

        let card = deck.remove(0);
        let hv = match card {
            "2" | "3" | "4" | "5" | "6" => 1,
            "7" | "8" | "9" => 0,
            _ => -1,
        };
        println!("Card: [{card}] (hi-lo: {hv})");
        println!("Enter the running count after this card (or 'q' to quit):");

        let mut input = String::new();
        std::io::stdin().read_line(&mut input)?;
        let input = input.trim();
        if input == "q" {
            break;
        }

        count += hv;

        match input.parse::<i32>() {
            Ok(guess) if guess == count => {
                println!("Correct! Running count: {count}\n");
            }
            _ => {
                println!("Incorrect. Running count is: {count}\n");
            }
        }
    }

    Ok(())
}

pub fn command() -> clap::Command {
    clap::Command::new("blackjack")
        .about("Blackjack games")
        .subcommand_required(true)
        .subcommand(clap::Command::new("play").about("Play a game of Blackjack against the dealer"))
        .subcommand(clap::Command::new("count").about("Practice card counting"))
}

pub async fn run(matches: &ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("play", _)) => play_blackjack().await,
        Some(("count", _)) => count_cards().await,
        _ => Ok(()),
    }
}
