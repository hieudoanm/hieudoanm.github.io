import Foundation
import CoreGraphics

struct SnapLayout: Codable, Identifiable {
    let id: UUID
    var name: String
    var windows: [WindowRule]
    var createdAt: Date
    var updatedAt: Date

    init(
        id: UUID = UUID(),
        name: String,
        windows: [WindowRule] = [],
        createdAt: Date = Date(),
        updatedAt: Date = Date()
    ) {
        self.id = id
        self.name = name
        self.windows = windows
        self.createdAt = createdAt
        self.updatedAt = updatedAt
    }

    mutating func update(_ block: (inout SnapLayout) -> Void) {
        block(&self)
        updatedAt = Date()
    }
}
