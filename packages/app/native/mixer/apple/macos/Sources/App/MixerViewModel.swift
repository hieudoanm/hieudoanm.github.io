import MixerCore
import SwiftUI
import Combine

@MainActor
final class MixerViewModel: ObservableObject {
    @Published var audioApplications: [AudioApplication] = []
    @Published var currentDevice: AudioDevice?
    @Published var isPermissionGranted = false

    private let audioManager: AudioManager
    private let applicationManager: ApplicationManager
    private let settingsStore: SettingsStore
    private var cancellables = Set<AnyCancellable>()

    init(
        audioManager: AudioManager = AudioManager(),
        applicationManager: ApplicationManager = ApplicationManager(),
        settingsStore: SettingsStore = SettingsStore()
    ) {
        self.audioManager = audioManager
        self.applicationManager = applicationManager
        self.settingsStore = settingsStore

        setupBindings()
        refreshAudioApplications()
    }

    func refreshAudioApplications() {
        Task {
            let apps = await audioManager.getAudioApplications()
            audioApplications = apps
            currentDevice = audioManager.getCurrentDevice()
        }
    }

    func setSystemVolume(_ volume: Float) {
        audioManager.setSystemVolume(volume)
        if let device = currentDevice {
            currentDevice = AudioDevice(
                id: device.id,
                name: device.name,
                isOutput: device.isOutput,
                isDefault: device.isDefault,
                volume: volume,
                isMuted: device.isMuted
            )
        }
    }

    func toggleSystemMute() {
        guard let device = currentDevice else { return }
        let newMuted = !device.isMuted
        audioManager.setSystemMute(newMuted)
        currentDevice = AudioDevice(
            id: device.id,
            name: device.name,
            isOutput: device.isOutput,
            isDefault: device.isDefault,
            volume: device.volume,
            isMuted: newMuted
        )
    }

    private func setupBindings() {
        NotificationCenter.default
            .publisher(for: .audioApplicationsDidChange)
            .receive(on: DispatchQueue.main)
            .sink { [weak self] _ in
                self?.refreshAudioApplications()
            }
            .store(in: &cancellables)
    }
}
