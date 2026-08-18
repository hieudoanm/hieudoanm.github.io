import Foundation

final class ClipperStore: ObservableObject {
    @Published var items: [ClipperItem] = []

    private let storageURL: URL

    init() {
        let appSupport = FileManager.default.urls(for: .applicationSupportDirectory, in: .userDomainMask).first!
        let dir = appSupport.appendingPathComponent("Clipper", isDirectory: true)
        try? FileManager.default.createDirectory(at: dir, withIntermediateDirectories: true)
        self.storageURL = dir.appendingPathComponent("clipboard.json")
        load()
    }

    var totalCount: Int { items.count }
    var pinnedCount: Int { items.filter(\.pinned).count }
    var textCount: Int { items.filter { $0.contentType == .text }.count }

    func add(_ content: String, type: ClipperItem.ContentType = .text) {
        guard !content.isEmpty else { return }
        if let idx = items.firstIndex(where: { $0.content == content }) {
            items[idx].copiedCount += 1
            let item = items.remove(at: idx)
            items.insert(item, at: 0)
        } else {
            let item = ClipperItem(content: content, contentType: type)
            items.insert(item, at: 0)
        }
        save()
    }

    func delete(_ item: ClipperItem) {
        items.removeAll { $0.id == item.id }
        save()
    }

    func togglePin(_ item: ClipperItem) {
        if let idx = items.firstIndex(where: { $0.id == item.id }) {
            items[idx].pinned.toggle()
            save()
        }
    }

    func clearUnpinned() {
        items.removeAll { !$0.pinned }
        save()
    }

    func search(_ query: String) -> [ClipperItem] {
        guard !query.isEmpty else { return items }
        return items.filter { $0.content.localizedCaseInsensitiveContains(query) }
    }

    private func save() {
        let encoder = JSONEncoder()
        encoder.dateEncodingStrategy = .iso8601
        guard let data = try? encoder.encode(items) else { return }
        try? data.write(to: storageURL, options: .atomic)
    }

    private func load() {
        guard let data = try? Data(contentsOf: storageURL) else { return }
        let decoder = JSONDecoder()
        decoder.dateDecodingStrategy = .iso8601
        items = (try? decoder.decode([ClipperItem].self, from: data)) ?? []
    }
}
