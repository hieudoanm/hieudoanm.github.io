import Foundation

public struct AudioApplication: Identifiable, Hashable {
    public let id: String
    public let processID: pid_t
    public let bundleIdentifier: String?
    public let name: String
    public var volume: Float
    public var isMuted: Bool
    public var isPlaying: Bool

    public init(
        processID: pid_t,
        bundleIdentifier: String? = nil,
        name: String,
        volume: Float = 1.0,
        isMuted: Bool = false,
        isPlaying: Bool = false
    ) {
        self.id = "\(processID)-\(name)"
        self.processID = processID
        self.bundleIdentifier = bundleIdentifier
        self.name = name
        self.volume = volume
        self.isMuted = isMuted
        self.isPlaying = isPlaying
    }
}
