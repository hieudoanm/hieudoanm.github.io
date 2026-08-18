import Foundation

final class LayoutStore {
    static let shared = LayoutStore()

    private let fileName = "layouts.json"
    private let encoder = JSONEncoder()
    private let decoder = JSONDecoder()

    var layouts: [SnapLayout] {
        load()
    }

    init() {
        encoder.outputFormatting = [.prettyPrinted, .sortedKeys]
        encoder.dateEncodingStrategy = .iso8601
        decoder.dateDecodingStrategy = .iso8601
    }

    func save(_ layout: SnapLayout) {
        var all = load()
        all.append(layout)
        persist(all)
    }

    func update(_ layout: SnapLayout) {
        var all = load()
        if let index = all.firstIndex(where: { $0.id == layout.id }) {
            all[index] = layout
            persist(all)
        }
    }

    func delete(id: UUID) {
        var all = load()
        all.removeAll { $0.id == id }
        persist(all)
    }

    private func load() -> [SnapLayout] {
        guard let data = try? Data(contentsOf: fileURL),
              let decoded = try? decoder.decode([SnapLayout].self, from: data) else {
            return []
        }
        return decoded
    }

    private func persist(_ layouts: [SnapLayout]) {
        ensureDirectoryExists()
        guard let data = try? encoder.encode(layouts) else {
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
            .appendingPathComponent("Library/Application Support/Snap/layouts.json")
    }
}
