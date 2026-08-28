import Foundation

public enum ByteFormatter {
    public static func humanReadable(_ bytes: UInt64) -> String {
        let units = ["B", "KB", "MB", "GB", "TB"]
        let value = Double(bytes)
        var result = value
        var unitIndex = 0

        while result >= 1024 && unitIndex < units.count - 1 {
            result /= 1024
            unitIndex += 1
        }

        let unit = units[unitIndex]
        if unitIndex == 0 {
            return "\(Int(result)) \(unit)"
        }

        if result >= 100 {
            return "\(Int(result.rounded())) \(unit)"
        }

        return String(format: "%.1f \(unit)", result)
    }

    public static func usedOverTotal(usedBytes: UInt64, totalBytes: UInt64) -> String {
        "\(humanReadable(usedBytes)) / \(humanReadable(totalBytes))"
    }
}