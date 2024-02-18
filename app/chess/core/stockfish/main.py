import chess
import chess.pgn as chess_pgn
from fastapi import FastAPI, responses
import io
from json import load
import math
from multiprocessing import Pool, current_process
import os
import psutil
from pydantic import BaseModel
from stockfish import Stockfish, models
import time
from typing import Optional
import uvicorn


MAX_CENTIPAWN : int = 1500


DEVELOPMENT : str = os.getenv('DEVELOPMENT') or 'true'
CONTAINER : str = os.getenv('CONTAINER') or 'false'
LOG_LEVEL : str = os.getenv('LOG_LEVEL') or 'debug'
PORT : str = os.getenv('PORT') or '8000'


print('DEVELOPMENT', DEVELOPMENT)
print('CONTAINER', CONTAINER)
print('LOG_LEVEL', LOG_LEVEL)
print('PORT', PORT)


openings_json_file = open("./resources/openings/json/openings.json", "r")
openings : dict[str, dict[str, str]] = load(openings_json_file)

app = FastAPI()


@app.get("/health", response_class=responses.JSONResponse, tags=["stockfish"], name="health", operation_id="health")
def health() -> responses.JSONResponse:
    return { "status": "OK" }


class FenRequestBody(BaseModel):
    fen: str
    variations : int


def get_stockfish_engine():
    if CONTAINER == 'true':
        return Stockfish(path="/usr/games/stockfish")
    return Stockfish()


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


def get_top_moves(fen : str, variations : int, retry : int = 0) -> list[dict]:
    try:
        stockfish_engine = get_stockfish_engine()
        if not stockfish_engine.is_fen_valid(fen):
            return []
        stockfish_engine.set_fen_position(fen)
        top_moves = stockfish_engine.get_top_moves(variations)
        return top_moves
    except models.StockfishException as stockfishException:
        print(f'analyse_fen stockfishException="{stockfishException}" retry="{retry}"')
        kill_stockfish()
        if retry < 3:
            return evaluate(fen, retry + 1)
        return []


@app.post("/fen", response_class=responses.JSONResponse, tags=["stockfish"], name="Analyse FEN", operation_id="analyse_fen")
async def analyse_fen(fen_request_body: FenRequestBody) -> list:
    fen : str = fen_request_body.fen
    variations : int = fen_request_body.variations
    top_moves = get_top_moves(fen, variations)
    mapped_top_moves = list(map(lambda top_move: map_top_move(fen, top_move), top_moves))
    kill_stockfish()
    return mapped_top_moves



def get_piece_name(board: chess.Board, uci: str):
    piece = board.piece_at(chess.parse_square(uci[-2:]))
    piece_name = chess.PIECE_NAMES[piece.piece_type]
    return piece_name


def check_if_stockfish_is_running() -> bool:
    for process in psutil.process_iter():
        if "stockfish" in process.name():
            return True
    return False


def kill_stockfish():
    print("check_if_stockfish_is_running before_kill", check_if_stockfish_is_running())
    for process in psutil.process_iter():
        if "stockfish" in process.name():
            process.terminate()
            process.wait()
    print("check_if_stockfish_is_running after_kill", check_if_stockfish_is_running())


def evaluate(fen : str, retry : int = 0) -> dict:
    centipawn : Optional[int] = None
    mate : Optional[int] = None
    try:
        stockfish_engine = get_stockfish_engine()
        stockfish_engine.set_fen_position(fen)
        top_moves = stockfish_engine.get_top_moves(1)
        evaluate_dict : dict = {}
        if len(top_moves) == 0:
            evaluate_dict['mate'] = 0
            return evaluate_dict
        top_move = top_moves[0]
        best_move = top_move.get("Move")
        centipawn = top_move.get("Centipawn")
        mate = top_move.get("Mate")
        evaluate_dict['best'] = best_move
        evaluate_dict['centipawn'] = centipawn
        evaluate_dict['mate'] = mate
        print(f'evaluate process="{current_process().pid}" fen="{fen}" centipawn="{centipawn}" mate="{mate}"')
        return evaluate_dict
    except models.StockfishException as stockfishException:
        print(f'evaluate process="{current_process().pid}" fen="{fen}" retry="{retry}" stockfishException="{stockfishException}"')
        kill_stockfish()
        if retry < 3:
            return evaluate(fen, retry + 1)
        return {}


def get_book_move(pgn : str) -> dict[str, str]:
    opening : dict[str, str] = openings.get(pgn, {})
    opening_eco : str = opening.get("eco", "")
    opening_name : str = opening.get("name", "")
    return {
        "eco": opening_eco,
        "opening": opening_name
    }


def get_moves_without_evaluation(game : chess_pgn.Game) -> list[dict]:
    board = game.board()
    moves_without_evaluation : list[dict] = []
    pgn_moves : list[str] = []
    for move in game.mainline_moves():
        fullmove_number : int = board.fullmove_number
        san : str = board.san(move)
        board.push(move)
        uci : str = move.uci()
        turn : str = 'black' if board.turn == True else 'white'
        piece : str = get_piece_name(board, uci)
        fen : str = board.fen()
        if turn == 'white':
            pgn_moves.append(f'{fullmove_number}.')
        pgn_moves.append(san)
        pgn : str = " ".join(pgn_moves)
        book_move = get_book_move(pgn)
        eco : str = book_move.get("eco", "")
        opening : str = book_move.get("opening", "")
        moves_without_evaluation.append({
            "number": fullmove_number,
            "turn": turn,
            "piece": piece,
            "pgn": pgn,
            "fen": fen,
            "san": san,
            "uci": uci,
            "eco": eco,
            "opening": opening
        })
    return moves_without_evaluation


def get_move_centipawn(centipawn: Optional[int], mate: Optional[int], turn : str):
    if mate is None:
        centipawn = centipawn if centipawn is not None and centipawn <= MAX_CENTIPAWN else MAX_CENTIPAWN
        centipawn = centipawn if centipawn is not None and centipawn >= -1 * MAX_CENTIPAWN else -1 * MAX_CENTIPAWN
    elif mate != 0:
        centipawn = MAX_CENTIPAWN * (1 if mate > 0 else -1)
    elif mate == 0:
        centipawn : int = MAX_CENTIPAWN if turn == 'white' else -1 * MAX_CENTIPAWN
    return centipawn


def get_move_with_evaluation(move_without_evaluation):
    fen = move_without_evaluation.get('fen')
    turn = move_without_evaluation.get('turn')
    evaluation = evaluate(fen, 0)
    best : Optional[str] = evaluation.get("best")
    mate : Optional[int] = evaluation.get("mate")
    stockfish_centipawn : Optional[int] = evaluation.get("centipawn")
    centipawn = get_move_centipawn(stockfish_centipawn, mate, turn)
    return {
        **move_without_evaluation,
        "centipawn": centipawn,
        "mate": mate,
        "best": best
    }


def get_moves_with_evaluation(moves_without_evaluation: list[dict]) -> list[dict]:
    # loop_time = time.time()
    # moves_with_evaluation : list[dict] = []
    # for move_without_evaluation in moves_without_evaluation:
    #     move_with_evaluation = get_move_with_evaluation(move_without_evaluation)
    #     moves_with_evaluation.append(move_with_evaluation)
    # print(f"seconds={(time.time() - loop_time)}")
    parallel_time : float = time.time()
    evaluation_pool = Pool()
    print(f"processes={evaluation_pool._processes}")
    moves_with_evaluation = evaluation_pool.map(get_move_with_evaluation, moves_without_evaluation)
    evaluation_pool.close()
    print(f"seconds={(time.time() - parallel_time)}")
    return moves_with_evaluation


def get_move_quality(opening : str, uci : str, best : str, win_percentage_delta : float, turn : str):
    if opening != "": return 'book'
    if uci == best: return 'best'
    if (win_percentage_delta > 0 and turn == 'white') or (win_percentage_delta < 0 and turn == 'black'):
        if abs(win_percentage_delta) > 30: return 'blunder'
        elif abs(win_percentage_delta) > 20: return 'mistake'
        elif abs(win_percentage_delta) > 10: return 'inaccuracy'
        elif abs(win_percentage_delta) < 1: return 'excellent'
    return 'good'


def get_moves(pgn : str) -> list[dict]:
    pgn_string_io : io.StringIO = io.StringIO(pgn)
    game : chess_pgn.Game= chess_pgn.read_game(pgn_string_io)
    moves_without_evaluation = get_moves_without_evaluation(game)
    moves_with_evaluation : list[dict] = get_moves_with_evaluation(moves_without_evaluation)
    moves : list[dict] = []
    for index, move_with_evaluation in enumerate(moves_with_evaluation):
        centipawn : int = move_with_evaluation.get('centipawn')
        mate : int = move_with_evaluation.get('mate')
        turn : str = move_with_evaluation.get('turn')
        uci : str = move_with_evaluation.get('uci')
        opening : str = move_with_evaluation.get('opening')
        if mate == 0:
            win_percentage : int = 100 if turn == 'white' else 0
            moves.append({
                **move_with_evaluation,
                "winDelta": 0,
                "winPercentage": win_percentage,
                "accuracyPercentage": 100
            })
            break
        WIN_MULTIPLIER = -0.00368208
        win_percentage : float = 50 + 50 * (2 / (1 + math.exp(WIN_MULTIPLIER * centipawn)) - 1)
        win_percentage_delta = 0
        previous_move : dict = moves[index - 1] if index > 0 else {}
        win_percentage_before : float = previous_move.get("winPercentage", 50)
        best : float = previous_move.get("best", "")
        ACCURACY_MULTIPLIER = 103.1668100711649
        ACCURACY_DELTA_MULTIPLIER = -0.04354415386753951
        ACCURACY_DELTA = -3.166924740191411
        win_percentage_delta = round(win_percentage_before - win_percentage, 2)
        move_quality : dict[str, str]= get_move_quality(opening, uci, best, win_percentage_delta, turn)
        accuracy_percentage = ACCURACY_MULTIPLIER * math.exp(ACCURACY_DELTA_MULTIPLIER * win_percentage_delta) + ACCURACY_DELTA
        accuracy_percentage = accuracy_percentage if accuracy_percentage <= 100 else 100
        moves.append({
            **move_with_evaluation,
            "moveQuality": move_quality,
            "winDelta": win_percentage_delta,
            "winPercentage": round(win_percentage, 2),
            "accuracyPercentage": round(accuracy_percentage, 2),
        })
    return moves


class PgnRequestBody(BaseModel):
    pgn: str


@app.post("/pgn", response_class=responses.JSONResponse, tags=["stockfish"], name="Analyse PGN", operation_id="analyse_pgn")
async def analyse_pgn(pgn_request_body: PgnRequestBody) -> dict:
    pgn : str = pgn_request_body.pgn
    moves : list[dict] = get_moves(pgn)
    kill_stockfish()
    last_book_move : dict = list(filter(lambda move: move.get("moveQuality") == 'book', moves))[-1]
    eco : str = last_book_move.get("eco", "")
    name : str = last_book_move.get("opening", "")
    pgn : str = last_book_move.get("pgn", "")
    out_of_book : str = "black" if last_book_move.get("turn", "") == "white" else "white"
    move_number : str = last_book_move.get("number", "") + (1 if out_of_book == "white" else 0)
    return {
        "opening": {
            "eco": eco,
            "name": name,
            "pgn": pgn,
            "leaveBook": out_of_book,
            "leaveMove": move_number
        },
        "moves": moves
    }


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port = int(PORT),
        log_level = LOG_LEVEL,
        reload = DEVELOPMENT == 'true',
    )
