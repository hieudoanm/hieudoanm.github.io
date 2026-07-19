import XCTest
@testable import hieudoanm

final class ChessTests: XCTestCase {
    func testResolveCountry_knownCode() {
        let (code, name) = resolveCountry("https://api.chess.com/pub/country/US")
        XCTAssertEqual(code, "US")
        XCTAssertEqual(name, "United States")
    }

    func testResolveCountry_lowercase() {
        let (code, name) = resolveCountry("https://api.chess.com/pub/country/vn")
        XCTAssertEqual(code, "VN")
        XCTAssertEqual(name, "Vietnam")
    }

    func testResolveCountry_trailingSlash() {
        let (code, name) = resolveCountry("https://api.chess.com/pub/country/RU/")
        XCTAssertEqual(code, "RU")
        XCTAssertEqual(name, "Russia")
    }

    func testResolveCountry_emptyURL() {
        let (code, name) = resolveCountry("")
        XCTAssertEqual(code, "-")
        XCTAssertEqual(name, "-")
    }

    func testResolveCountry_unknownCode() {
        let (code, name) = resolveCountry("https://api.chess.com/pub/country/XX")
        XCTAssertEqual(code, "XX")
        XCTAssertEqual(name, "-")
    }

    func testPlayer_decoding() throws {
        let json = """
        {
            "rank": 1,
            "username": "testuser",
            "name": "Test User",
            "score": 2500,
            "country": "https://api.chess.com/pub/country/US",
            "title": "GM",
            "win_count": 100,
            "draw_count": 20,
            "loss_count": 30
        }
        """
        let data = try XCTUnwrap(json.data(using: .utf8))
        let decoder = JSONDecoder()
        decoder.keyDecodingStrategy = .convertFromSnakeCase
        let player = try decoder.decode(Player.self, from: data)
        XCTAssertEqual(player.rank, 1)
        XCTAssertEqual(player.username, "testuser")
        XCTAssertEqual(player.name, "Test User")
        XCTAssertEqual(player.score, 2500)
        XCTAssertEqual(player.country, "https://api.chess.com/pub/country/US")
        XCTAssertEqual(player.title, "GM")
        XCTAssertEqual(player.winCount, 100)
        XCTAssertEqual(player.drawCount, 20)
        XCTAssertEqual(player.lossCount, 30)
    }

    func testLeaderboardsResponse_decoding() throws {
        let json = """
        {
            "live_bullet": [],
            "live_blitz": [
                {
                    "rank": 1,
                    "username": "blitzstar",
                    "name": "Blitz Star",
                    "score": 2800,
                    "country": "https://api.chess.com/pub/country/RU",
                    "title": "GM",
                    "win_count": 200,
                    "draw_count": 30,
                    "loss_count": 50
                }
            ],
            "live_rapid": [],
            "live_blitz960": []
        }
        """
        let data = try XCTUnwrap(json.data(using: .utf8))
        let decoder = JSONDecoder()
        decoder.keyDecodingStrategy = .convertFromSnakeCase
        let response = try decoder.decode(LeaderboardsResponse.self, from: data)
        XCTAssertEqual(response.liveBullet.count, 0)
        XCTAssertEqual(response.liveBlitz.count, 1)
        XCTAssertEqual(response.liveBlitz.first?.username, "blitzstar")
        XCTAssertEqual(response.liveRapid.count, 0)
        XCTAssertEqual(response.liveBlitz960.count, 0)
    }
}
