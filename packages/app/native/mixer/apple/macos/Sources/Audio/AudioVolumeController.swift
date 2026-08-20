import MixerCore
import Foundation
import CoreAudio

final class AudioVolumeController {
    private let coreAudioManager: CoreAudioManager

    init(coreAudioManager: CoreAudioManager = CoreAudioManager()) {
        self.coreAudioManager = coreAudioManager
    }

    func setSystemVolume(_ volume: Float) {
        guard let deviceID = coreAudioManager.getDefaultOutputDevice() else { return }
        let clampedVolume = min(max(volume, 0.0), 1.0)
        coreAudioManager.setDeviceVolume(deviceID: deviceID, volume: clampedVolume)
    }

    func getSystemVolume() -> Float? {
        guard let deviceID = coreAudioManager.getDefaultOutputDevice() else { return nil }
        return coreAudioManager.getDeviceVolume(deviceID: deviceID)
    }

    func setSystemMute(_ muted: Bool) {
        guard let deviceID = coreAudioManager.getDefaultOutputDevice() else { return }
        coreAudioManager.setDeviceMuted(deviceID: deviceID, muted: muted)
    }

    func getSystemMute() -> Bool? {
        guard let deviceID = coreAudioManager.getDefaultOutputDevice() else { return nil }
        return coreAudioManager.isDeviceMuted(deviceID: deviceID)
    }
}
