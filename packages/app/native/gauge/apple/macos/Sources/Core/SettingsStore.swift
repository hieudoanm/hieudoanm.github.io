import Foundation

public final class SettingsStore: ObservableObject {
    @Published public var refreshInterval: TimeInterval {
        didSet { save() }
    }

    @Published public var menuBarDisplay: MenuBarDisplay {
        didSet { save() }
    }

    private let settingsURL: URL

    public init(directoryURL: URL? = nil) {
        let dir: URL
        if let d = directoryURL {
            dir = d
        } else {
            let appSupport = FileManager.default.urls(for: .applicationSupportDirectory, in: .userDomainMask).first!
            dir = appSupport.appendingPathComponent("Gauge")
        }
        try? FileManager.default.createDirectory(at: dir, withIntermediateDirectories: true)
        self.settingsURL = dir.appendingPathComponent("settings.json")

        if let data = try? Data(contentsOf: settingsURL),
           let settings = try? JSONDecoder().decode(SettingsData.self, from: data) {
            self.refreshInterval = settings.refreshInterval
            self.menuBarDisplay = settings.menuBarDisplay ?? .percentage
        } else {
            self.refreshInterval = 1.0
            self.menuBarDisplay = .percentage
        }
    }

    public func save() {
        let data = SettingsData(refreshInterval: refreshInterval, menuBarDisplay: menuBarDisplay)
        if let encoded = try? JSONEncoder().encode(data) {
            try? encoded.write(to: settingsURL)
        }
    }
}

private struct SettingsData: Codable {
    let refreshInterval: TimeInterval
    let menuBarDisplay: MenuBarDisplay?

    init(refreshInterval: TimeInterval, menuBarDisplay: MenuBarDisplay) {
        self.refreshInterval = refreshInterval
        self.menuBarDisplay = menuBarDisplay
    }
}