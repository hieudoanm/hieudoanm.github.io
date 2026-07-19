import Foundation
#if os(macOS) || os(iOS) || os(tvOS) || os(watchOS)
import Darwin
#else
import Glibc
#endif

private let useColor: Bool = isatty(STDOUT_FILENO) != 0

func colorize(_ code: String, _ text: String) -> String {
    guard useColor, let ansi = ANSIColor(rawValue: "\u{1B}[\(code)m") else { return text }
    return ANSIColor.colorize(text, ansi)
}

func green(_ s: String) -> String { useColor ? "\u{001B}[32m\(s)\u{001B}[0m" : s }
func red(_ s: String) -> String { useColor ? "\u{001B}[31m\(s)\u{001B}[0m" : s }
func yellow(_ s: String) -> String { useColor ? "\u{001B}[33m\(s)\u{001B}[0m" : s }
func cyan(_ s: String) -> String { useColor ? "\u{001B}[36m\(s)\u{001B}[0m" : s }
func blue(_ s: String) -> String { useColor ? "\u{001B}[34m\(s)\u{001B}[0m" : s }
func dim(_ s: String) -> String { useColor ? "\u{001B}[2m\(s)\u{001B}[0m" : s }
func gray(_ s: String) -> String { useColor ? "\u{001B}[90m\(s)\u{001B}[0m" : s }
func bold(_ s: String) -> String { useColor ? "\u{001B}[1m\(s)\u{001B}[0m" : s }

enum ANSIColor: String {
    case reset = "\u{1B}[0m"
    case bold = "\u{1B}[1m"
    case dim = "\u{1B}[2m"
    case red = "\u{1B}[31m"
    case green = "\u{1B}[32m"
    case yellow = "\u{1B}[33m"
    case blue = "\u{1B}[34m"
    case magenta = "\u{1B}[35m"
    case cyan = "\u{1B}[36m"
    case white = "\u{1B}[37m"
    case gray = "\u{1B}[90m"
    case brightRed = "\u{1B}[91m"
    case brightGreen = "\u{1B}[92m"
    case brightYellow = "\u{1B}[93m"
    case brightBlue = "\u{1B}[94m"
    case brightMagenta = "\u{1B}[95m"
    case brightCyan = "\u{1B}[96m"
    case brightWhite = "\u{1B}[97m"

    static func colorize(_ text: String, _ color: ANSIColor) -> String {
        "\(color.rawValue)\(text)\(ANSIColor.reset.rawValue)"
    }

    static func hex(_ hex: String) -> String {
        guard hex.count == 6, let value = Int(hex, radix: 16) else { return "" }
        let r = (value >> 16) & 0xFF
        let g = (value >> 8) & 0xFF
        let b = value & 0xFF
        let block = "\u{1B}[48;2;\(r);\(g);\(b)m  \u{1B}[0m"
        return block
    }

    static func gradient(_ text: String, from: (UInt8, UInt8, UInt8), to: (UInt8, UInt8, UInt8)) -> String {
        let chars = Array(text)
        let n = max(chars.count - 1, 1)
        return chars.enumerated().map { i, ch in
            let t = Double(i) / Double(n)
            let r = UInt8(Double(from.0) * (1 - t) + Double(to.0) * t)
            let g = UInt8(Double(from.1) * (1 - t) + Double(to.1) * t)
            let b = UInt8(Double(from.2) * (1 - t) + Double(to.2) * t)
            return "\u{1B}[38;2;\(r);\(g);\(b)m\(ch)\u{1B}[0m"
        }.joined()
    }
}
