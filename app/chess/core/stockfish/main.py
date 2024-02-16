import chess
from fastapi import FastAPI, responses
import os
import platform
from pydantic import BaseModel
from stockfish import Stockfish
import uvicorn


DEVELOPMENT : str = os.getenv('DEVELOPMENT') or 'true'
CONTAINER : str = os.getenv('CONTAINER') or 'false'
LOG_LEVEL : str = os.getenv('LOG_LEVEL') or 'debug'
PORT : str = os.getenv('PORT') or '8000'


print('DEVELOPMENT', DEVELOPMENT)
print('CONTAINER', CONTAINER)
print('LOG_LEVEL', LOG_LEVEL)
print('PORT', PORT)


app = FastAPI()


@app.get("/", response_class=responses.JSONResponse, tags=["stockfish"], name="health", operation_id="health")
def health() -> responses.JSONResponse:
    return { "status": "OK" }


class FenRequestBody(BaseModel):
    fen: str
    variations : int


def get_stockfish():
    if CONTAINER == 'true':
        return Stockfish(path="/usr/games/stockfish")
    system : str = platform.system().lower()
    print('system', system)
    return Stockfish()


stockfish = get_stockfish()


def map_top_move(fen : str, top_move: dict):
    board = chess.Board(fen)
    move_uci: str = top_move.get('Move', '')
    move = chess.Move.from_uci(move_uci)
    move_san = board.san(move)
    centipawn: int = top_move.get('Centipawn', '')
    pawn = centipawn / 100 if centipawn is not None else None
    mate: int = top_move.get('Mate', '')
    return {
        "centipawn": centipawn,
        "pawn": pawn,
        "mate": mate,
        "move_san": move_san,
        "move_uci": move_uci,
        "move": move
    }


@app.post("/", response_class=responses.JSONResponse, tags=["stockfish"], name="analyse", operation_id="analyse")
async def analyze(fen_request_body: FenRequestBody) -> list:
    try:
        fen : str = fen_request_body.fen
        variations : int = fen_request_body.variations
        is_fen_valid : bool = stockfish.is_fen_valid(fen)
        if not is_fen_valid:
            return []
        stockfish.set_fen_position(fen)
        top_moves = stockfish.get_top_moves(variations)
        mapped_top_moves = list(map(lambda top_move: map_top_move(fen, top_move), top_moves))
        return mapped_top_moves
    except:
        print("analyze error")
        return []


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(PORT),
        log_level=LOG_LEVEL,
        reload=DEVELOPMENT == 'true',
    )
