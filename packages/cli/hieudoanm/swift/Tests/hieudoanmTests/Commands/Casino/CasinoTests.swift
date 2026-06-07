import XCTest
@testable import hieudoanm

final class CasinoTests: XCTestCase {
    // MARK: - PokerCard

    func testPokerCard_equality() {
        let a = PokerCard(rank: 14, suit: "h")
        let b = PokerCard(rank: 14, suit: "h")
        let c = PokerCard(rank: 13, suit: "h")
        XCTAssertEqual(a, b)
        XCTAssertNotEqual(a, c)
    }

    // MARK: - CreateDeck

    func testCreateDeck_count() {
        let deck = createDeck()
        XCTAssertEqual(deck.count, 52)
    }

    func testCreateDeck_containsAllValues() {
        let deck = createDeck()
        for v in 1...13 {
            let count = deck.filter { $0 == v }.count
            XCTAssertEqual(count, 4, "Expected 4 copies of \(v), got \(count)")
        }
    }

    // MARK: - CreatePokerDeck

    func testCreatePokerDeck_count() {
        let deck = createPokerDeck()
        XCTAssertEqual(deck.count, 52)
    }

    func testCreatePokerDeck_suits() {
        let deck = createPokerDeck()
        for suit in ["h", "d", "c", "s"] {
            let count = deck.filter { $0.suit == suit }.count
            XCTAssertEqual(count, 13, "Expected 13 cards in suit \(suit)")
        }
    }

    // MARK: - RankMapSuit

    func testRankMapSuit() {
        XCTAssertEqual(rankMapSuit("h"), "h")
        XCTAssertEqual(rankMapSuit("d"), "d")
        XCTAssertEqual(rankMapSuit("c"), "c")
        XCTAssertEqual(rankMapSuit("s"), "s")
        XCTAssertEqual(rankMapSuit("H"), "h")
        XCTAssertNil(rankMapSuit("x"))
        XCTAssertNil(rankMapSuit(""))
    }

    // MARK: - ParseCards

    func testParseCards_standard() {
        let cards = parseCards("Ah Kd Qh Js 10c")
        XCTAssertEqual(cards.count, 5)
        XCTAssertEqual(cards[0], PokerCard(rank: 14, suit: "h"))
        XCTAssertEqual(cards[1], PokerCard(rank: 13, suit: "d"))
        XCTAssertEqual(cards[4], PokerCard(rank: 10, suit: "c"))
    }

    func testParseCards_royalFlush() {
        let cards = parseCards("Ah Kh Qh Jh 10h")
        XCTAssertEqual(cards.count, 5)
    }

    func testParseCards_invalid() {
        XCTAssertEqual(parseCards("").count, 0)
        XCTAssertEqual(parseCards("Xx Yy").count, 0)
    }

    // MARK: - EvaluateHand

    func testEvaluateHand_royalFlush() {
        let cards = parseCards("Ah Kh Qh Jh 10h")
        let (rank, desc) = evaluateHand(cards)
        XCTAssertEqual(rank, 9)
        XCTAssertEqual(desc, "Royal Flush")
    }

    func testEvaluateHand_straightFlush() {
        let cards = parseCards("9h 8h 7h 6h 5h")
        let (rank, desc) = evaluateHand(cards)
        XCTAssertEqual(rank, 8)
        XCTAssertEqual(desc, "Straight Flush")
    }

    func testEvaluateHand_fourOfAKind() {
        let cards = parseCards("Ah Ac Ad As Kh")
        let (rank, desc) = evaluateHand(cards)
        XCTAssertEqual(rank, 7)
        XCTAssertEqual(desc, "Four of a Kind")
    }

    func testEvaluateHand_fullHouse() {
        let cards = parseCards("Ah Ac Ad Kh Ks")
        let (rank, desc) = evaluateHand(cards)
        XCTAssertEqual(rank, 6)
        XCTAssertEqual(desc, "Full House")
    }

    func testEvaluateHand_flush() {
        let cards = parseCards("Ah 10h 7h 4h 2h")
        let (rank, desc) = evaluateHand(cards)
        XCTAssertEqual(rank, 5)
        XCTAssertEqual(desc, "Flush")
    }

    func testEvaluateHand_straight() {
        let cards = parseCards("9h 8d 7c 6s 5h")
        let (rank, desc) = evaluateHand(cards)
        XCTAssertEqual(rank, 4)
        XCTAssertEqual(desc, "Straight")
    }

    func testEvaluateHand_wheelStraight() {
        let cards = parseCards("Ah 2d 3c 4s 5h")
        let (rank, desc) = evaluateHand(cards)
        XCTAssertEqual(rank, 4)
        XCTAssertEqual(desc, "Straight")
    }

    func testEvaluateHand_threeOfAKind() {
        let cards = parseCards("Ah Ac Ad Ks Qh")
        let (rank, desc) = evaluateHand(cards)
        XCTAssertEqual(rank, 3)
        XCTAssertEqual(desc, "Three of a Kind")
    }

    func testEvaluateHand_twoPair() {
        let cards = parseCards("Ah Ac Kd Ks Qh")
        let (rank, desc) = evaluateHand(cards)
        XCTAssertEqual(rank, 2)
        XCTAssertEqual(desc, "Two Pair")
    }

    func testEvaluateHand_onePair() {
        let cards = parseCards("Ah Ac Kd Qs Jh")
        let (rank, desc) = evaluateHand(cards)
        XCTAssertEqual(rank, 1)
        XCTAssertEqual(desc, "One Pair")
    }

    func testEvaluateHand_highCard() {
        let cards = parseCards("Ah Kd Qc Js 9h")
        let (rank, desc) = evaluateHand(cards)
        XCTAssertEqual(rank, 0)
        XCTAssertEqual(desc, "High Card")
    }

    func testEvaluateHand_invalid() {
        let (rank, desc) = evaluateHand([])
        XCTAssertEqual(rank, 0)
        XCTAssertEqual(desc, "Invalid")
    }
}
