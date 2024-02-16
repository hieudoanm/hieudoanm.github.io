import chess
import chess.pgn as chess_pgn
from fastapi import FastAPI, responses
import io
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


@app.get("/health", response_class=responses.JSONResponse, tags=["stockfish"], name="health", operation_id="health")
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


@app.post("/fen", response_class=responses.JSONResponse, tags=["stockfish"], name="Analyse FEN", operation_id="analyse_fen")
async def analyze_fen(fen_request_body: FenRequestBody) -> list:
    try:
        fen : str = fen_request_body.fen
        variations : int = fen_request_body.variations
        is_fen_valid : bool = stockfish.is_fen_valid(fen)
        if not is_fen_valid:
            return []
        print("analyze_fen", fen)
        stockfish.set_fen_position(fen)
        top_moves = stockfish.get_top_moves(variations)
        mapped_top_moves = list(map(lambda top_move: map_top_move(fen, top_move), top_moves))
        return mapped_top_moves
    except:
        print("analyze_fen", "error")
        return []


class PgnRequestBody(BaseModel):
    pgn: str


@app.post("/pgn", response_class=responses.JSONResponse, tags=["stockfish"], name="Analyse PGN", operation_id="analyse_pgn")
async def analyze_pgn(pgn_request_body: PgnRequestBody):
    pgn : str = pgn_request_body.pgn
    pgn_string_io : io.StringIO = io.StringIO(pgn)
    game = chess_pgn.read_game(pgn_string_io)
    board = game.board()
    moves = []
    for move in game.mainline_moves():
        san = board.san(move)
        board.push(move)
        uci : str = move.uci()
        fen : str = board.board_fen()
        centipawn : int = 0
        mate : int= 0
        try:
            stockfish.set_fen_position(fen)
            top_moves = stockfish.get_top_moves(1)
            top_move : dict = top_moves[0]
            centipawn : int = top_move.get('Centipawn', 0)
            mate : int = top_move.get('Mate', 0)
            print('analyze_pgn', centipawn, mate)
        except:
            print('analyze_pgn', 'error')
            centipawn = 0
            mate = 0
        moves.append({
            "centipawn": centipawn,
            "mate": mate,
            "fen": fen,
            "san": san,
            "uci": uci
        })
    return { "moves": moves }


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port = int(PORT),
        log_level = LOG_LEVEL,
        reload = DEVELOPMENT == 'true',
    )
