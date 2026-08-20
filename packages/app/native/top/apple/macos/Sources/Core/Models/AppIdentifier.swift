import Foundation

public struct AppIdentifier: Hashable, Codable, Sendable {
    public let bundleIdentifier: String
    public let windowTitle: String

    public init(bundleIdentifier: String, windowTitle: String) {
        self.bundleIdentifier = bundleIdentifier
        self.windowTitle = windowTitle
    }

    public var displayTitle: String {
        let appName = bundleIdentifier
            .components(separatedBy: ".")
            .last?
            .replacingOccurrences(of: "-", with: " ")
            .capitalized ?? bundleIdentifier
        return "\(appName) - \(windowTitle)"
    }
}
