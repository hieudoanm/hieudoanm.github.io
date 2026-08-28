import Foundation

public enum UsageThreshold: Sendable {
    case normal
    case elevated
    case high
}

public enum MemoryPressureStatus: String, Sendable {
    case normal
    case elevated
    case high
    case unknown
}

public enum ThresholdMonitor {
    public static func status(for percentage: Double) -> UsageThreshold {
        if percentage >= 90 {
            return .high
        } else if percentage >= 70 {
            return .elevated
        } else {
            return .normal
        }
    }

    public static func status(for stats: MemoryStats) -> MemoryPressureStatus {
        switch status(for: stats.usagePercentage) {
        case .normal: return .normal
        case .elevated: return .elevated
        case .high: return .high
        }
    }

    public static func status(for stats: DiskStats) -> UsageThreshold {
        status(for: stats.usagePercentage)
    }
}