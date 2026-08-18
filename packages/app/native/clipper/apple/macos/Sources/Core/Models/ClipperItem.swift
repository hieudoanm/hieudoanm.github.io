import Foundation

public struct ClipperItem: Identifiable, Codable {
    public let id: UUID
    public var content: String
    public var contentType: ContentType
    public var pinned: Bool
    public let createdAt: Date
    public var copiedCount: Int

    public enum ContentType: String, Codable {
        case text
        case image
        case file
    }

    public init(content: String, contentType: ContentType = .text) {
        self.id = UUID()
        self.content = content
        self.contentType = contentType
        self.pinned = false
        self.createdAt = Date()
        self.copiedCount = 1
    }
}
