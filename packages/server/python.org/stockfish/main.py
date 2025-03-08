from fastapi import FastAPI
from stockfish import Stockfish
import json

# Load Stockfish configuration
with open("config.json", "r") as f:
    config = json.load(f)

# Initialize Stockfish engine
stockfish = Stockfish(path="/usr/games/stockfish", parameters=config)

app = FastAPI()


@app.get("/")
def read_root():
    return {"message": "Stockfish API is running"}


@app.get("/eval/")
def set_fen(fen: str):
    """Set a custom FEN position"""
    stockfish.set_fen_position(fen)
    best_move = stockfish.get_best_move()
    evaluation = stockfish.get_evaluation()
    return {
        "message": "Position set",
        "fen": fen,
        "best_move": best_move,
        "evaluation": evaluation,
    }
