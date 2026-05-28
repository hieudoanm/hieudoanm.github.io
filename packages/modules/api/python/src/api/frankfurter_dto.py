from dataclasses import dataclass


@dataclass
class FrankfurterLatestResponse:
    amount: int
    base: str
    date: str
    rates: dict[str, float]
