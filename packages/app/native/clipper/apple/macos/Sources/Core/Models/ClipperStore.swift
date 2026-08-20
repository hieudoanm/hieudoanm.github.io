import Foundation
import Combine

public final class ClipperStore: ObservableObject {
    @Published public var items: [ClipperItem] = []

    private let storageURL: URL

    public init(directoryURL: URL? = nil) {
        let dir: URL
        if let d = directoryURL {
            dir = d
        } else {
            let appSupport = FileManager.default.urls(for: .applicationSupportDirectory, in: .userDomainMask).first!
            dir = appSupport.appendingPathComponent("Clipper", isDirectory: true)
        }
        try? FileManager.default.createDirectory(at: dir, withIntermediateDirectories: true)
        self.storageURL = dir.appendingPathComponent("clipboard.json")
        load()
    }

    public var totalCount: Int { items.count }
    public var pinnedCount: Int { items.filter(\.pinned).count }
    public var textCount: Int { items.filter { $0.contentType == .text }.count }

    public func add(_ content: String, type: ClipperItem.ContentType = .text) {
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

    public func delete(_ item: ClipperItem) {
        items.removeAll { $0.id == item.id }
        save()
    }

    public func togglePin(_ item: ClipperItem) {
        if let idx = items.firstIndex(where: { $0.id == item.id }) {
            items[idx].pinned.toggle()
            save()
        }
    }

    public func clearUnpinned() {
        items.removeAll { !$0.pinned }
        save()
    }

    public func search(_ query: String) -> [ClipperItem] {
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
