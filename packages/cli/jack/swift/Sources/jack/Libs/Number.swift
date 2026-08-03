import Foundation

func addZero(n: Int) -> String {
    n >= 0 && n < 10 ? "0\(n)" : "\(n)"
}

func comma(n: Int) -> String {
    NumberFormat.comma(n)
}

func numberToEnglish(_ n: Int) -> String {
    if n == 0 { return "zero" }
    let ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
                 "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
                 "seventeen", "eighteen", "nineteen"]
    let tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"]
    if n < 0 { return "negative \(numberToEnglish(-n))" }
    if n < 20 { return ones[n] }
    if n < 100 { return tens[n / 10] + (n % 10 > 0 ? "-\(ones[n % 10])" : "") }
    if n < 1000 { return ones[n / 100] + " hundred" + (n % 100 > 0 ? " \(numberToEnglish(n % 100))" : "") }
    let suffixes = [("thousand", 1000), ("million", 1000000), ("billion", 1000000000)]
    for (name, divisor) in suffixes.reversed() {
        if n >= divisor {
            let remainder = n % divisor
            return numberToEnglish(n / divisor) + " " + name + (remainder > 0 ? " \(numberToEnglish(remainder))" : "")
        }
    }
    return "\(n)"
}

func convertChunk(_ n: Int, ones: [String], tens: [String]) -> String {
    if n == 0 { return "" }
    let h = n / 100, r = n % 100
    var result = ""
    if h > 0 { result += ones[h] + " hundred" }
    if r > 0 {
        if !result.isEmpty { result += " " }
        if r < 20 { result += ones[r] }
        else { result += tens[r / 10] + (r % 10 > 0 ? "-\(ones[r % 10])" : "") }
    }
    return result
}

struct NumberFormat {
    static func comma(_ value: Int) -> String {
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        formatter.locale = Locale(identifier: "en_US")
        return formatter.string(from: NSNumber(value: value)) ?? "\(value)"
    }

    static func comma(_ value: Double) -> String {
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        formatter.locale = Locale(identifier: "en_US")
        formatter.minimumFractionDigits = 2
        formatter.maximumFractionDigits = 2
        return formatter.string(from: NSNumber(value: value)) ?? "\(value)"
    }

    static func zeroPad(_ value: Int, width: Int) -> String {
        String(format: "%0\(width)d", value)
    }

    static func formatBytes(_ bytes: UInt64) -> String {
        let units = ["B", "KB", "MB", "GB", "TB"]
        var value = Double(bytes)
        var unitIndex = 0
        while value >= 1024 && unitIndex < units.count - 1 {
            value /= 1024
            unitIndex += 1
        }
        return String(format: "%.1f %@", value, units[unitIndex])
    }

    static func formatDuration(_ seconds: TimeInterval) -> String {
        let totalSeconds = Int(seconds)
        let hours = totalSeconds / 3600
        let minutes = (totalSeconds % 3600) / 60
        let secs = totalSeconds % 60
        if hours > 0 {
            return String(format: "%d:%02d:%02d", hours, minutes, secs)
        } else {
            return String(format: "%d:%02d", minutes, secs)
        }
    }
}
