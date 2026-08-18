import Foundation
import CoreAudio

public struct AudioDevice: Identifiable {
    public let id: UInt32
    public let name: String
    public let isInput: Bool
    public let isOutput: Bool
    public let isDefault: Bool
    public var volume: Float
    public var isMuted: Bool

    public init(
        id: UInt32,
        name: String,
        isInput: Bool = false,
        isOutput: Bool = true,
        isDefault: Bool = false,
        volume: Float = 1.0,
        isMuted: Bool = false
    ) {
        self.id = id
        self.name = name
        self.isInput = isInput
        self.isOutput = isOutput
        self.isDefault = isDefault
        self.volume = volume
        self.isMuted = isMuted
}

}
