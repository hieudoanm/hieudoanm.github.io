import XCTest
@testable import hieudoanm

final class CryptoTests: XCTestCase {
    // MARK: - UUID

    func testUUIDv4_format() {
        let uuid = Foundation.UUID().uuidString
        let pattern = try! NSRegularExpression(pattern: "^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$", options: [.caseInsensitive])
        let range = NSRange(location: 0, length: uuid.count)
        XCTAssertNotNil(pattern.firstMatch(in: uuid, options: [], range: range))
    }

    func testUUIDv4_uniqueness() {
        let uuids = (0..<100).map { _ in Foundation.UUID().uuidString }
        let unique = Set(uuids)
        XCTAssertEqual(unique.count, 100)
    }

    func testUUIDv7_format() {
        let uuid = generateUUIDv7()
        let pattern = try! NSRegularExpression(pattern: "^[0-9A-F]{8}-[0-9A-F]{4}-7[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$", options: [.caseInsensitive])
        let range = NSRange(location: 0, length: uuid.count)
        XCTAssertNotNil(pattern.firstMatch(in: uuid, options: [], range: range), "UUID v7 format mismatch: \(uuid)")
    }

    func testUUIDv7_uniqueness() {
        let uuids = (0..<100).map { _ in generateUUIDv7() }
        let unique = Set(uuids)
        XCTAssertEqual(unique.count, 100)
    }

    func testUUIDv7_timestampBased() {
        let first = generateUUIDv7()
        let second = generateUUIDv7()
        XCTAssertNotEqual(first, second)
    }

    // MARK: - Base64URL

    func testBase64URLEncode_standard() {
        let data = Data("hello".utf8)
        let encoded = base64URLEncode(data)
        XCTAssertEqual(encoded, "aGVsbG8")
    }

    func testBase64URLEncode_paddingStripped() {
        let data = Data("a".utf8)
        let encoded = base64URLEncode(data)
        XCTAssertFalse(encoded.hasSuffix("="))
    }

    func testBase64URLEncode_urlSafe() {
        let data = Data([0x3e, 0x3e]) // >> in standard base64
        let encoded = base64URLEncode(data)
        XCTAssertFalse(encoded.contains("+"))
        XCTAssertFalse(encoded.contains("/"))
    }

    func testBase64URLDecode_roundtrip() {
        let original = "test data with spaces and unicode: ñ"
        let encoded = base64URLEncode(Data(original.utf8))
        let decoded = base64URLDecode(encoded)
        XCTAssertEqual(String(data: decoded, encoding: .utf8), original)
    }

    func testBase64URLDecode_empty() {
        let decoded = base64URLDecode("")
        XCTAssertTrue(decoded.isEmpty)
    }

    // MARK: - Base32

    func testBase32Decode_rfc4648() throws {
        // RFC 4648 test vectors
        XCTAssertEqual(try base32Decode(""), Data())
        XCTAssertEqual(try base32Decode("MY======"), Data("f".utf8))
        XCTAssertEqual(try base32Decode("MZXQ===="), Data("fo".utf8))
        XCTAssertEqual(try base32Decode("MZXW6==="), Data("foo".utf8))
        XCTAssertEqual(try base32Decode("MZXW6YQ="), Data("foob".utf8))
        XCTAssertEqual(try base32Decode("MZXW6YTB"), Data("fooba".utf8))
        XCTAssertEqual(try base32Decode("MZXW6YTBOI======"), Data("foobar".utf8))
    }

    func testBase32Decode_lowercase() throws {
        let decoded = try base32Decode("mzxw6ytboi======")
        XCTAssertEqual(String(data: decoded, encoding: .utf8), "foobar")
    }

    // MARK: - HMAC-SHA256

    func testHMACSHA256_deterministic() throws {
        let sig1 = try hmacSHA256(key: "secret", message: "test")
        let sig2 = try hmacSHA256(key: "secret", message: "test")
        XCTAssertEqual(sig1, sig2)
    }

    func testHMACSHA256_differentKeys() throws {
        let sig1 = try hmacSHA256(key: "key1", message: "test")
        let sig2 = try hmacSHA256(key: "key2", message: "test")
        XCTAssertNotEqual(sig1, sig2)
    }

    // MARK: - CryptoError

    func testCryptoError_descriptions() {
        XCTAssertEqual(CryptoError.fileNotFound("/x").description, "File not found: /x")
        XCTAssertEqual(CryptoError.invalidInput.description, "Invalid input")
        XCTAssertEqual(CryptoError.invalidKey.description, "Invalid key (must be 64 hex chars)")
        XCTAssertEqual(CryptoError.invalidJWT.description, "Invalid JWT format")
        XCTAssertEqual(CryptoError.unknownAlgorithm("md6").description, "Unknown algorithm: md6")
        XCTAssertEqual(CryptoError.missingArgument("key").description, "Missing argument: key")
        XCTAssertEqual(CryptoError.qrGenerationFailed.description, "QR code generation failed")
        XCTAssertEqual(CryptoError.randomGenerationFailed.description, "Random byte generation failed")
        XCTAssertEqual(CryptoError.encryptionFailed.description, "Encryption failed")
        XCTAssertEqual(CryptoError.decryptionFailed.description, "Decryption failed")
        XCTAssertEqual(CryptoError.platformUnsupported.description, "Feature not supported on this platform")
    }
}
