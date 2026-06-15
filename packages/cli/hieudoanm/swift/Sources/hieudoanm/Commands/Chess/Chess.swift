import Foundation
import ArgumentParser

struct ChessCommand: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "chess",
        abstract: "Chess tools",
        subcommands: [
            ChessElo.self, ChessFENEval.self, ChessFENSVG.self,
            Chess960.self, ChessSetup.self, ChessComPlayer.self,
            ChessComLeaderboards.self, ChessComTitled.self,
        ]
    )
    mutating func run() {}
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

struct ChessComPlayer: AsyncParsableCommand {
    static let configuration = CommandConfiguration(commandName: "com-player", abstract: "Fetch Chess.com player stats")
    @Argument(help: "Username") var username: String
    mutating func run() async throws {
        let response = try await Requests.fetch("https://api.chess.com/pub/player/\(username)/stats")
        let json = try JSONSerialization.jsonObject(with: response.data) as? [String: Any]
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

struct ChessComLeaderboards: AsyncParsableCommand {
    static let configuration = CommandConfiguration(commandName: "com-leaderboards", abstract: "Fetch Chess.com leaderboards")
    @Option(name: .long, help: "Type: daily, rapid, blitz, bullet") var type: String = "daily"
    mutating func run() async throws {
        let response = try await Requests.fetch("https://api.chess.com/pub/leaderboards")
        let json = try JSONSerialization.jsonObject(with: response.data) as? [String: Any]
        guard let entries = json?[type] as? [[String: Any]] else {
            print("No leaderboard data for '\(type)'"); return
        }
        print("\(type.uppercased()) Leaderboard:")
        for (i, entry) in entries.prefix(10).enumerated() {
            let username = entry["username"] as? String ?? ""
            let rating = entry["score"] as? Int ?? entry["rating"] as? Int ?? 0
            let title = entry["title"] as? String ?? ""
            print("  \(i + 1). \(username)\(title.isEmpty ? "" : " (\(title))") - \(rating)")
        }
    }
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
