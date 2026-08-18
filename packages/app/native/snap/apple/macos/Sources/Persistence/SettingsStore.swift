import Foundation

final class SettingsStore {
    static let shared = SettingsStore()

    private let fileName = "settings.json"
    private let encoder = JSONEncoder()
    private let decoder = JSONDecoder()

    var settings: AppSettings {
        get { load() }
        set { persist(newValue) }
    }

    init() {
        encoder.outputFormatting = [.prettyPrinted, .sortedKeys]
    }

    func update(_ block: (inout AppSettings) -> Void) {
        var current = load()
        block(&current)
        persist(current)
    }

    private func load() -> AppSettings {
        guard let data = try? Data(contentsOf: fileURL),
              let decoded = try? decoder.decode(AppSettings.self, from: data) else {
            return .default
        }
        return decoded
    }

    private func persist(_ settings: AppSettings) {
        ensureDirectoryExists()
        guard let data = try? encoder.encode(settings) else {
            return
        }
        try? data.write(to: fileURL, options: .atomic)
    }

    private func ensureDirectoryExists() {
        let dir = fileURL.deletingLastPathComponent()
        try? FileManager.default.createDirectory(
            at: dir,
            withIntermediateDirectories: true
        )
    }

    private var fileURL: URL {
        FileManager.default.homeDirectoryForCurrentUser
            .appendingPathComponent("Library/Application Support/Snap/settings.json")
    }
}
