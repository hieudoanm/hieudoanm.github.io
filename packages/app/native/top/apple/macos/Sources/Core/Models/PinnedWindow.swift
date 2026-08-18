import Foundation

public struct PinnedWindow: Identifiable, Codable, Hashable {
    public let id: UUID
    public let appIdentifier: AppIdentifier
    public let pinnedAt: Date

    public init(appIdentifier: AppIdentifier, pinnedAt: Date = Date()) {
        self.id = UUID()
        self.appIdentifier = appIdentifier
        self.pinnedAt = pinnedAt
    }
}
