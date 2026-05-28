from dataclasses import dataclass
from enum import StrEnum


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
