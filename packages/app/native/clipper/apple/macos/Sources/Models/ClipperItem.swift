import Foundation

struct ClipperItem: Identifiable, Codable {
    let id: UUID
    var content: String
    var contentType: ContentType
    var pinned: Bool
    let createdAt: Date
    var copiedCount: Int

    enum ContentType: String, Codable {
        case text
        case image
        case file
    }

    init(content: String, contentType: ContentType = .text) {
        self.id = UUID()
        self.content = content
        self.contentType = contentType
        self.pinned = false
        self.createdAt = Date()
        self.copiedCount = 1
    }
}
