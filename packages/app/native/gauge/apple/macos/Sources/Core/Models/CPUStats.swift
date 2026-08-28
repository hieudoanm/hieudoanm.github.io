import Foundation

public struct CPUStats: Equatable, Sendable {
    public let usage: Double

    public init(usage: Double) {
        self.usage = min(max(usage, 0), 100)
    }
}