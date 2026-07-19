import Foundation

/// Errors surfaced when communicating with Homebrew.
public enum BrewError: Error, LocalizedError, Sendable {
    case homebrewUnavailable
    case commandFailed(exitCode: Int32, stderr: String)
    case parsingFailed(String)
    case invalidPackageName(String)

    public var errorDescription: String? {
        switch self {
        case .homebrewUnavailable:
            return "Homebrew could not be found on this system."
        case .commandFailed(let exitCode, let stderr):
            return "Homebrew command failed (exit code \(exitCode)).\n\(stderr)"
        case .parsingFailed(let detail):
            return "Unable to parse Homebrew output. \(detail)"
        case .invalidPackageName(let name):
            return "\"\(name)\" is not a valid package name."
        }
    }
}
