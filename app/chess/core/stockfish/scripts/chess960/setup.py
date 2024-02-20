from chess import Board, Move
from pandas import read_csv, DataFrame
from stockfish import Stockfish


def get_stockfish_engine():
    return Stockfish()


def find_indices(search_list : str, search_item : str) -> list[int]:
    indices = []
    for (index, item) in enumerate(search_list):
        if item == search_item:
            indices.append(index)
    return indices


def get_diff(chess960_fen : str):
    r1 : int = 0
    r2 : int = 7
    n1 : int = 1
    n2 : int = 6
    b1 : int = 2
    b2 : int = 5
    q : int = 3
    k : int = 4
    [r960_1, r960_2] = find_indices(chess960_fen, 'r')
    [n960_1, n960_2] = find_indices(chess960_fen, 'n')
    [b960_1, b960_2] = find_indices(chess960_fen, 'b')
    [q960] = find_indices(chess960_fen, 'q')
    [k960] = find_indices(chess960_fen, 'k')
    return abs(r960_1 - r1) + abs(r960_2 - r2) + abs(n960_1 - n1) + abs(n960_2 - n2) + abs(b960_1 - b1) + abs(b960_2 - b2) + abs(q960 - q) + abs(k960 - k)



setup_data_frame : DataFrame = read_csv("./resources/chess960/setup.csv")
setup_list : list[dict] = setup_data_frame.to_dict('records')


for setup in setup_list:
    number : int = setup.get("number")
    fen : str = setup.get("fen")
    board_fen : str = fen.split(" ")[0]
    diff = get_diff(board_fen)
    centipawn = setup.get("centipawn", "")
    print('centipawn', str(centipawn))
    stockfish_engine : Stockfish = get_stockfish_engine()
    if not stockfish_engine.is_fen_valid(fen):
        continue
    stockfish_engine.set_fen_position(fen)
    evaluation = stockfish_engine.get_evaluation()
    evaluation_type = evaluation.get("type", "")
    evaluation_value = evaluation.get("value", "")
    new_centipawn = evaluation_value if evaluation_type == 'cp' else f'M{evaluation_value}'
    print(fen, evaluation_type, evaluation_value)
    [top_move] = stockfish_engine.get_top_moves(1)
    setup_list[number]['centipawn'] = new_centipawn
    setup_list[number]['diff'] = diff
    best_move_uci = top_move.get("Move")
    board = Board(fen)
    move = Move.from_uci(best_move_uci)
    setup_list[number]['best_move'] = board.san(move)
    new_setup_data_frame : DataFrame = DataFrame(setup_list)
    new_setup_data_frame = new_setup_data_frame.sort_values(by='number')
    new_setup_data_frame.to_csv("./resources/chess960/setup.csv", index=False)
