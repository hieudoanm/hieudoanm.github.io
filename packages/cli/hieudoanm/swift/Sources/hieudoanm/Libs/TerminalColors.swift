import Foundation

#if canImport(Darwin)
import Darwin
#else
import Glibc
#endif

var isTerminal: Bool {
    isatty(STDOUT_FILENO) != 0
}

func colorize(_ code: String, _ s: String) -> String {
    guard isTerminal else { return s }
    return "\u{001B}[\(code)m\(s)\u{001B}[0m"
}

func green(_ s: String) -> String { colorize("32", s) }
func red(_ s: String) -> String { colorize("31", s) }
func yellow(_ s: String) -> String { colorize("33", s) }
func cyan(_ s: String) -> String { colorize("36", s) }
func dim(_ s: String) -> String { colorize("2", s) }
func blue(_ s: String) -> String { colorize("34", s) }
func gray(_ s: String) -> String { colorize("90", s) }
