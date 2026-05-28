from dataclasses import dataclass
from enum import StrEnum


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
