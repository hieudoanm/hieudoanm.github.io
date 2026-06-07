import XCTest
@testable import hieudoanm

final class WebTests: XCTestCase {
    func testExtractVideoID_directID() {
        XCTAssertEqual(extractVideoID("dQw4w9WgXcQ"), "dQw4w9WgXcQ")
    }

    func testExtractVideoID_youtubeURL() {
        XCTAssertEqual(extractVideoID("https://www.youtube.com/watch?v=dQw4w9WgXcQ"), "dQw4w9WgXcQ")
    }

    func testExtractVideoID_youtuBeURL() {
        XCTAssertEqual(extractVideoID("https://youtu.be/dQw4w9WgXcQ"), "dQw4w9WgXcQ")
    }

    func testExtractVideoID_embedURL() {
        XCTAssertEqual(extractVideoID("https://www.youtube.com/embed/dQw4w9WgXcQ"), "dQw4w9WgXcQ")
    }

    func testExtractVideoID_noMatch() {
        XCTAssertEqual(extractVideoID("not a video"), "not a video")
    }

    func testExtractVideoID_shortID() {
        // 11-char input with no slashes or dots is treated as a direct ID
        XCTAssertEqual(extractVideoID("abcdefghijk"), "abcdefghijk")
    }

    func testFormatTime_seconds() {
        XCTAssertEqual(formatTime(0), "0:00")
        XCTAssertEqual(formatTime(5), "0:05")
        XCTAssertEqual(formatTime(65), "1:05")
    }

    func testFormatTime_minutes() {
        XCTAssertEqual(formatTime(120), "2:00")
        XCTAssertEqual(formatTime(3661), "1:01:01")
    }

    func testFormatTime_hours() {
        XCTAssertEqual(formatTime(3600), "1:00:00")
        XCTAssertEqual(formatTime(3661), "1:01:01")
        XCTAssertEqual(formatTime(7322), "2:02:02")
    }

    func testExtractInstagramShortcode_post() {
        let url = "https://www.instagram.com/p/ABC123/"
        XCTAssertEqual(extractInstagramShortcode(from: url), "ABC123")
    }

    func testExtractInstagramShortcode_reel() {
        let url = "https://www.instagram.com/reel/XYZ789/"
        XCTAssertEqual(extractInstagramShortcode(from: url), "XYZ789")
    }

    func testExtractInstagramShortcode_shortDomain() {
        let url = "https://instagr.am/p/DEF456/"
        XCTAssertEqual(extractInstagramShortcode(from: url), "DEF456")
    }

    func testExtractInstagramShortcode_noMatch() {
        let url = "https://example.com"
        XCTAssertNil(extractInstagramShortcode(from: url))
    }

    func testDecodeHTML() {
        XCTAssertEqual(decodeHTML("&amp;"), "&")
        XCTAssertEqual(decodeHTML("&lt;tag&gt;"), "<tag>")
        XCTAssertEqual(decodeHTML("&quot;quoted&quot;"), "\"quoted\"")
        XCTAssertEqual(decodeHTML("&#39;apos&#39;"), "'apos'")
        XCTAssertEqual(decodeHTML("&#x27;"), "'")
        XCTAssertEqual(decodeHTML("hello world"), "hello world")
        XCTAssertEqual(decodeHTML("multiple&amp;special&lt;chars&gt;"), "multiple&special<chars>")
    }

    func testTranscriptErrorDescriptions() {
        XCTAssertEqual(TranscriptError.noCaptions.errorDescription, "no captions found")
        XCTAssertEqual(TranscriptError.languageNotFound.errorDescription, "language not found")
    }

    func testShopifyResult() {
        let result = ShopifyResult(isShopify: true, isPlus: false, storeName: nil, via: "html")
        XCTAssertTrue(result.isShopify)
        XCTAssertFalse(result.isPlus)
        XCTAssertNil(result.storeName)
        XCTAssertEqual(result.via, "html")
    }

    func testCommandConfig() {
        XCTAssertEqual(WebCommand.configuration.commandName, "web")
        XCTAssertEqual(WebInstagram.configuration.commandName, "instagram")
        XCTAssertEqual(WebShopify.configuration.commandName, "shopify")
        XCTAssertEqual(WebSnapshot.configuration.commandName, "snapshot")
        XCTAssertEqual(WebWeather.configuration.commandName, "weather")
        XCTAssertEqual(WebYoutube.configuration.commandName, "youtube")
        XCTAssertEqual(WebYoutubeThumbnails.configuration.commandName, "thumbnails")
        XCTAssertEqual(WebYoutubeTranscript.configuration.commandName, "transcript")
    }
}
