import Foundation
import CoreGraphics

struct WindowRule: Codable, Identifiable, Hashable {
    let id: UUID
    var bundleIdentifier: String
    var title: String?
    var zone: NormalizedRect

    init(
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
