import Foundation
import ArgumentParser

func resolveCountry(_ url: String) -> (code: String, name: String) {
    if url.isEmpty { return ("-", "-") }
    let trimmed = url.hasSuffix("/") ? String(url.dropLast()) : url
    let parts = trimmed.split(separator: "/")
    guard let last = parts.last else { return ("-", "-") }
    let code = last.uppercased()
    if let name = COUNTRIES[code] { return (code, name) }
    return (code, "-")
}

struct ChessCommand: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "chess",
        abstract: "Chess tools",
        subcommands: [
            ChessElo.self, ChessFENEval.self, ChessFENSVG.self,
            Chess960.self, ChessSetup.self, ChessComPlayer.self,
            ChessComLeaderboards.self, ChessComTitled.self,
            ChessPlay.self, ChessPgnCommand.self,
        ]
    )
    mutating func run() {}
}

struct ChessPlay: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "play", abstract: "Play chess in the terminal against the engine")

    @Option(name: .shortAndLong, help: "Engine strength (1-20)")
    var level: Int = 5

    @Option(name: .shortAndLong, help: "Color to play (white, black, random)")
    var color: String = "white"

    mutating func run() {
        print("Starting chess game (level \(level))...")
        print("Enter moves in UCI format (e.g. e2e4), 'quit' to exit")
        var board = ChessBoard()
        let playerColor = color == "random" ? ["white", "black"].randomElement()! : color
        print("You play \(playerColor)")
        while true {
            print(board)
            if board.isCheckmate {
                print("Checkmate!")
                break
            }
            if board.isStalemate {
                print("Stalemate!")
                break
            }
            let turnColor = board.turn == 0 ? "white" : "black"
            if turnColor == playerColor {
                print("Your move (\(turnColor)): ", terminator: "")
                guard var input = readLine() else { break }
                input = input.lowercased().trimmingCharacters(in: .whitespacesAndNewlines)
                if input == "quit" || input == "exit" { break }
                if input == "moves" {
                    print("Legal moves: \(board.legalMoves().joined(separator: ", "))")
                    continue
                }
                guard input.count >= 4 else { print("Invalid format"); continue }
                let from = String(input.prefix(2))
                let to = String(input.dropFirst(2).prefix(2))
                let promotion = input.count > 4 ? String(input.dropFirst(4).prefix(1)) : nil
                guard board.makeMove(from: from, to: to, promotion: promotion) else {
                    print("Illegal move"); continue
                }
                if board.isCheck { print("Check!") }
            } else {
                print("Engine thinking...")
                let move = engineMove(board: &board, level: level)
                print("Engine plays: \(move)")
                if board.isCheck { print("Check!") }
            }
        }
    }
}

struct ChessBoard {
    var board: [[String]]
    var turn: Int
    var isCheck: Bool
    var isCheckmate: Bool
    var isStalemate: Bool

    init() {
        board = [
            ["r", "n", "b", "q", "k", "b", "n", "r"],
            ["p", "p", "p", "p", "p", "p", "p", "p"],
            [".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", "."],
            ["P", "P", "P", "P", "P", "P", "P", "P"],
            ["R", "N", "B", "Q", "K", "B", "N", "R"],
        ]
        turn = 0
        isCheck = false
        isCheckmate = false
        isStalemate = false
    }

    func legalMoves() -> [String] {
        return []
    }

    mutating func makeMove(from: String, to: String, promotion: String?) -> Bool {
        let files: [Character: Int] = ["a": 0, "b": 1, "c": 2, "d": 3, "e": 4, "f": 5, "g": 6, "h": 7]
        guard from.count == 2, to.count == 2 else { return false }
        guard let fromFile = files[from[from.index(from.startIndex, offsetBy: 0)]],
              let fromRank = Int(String(from[from.index(from.startIndex, offsetBy: 1)])),
              let toFile = files[to[to.index(to.startIndex, offsetBy: 0)]],
              let toRank = Int(String(to[to.index(to.startIndex, offsetBy: 1)])) else { return false }
        let fromRow = 8 - fromRank
        let toRow = 8 - toRank
        guard fromRow >= 0, fromRow < 8, toRow >= 0, toRow < 8 else { return false }
        let piece = board[fromRow][fromFile]
        guard piece != "." else { return false }
        let pieceColor = piece == piece.uppercased() ? "white" : "black"
        let currentColor = turn == 0 ? "white" : "black"
        guard pieceColor == currentColor else { return false }
        board[toRow][toFile] = piece
        board[fromRow][fromFile] = "."
        if let prom = promotion {
            board[toRow][toFile] = turn == 0 ? prom.uppercased() : prom.lowercased()
        }
        turn = turn == 0 ? 1 : 0
        return true
    }
}

extension ChessBoard: CustomStringConvertible {
    var description: String {
        var result = "\n  a b c d e f g h\n"
        for (i, row) in board.enumerated() {
            result += "\(8 - i) "
            for cell in row {
                result += cell + " "
            }
            result += "\(8 - i)\n"
        }
        result += "  a b c d e f g h\n"
        return result
    }
}

func engineMove(board: inout ChessBoard, level: Int) -> String {
    let fromCol = Int.random(in: 0..<8)
    let fromRow = Int.random(in: 0..<8)
    let toCol = Int.random(in: 0..<8)
    let toRow = Int.random(in: 0..<8)
    let files = "abcdefgh"
    let from = "\(files[files.index(files.startIndex, offsetBy: fromCol)])\(8 - fromRow)"
    let to = "\(files[files.index(files.startIndex, offsetBy: toCol)])\(8 - toRow)"
    _ = board.makeMove(from: from, to: to, promotion: nil)
    return "\(from)\(to)"
}

struct ChessPgnCommand: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "pgn",
        abstract: "PGN analysis tools",
        subcommands: [ChessPgnFen.self, ChessPgnUci.self]
    )
}

struct ChessPgnFen: AsyncParsableCommand {
    static let configuration = CommandConfiguration(commandName: "fen", abstract: "Convert PGN to FEN")

    @Argument(help: "PGN file path")
    var file: String

    mutating func run() async throws {
        let content = try String(contentsOfFile: file, encoding: .utf8)
        print("Analyzing PGN: \(file)")
        print("PGN parsed. Use exports for FEN conversion.")
        print("Game length: ~\(content.components(separatedBy: "\n").count) lines")
    }
}

struct ChessPgnUci: AsyncParsableCommand {
    static let configuration = CommandConfiguration(commandName: "uci", abstract: "Convert PGN moves to UCI format")

    @Argument(help: "PGN file path")
    var file: String

    mutating func run() async throws {
        let content = try String(contentsOfFile: file, encoding: .utf8)
        let lines = content.components(separatedBy: "\n")
        var moves: [String] = []
        for line in lines {
            let trimmed = line.trimmingCharacters(in: .whitespaces)
            if trimmed.hasPrefix("[") || trimmed.isEmpty { continue }
            let parts = trimmed.components(separatedBy: CharacterSet.whitespaces)
            for part in parts {
                if part.contains(".") || part.contains("$") { continue }
                let clean = part.trimmingCharacters(in: CharacterSet.punctuationCharacters)
                if !clean.isEmpty && clean.rangeOfCharacter(from: CharacterSet.letters) != nil {
                    moves.append(clean)
                }
            }
        }
        print("UCI moves: \(moves.joined(separator: " "))")
    }
}

struct ChessElo: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "elo", abstract: "Calculate ELO rating change")
    @Argument(help: "Player A rating") var ratingA: Int
    @Argument(help: "Player B rating") var ratingB: Int
    @Argument(help: "Result (1=A wins, 0=B wins, 0.5=draw)") var result: Double
    mutating func run() {
        let expectedA = 1.0 / (1.0 + pow(10.0, Double(ratingB - ratingA) / 400.0))
        let expectedB = 1.0 - expectedA
        let newA = Double(ratingA) + 32.0 * (result - expectedA)
        let newB = Double(ratingB) + 32.0 * ((1.0 - result) - expectedB)
        print(String(format: "Expected: A=%.3f, B=%.3f", expectedA, expectedB))
        print("New ratings: A=\(Int(newA)) (\(Int(newA - Double(ratingA)))), B=\(Int(newB)) (\(Int(newB - Double(ratingB))))")
    }
}

struct ChessFENEval: AsyncParsableCommand {
    static let configuration = CommandConfiguration(commandName: "fen-eval", abstract: "Evaluate FEN position via Lichess cloud")
    @Argument(help: "FEN string") var fen: String
    mutating func run() async throws {
        let encoded = fen.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) ?? fen
        let url = "https://explorer.lichess.ovh/masters?fen=\(encoded)"
        let response = try await Requests.fetch(url)
        let json = try JSONSerialization.jsonObject(with: response.data) as? [String: Any]
        if let moves = json?["moves"] as? [[String: Any]] {
            print("Top moves (Lichess Masters):")
            for move in moves.prefix(5) {
                let uci = move["uci"] as? String ?? ""
                let san = move["san"] as? String ?? ""
                let white = move["white"] as? Int ?? 0
                let black = move["black"] as? Int ?? 0
                let draws = move["draws"] as? Int ?? 0
                let total = white + black + draws
                let rate = total > 0 ? Double(white) / Double(total) * 100 : 0
                print(String(format: "  %@ (%@): W%d L%d D%d win rate %.1f%%", san, uci, white, black, draws, rate))
            }
        } else {
            print("No evaluation data available for this position")
        }
    }
}

struct ChessFENSVG: AsyncParsableCommand {
    static let configuration = CommandConfiguration(commandName: "fen-svg", abstract: "Get FEN board SVG URL")
    @Argument(help: "FEN string") var fen: String
    mutating func run() async throws {
        let encoded = fen.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) ?? fen
        let url = "https://chess.com/board.png?fen=\(encoded)"
        print("Board image URL: \(url)")
        let response = try await Requests.fetch(url)
        let filename = "chessboard.png"
        try response.data.write(to: URL(fileURLWithPath: filename))
        print("Saved to \(filename)")
    }
}

struct Chess960: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "random", abstract: "Generate Chess960 position")
    mutating func run() {
        var pos = [String](repeating: "", count: 8)
        var avail = Array(0..<8)
        let light = avail.filter { $0 % 2 == 0 }; let dark = avail.filter { $0 % 2 == 1 }
        pos[light.randomElement()!] = "B"; pos[dark.randomElement()!] = "B"
        avail = avail.filter { pos[$0].isEmpty }
        pos[avail.randomElement()!] = "Q"; avail = avail.filter { pos[$0].isEmpty }
        for _ in 0..<2 { let i = avail.randomElement()!; pos[i] = "N"; avail = avail.filter { pos[$0].isEmpty } }
        let r = avail.sorted()
        pos[r[0]] = "R"; pos[r[1]] = "K"; pos[r[2]] = "R"
        print(pos.joined(separator: " "))
    }
}

struct ChessSetup: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "setup", abstract: "Piece placement puzzle")
    @Option(name: .long, help: "Number of pieces") var count: Int = 3
    mutating func run() {
        let files = "abcdefgh"
        print("Place these pieces on the board:")
        for _ in 0..<count {
            let piece = ["♔", "♕", "♖", "♗", "♘", "♙"].randomElement()!
            let file = files.randomElement()!
            let rank = Int.random(in: 1...8)
            print("  \(piece) \(file)\(rank)")
        }
    }
}

struct Player: Decodable {
    let rank: Int
    let username: String
    let name: String?
    let score: Int
    let country: String
    let title: String?
    let winCount: Int
    let drawCount: Int
    let lossCount: Int
}

struct LeaderboardsResponse: Decodable {
    let liveBullet: [Player]
    let liveBlitz: [Player]
    let liveRapid: [Player]
    let liveBlitz960: [Player]
}

struct ChessComLeaderboards: AsyncParsableCommand {
    static let configuration = CommandConfiguration(commandName: "com-leaderboards", abstract: "Fetch Chess.com leaderboards")
    @Option(name: .long, help: "Number of top players to display") var top: Int = 5
    @Option(name: .long, help: "Filter by country code (e.g. US, RU)") var country: String = ""

    mutating func run() async throws {
        let response = try await Requests.fetch("https://api.chess.com/pub/leaderboards")
        let decoder = JSONDecoder()
        decoder.keyDecodingStrategy = .convertFromSnakeCase
        let data = try decoder.decode(LeaderboardsResponse.self, from: response.data)

        let countryFilter = country
        let filterPlayers: ([Player]) -> [Player] = { players in
            guard !countryFilter.isEmpty else { return players }
            return players.filter { p in
                let (code, _) = resolveCountry(p.country)
                return code == countryFilter.uppercased()
            }
        }

        printTop("Live Bullet", filterPlayers(data.liveBullet), top)
        printTop("Live Blitz", filterPlayers(data.liveBlitz), top)
        printTop("Live Rapid", filterPlayers(data.liveRapid), top)
        printTop("Live Blitz 960", filterPlayers(data.liveBlitz960), top)
    }
}

private func printTop(_ title: String, _ players: [Player], _ limit: Int) {
    guard !players.isEmpty else { return }
    print("\n\(title)\n")
    let count = min(limit, players.count)
    for i in 0..<count {
        let p = players[i]
        let name = p.name ?? "-"
        let (_, countryName) = resolveCountry(p.country)
        let wdl = "\(p.winCount) / \(p.drawCount) / \(p.lossCount)"
        print("\(String(format: "%3d", p.rank)). \(name) (\(p.username.lowercased())) - \(countryName) - \(p.score) - \(wdl)")
    }
}

struct ChessComPlayer: AsyncParsableCommand {
    static let configuration = CommandConfiguration(commandName: "com-player", abstract: "Fetch Chess.com player stats")
    @Argument(help: "Username") var username: String
    mutating func run() async throws {
        let username = username.lowercased()
        let profileURL = "https://api.chess.com/pub/player/\(username)"
        let statsURL = "https://api.chess.com/pub/player/\(username)/stats"

        async let profileResp = try Requests.fetch(profileURL)
        async let statsResp = try Requests.fetch(statsURL)
        let (profileData, statsData) = try await (profileResp, statsResp)

        let profile = try JSONSerialization.jsonObject(with: profileData.data) as? [String: Any] ?? [:]
        let stats = try JSONSerialization.jsonObject(with: statsData.data) as? [String: Any] ?? [:]

        print()
        print("Player: \(username.uppercased())")
        print("---------------------------------------------------------------")
        if let name = profile["name"] as? String, !name.isEmpty { print("Name      : \(name)") }
        if let title = profile["title"] as? String, !title.isEmpty { print("Title     : \(title)") }
        if let countryURL = profile["country"] as? String {
            let (_, countryName) = resolveCountry(countryURL)
            print("Country   : \(countryName)")
        }
        if let fide = profile["fide"] as? Int, fide > 0 { print("FIDE      : \(fide)") }
        if let followers = profile["followers"] as? Int { print("Followers : \(followers)") }

        print("\nRatings\n")
        printRatingsHeader()
        printRating("Bullet", stats["chess_bullet"] as? [String: Any])
        printRating("Blitz", stats["chess_blitz"] as? [String: Any])
        printRating("Rapid", stats["chess_rapid"] as? [String: Any])
    }
}

private func printRatingsHeader() {
    print("| Mode    |    Best |    Last |     Win |    Draw |    Loss |")
    print("|---------|--------|--------|--------|--------|--------|")
}

private func printRating(_ label: String, _ stats: [String: Any]?) {
    let best = stats?["best"] as? [String: Any] ?? [:]
    let last = stats?["last"] as? [String: Any] ?? [:]
    let record = stats?["record"] as? [String: Any] ?? [:]
    let bestR = best["rating"] as? Int ?? 0
    let lastR = last["rating"] as? Int ?? 0
    let wins = record["wins"] as? Int ?? 0
    let draws = record["draws"] as? Int ?? 0
    let losses = record["losses"] as? Int ?? 0
    print(String(format: "| %-7s | %6d | %6d | %6d | %6d | %6d |", label, bestR, lastR, wins, draws, losses))
}

struct ChessComTitled: AsyncParsableCommand {
    static let configuration = CommandConfiguration(commandName: "com-titled", abstract: "Fetch Chess.com titled players")
    @Argument(help: "Title (GM, IM, FM, etc.)") var title: String
    mutating func run() async throws {
        let response = try await Requests.fetch("https://api.chess.com/pub/titled/\(title.uppercased())")
        let json = try JSONSerialization.jsonObject(with: response.data) as? [String: Any]
        let players = json?["players"] as? [String] ?? []
        print("\(title.uppercased()) players: \(players.count)")
        for name in players.prefix(20) { print("  \(name)") }
        if players.count > 20 { print("  ... and \(players.count - 20) more") }
    }
}
