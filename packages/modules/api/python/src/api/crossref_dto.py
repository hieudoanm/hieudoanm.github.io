from dataclasses import dataclass


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
