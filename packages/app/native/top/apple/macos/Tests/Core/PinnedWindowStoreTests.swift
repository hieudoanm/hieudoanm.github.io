import Testing
import Foundation
@testable import TopCore

@Suite("PinnedWindowStore")
struct PinnedWindowStoreTests {

    private func makeStore() -> (PinnedWindowStore, URL) {
        let dir = FileManager.default.temporaryDirectory
            .appendingPathComponent("TopTests/\(UUID().uuidString)")
        let store = PinnedWindowStore(directoryURL: dir)
        return (store, dir)
    }

    @Test("empty store")
    func empty() {
        let (store, dir) = makeStore()
        #expect(store.pinnedWindows.isEmpty)
        try? FileManager.default.removeItem(at: dir)
    }

    @Test("add pinned window")
    func add() {
        let (store, dir) = makeStore()
        let id = AppIdentifier(bundleIdentifier: "com.test", windowTitle: "T")
        store.add(id)
        #expect(store.pinnedWindows.count == 1)
        #expect(store.contains(id))
        try? FileManager.default.removeItem(at: dir)
    }

    @Test("add ignores duplicate")
    func addDuplicate() {
        let (store, dir) = makeStore()
        let id = AppIdentifier(bundleIdentifier: "com.test", windowTitle: "T")
        store.add(id)
        store.add(id)
        #expect(store.pinnedWindows.count == 1)
        try? FileManager.default.removeItem(at: dir)
    }

    @Test("remove pinned window")
    func remove() {
        let (store, dir) = makeStore()
        let id = AppIdentifier(bundleIdentifier: "com.test", windowTitle: "T")
        store.add(id)
        store.remove(id)
        #expect(store.pinnedWindows.isEmpty)
        #expect(!store.contains(id))
        try? FileManager.default.removeItem(at: dir)
    }

    @Test("pinnedIdentifiers returns set")
    func pinnedIdentifiers() {
        let (store, dir) = makeStore()
        let a = AppIdentifier(bundleIdentifier: "com.a", windowTitle: "A")
        let b = AppIdentifier(bundleIdentifier: "com.b", windowTitle: "B")
        store.add(a)
        store.add(b)
        let identifiers = store.pinnedIdentifiers
        #expect(identifiers.count == 2)
        #expect(identifiers.contains(a))
        #expect(identifiers.contains(b))
        try? FileManager.default.removeItem(at: dir)
    }

    @Test("persistence across instances")
    func persistence() {
        let dir = FileManager.default.temporaryDirectory
            .appendingPathComponent("TopTests/persist-\(UUID().uuidString)")
        let s1 = PinnedWindowStore(directoryURL: dir)
        let id = AppIdentifier(bundleIdentifier: "com.test", windowTitle: "T")
        s1.add(id)
        let s2 = PinnedWindowStore(directoryURL: dir)
        #expect(s2.pinnedWindows.count == 1)
        #expect(s2.contains(id))
        try? FileManager.default.removeItem(at: dir)
    }
}
