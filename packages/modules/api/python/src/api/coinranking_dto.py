from dataclasses import dataclass
from enum import StrEnum


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
