import Foundation
import ArgumentParser

struct Chess: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "chess",
        abstract: "Chess tools",
        subcommands: [
            Chess960.self, ChessComLeaderboards.self, ChessComPlayer.self,
            ChessComTitled.self, ChessElo.self, ChessFEN.self,
            ChessFENEval.self, ChessFENSVG.self, ChessOpenings.self,
            ChessPGN.self, ChessPGNFEN.self, ChessPGNUCI.self,
            ChessPlay.self, ChessRandom.self,
        ]
    )

    mutating func run() {}
}

// MARK: - Chess960

struct Chess960: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "960",
        abstract: "Generate Chess960 (Fischer Random) starting positions"
    )

    @Option(name: .shortAndLong, help: "Number of positions to generate")
    var count: Int = 1

    mutating func run() {
        for _ in 0..<count {
            print(generateChess960Position())
        }
    }
}

private func generateChess960Position() -> String {
    var pos = [String](repeating: "", count: 8)
    var available = Array(0..<8)

    // Place bishops on opposite colors
    let lightSquares = available.filter { $0 % 2 == 0 }
    let darkSquares = available.filter { $0 % 2 == 1 }
    pos[lightSquares.randomElement()!] = "B"
    pos[darkSquares.randomElement()!] = "B"
    available = available.filter { pos[$0].isEmpty }

    // Place queen
    let qIdx = available.randomElement()!
    pos[qIdx] = "Q"
    available = available.filter { pos[$0].isEmpty }

    // Place knights
    for _ in 0..<2 {
        let nIdx = available.randomElement()!
        pos[nIdx] = "N"
        available = available.filter { pos[$0].isEmpty }
    }

    // Place R K R (king between rooks)
    let remainingPos = available.sorted()
    pos[remainingPos[0]] = "R"
    pos[remainingPos[1]] = "K"
    pos[remainingPos[2]] = "R"

    return pos.joined(separator: " ")
}

// MARK: - Chess.com

struct ChessComLeaderboards: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "leaderboard", abstract: "Fetch chess.com leaderboard")

    @Option(name: .long, help: "Leaderboard type: daily, rapid, blitz, bullet")
    var type: String = "daily"

    mutating func run() async throws {
        let data = try await requestsFetch(method: "GET", url: "https://api.chess.com/pub/leaderboards")
        let json = try JSONSerialization.jsonObject(with: data) as? [String: Any]
        guard let entries = json?[type] as? [[String: Any]] else {
            print("No leaderboard data for '\(type)'")
            return
        }
        print("\(type.uppercased()) Leaderboard:")
        for (i, entry) in entries.prefix(10).enumerated() {
            let rank = i + 1
            let username = entry["username"] as? String ?? ""
            let rating = entry["score"] as? Int ?? entry["rating"] as? Int ?? 0
            let title = entry["title"] as? String ?? ""
            let titleStr = title.isEmpty ? "" : " (\(title))"
            print("  \(rank). \(username)\(titleStr) - \(rating)")
        }
    }
}

struct ChessComPlayer: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "player", abstract: "Fetch chess.com player stats")
    @Argument(help: "Username") var username: String

    mutating func run() async throws {
        let data = try await requestsFetch(method: "GET", url: "https://api.chess.com/pub/player/\(username)/stats")
        let json = try JSONSerialization.jsonObject(with: data) as? [String: Any]

        print("Player: \(username)")
        for (key, value) in json ?? [:] {
            if let stats = value as? [String: Any] {
                let last = stats["last"] as? [String: Any]
                let best = stats["best"] as? [String: Any]
                let record = stats["record"] as? [String: Any]
                let rating = last?["rating"] as? Int ?? stats["rating"] as? Int ?? 0
                let bestRating = best?["rating"] as? Int ?? 0
                let wins = record?["wins"] as? Int ?? 0
                let losses = record?["losses"] as? Int ?? 0
                let draws = record?["draws"] as? Int ?? 0
                print("  \(key): rating=\(rating), best=\(bestRating), W=\(wins) L=\(losses) D=\(draws)")
            }
        }
    }
}

struct ChessComTitled: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "titled", abstract: "Fetch titled players")
    @Argument(help: "Title (GM, IM, FM, etc.)") var title: String

    mutating func run() async throws {
        let data = try await requestsFetch(method: "GET", url: "https://api.chess.com/pub/titled/\(title.uppercased())")
        let json = try JSONSerialization.jsonObject(with: data) as? [String: Any]
        let players = json?["players"] as? [String] ?? []
        print("\(title.uppercased()) players: \(players.count)")
        for name in players.prefix(20) {
            print("  \(name)")
        }
        if players.count > 20 { print("  ... and \(players.count - 20) more") }
    }
}

// MARK: - Elo

struct ChessElo: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "elo", abstract: "Calculate Elo rating change")
    @Argument(help: "Player A rating") var ratingA: Int
    @Argument(help: "Player B rating") var ratingB: Int
    @Argument(help: "Result (1 = A wins, 0 = B wins, 0.5 = draw)") var result: Double

    mutating func run() {
        let expectedA = 1.0 / (1.0 + pow(10.0, Double(ratingB - ratingA) / 400.0))
        let expectedB = 1.0 - expectedA
        let newA = Double(ratingA) + 32.0 * (result - expectedA)
        let newB = Double(ratingB) + 32.0 * ((1.0 - result) - expectedB)
        print("Expected score: A=\(String(format: "%.3f", expectedA)), B=\(String(format: "%.3f", expectedB))")
        print("New ratings: A=\(Int(newA)) (+\(Int(newA - Double(ratingA)))), B=\(Int(newB)) (+\(Int(newB - Double(ratingB))))")
    }
}

// MARK: - FEN

struct ChessFEN: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "fen", abstract: "Parse and display FEN string")
    @Argument(help: "FEN string") var fen: String

    mutating func run() {
        displayFEN(fen)
    }
}

private func displayFEN(_ fen: String) {
    let parts = fen.split(separator: " ")
    guard parts.count >= 1 else { print("Invalid FEN"); return }

    let boardStr = parts[0]
    let rows = boardStr.split(separator: "/")
    let turn = parts.count > 1 ? String(parts[1]) : "w"

    let pieceUnicode: [Character: String] = [
        "K": "♔", "Q": "♕", "R": "♖", "B": "♗", "N": "♘", "P": "♙",
        "k": "♚", "q": "♛", "r": "♜", "b": "♝", "n": "♞", "p": "♟",
    ]

    print("  a b c d e f g h")
    for (i, row) in rows.enumerated() {
        let rank = 8 - i
        var line = "\(rank) "
        for ch in row {
            if ch.isNumber {
                for _ in 0..<Int(String(ch))! {
                    line += ". "
                }
            } else {
                line += (pieceUnicode[ch] ?? String(ch)) + " "
            }
        }
        print(line)
    }
    print("  a b c d e f g h")

    if parts.count > 1 {
        print("Turn: \(turn == "w" ? "White" : "Black")")
    }
    if parts.count > 2 {
        let castling = parts[2]
        print("Castling: \(castling == "-" ? "None" : String(castling))")
    }
    if parts.count > 3 {
        print("En passant: \(parts[3])")
    }
    if parts.count > 4 {
        print("Halfmove clock: \(parts[4])")
    }
    if parts.count > 5 {
        print("Fullmove number: \(parts[5])")
    }
}

// MARK: - FEN Eval

struct ChessFENEval: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "fen-eval", abstract: "Evaluate FEN position")
    @Argument(help: "FEN string") var fen: String

    mutating func run() async throws {
        guard let stockfishPath = findStockfish() else {
            print("Stockfish not found. Install with: brew install stockfish")
            return
        }

        let result = try await stockfishEval(path: stockfishPath, fen: fen)
        print(result)
    }
}

// MARK: - FEN SVG

struct ChessFENSVG: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "fen-svg", abstract: "Render FEN as SVG")
    @Argument(help: "FEN string") var fen: String

    mutating func run() async throws {
        let encoded = fen.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) ?? fen
        let url = "https://chess.com/board.png?fen=\(encoded)"
        print("Board image: \(url)")

        let data = try await requestsFetch(method: "GET", url: url)
        let filename = "chessboard.png"
        try data.write(to: URL(fileURLWithPath: filename))
        print("Saved to \(filename)")
    }
}

// MARK: - Openings

struct ChessOpenings: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "openings", abstract: "Look up opening name")
    @Argument(help: "FEN string") var fen: String

    mutating func run() async throws {
        let encoded = fen.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) ?? fen
        let data = try await requestsFetch(method: "GET", url: "https://explorer.lichess.ovh/masters?fen=\(encoded)")
        let json = try JSONSerialization.jsonObject(with: data) as? [String: Any]

        if let opening = json?["opening"] as? [String: Any] {
            let name = opening["name"] as? String ?? "Unknown"
            let eco = opening["eco"] as? String ?? ""
            print("\(eco) \(name)")
        } else {
            print("No opening found")
        }
    }
}

// MARK: - PGN

struct ChessPGN: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "pgn", abstract: "View PGN file")
    @Argument(help: "PGN file path") var file: String

    mutating func run() {
        guard let data = try? String(contentsOfFile: file, encoding: .utf8) else {
            print("Could not read file")
            return
        }
        print(data)
    }
}

struct ChessPGNFEN: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "pgn-fen", abstract: "Extract FEN sequence from PGN")
    @Argument(help: "PGN file path") var file: String

    mutating func run() {
        guard let content = try? String(contentsOfFile: file, encoding: .utf8) else {
            print("Could not read file")
            return
        }
        let moves = extractMoves(from: content)
        var fens: [(fen: String, move: String)] = []
        var board = createStartingBoard()

        fens.append((boardToFEN(board), "start"))
        for move in moves {
            applyMove(&board, move)
            fens.append((boardToFEN(board), move))
        }

        let encoder = JSONEncoder()
        encoder.outputFormatting = .prettyPrinted
        let data = fens.map { ["fen": $0.fen, "move": $0.move] }
        if let jsonData = try? JSONSerialization.data(withJSONObject: data, options: .prettyPrinted) {
            print(String(data: jsonData, encoding: .utf8) ?? "")
        }
    }
}

struct ChessPGNUCI: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "pgn-uci", abstract: "Extract UCI sequence from PGN")
    @Argument(help: "PGN file path") var file: String

    mutating func run() {
        guard let content = try? String(contentsOfFile: file, encoding: .utf8) else {
            print("Could not read file")
            return
        }
        let moves = extractMoves(from: content)
        var board = createStartingBoard()
        var uciMoves: [String] = []

        for move in moves {
            if let uci = moveToUCI(&board, move) {
                uciMoves.append(uci)
            }
        }

        print(uciMoves.joined(separator: " "))
    }
}

// MARK: - Chess Play

struct ChessPlay: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "play", abstract: "Play chess vs Stockfish")

    mutating func run() async throws {
        print("Chess play TUI not available in Swift version.")
        print("Run the Go binary for the interactive chess play experience.")
    }
}

// MARK: - Chess Random

struct ChessRandom: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "random", abstract: "Generate random legal move")

    mutating func run() {
        print("Random move generator not available in Swift version.")
        print("Run the Go binary for random legal move generation.")
    }
}

// MARK: - Shared Helpers

private func findStockfish() -> String? {
    let paths = [
        "/usr/local/bin/stockfish",
        "/opt/homebrew/bin/stockfish",
        "/usr/bin/stockfish",
    ]
    return paths.first { FileManager.default.fileExists(atPath: $0) }
}

private func stockfishEval(path: String, fen: String) async throws -> String {
    let process = Process()
    process.executableURL = URL(fileURLWithPath: path)
    process.arguments = ["--uci"]

    let inputPipe = Pipe()
    let outputPipe = Pipe()
    process.standardInput = inputPipe
    process.standardOutput = outputPipe
    process.standardError = Pipe()

    try process.run()

    let input = inputPipe.fileHandleForWriting
    input.write("uci\n".data(using: .utf8)!)
    input.write("ucinewgame\n".data(using: .utf8)!)
    input.write("position fen \(fen)\n".data(using: .utf8)!)
    input.write("eval\n".data(using: .utf8)!)
    input.write("quit\n".data(using: .utf8)!)

    process.waitUntilExit()
    let data = outputPipe.fileHandleForReading.readDataToEndOfFile()
    return String(data: data, encoding: .utf8) ?? "No output"
}

// MARK: - Board Representation (Simple)

private struct ChessBoard {
    var squares: [String] = Array(repeating: ".", count: 64)
    var turn: String = "w"
    var castlingRights: String = "KQkq"
    var enPassant: String = "-"
    var halfmoveClock: Int = 0
    var fullmoveNumber: Int = 1
}

private func createStartingBoard() -> ChessBoard {
    var board = ChessBoard()
    let backRank: [String] = ["r", "n", "b", "q", "k", "b", "n", "r"]
    for i in 0..<8 {
        board.squares[i] = backRank[i]
        board.squares[i + 56] = backRank[i].uppercased()
    }
    for i in 8..<16 { board.squares[i] = "p" }
    for i in 48..<56 { board.squares[i] = "P" }
    board.turn = "w"
    board.castlingRights = "KQkq"
    board.enPassant = "-"
    board.halfmoveClock = 0
    board.fullmoveNumber = 1
    return board
}

private func boardToFEN(_ board: ChessBoard) -> String {
    var fen = ""
    for rank in 0..<8 {
        var emptyCount = 0
        for file in 0..<8 {
            let piece = board.squares[rank * 8 + file]
            if piece == "." {
                emptyCount += 1
            } else {
                if emptyCount > 0 { fen += "\(emptyCount)" }
                fen += piece
                emptyCount = 0
            }
        }
        if emptyCount > 0 { fen += "\(emptyCount)" }
        if rank < 7 { fen += "/" }
    }
    fen += " \(board.turn) \(board.castlingRights) \(board.enPassant) \(board.halfmoveClock) \(board.fullmoveNumber)"
    return fen
}

private func extractMoves(from pgn: String) -> [String] {
    var pgn = pgn
    if let bracketRange = pgn.range(of: "\n\n") {
        pgn = String(pgn[bracketRange.upperBound...])
    } else if let firstBracket = pgn.range(of: "1.") {
        pgn = String(pgn[firstBracket.lowerBound...])
    }
    // Remove move numbers
    pgn = pgn.replacingOccurrences(of: #"\d+\.\.\.\s*"#, with: "", options: .regularExpression)
    pgn = pgn.replacingOccurrences(of: #"\d+\."#, with: "", options: .regularExpression)
    pgn = pgn.replacingOccurrences(of: #"\{[^}]*\}"#, with: "", options: .regularExpression)
    pgn = pgn.replacingOccurrences(of: #"\$[0-9]+"#, with: "", options: .regularExpression)
    pgn = pgn.replacingOccurrences(of: "\\s+", with: " ", options: .regularExpression)
    return pgn.trimmingCharacters(in: .whitespaces).split(separator: " ").map(String.init)
}

private func applyMove(_ board: inout ChessBoard, _ move: String) {
    guard move.count >= 2 else { return }
    let pieceChar = move.first ?? "P"
    let piece = pieceChar.isUppercase ? String(pieceChar) : "P"
    let targetStr = move.suffix(2)
    guard let targetIndex = algebraicToIndex(String(targetStr)) else { return }

    // Simple move application for FEN tracking
    // Remove piece from current position
    var moved = false
    for i in 0..<64 {
        if board.squares[i] == piece {
            // Check if this piece can reach target (simplified)
            board.squares[i] = "."
            board.squares[targetIndex] = piece
            moved = true
            break
        }
        if moved { break }
    }
    if !moved {
        // Pawn move
        let pawn = board.turn == "w" ? "P" : "p"
        for i in 0..<64 where board.squares[i] == pawn {
            board.squares[i] = "."
            board.squares[targetIndex] = pawn
            break
        }
    }

    board.turn = board.turn == "w" ? "b" : "w"
    if board.turn == "w" { board.fullmoveNumber += 1 }
}

private func moveToUCI(_ board: inout ChessBoard, _ move: String) -> String? {
    guard move.count >= 2 else { return nil }
    let targetStr = String(move.suffix(2))
    guard let targetIndex = algebraicToIndex(targetStr) else { return nil }
    let piece = String(move.first ?? "P").uppercased()

    var sourceIndex: Int?
    if piece == "P" {
        let pawn = board.turn == "w" ? "P" : "p"
        let direction = board.turn == "w" ? -8 : 8

        if move.contains("x") {
            // Capture
            let captures = [targetIndex - 1, targetIndex + 1].filter { $0 >= 0 && $0 < 64 && board.squares[$0] == pawn }
            sourceIndex = captures.first
        } else {
            // Forward push
            if targetIndex - direction >= 0, targetIndex - direction < 64, board.squares[targetIndex - direction] == pawn {
                sourceIndex = targetIndex - direction
            } else if targetIndex - 2 * direction >= 0, targetIndex - 2 * direction < 64, board.squares[targetIndex - 2 * direction] == pawn {
                sourceIndex = targetIndex - 2 * direction
            }
        }
    } else {
        for i in 0..<64 {
            if board.squares[i].uppercased() == piece {
                sourceIndex = i
                break
            }
        }
    }

    guard let from = sourceIndex else { return nil }
    let fromStr = indexToAlgebraic(from)
    let toStr = indexToAlgebraic(targetIndex)
    let uci = "\(fromStr)\(toStr)"

    applyMove(&board, move)
    return uci
}

private func algebraicToIndex(_ s: String) -> Int? {
    guard s.count == 2 else { return nil }
    let file = Int(s[s.startIndex].asciiValue! - 97)
    let rank = Int(s[s.index(before: s.endIndex)].asciiValue! - 49)
    guard file >= 0, file < 8, rank >= 0, rank < 8 else { return nil }
    return (7 - rank) * 8 + file
}

private func indexToAlgebraic(_ i: Int) -> String {
    let file = i % 8
    let rank = 7 - i / 8
    return "\(Character(UnicodeScalar(97 + file)!))\(rank + 1)"
}
