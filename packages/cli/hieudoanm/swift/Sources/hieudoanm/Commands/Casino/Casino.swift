import Foundation
import ArgumentParser

struct CasinoCommand: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "casino",
        abstract: "Casino games and simulations",
        subcommands: [CasinoCoin.self, CasinoDice.self, CasinoRoulette.self, CasinoSlots.self, CasinoBaccarat.self, CasinoBlackjack.self, CasinoPoker.self]
    )
    mutating func run() {}
}

struct CasinoCoin: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "coin", abstract: "Flip a coin")
    @Option(name: .shortAndLong, help: "Number of flips") var count: Int = 1
    mutating func run() {
        for _ in 0..<count {
            print(Bool.random() ? "Heads" : "Tails")
        }
    }
}

struct CasinoDice: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "dice", abstract: "Roll dice")
    @Option(name: .shortAndLong, help: "Number of dice") var count: Int = 1
    @Option(name: .shortAndLong, help: "Number of sides") var sides: Int = 6
    mutating func run() {
        let rolls = (0..<count).map { _ in Int.random(in: 1...sides) }
        let total = rolls.reduce(0, +)
        print("Rolled: \(rolls.map(String.init).joined(separator: ", "))")
        print("Total: \(total)")
    }
}

struct CasinoRoulette: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "roulette", abstract: "Roulette spin")
    @Option(name: .long, help: "Bet type: number, red, black, odd, even") var bet: String = "number"
    @Option(name: .long, help: "Number bet (0-36)") var number: Int?
    mutating func run() {
        let wheel = 0...36
        let result = wheel.randomElement()!
        let reds: Set<Int> = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36]
        let resultColor = result == 0 ? "green" : reds.contains(result) ? "red" : "black"
        let resultParity = result == 0 ? "none" : result % 2 == 0 ? "even" : "odd"
        print("Spin: \(result) (\(resultColor), \(resultParity))")
        switch bet.lowercased() {
        case "number":
            if let n = number, n == result { print("Win!") } else { print("Lose") }
        case "red": print(resultColor == "red" ? "Win!" : "Lose")
        case "black": print(resultColor == "black" ? "Win!" : "Lose")
        case "odd": print(resultParity == "odd" ? "Win!" : "Lose")
        case "even": print(resultParity == "even" ? "Win!" : "Lose")
        default: print("Unknown bet type")
        }
    }
}

struct CasinoSlots: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "slots", abstract: "Slot machine")
    @Option(name: .shortAndLong, help: "Bet amount") var bet: Int = 1
    mutating func run() {
        let symbols = ["🍒", "🍋", "🍊", "🍇", "🔔", "💎", "7️⃣", "⭐"]
        let reels = (0..<3).map { _ in symbols.randomElement()! }
        print("| \(reels.joined(separator: " | ")) |")
        let unique = Set(reels)
        if unique.count == 1 {
            let multiplier = reels[0] == "7️⃣" || reels[0] == "💎" ? 10 : 5
            print("Jackpot! Won \(bet * multiplier)")
        } else if unique.count == 2 {
            print("Pair! Won \(bet * 2)")
        } else {
            print("No win")
        }
    }
}

struct CasinoBaccarat: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "baccarat", abstract: "Simplified baccarat")
    mutating func run() {
        func cardValue(_ card: Int) -> Int { card > 10 ? 0 : card }
        func drawCard() -> Int { Int.random(in: 1...13) }
        let player = (drawCard(), drawCard())
        let banker = (drawCard(), drawCard())
        var pTotal = (cardValue(player.0) + cardValue(player.1)) % 10
        var bTotal = (cardValue(banker.0) + cardValue(banker.1)) % 10
        if pTotal <= 5 { pTotal = (pTotal + cardValue(drawCard())) % 10 }
        if bTotal <= 5 { bTotal = (bTotal + cardValue(drawCard())) % 10 }
        print("Player: \(player.0) \(player.1) = \(pTotal)")
        print("Banker: \(banker.0) \(banker.1) = \(bTotal)")
        if pTotal > bTotal { print("Player wins") }
        else if bTotal > pTotal { print("Banker wins") }
        else { print("Tie") }
    }
}

struct CasinoBlackjack: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "blackjack", abstract: "Blackjack simulation")
    @Flag(name: .long, help: "Dealer stands on soft 17") var s17 = false
    mutating func run() {
        var deck = createDeck()
        deck.shuffle()
        var idx = 0
        func deal() -> Int { let c = deck[idx]; idx += 1; return c }
        var player: [Int] = [deal(), deal()]
        var dealer: [Int] = [deal(), deal()]
        func handValue(_ cards: [Int]) -> Int {
            var total = 0, aces = 0
            for c in cards { if c == 1 { aces += 1; total += 11 } else { total += min(c, 10) } }
            while total > 21 && aces > 0 { total -= 10; aces -= 1 }
            return total
        }
        func cardStr(_ c: Int) -> String {
            switch c { case 1: return "A"; case 11: return "J"; case 12: return "Q"; case 13: return "K"; default: return "\(c)" }
        }
        func cardsStr(_ cards: [Int]) -> String { cards.map(cardStr).joined(separator: " ") }
        // Player turn
        var pv = handValue(player)
        while pv < 17 {
            let c = deal(); player.append(c); pv = handValue(player)
            print("Player hits: \(cardStr(c)) -> \(cardsStr(player)) = \(pv)")
        }
        if pv > 21 { print("Player busts! \(cardsStr(player)) = \(pv)"); return }
        // Dealer turn
        var dv = handValue(dealer)
        let standValue = s17 ? 17 : 18
        while dv < standValue || (!s17 && dv == 17 && dealer.contains(1)) {
            let c = deal(); dealer.append(c); dv = handValue(dealer)
            print("Dealer hits: \(cardStr(c)) -> \(cardsStr(dealer)) = \(dv)")
        }
        if dv > 21 { print("Dealer busts! \(cardsStr(dealer)) = \(dv)"); return }
        print("Player: \(cardsStr(player)) = \(pv)")
        print("Dealer: \(cardsStr(dealer)) = \(dv)")
        if pv > dv { print("Player wins") } else if dv > pv { print("Dealer wins") } else { print("Push") }
    }
}

func createDeck() -> [Int] {
    var deck: [Int] = []
    for _ in 0..<4 { for v in 1...13 { deck.append(v) } }
    return deck
}

struct CasinoPoker: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "poker", abstract: "Poker hand evaluation and Monte Carlo odds")
    @Argument(help: "Cards (e.g. 'Ah Kd Qh Js 10c')") var hand: String
    @Option(name: .shortAndLong, help: "Number of Monte Carlo simulations") var sims: Int = 10000
    @Option(name: .shortAndLong, help: "Number of opponents") var opponents: Int = 1
    mutating func run() {
        let cards = parseCards(hand)
        guard cards.count == 5 else { print("Need exactly 5 cards"); return }
        let (rank, desc) = evaluateHand(cards)
        print("Hand: \(hand)")
        print("Rank: \(desc) (rank \(rank))")
        let deck = createPokerDeck().filter { !cards.contains($0) }
        var wins = 0, losses = 0, ties = 0
        for _ in 0..<sims {
            var remaining = deck.shuffled()
            var opponentsBest = 0
            for _ in 0..<opponents {
                let oppHand = [remaining.removeFirst(), remaining.removeFirst()]
                let (r, _) = evaluateHand(oppHand)
                opponentsBest = max(opponentsBest, r)
            }
            if rank > opponentsBest { wins += 1 }
            else if rank < opponentsBest { losses += 1 }
            else { ties += 1 }
        }
        let total = Double(wins + losses + ties)
        print(String(format: "Win:  %.1f%% (\(wins)/\(Int(total)))", Double(wins) / total * 100))
        print(String(format: "Lose: %.1f%% (\(losses)/\(Int(total)))", Double(losses) / total * 100))
        print(String(format: "Tie:  %.1f%% (\(ties)/\(Int(total)))", Double(ties) / total * 100))
    }
}

struct PokerCard: Equatable {
    let rank: Int
    let suit: String
}

func createPokerDeck() -> [PokerCard] {
    let suits = ["h", "d", "c", "s"]
    var deck: [PokerCard] = []
    for s in suits { for r in 2...14 { deck.append(PokerCard(rank: r, suit: s)) } }
    return deck
}

func parseCards(_ s: String) -> [PokerCard] {
    let parts = s.split(separator: " ").map(String.init)
    let rankMap: [Character: Int] = ["2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"1":10,"J":11,"Q":12,"K":13,"A":14]
    return parts.compactMap { part in
        let chars = Array(part.uppercased())
        guard chars.count >= 2 else { return nil }
        if chars[0] == "1" {
            guard let r = rankMap["1"], let s = rankMapSuit(String(chars[2])) else { return nil }
            return PokerCard(rank: r, suit: s)
        }
        guard let r = rankMap[chars[0]], let s = rankMapSuit(String(chars[1])) else { return nil }
        return PokerCard(rank: r, suit: s)
    }
}

func rankMapSuit(_ s: String) -> String? {
    switch s.lowercased() { case "h": return "h"; case "d": return "d"; case "c": return "c"; case "s": return "s"; default: return nil }
}

func evaluateHand(_ cards: [PokerCard]) -> (Int, String) {
    guard cards.count == 5 else { return (0, "Invalid") }
    let sorted = cards.sorted { $0.rank > $1.rank }
    let ranks = sorted.map { $0.rank }
    let suits = sorted.map { $0.suit }
    let isFlush = Set(suits).count == 1
    let isStraight: Bool = {
        if ranks[0] == 14 && ranks[1] == 5 && ranks[2] == 4 && ranks[3] == 3 && ranks[4] == 2 { return true }
        for i in 0..<4 { if ranks[i] - ranks[i+1] != 1 { return false } }
        return true
    }()
    let freq = Dictionary(grouping: ranks, by: { $0 }).mapValues(\.count)
    let groups = freq.sorted { $0.value > $1.value || ($0.value == $1.value && $0.key > $1.key) }
    let counts = groups.map { $0.value }
    _ = groups.map { $0.key }

    if isFlush && isStraight {
        if ranks[0] == 14 && !(ranks[4] == 2 && ranks[3] == 3) { return (9, "Royal Flush") }
        return (8, "Straight Flush")
    }
    if counts == [4, 1] { return (7, "Four of a Kind") }
    if counts == [3, 2] { return (6, "Full House") }
    if isFlush { return (5, "Flush") }
    if isStraight { return (4, "Straight") }
    if counts == [3, 1, 1] { return (3, "Three of a Kind") }
    if counts == [2, 2, 1] { return (2, "Two Pair") }
    if counts == [2, 1, 1, 1] { return (1, "One Pair") }
    return (0, "High Card")
}
