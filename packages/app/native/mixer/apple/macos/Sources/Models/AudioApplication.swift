import Foundation

struct AudioApplication: Identifiable, Hashable {
    let id: String
    let processID: pid_t
    let bundleIdentifier: String?
    let name: String
    var volume: Float
    var isMuted: Bool
    var isPlaying: Bool

    init(
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
