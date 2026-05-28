from dataclasses import dataclass
from enum import StrEnum


class Plan(StrEnum):
    TIER_ONE = "TIER_ONE"
    TIER_TWO = "TIER_TWO"
    TIER_THREE = "TIER_THREE"
    TIER_FOUR = "TIER_FOUR"


class Stage(StrEnum):
    FINAL = "FINAL"
    THIRD_PLACE = "THIRD_PLACE"
    SEMI_FINALS = "SEMI_FINALS"
    QUARTER_FINALS = "QUARTER_FINALS"
    LAST_16 = "LAST_16"
    LAST_32 = "LAST_32"
    LAST_64 = "LAST_64"
    ROUND_4 = "ROUND_4"
    ROUND_3 = "ROUND_3"
    ROUND_2 = "ROUND_2"
    ROUND_1 = "ROUND_1"
    GROUP_STAGE = "GROUP_STAGE"
    PRELIMINARY_ROUND = "PRELIMINARY_ROUND"
    QUALIFICATION = "QUALIFICATION"
    QUALIFICATION_ROUND_1 = "QUALIFICATION_ROUND_1"
    QUALIFICATION_ROUND_2 = "QUALIFICATION_ROUND_2"
    QUALIFICATION_ROUND_3 = "QUALIFICATION_ROUND_3"
    PLAYOFF_ROUND_1 = "PLAYOFF_ROUND_1"
    PLAYOFF_ROUND_2 = "PLAYOFF_ROUND_2"
    PLAYOFFS = "PLAYOFFS"
    REGULAR_SEASON = "REGULAR_SEASON"
    CLAUSURA = "CLAUSURA"
    APERTURA = "APERTURA"
    CHAMPIONSHIP = "CHAMPIONSHIP"
    RELEGATION = "RELEGATION"
    RELEGATION_ROUND = "RELEGATION_ROUND"


class Status(StrEnum):
    CANCELLED = "CANCELLED"
    FINISHED = "FINISHED"
    IN_PLAY = "IN_PLAY"
    LIVE = "LIVE"
    PAUSED = "PAUSED"
    POSTPONED = "POSTPONED"
    SCHEDULED = "SCHEDULED"
    SUSPENDED = "SUSPENDED"


class Venue(StrEnum):
    HOME = "HOME"
    AWAY = "AWAY"


@dataclass
class Area:
    id: int
    name: str
    code: str
    flag: str


@dataclass
class CompetitionSeason:
    id: int
    startDate: str
    endDate: str
    currentMatchday: int
    winner: dict | None


@dataclass
class Competition:
    id: int
    area: Area
    name: str
    code: str
    type: str
    emblem: str
    plan: str
    currentSeason: CompetitionSeason
    numberOfAvailableSeasons: int
    lastUpdated: str


@dataclass
class Team:
    id: int
    name: str
    shortName: str
    tla: str
    crest: str
    address: str
    website: str
    founded: int
    clubColors: str
    venue: str
    lastUpdated: str


@dataclass
class Player:
    id: int
    name: str
    position: str
    shirtNumber: int


@dataclass
class Coach:
    id: int
    name: str
    nationality: str


@dataclass
class TeamMatch:
    id: int
    name: str
    shortName: str
    tla: str
    crest: str
    coach: Coach
    leagueRank: str | None
    formation: str
    lineup: list[Player]
    bench: list[Player]
    statistics: dict | None


@dataclass
class Score:
    winner: str
    duration: str
    fullTime: dict
    halfTime: dict


@dataclass
class Goal:
    minute: int
    injuryTime: int
    type: str
    team: dict
    scorer: dict
    assist: dict | None
    score: dict


@dataclass
class Penalty:
    player: dict
    team: dict
    scored: bool


@dataclass
class Booking:
    minute: int
    team: dict
    player: dict
    card: str


@dataclass
class Substitution:
    minute: int
    team: dict
    playerOut: dict
    playerIn: dict


@dataclass
class Odds:
    homeWin: float
    draw: float
    awayWin: float


@dataclass
class Referee:
    id: int
    name: str
    type: str
    nationality: str


@dataclass
class Match:
    area: Area
    competition: dict
    season: dict
    id: int
    utcDate: str
    status: str
    minute: int
    injuryTime: int
    attendance: int
    venue: str
    matchday: int
    stage: str
    group: str | None
    lastUpdated: str
    homeTeam: TeamMatch
    awayTeam: TeamMatch
    score: Score
    goals: list[Goal]
    penalties: list[Penalty]
    bookings: list[Booking]
    substitutions: list[Substitution]
    odds: Odds
    referees: list[Referee]
