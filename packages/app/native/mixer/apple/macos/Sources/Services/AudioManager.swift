import MixerCore
import Foundation

final class AudioManager {
    private let coreAudioManager: CoreAudioManager
    private let audioProcessDiscovery: AudioProcessDiscovery
    private let audioVolumeController: AudioVolumeController

    init(
        coreAudioManager: CoreAudioManager = CoreAudioManager(),
        audioProcessDiscovery: AudioProcessDiscovery = AudioProcessDiscovery(),
        audioVolumeController: AudioVolumeController? = nil
    ) {
        self.coreAudioManager = coreAudioManager
        self.audioProcessDiscovery = audioProcessDiscovery
        self.audioVolumeController = audioVolumeController ?? AudioVolumeController(coreAudioManager: coreAudioManager)
    }

    func getAudioApplications() async -> [AudioApplication] {
        return audioProcessDiscovery.getAudioApplications()
    }

    func getCurrentDevice() -> AudioDevice? {
        guard let deviceID = coreAudioManager.getDefaultOutputDevice() else { return nil }
        let name = coreAudioManager.getDeviceName(deviceID: deviceID) ?? "Unknown"
        let volume = coreAudioManager.getDeviceVolume(deviceID: deviceID) ?? 1.0
        let isMuted = coreAudioManager.isDeviceMuted(deviceID: deviceID) ?? false

        return AudioDevice(
            id: deviceID,
            name: name,
            isOutput: true,
            isDefault: true,
            volume: volume,
            isMuted: isMuted
        )
    }

    func setSystemVolume(_ volume: Float) {
        audioVolumeController.setSystemVolume(volume)
    }

    func setSystemMute(_ muted: Bool) {
        audioVolumeController.setSystemMute(muted)
    }
}

extension Notification.Name {
    static let audioApplicationsDidChange = Notification.Name("audioApplicationsDidChange")
}
