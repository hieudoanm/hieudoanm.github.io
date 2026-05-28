from dataclasses import dataclass, field


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
