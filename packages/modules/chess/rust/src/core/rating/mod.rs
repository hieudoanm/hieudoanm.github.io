use crate::core::types::{DevelopmentCoefficient, RatingGame, Score, TimeClass};

pub fn get_score_value(score: Score) -> f64 {
    match score {
        Score::Win => 1.0,
        Score::Draw => 0.5,
        Score::Loss => 0.0,
    }
}

fn get_average_opponent_rating(games: &[RatingGame]) -> f64 {
    if games.is_empty() {
        return 0.0;
    }
    let sum: u32 = games.iter().map(|g| g.rating_opponent).sum();
    sum as f64 / games.len() as f64
}

fn get_score_percentage(games: &[RatingGame]) -> f64 {
    if games.is_empty() {
        return 0.5;
    }
    let total: f64 = games.iter().map(|g| get_score_value(g.score)).sum();
    total / games.len() as f64
}

fn get_performance_differential(p: f64) -> f64 {
    let p = p.clamp(0.0001, 0.9999);
    400.0 * (p / (1.0 - p)).log10()
}

pub fn calculate_performance(games: &[RatingGame]) -> f64 {
    let avg = get_average_opponent_rating(games);
    let p = get_score_percentage(games);
    avg + get_performance_differential(p)
}

fn get_development_coefficient(
    games_lt_30: bool,
    rating_player: u32,
    over_rating_2400: bool,
    over_age_18: bool,
    time_class: TimeClass,
) -> DevelopmentCoefficient {
    if over_rating_2400 && time_class == TimeClass::Classical {
        return 10;
    }
    if (games_lt_30 || (!over_age_18 && rating_player < 2300)) && time_class != TimeClass::Classical
    {
        return 40;
    }
    if !over_age_18 && rating_player < 2300 {
        return 40;
    }
    if games_lt_30 {
        return 40;
    }
    20
}

fn get_delta(
    rating_player: u32,
    rating_opponent: u32,
    score: Score,
    development_coefficient: DevelopmentCoefficient,
) -> f64 {
    let actual = match score {
        Score::Win => 1.0,
        Score::Draw => 0.5,
        Score::Loss => 0.0,
    };
    let gap = rating_opponent as f64 - rating_player as f64;
    let expected = 1.0 / (1.0 + 10f64.powf(gap / 400.0));
    development_coefficient as f64 * (actual - expected)
}

pub fn calculate_rating(input: &crate::core::types::RatingInput) -> f64 {
    let dc = get_development_coefficient(
        input.less_than_30_games,
        input.rating_player,
        input.over_rating_2400,
        input.over_age_18,
        input.time_class,
    );
    let delta = get_delta(input.rating_player, input.rating_opponent, input.score, dc);
    input.rating_player as f64 + delta
}
