import Foundation
import CoreAudio

struct AudioDevice: Identifiable {
    let id: UInt32
    let name: String
    let isInput: Bool
    let isOutput: Bool
    let isDefault: Bool
    let volume: Float
    let isMuted: Bool

    init(
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
