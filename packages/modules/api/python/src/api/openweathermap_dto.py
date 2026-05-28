from dataclasses import dataclass


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
