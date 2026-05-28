from dataclasses import dataclass


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
