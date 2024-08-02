from chess import Board, Move
from pandas import read_csv, DataFrame
from stockfish import Stockfish


def get_stockfish_engine():
    return Stockfish()


def find_indices(search_list: str, search_item: str) -> list[int]:
    indices = []
    for index, item in enumerate(search_list):
        if item == search_item:
            indices.append(index)
    return indices


def get_info(chess960_fen: str):
    r1: int = 0
    r2: int = 7
    n1: int = 1
    n2: int = 6
    b1: int = 2
    b2: int = 5
    q: int = 3
    k: int = 4
    [r960_1, r960_2] = find_indices(chess960_fen, "r")
    [n960_1, n960_2] = find_indices(chess960_fen, "n")
    [b960_1, b960_2] = find_indices(chess960_fen, "b")
    [q960] = find_indices(chess960_fen, "q")
    [k960] = find_indices(chess960_fen, "k")
    diff: int = (
        abs(r960_1 - r1)
        + abs(r960_2 - r2)
        + abs(n960_1 - n1)
        + abs(n960_2 - n2)
        + abs(b960_1 - b1)
        + abs(b960_2 - b2)
        + abs(q960 - q)
        + abs(k960 - k)
    )
    same_side_rook: bool = (r960_1 <= 3 and r960_2 <= 3) or (r960_1 >= 4 and r960_2 >= 4)
    same_side_bishop: bool = (b960_1 <= 3 and b960_2 <= 3) or (b960_1 >= 4 and b960_2 >= 4)
    same_side_knight: bool = (n960_1 <= 3 and n960_2 <= 3) or (n960_1 >= 4 and n960_2 >= 4)
    return {
        "diff": diff,
        "same_side_rook": same_side_rook,
        "same_side_bishop": same_side_bishop,
        "same_side_knight": same_side_knight,
    }


positions_data_frame: DataFrame = read_csv("./resources/chess960/positions.csv")
positions_list: list[dict] = positions_data_frame.to_dict("records")


for positions in positions_list:
    number: int = positions.get("number", 0)
    fen: str = positions.get("fen", "")
    board_fen: str = fen.split(" ")[0]
    info = get_info(board_fen)
    diff = info.get("diff")
    same_side_rook = info.get("same_side_rook")
    same_side_bishop = info.get("same_side_bishop")
    same_side_knight = info.get("same_side_knight")
    centipawn = positions.get("centipawn", "")
    print("centipawn", str(centipawn))
    stockfish_engine: Stockfish = get_stockfish_engine()
    if not stockfish_engine.is_fen_valid(fen):
        continue
    stockfish_engine.set_fen_position(fen)
    evaluation = stockfish_engine.get_evaluation()
    evaluation_type = evaluation.get("type", "")
    evaluation_value = evaluation.get("value", "")
    new_centipawn = evaluation_value if evaluation_type == "cp" else f"M{evaluation_value}"
    print(fen, evaluation_type, evaluation_value)
    [top_move] = stockfish_engine.get_top_moves(1)
    positions_list[number]["centipawn"] = new_centipawn
    positions_list[number]["diff"] = diff
    positions_list[number]["same_side_rook"] = same_side_rook
    positions_list[number]["same_side_bishop"] = same_side_bishop
    positions_list[number]["same_side_knight"] = same_side_knight
    best_move_uci: str = top_move.get("Move", "")
    board = Board(fen)
    move = Move.from_uci(best_move_uci)
    positions_list[number]["best_move"] = board.san(move)
    new_positions_data_frame: DataFrame = DataFrame(positions_list)
    new_positions_data_frame = new_positions_data_frame.sort_values(by="number")
    new_positions_data_frame.to_csv("./resources/chess960/positions.csv", index=False)
