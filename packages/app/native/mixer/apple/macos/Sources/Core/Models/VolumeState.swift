import Foundation

public struct VolumeState: Codable {
    public let bundleIdentifier: String
    public let volume: Float
    public let isMuted: Bool

    public init(bundleIdentifier: String, volume: Float, isMuted: Bool = false) {
        self.bundleIdentifier = bundleIdentifier
        self.volume = volume
        self.isMuted = isMuted
    }
}
