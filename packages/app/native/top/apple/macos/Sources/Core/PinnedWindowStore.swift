import Foundation

public final class PinnedWindowStore: ObservableObject {
    @Published public private(set) var pinnedWindows: [PinnedWindow] = []

    private let storageURL: URL

    public init(directoryURL: URL? = nil) {
        let dir: URL
        if let d = directoryURL {
            dir = d
        } else {
            let appSupport = FileManager.default.urls(for: .applicationSupportDirectory, in: .userDomainMask).first!
            dir = appSupport.appendingPathComponent("Top")
        }
        try? FileManager.default.createDirectory(at: dir, withIntermediateDirectories: true)
        self.storageURL = dir.appendingPathComponent("pinned_windows.json")
        load()
    }

    public var pinnedIdentifiers: Set<AppIdentifier> {
        Set(pinnedWindows.map(\.appIdentifier))
    }

    public func add(_ appIdentifier: AppIdentifier) {
        guard !pinnedIdentifiers.contains(appIdentifier) else { return }
        pinnedWindows.append(PinnedWindow(appIdentifier: appIdentifier))
        save()
    }

    public func remove(_ appIdentifier: AppIdentifier) {
        pinnedWindows.removeAll { $0.appIdentifier == appIdentifier }
        save()
    }

    public func contains(_ appIdentifier: AppIdentifier) -> Bool {
        pinnedIdentifiers.contains(appIdentifier)
    }

    public func clearAll() {
        pinnedWindows.removeAll()
        save()
    }

    private func save() {
        let encoder = JSONEncoder()
        encoder.dateEncodingStrategy = .iso8601
        guard let data = try? encoder.encode(pinnedWindows) else { return }
        try? data.write(to: storageURL, options: .atomic)
    }

    private func load() {
        guard let data = try? Data(contentsOf: storageURL) else { return }
        let decoder = JSONDecoder()
        decoder.dateDecodingStrategy = .iso8601
        pinnedWindows = (try? decoder.decode([PinnedWindow].self, from: data)) ?? []
    }
}
