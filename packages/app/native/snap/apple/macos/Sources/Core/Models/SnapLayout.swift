import Foundation
import CoreGraphics

public struct SnapLayout: Codable, Identifiable {
    public let id: UUID
    public var name: String
    public var windows: [WindowRule]
    public var createdAt: Date
    public var updatedAt: Date

    public init(
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

    public mutating func update(_ block: (inout SnapLayout) -> Void) {
        block(&self)
        updatedAt = Date()
    }
}
