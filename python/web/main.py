from chess import Board, Move, parse_square, PIECE_NAMES, Square
from chess.pgn import Game, read_game
from fastapi import FastAPI, HTTPException, responses
from g4f.client import Client
from io import BufferedReader, StringIO, TextIOWrapper
from json import load as json_load
from math import exp
from multiprocessing import Pool, current_process
from os import getenv
from pickle import load
from psutil import process_iter
from pydantic import BaseModel
from requests import get as requests_get, Response
from sklearn.naive_bayes import MultinomialNB
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.preprocessing import LabelEncoder
from statistics import mean
from stockfish import Stockfish, models
from time import time
from typing import Optional
from uvicorn import run


### Environment


def get_env_by_key(key: str, default_value: str) -> str:
    value = getenv(key)
    if value is None:
        return default_value
    return value


DEVELOPMENT: str = get_env_by_key("DEVELOPMENT", "true")
CONTAINER: str = get_env_by_key("CONTAINER", "false")
LOG_LEVEL: str = get_env_by_key("LOG_LEVEL", "debug")
PORT: str = get_env_by_key("PORT", "8080")


print("DEVELOPMENT", DEVELOPMENT)
print("CONTAINER", CONTAINER)
print("LOG_LEVEL", LOG_LEVEL)
print("PORT", PORT)


app = FastAPI(
    title="Languages Detection API",
    summary="Free Languages Detection API",
    description="Free Languages Detection API",
    version="0.0.1",
    contact={
        "name": "Hieu Doan",
        "url": "https://hieudoanm.github.io",
        "email": "hieumdoan@gmail.com",
    },
    license_info={
        "name": "GNU General Public License",
        "url": "https://www.gnu.org/licenses/gpl-3.0.html",
    },
    redoc_url="/",
    docs_url="/swagger",
)


### Health


class HealthResponse(BaseModel):
    def __init__(self, status: str):
        self.status = status

    status: str


@app.get(
    path="/health",
    operation_id="get_health",
    response_class=responses.JSONResponse,
    tags=["Health"],
    name="health",
)
def get_health() -> HealthResponse:
    health_response = HealthResponse(status="OK")
    return health_response


### Languages Detection


count_vectorizer_file: BufferedReader = open("models/vector.pkl", "rb")
count_vectorizer: CountVectorizer = load(count_vectorizer_file)
model_file: BufferedReader = open("models/model.pkl", "rb")
model: MultinomialNB = load(model_file)
label_encoder_file: BufferedReader = open("models/label.pkl", "rb")
label_encoder: LabelEncoder = load(label_encoder_file)


def predict_languages(text: str):
    x = count_vectorizer.transform([text]).toarray()
    lang = model.predict(x)
    lang = label_encoder.inverse_transform(lang)
    return lang


class PredictRequestBody(BaseModel):
    text: str


@app.post(
    "/predict",
    response_class=responses.JSONResponse,
    operation_id="predict",
    tags=["GPT"],
)
async def predict(request_body: PredictRequestBody):
    try:
        text: str = request_body.text
        languages = predict_languages(text)
        return {"language": languages[0]}
    except HTTPException as http_error:
        raise http_error
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")


### GPT


client = Client()


class RequestBody(BaseModel):
    content: str


@app.post(
    "/process",
    response_class=responses.JSONResponse,
    operation_id="process",
    tags=["GPT"],
)
async def process(request_body: RequestBody):
    try:
        content: str = request_body.content
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": content}],
        )
        return response
    except HTTPException as http_error:
        raise http_error
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")


### Chess


class Opening(BaseModel):
    eco: str
    name: str
    pgn: str


openings_file_path: str = "./resources/chess/openings/json"
openings_dict_json_file: TextIOWrapper = open(
    f"{openings_file_path}/dict/openings.json", "r"
)
openings_dict: dict[str, dict[str, str]] = json_load(openings_dict_json_file)
openings_list_json_file = open(f"{openings_file_path}/list/openings.json", "r")
openings_list: list[Opening] = json_load(openings_list_json_file)


class OpeningsResponse:
    total: int
    openings: list[Opening]


@app.get(
    "/openings",
    response_class=responses.JSONResponse,
    tags=["stockfish"],
    name="openings",
    operation_id="openings",
)
def get_openings() -> dict:
    total = len(openings_list)
    return {"total": total, "openings": openings_list}


class FenRequestBody(BaseModel):
    fen: str
    variations: int


class TopMove(BaseModel):
    centipawn: int
    pawn: Optional[float]
    mate: int
    san: str
    uci: str


def get_stockfish_engine():
    if CONTAINER == "true":
        return Stockfish(path="/usr/games/stockfish")
    return Stockfish()


def map_top_move(fen: str, top_move_dict: dict) -> TopMove:
    board = Board(fen)
    uci: str = top_move_dict.get("Move", "")
    move = Move.from_uci(uci)
    san: str = board.san(move)
    centipawn: int = top_move_dict.get("Centipawn", "")
    pawn = centipawn / 100 if centipawn is not None else None
    mate: int = top_move_dict.get("Mate", "")
    top_move = TopMove(
        centipawn=centipawn, pawn=pawn, mate=mate, san=san, uci=uci
    )
    return top_move


def get_top_moves(fen: str, variations: int, retry: int = 0) -> list[dict]:
    try:
        stockfish_engine = get_stockfish_engine()
        if not stockfish_engine.is_fen_valid(fen):
            return []
        stockfish_engine.set_fen_position(fen)
        top_moves = stockfish_engine.get_top_moves(variations)
        return top_moves
    except models.StockfishException as stockfishException:
        print(
            f'analyse_fen stockfishException="{stockfishException}" retry="{retry}"'
        )
        kill_stockfish()
        if retry < 3:
            return get_top_moves(fen, variations, retry + 1)
        return []


@app.post(
    "/fen",
    response_class=responses.JSONResponse,
    tags=["stockfish"],
    name="Analyse FEN",
    operation_id="analyse_fen",
)
async def analyse_fen(fen_request_body: FenRequestBody) -> list[TopMove]:
    fen: str = fen_request_body.fen
    variations: int = fen_request_body.variations
    top_moves: list[dict] = get_top_moves(fen, variations)
    mapped_top_moves: list[TopMove] = list(
        map(lambda top_move: map_top_move(fen, top_move), top_moves)
    )
    kill_stockfish()
    return mapped_top_moves


def get_piece_name(board: Board, uci: str) -> str:
    square: Square = parse_square(uci[-2:])
    piece = board.piece_at(square)
    if piece is not None:
        piece_name = PIECE_NAMES[piece.piece_type]
        return piece_name
    return ""


def check_if_stockfish_is_running() -> bool:
    for process in process_iter():
        if "stockfish" in process.name():
            return True
    return False


def kill_stockfish():
    print(
        "check_if_stockfish_is_running before_kill",
        check_if_stockfish_is_running(),
    )
    for process in process_iter():
        if "stockfish" in process.name():
            process.terminate()
            process.wait()
    print(
        "check_if_stockfish_is_running after_kill",
        check_if_stockfish_is_running(),
    )


def evaluate(fen: str, retry: int = 0) -> dict:
    centipawn: Optional[int] = None
    mate: Optional[int] = None
    try:
        stockfish_engine = get_stockfish_engine()
        stockfish_engine.set_fen_position(fen)
        top_moves = stockfish_engine.get_top_moves(1)
        evaluate_dict: dict = {}
        if len(top_moves) == 0:
            evaluate_dict["mate"] = 0
            return evaluate_dict
        top_move = top_moves[0]
        best_move = top_move.get("Move")
        centipawn = top_move.get("Centipawn")
        mate = top_move.get("Mate")
        evaluate_dict["best"] = best_move
        evaluate_dict["centipawn"] = centipawn
        evaluate_dict["mate"] = mate
        print(
            f'evaluate process="{current_process().pid}" fen="{fen}" centipawn="{centipawn}" mate="{mate}"'
        )
        return evaluate_dict
    except models.StockfishException as stockfishException:
        print(
            f'evaluate process="{current_process().pid}" fen="{fen}" retry="{retry}" stockfishException="{stockfishException}"'
        )
        kill_stockfish()
        if retry < 3:
            return evaluate(fen, retry + 1)
        return {}


def get_book_move(pgn: str) -> dict[str, str]:
    opening: dict[str, str] = openings_dict.get(pgn, {})
    opening_eco: str = opening.get("eco", "")
    opening_name: str = opening.get("name", "")
    return {"eco": opening_eco, "opening": opening_name}


def get_moves_without_evaluation(game: Game) -> list[dict]:
    board = game.board()
    moves_without_evaluation: list[dict] = []
    pgn_moves: list[str] = []
    for move in game.mainline_moves():
        fullmove_number: int = board.fullmove_number
        san: str = board.san(move)
        board.push(move)
        uci: str = move.uci()
        turn: str = "black" if board.turn else "white"
        piece: str = get_piece_name(board, uci)
        fen: str = board.fen()
        if turn == "white":
            pgn_moves.append(f"{fullmove_number}.")
        pgn_moves.append(san)
        pgn: str = " ".join(pgn_moves)
        book_move = get_book_move(pgn)
        eco: str = book_move.get("eco", "")
        opening: str = book_move.get("opening", "")
        # Major Pieces
        board_fen: str = board.board_fen()
        board_fen_without_numbers: str = "".join(
            "" if c.isdigit() else c for c in board_fen
        )
        board_fen_without_king_and_pawn: str = "".join(
            "" if c in ["/", "K", "P", "k", "p"] else c
            for c in board_fen_without_numbers
        )
        number_of_major_pieces: int = len(board_fen_without_king_and_pawn)
        phrase: str = "opening" if eco != "" else "middlegame"
        phrase: str = "endgame" if number_of_major_pieces <= 6 else phrase
        moves_without_evaluation.append(
            {
                "number": fullmove_number,
                "turn": turn,
                "piece": piece,
                "pgn": pgn,
                "fen": fen,
                "san": san,
                "uci": uci,
                "eco": eco,
                "phrase": phrase,
                "opening": opening,
            }
        )
    return moves_without_evaluation


MAX_CENTIPAWN = 1000


def get_move_centipawn(
    centipawn: Optional[int], mate: Optional[int], turn: str
):
    if mate is None:
        centipawn = (
            centipawn
            if centipawn is not None and centipawn <= MAX_CENTIPAWN
            else MAX_CENTIPAWN
        )
        centipawn = (
            centipawn
            if centipawn is not None and centipawn >= -1 * MAX_CENTIPAWN
            else -1 * MAX_CENTIPAWN
        )
    elif mate != 0:
        return MAX_CENTIPAWN * (1 if mate > 0 else -1)
    elif mate == 0:
        return MAX_CENTIPAWN if turn == "white" else -1 * MAX_CENTIPAWN
    return centipawn


def get_move_with_evaluation(move_without_evaluation: dict):
    fen: str = move_without_evaluation.get("fen", "")
    turn = move_without_evaluation.get("turn", "")
    evaluation = evaluate(fen, 0)
    best: Optional[str] = evaluation.get("best")
    mate: Optional[int] = evaluation.get("mate")
    stockfish_centipawn: Optional[int] = evaluation.get("centipawn")
    centipawn = get_move_centipawn(stockfish_centipawn, mate, turn)
    return {
        **move_without_evaluation,
        "centipawn": centipawn,
        "mate": mate,
        "best": best,
    }


def get_moves_with_evaluation(
    moves_without_evaluation: list[dict],
) -> list[dict]:
    # loop_time = time()
    # moves_with_evaluation : list[dict] = []
    # for move_without_evaluation in moves_without_evaluation:
    #     move_with_evaluation = get_move_with_evaluation(move_without_evaluation)
    #     moves_with_evaluation.append(move_with_evaluation)
    # print(f"seconds={(time() - loop_time)}")
    parallel_time: float = time()
    evaluation_pool = Pool()
    print(f"processes={evaluation_pool}")
    moves_with_evaluation = evaluation_pool.map(
        get_move_with_evaluation, moves_without_evaluation
    )
    evaluation_pool.close()
    print(f"seconds={(time() - parallel_time)}")
    return moves_with_evaluation


def get_move_quality(
    opening: str, uci: str, best: str, win_percentage_delta: float, turn: str
):
    if opening != "":
        return "book"
    if uci == best:
        return "best"
    if (win_percentage_delta > 0 and turn == "white") or (
        win_percentage_delta < 0 and turn == "black"
    ):
        if abs(win_percentage_delta) > 30:
            return "blunder"
        elif abs(win_percentage_delta) > 20:
            return "mistake"
        elif abs(win_percentage_delta) > 10:
            return "inaccuracy"
        elif abs(win_percentage_delta) < 1:
            return "excellent"
    return "good"


def get_moves(game: Game) -> list[dict]:
    moves_without_evaluation = get_moves_without_evaluation(game)
    moves_with_evaluation: list[dict] = get_moves_with_evaluation(
        moves_without_evaluation
    )
    moves: list[dict] = []
    for index, move_with_evaluation in enumerate(moves_with_evaluation):
        centipawn: int = move_with_evaluation.get("centipawn", 0)
        mate: int = move_with_evaluation.get("mate", 0)
        turn: str = move_with_evaluation.get("turn", "")
        uci: str = move_with_evaluation.get("uci", "")
        opening: str = move_with_evaluation.get("opening", "")
        if mate == 0:
            moves.append(
                {
                    **move_with_evaluation,
                    "winDelta": 0,
                    "winPercentage": 100 if turn == "white" else 0,
                    "accuracy": 100,
                }
            )
            break
        WIN_MULTIPLIER = -0.00368208
        win_percentage: float = 50 + 50 * (
            2 / (1 + exp(WIN_MULTIPLIER * centipawn)) - 1
        )
        win_percentage_delta = 0
        previous_move: dict = moves[index - 1] if index > 0 else {}
        win_percentage_before: float = previous_move.get("winPercentage", 50)
        best: str = previous_move.get("best", "")
        ACCURACY_MULTIPLIER = 103.1668100711649
        ACCURACY_DELTA_MULTIPLIER = -0.04354415386753951
        ACCURACY_DELTA = -3.166924740191411
        win_percentage_delta = round(win_percentage_before - win_percentage, 2)
        move_quality = get_move_quality(
            opening, uci, best, win_percentage_delta, turn
        )
        accuracy = (
            ACCURACY_MULTIPLIER
            * exp(ACCURACY_DELTA_MULTIPLIER * win_percentage_delta)
            + ACCURACY_DELTA
        )
        accuracy = accuracy if accuracy <= 100 else 100
        moves.append(
            {
                **move_with_evaluation,
                "moveQuality": move_quality,
                "winDelta": win_percentage_delta,
                "winPercentage": round(win_percentage, 2),
                "accuracy": round(accuracy, 2),
            }
        )
    return moves


class PgnRequestBody(BaseModel):
    pgn: str


@app.post(
    "/pgn",
    response_class=responses.JSONResponse,
    tags=["stockfish"],
    name="Analyse PGN",
    operation_id="analyse_pgn",
)
async def analyse_pgn(pgn_request_body: PgnRequestBody) -> dict:
    pgn: str = pgn_request_body.pgn
    pgn_string_io: StringIO = StringIO(pgn)
    game = read_game(pgn_string_io)
    if game is None:
        return {}
    game_headers = game.headers
    result: str = game_headers.get("Result", "")
    time_control: str = game_headers.get("TimeControl", "")
    white_username = game_headers.get("White", "").lower()
    black_username = game_headers.get("Black", "").lower()
    white_rating = game_headers.get("WhiteElo", "")
    black_rating = game_headers.get("BlackElo", "")
    moves: list[dict] = get_moves(game)
    kill_stockfish()
    # End Phrase
    last_move: dict = moves[-1]
    end_phrase: str = last_move.get("phrase", "")
    # Opening
    last_book_move: dict = list(
        filter(lambda move: move.get("moveQuality") == "book", moves)
    )[-1]
    eco: str = last_book_move.get("eco", "")
    name: str = last_book_move.get("opening", "")
    pgn: str = last_book_move.get("pgn", "")
    leave_book: str = (
        "black" if last_book_move.get("turn", "") == "white" else "white"
    )
    leave_move: str = last_book_move.get("number", "") + (
        1 if leave_book == "white" else 0
    )
    # Accuracy
    white_moves: list[dict] = list(
        filter(lambda move: move.get("turn") == "white", moves)
    )
    white_accuracies: list = list(
        map(lambda move: move.get("accuracy"), white_moves)
    )
    white_accuracy: float = round(mean(white_accuracies), 2)
    black_moves: list[dict] = list(
        filter(lambda move: move.get("turn") == "black", moves)
    )
    black_accuracies: list = list(
        map(lambda move: move.get("accuracy"), black_moves)
    )
    black_accuracy: float = round(mean(black_accuracies), 2)
    return {
        "result": result,
        "timeControl": time_control,
        "endPhrase": end_phrase,
        "players": {
            "white": {"username": white_username, "rating": white_rating},
            "black": {"username": black_username, "rating": black_rating},
        },
        "accuracies": {"white": white_accuracy, "black": black_accuracy},
        "opening": {
            "eco": eco,
            "name": name,
            "pgn": pgn,
            "leaveBook": leave_book,
            "leaveMove": leave_move,
        },
        "moves": moves,
    }


class TablebaseRequestBody(BaseModel):
    fen: str


class TablebaseMove(BaseModel):
    uci: str
    san: str
    zeroing: bool
    checkmate: bool
    stalemate: bool
    variant_win: bool
    variant_loss: bool
    insufficient_material: bool
    dtz: int
    precise_dtz: int
    dtm: int
    category: str


class TablebaseResponse:
    checkmate: bool
    stalemate: bool
    variant_win: bool
    variant_loss: bool
    insufficient_material: bool
    dtz: int
    precise_dtz: int
    dtm: int
    category: str
    moves: list[TablebaseMove]


@app.post(
    "/tablebase",
    response_class=responses.JSONResponse,
    tags=["stockfish"],
    name="Analyse Tablebase",
    operation_id="analyse_tablebase",
)
async def analyse_tablebase(
    tablebase_request_body: TablebaseRequestBody,
) -> dict:
    fen: str = tablebase_request_body.fen.replace(" ", "_")
    url: str = f"http://tablebase.lichess.ovh/standard?fen={fen}"
    response: Response = requests_get(url)
    data: dict = response.json()
    return data


if __name__ == "__main__":
    run(
        "main:app",
        host="0.0.0.0",
        port=int(PORT),
        reload=DEVELOPMENT == "true",
        loop="asyncio",
    )
