from chess import Board, Move, parse_square, PIECE_NAMES
from chess.pgn import Game, read_game
from fastapi import FastAPI, responses
from io import StringIO
from json import load
from math import exp
from multiprocessing import Pool, current_process
from os import getenv
from psutil import process_iter
from pydantic import BaseModel
from requests import get as requests_get, Response
from statistics import mean
from stockfish import Stockfish, models
from time import time
from typing import Optional
from uvicorn import run


MAX_CENTIPAWN: int = 1500


DEVELOPMENT: str = getenv("DEVELOPMENT") or "true"
CONTAINER: str = getenv("CONTAINER") or "false"
LOG_LEVEL: str = getenv("LOG_LEVEL") or "debug"
PORT: str = getenv("PORT") or "8000"


print("DEVELOPMENT", DEVELOPMENT)
print("CONTAINER", CONTAINER)
print("LOG_LEVEL", LOG_LEVEL)
print("PORT", PORT)


if __name__ == "__main__":
    run(
        "main:app",
        host="0.0.0.0",
        port=int(PORT),
        log_level=LOG_LEVEL,
        reload=DEVELOPMENT == "true",
    )
