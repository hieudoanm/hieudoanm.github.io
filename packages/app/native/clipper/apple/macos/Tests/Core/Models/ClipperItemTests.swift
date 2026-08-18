import Testing
import Foundation
@testable import ClipperCore

@Suite("ClipperItem")
struct ClipperItemTests {

    @Test("init with defaults")
    func initWithDefaults() {
        let item = ClipperItem(content: "hello")
        #expect(item.content == "hello")
        #expect(item.contentType == .text)
        #expect(item.pinned == false)
        #expect(item.copiedCount == 1)
    }

    @Test("init with type")
    func initWithType() {
        let item = ClipperItem(content: "file.txt", contentType: .file)
        #expect(item.contentType == .file)
    }

    @Test("ContentType codable roundtrip")
    func contentTypeCodable() throws {
        for type: ClipperItem.ContentType in [.text, .image, .file] {
            let data = try JSONEncoder().encode(type)
            let decoded = try JSONDecoder().decode(ClipperItem.ContentType.self, from: data)
            #expect(decoded == type)
        }
    }

    @Test("Codable roundtrip preserves all fields")
    func codableRoundtrip() throws {
        let item = ClipperItem(content: "test content", contentType: .image)
        let data = try JSONEncoder().encode(item)
        let decoded = try JSONDecoder().decode(ClipperItem.self, from: data)
        #expect(decoded.content == item.content)
        #expect(decoded.contentType == item.contentType)
        #expect(decoded.pinned == item.pinned)
        #expect(decoded.copiedCount == item.copiedCount)
    }

    @Test("id is unique per instance")
    func uniqueIds() {
        let a = ClipperItem(content: "same")
        let b = ClipperItem(content: "same")
        #expect(a.id != b.id)
    }
}
