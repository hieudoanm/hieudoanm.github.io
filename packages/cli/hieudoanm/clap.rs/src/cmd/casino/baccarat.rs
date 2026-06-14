use clap::ArgMatches;

use super::{deal_card, new_shuffled_deck, Card};

fn baccarat_value(c: &Card) -> u8 {
    if c.rank >= 10 {
        0
    } else {
        c.rank
    }
}

fn baccarat_sum(cards: &[Card]) -> u8 {
    cards.iter().map(baccarat_value).sum::<u8>() % 10
}

fn should_draw(cards: &[Card]) -> bool {
    baccarat_sum(cards) <= 5
}

fn draw_for_third(cards: &[Card], player_third: u8) -> bool {
    let v = baccarat_sum(cards);
    match v {
        0..=2 => true,
        3 => player_third != 8,
        4 => (2..=7).contains(&player_third),
        5 => (4..=7).contains(&player_third),
        6 => (6..=7).contains(&player_third),
        _ => false,
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

fn hand_display(cards: &[Card]) -> String {
    cards.iter().map(card_display).collect::<Vec<_>>().join(" ")
}

fn deal_baccarat(deck: &mut Vec<Card>) -> (Vec<Card>, Vec<Card>, u8, u8) {
    let player = vec![deal_card(deck), deal_card(deck)];
    let banker = vec![deal_card(deck), deal_card(deck)];

    let pv = baccarat_sum(&player);
    let bv = baccarat_sum(&banker);

    if pv >= 8 || bv >= 8 {
        return (player, banker, pv, bv);
    }

    let (player, banker, pv, bv) = if should_draw(&player) {
        let mut player = player;
        player.push(deal_card(deck));
        let pv = baccarat_sum(&player);
        let pc = player[2];
        let p_val = baccarat_value(&pc);

        let mut banker = banker;
        if draw_for_third(&banker, p_val) {
            banker.push(deal_card(deck));
        }
        let bv = baccarat_sum(&banker);
        (player, banker, pv, bv)
    } else {
        if should_draw(&banker) {
            let mut banker = banker;
            banker.push(deal_card(deck));
            let bv = baccarat_sum(&banker);
            (player, banker, pv, bv)
        } else {
            (player, banker, pv, bv)
        }
    };

    (player, banker, pv, bv)
}

pub fn command() -> clap::Command {
    clap::Command::new("baccarat")
        .about("Play a game of Baccarat")
        .arg(
            clap::Arg::new("bet")
                .help("Bet on: player, banker, or tie")
                .short('b')
                .long("bet")
                .default_value("player"),
        )
}

pub async fn run(matches: &ArgMatches) -> anyhow::Result<()> {
    let bet_type = matches
        .get_one::<String>("bet")
        .map(|s| s.as_str())
        .unwrap_or("player");
    let mut deck = new_shuffled_deck();

    let (player, banker, pv, bv) = deal_baccarat(&mut deck);

    println!("Player: {} ({})", hand_display(&player), pv);
    println!("Banker: {} ({})", hand_display(&banker), bv);

    if pv > bv {
        println!("Player wins!");
        if bet_type == "player" {
            println!("You win!");
        } else {
            println!("You lose.");
        }
    } else if bv > pv {
        println!("Banker wins!");
        if bet_type == "banker" {
            println!("You win (5% commission deducted)!");
        } else {
            println!("You lose.");
        }
    } else {
        println!("Tie!");
        if bet_type == "tie" {
            println!("You win 8:1!");
        } else {
            println!("Bet returned.");
        }
    }

    Ok(())
}
