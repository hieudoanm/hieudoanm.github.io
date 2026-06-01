from dataclasses import dataclass
from enum import StrEnum


# ── coinranking ──────────────────────────────────────────────


class Tag(StrEnum):
    DEFI = "defi"
    STABLE_COIN = "stablecoin"
    NFT = "nft"
    DEX = "dex"
    EXCHANGE = "exchange"
    STAKING = "staking"
    DAO = "dao"
    MEME = "meme"
    PRIVACY = "privacy"
    METAVERSE = "metaverse"
    GAMING = "gaming"
    WRAPPED = "wrapped"
    LAYER_1 = "layer-1"
    LAYER_2 = "layer-2"
    FAN_TOKEN = "fan-token"
    FOOTBALL_CLUB = "football-club"
    WEB_3 = "web3"
    SOCIAL = "social"


@dataclass
class CoinRankingStats:
    total: int
    totalCoins: int
    totalMarkets: int
    totalExchanges: int
    totalMarketCap: str
    total24hVolume: str


@dataclass
class Coin:
    uuid: str
    symbol: str
    name: str
    color: str
    iconUrl: str
    marketCap: str
    price: str
    listedAt: int
    tier: int
    change: str
    rank: int
    sparkline: list[str]
    lowVolume: bool
    coinrankingUrl: str
    btcPrice: int


@dataclass
class CoinRankingData:
    stats: CoinRankingStats
    coins: list[Coin]


@dataclass
class CoinRankingResponse:
    status: str
    data: CoinRankingData


# ── deepseek & openai (shared) ──────────────────────────────


class DeepSeekModel(StrEnum):
    DEEPSEEK_CHAT = "deepseek-chat"
    DEEPSEEK_REASONER = "deepseek-reasoner"


class OpenAIModel(StrEnum):
    GPT_4 = "gpt-4"
    GPT_4_TURBO = "gpt-4-turbo"
    GPT_3_5 = "gpt-3.5-turbo"


@dataclass
class ChatCompletionMessage:
    role: str
    content: str


@dataclass
class ChatCompletionChoice:
    index: int
    message: ChatCompletionMessage
    finish_reason: str


@dataclass
class ChatCompletionUsage:
    prompt_tokens: int
    completion_tokens: int
    total_tokens: int


@dataclass
class ChatCompletionResponse:
    id: str
    object: str
    created: int
    model: str
    choices: list[ChatCompletionChoice]
    usage: ChatCompletionUsage


# ── crossref ─────────────────────────────────────────────────


@dataclass
class Author:
    given: str
    family: str


@dataclass
class Reference:
    id: str
    authors: list[Author]
    title: str
    journal: str
    volume: str | None
    issue: str | None
    pages: str | None
    year: int
    url: str


# ── airvisual ────────────────────────────────────────────────


@dataclass
class Forecast:
    ts: str
    aqius: int
    aqicn: int
    tp: int
    tp_min: int
    pr: int
    hu: int
    ws: int
    wd: int
    ic: str


@dataclass
class Weather:
    ts: str
    tp: int
    pr: int
    hu: int
    ws: int
    wd: int
    ic: str


@dataclass
class Pollutant:
    conc: float
    aqius: int
    aqicn: int


@dataclass
class Pollution:
    ts: str
    aqius: int
    mainus: str
    aqicn: int
    maincn: str
    p2: Pollutant
    p1: Pollutant
    o3: Pollutant
    n2: Pollutant
    s2: Pollutant
    co: Pollutant


@dataclass
class Location:
    type: str
    coordinates: list[float]


@dataclass
class Current:
    weather: Weather
    pollution: Pollution


@dataclass
class History:
    weather: list[Weather]
    pollution: list[Pollution]


@dataclass
class AirQualityData:
    city: str
    state: str
    country: str
    location: Location
    forecasts: list[Forecast]
    current: Current
    history: History


@dataclass
class AirQuality:
    status: str
    data: AirQualityData


@dataclass
class CountryItem:
    country: str


@dataclass
class CountriesResponse:
    status: str
    data: list[CountryItem]


@dataclass
class StateItem:
    state: str


@dataclass
class StatesResponse:
    status: str
    data: list[StateItem]


@dataclass
class CityItem:
    city: str


@dataclass
class CitiesResponse:
    status: str
    data: list[CityItem]


# ── fixer ────────────────────────────────────────────────────


@dataclass
class FixerLatestResponse:
    success: bool
    timestamp: int
    base: str
    date: str
    rates: dict[str, float]


@dataclass
class SymbolsResponse:
    success: bool
    symbols: dict[str, str]


# ── frankfurter ──────────────────────────────────────────────


@dataclass
class FrankfurterLatestResponse:
    amount: int
    base: str
    date: str
    rates: dict[str, float]


# ── lichess ──────────────────────────────────────────────────


class Variant(StrEnum):
    STANDARD = "standard"
    CHESS_960 = "chess960"
    CRAZY_HOUSE = "crazyhouse"
    ANTI_CHESS = "antichess"
    ATOMIC = "atomic"
    HORDE = "horde"
    KING_OF_THE_HILL = "kingOfTheHill"
    RACING_KINGS = "racingKings"
    THREE_CHECK = "threeCheck"
    FROM_POSITION = "fromPosition"


@dataclass
class PV:
    cp: int | None = None
    mate: int | None = None
    moves: str | None = None


@dataclass
class CloudEvaluation:
    depth: int
    fen: str
    knodes: int
    pvs: list[PV]
    error: str | None = None


# ── newsapi ──────────────────────────────────────────────────


class Country(StrEnum):
    UNITED_ARAB_EMIRATES = "ae"
    ARGENTINA = "ar"
    AUSTRIA = "at"
    AUSTRALIA = "au"
    BELGIUM = "be"
    BULGARIA = "bg"
    BRAZIL = "br"
    CANADA = "ca"
    SWITZERLAND = "ch"
    CHINA = "cn"
    COLOMBIA = "co"
    CUBA = "cu"
    CZECHIA = "cz"
    GERMANY = "de"
    EGYPT = "eg"
    FRANCE = "fr"
    UNITED_KINGDOM = "gb"
    GREECE = "gr"
    HONG_KONG = "hk"
    HUNGARY = "hu"
    INDONESIA = "id"
    IRELAND = "ie"
    ISRAEL = "il"
    INDIA = "in"
    ITALY = "it"
    JAPAN = "jp"
    SOUTH_KOREA = "kr"
    LITHUANIA = "lt"
    LATVIA = "lv"
    MOROCCO = "ma"
    MEXICO = "mx"
    MALAYSIA = "my"
    NIGERIA = "ng"
    NETHERLANDS = "nl"
    NORWAY = "no"
    NEW_ZEALAND = "nz"
    PHILIPPINES = "ph"
    POLAND = "pl"
    PORTUGAL = "pt"
    ROMANIA = "ro"
    SERBIA = "rs"
    RUSSIA = "ru"
    SAUDI_ARABIA = "sa"
    SWEDEN = "se"
    SINGAPORE = "sg"
    SLOVENIA = "si"
    SLOVAKIA = "sk"
    THAILAND = "th"
    TURKEY = "tr"
    TAIWAN = "tw"
    UKRAINE = "ua"
    UNITED_STATES = "us"
    VENEZUELA = "ve"
    SOUTH_AFRICA = "za"


class Category(StrEnum):
    BUSINESS = "business"
    ENTERTAINMENT = "entertainment"
    GENERAL = "general"
    HEALTH = "health"
    SCIENCE = "science"
    SPORTS = "sports"
    TECHNOLOGY = "technology"


class Language(StrEnum):
    ARABIC = "ar"
    GERMAN = "de"
    ENGLISH = "en"
    SPANISH = "es"
    FRENCH = "fr"
    HEBREW = "he"
    ITALIAN = "it"
    DUTCH = "nl"
    NORWEGIAN = "no"
    PORTUGUESE = "pt"
    RUSSIAN = "ru"
    SWEDISH = "sv"
    UD = "ud"
    CHINESE = "zh"


class SearchIn(StrEnum):
    CONTENT = "content"
    DESCRIPTION = "description"
    TITLE = "title"


class SortBy(StrEnum):
    POPULARITY = "popularity"
    PUBLISHED_AT = "publishedAt"
    RELEVANCY = "relevancy"


@dataclass
class Source:
    id: str
    name: str
    description: str
    url: str
    category: str
    language: str
    country: str


@dataclass
class SourceResponse:
    status: str
    sources: list[Source]


@dataclass
class Article:
    source: dict
    author: str | None
    title: str
    description: str | None
    url: str
    urlToImage: str | None
    publishedAt: str
    content: str | None


@dataclass
class ArticleResponse:
    status: str
    totalResults: int
    articles: list[Article]


# ── openweathermap ───────────────────────────────────────────


@dataclass
class Main:
    temp: float
    feels_like: float
    temp_min: float
    temp_max: float
    pressure: int
    humidity: int
    sea_level: int
    grnd_level: int


@dataclass
class Sys:
    type: int
    id: int
    country: str
    sunrise: int
    sunset: int


@dataclass
class OpenWeather:
    coord: dict
    weather: list[dict]
    base: str
    main: Main
    visibility: int
    wind: dict
    rain: dict | None
    clouds: dict
    dt: int
    sys: Sys
    timezone: int
    id: int
    name: str
    cod: int


# ── football-data ─────────────────────────────────────────────


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
