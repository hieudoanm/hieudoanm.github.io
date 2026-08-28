import Foundation

public struct MemoryStats: Equatable, Sendable {
    public let usedBytes: UInt64
    public let totalBytes: UInt64
    public let activeBytes: UInt64
    public let wiredBytes: UInt64
    public let compressedBytes: UInt64

    public init(
        usedBytes: UInt64,
        totalBytes: UInt64,
        activeBytes: UInt64 = 0,
        wiredBytes: UInt64 = 0,
        compressedBytes: UInt64 = 0
    ) {
        self.usedBytes = usedBytes
        self.totalBytes = totalBytes
        self.activeBytes = activeBytes
        self.wiredBytes = wiredBytes
        self.compressedBytes = compressedBytes
    }

    public var usageRatio: Double {
        guard totalBytes > 0 else { return 0 }
        return Double(usedBytes) / Double(totalBytes)
    }

    public var usagePercentage: Double {
        usageRatio * 100
    }
}