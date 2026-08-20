import Foundation
import CoreGraphics

public struct WindowRule: Codable, Identifiable, Hashable {
    public let id: UUID
    public var bundleIdentifier: String
    public var title: String?
    public var zone: NormalizedRect

    public init(
        id: UUID = UUID(),
        bundleIdentifier: String,
        title: String? = nil,
        zone: NormalizedRect
    ) {
        self.id = id
        self.bundleIdentifier = bundleIdentifier
        self.title = title
        self.zone = zone
    }
}
