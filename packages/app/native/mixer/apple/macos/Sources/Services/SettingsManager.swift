import MixerCore
import Foundation
import Combine

final class SettingsManager: ObservableObject {
    private let settingsStore: SettingsStore
    private var cancellables = Set<AnyCancellable>()

    @Published var launchAtLogin: Bool = false
    @Published var showInactiveApps: Bool = true
    @Published var rememberVolumes: Bool = false
    @Published var globalShortcut: String = "⌘⇧M"

    init(settingsStore: SettingsStore = SettingsStore()) {
        self.settingsStore = settingsStore

        self.launchAtLogin = settingsStore.launchAtLogin
        self.showInactiveApps = settingsStore.showInactiveApps
        self.rememberVolumes = settingsStore.rememberVolumes
        self.globalShortcut = settingsStore.globalShortcut

        $launchAtLogin.dropFirst().sink { settingsStore.launchAtLogin = $0 }.store(in: &cancellables)
        $showInactiveApps.dropFirst().sink { settingsStore.showInactiveApps = $0 }.store(in: &cancellables)
        $rememberVolumes.dropFirst().sink { settingsStore.rememberVolumes = $0 }.store(in: &cancellables)
        $globalShortcut.dropFirst().sink { settingsStore.globalShortcut = $0 }.store(in: &cancellables)
    }
}
