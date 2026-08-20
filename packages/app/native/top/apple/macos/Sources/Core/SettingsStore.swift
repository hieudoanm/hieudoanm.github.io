import Foundation

public final class SettingsStore: ObservableObject {
    @Published public var launchAtLogin: Bool {
        didSet { save() }
    }

    @Published public var rePinOnAppLaunch: Bool {
        didSet { save() }
    }

    private let settingsURL: URL

    public init(directoryURL: URL? = nil) {
        let dir: URL
        if let d = directoryURL {
            dir = d
        } else {
            let appSupport = FileManager.default.urls(for: .applicationSupportDirectory, in: .userDomainMask).first!
            dir = appSupport.appendingPathComponent("Top")
        }
        try? FileManager.default.createDirectory(at: dir, withIntermediateDirectories: true)
        self.settingsURL = dir.appendingPathComponent("settings.json")

        if let data = try? Data(contentsOf: settingsURL),
           let settings = try? JSONDecoder().decode(SettingsData.self, from: data) {
            self.launchAtLogin = settings.launchAtLogin
            self.rePinOnAppLaunch = settings.rePinOnAppLaunch
        } else {
            self.launchAtLogin = false
            self.rePinOnAppLaunch = true
        }
    }

    public func save() {
        let data = SettingsData(
            launchAtLogin: launchAtLogin,
            rePinOnAppLaunch: rePinOnAppLaunch
        )
        if let encoded = try? JSONEncoder().encode(data) {
            try? encoded.write(to: settingsURL)
        }
    }
}

private struct SettingsData: Codable {
    let launchAtLogin: Bool
    let rePinOnAppLaunch: Bool
}
