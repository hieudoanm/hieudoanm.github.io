import Foundation

final class SettingsStore: ObservableObject {
    @Published var launchAtLogin: Bool {
        didSet { save() }
    }

    @Published var showInactiveApps: Bool {
        didSet { save() }
    }

    @Published var rememberVolumes: Bool {
        didSet { save() }
    }

    @Published var globalShortcut: String {
        didSet { save() }
    }

    private let settingsURL: URL

    init() {
        let appSupport = FileManager.default.urls(for: .applicationSupportDirectory, in: .userDomainMask).first!
        let mixerDir = appSupport.appendingPathComponent("Mixer")

        if !FileManager.default.fileExists(atPath: mixerDir.path) {
            try? FileManager.default.createDirectory(at: mixerDir, withIntermediateDirectories: true)
        }

        self.settingsURL = mixerDir.appendingPathComponent("settings.json")

        if let data = try? Data(contentsOf: settingsURL),
           let settings = try? JSONDecoder().decode(SettingsData.self, from: data) {
            self.launchAtLogin = settings.launchAtLogin
            self.showInactiveApps = settings.showInactiveApps
            self.rememberVolumes = settings.rememberVolumes
            self.globalShortcut = settings.globalShortcut
        } else {
            self.launchAtLogin = false
            self.showInactiveApps = true
            self.rememberVolumes = false
            self.globalShortcut = "⌘⇧M"
        }
    }

    func save() {
        let settings = SettingsData(
            launchAtLogin: launchAtLogin,
            showInactiveApps: showInactiveApps,
            rememberVolumes: rememberVolumes,
            globalShortcut: globalShortcut
        )

        if let data = try? JSONEncoder().encode(settings) {
            try? data.write(to: settingsURL)
        }
    }
}

private struct SettingsData: Codable {
    let launchAtLogin: Bool
    let showInactiveApps: Bool
    let rememberVolumes: Bool
    let globalShortcut: String
}
