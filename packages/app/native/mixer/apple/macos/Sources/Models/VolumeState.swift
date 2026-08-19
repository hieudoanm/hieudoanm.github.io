import Foundation

struct VolumeState: Codable {
    let bundleIdentifier: String
    let volume: Float
    let isMuted: Bool

    init(bundleIdentifier: String, volume: Float, isMuted: Bool = false) {
        self.bundleIdentifier = bundleIdentifier
        self.volume = volume
        self.isMuted = isMuted
    }
}
