import Testing
import Foundation
@testable import SnapCore

@Suite("LayoutStore")
struct LayoutStoreTests {

    private func makeStore() -> (LayoutStore, URL) {
        let dir = FileManager.default.temporaryDirectory
            .appendingPathComponent("SnapTests/layouts-\(UUID().uuidString)")
        let store = LayoutStore(directoryURL: dir)
        return (store, dir)
    }

    @Test("save and load layouts")
    func saveAndLoad() {
        let (store, dir) = makeStore()
        let layout = SnapLayout(name: "Test Layout")
        store.save(layout)
        #expect(store.layouts.count == 1)
        #expect(store.layouts[0].name == "Test Layout")
        try? FileManager.default.removeItem(at: dir)
    }

    @Test("save multiple layouts")
    func saveMultiple() {
        let (store, dir) = makeStore()
        store.save(SnapLayout(name: "A"))
        store.save(SnapLayout(name: "B"))
        store.save(SnapLayout(name: "C"))
        #expect(store.layouts.count == 3)
        try? FileManager.default.removeItem(at: dir)
    }

    @Test("update existing layout")
    func updateLayout() {
        let (store, dir) = makeStore()
        var layout = SnapLayout(name: "Original")
        store.save(layout)
        layout.name = "Updated"
        store.update(layout)
        #expect(store.layouts.count == 1)
        #expect(store.layouts[0].name == "Updated")
        try? FileManager.default.removeItem(at: dir)
    }

    @Test("delete layout by id")
    func deleteLayout() {
        let (store, dir) = makeStore()
        let a = SnapLayout(name: "A")
        let b = SnapLayout(name: "B")
        store.save(a)
        store.save(b)
        store.delete(id: a.id)
        #expect(store.layouts.count == 1)
        #expect(store.layouts[0].name == "B")
        try? FileManager.default.removeItem(at: dir)
    }

    @Test("empty store returns empty array")
    func emptyStore() {
        let (store, _) = makeStore()
        #expect(store.layouts.isEmpty)
    }

    @Test("persistence across store instances")
    func persistenceAcrossInstances() {
        let dir = FileManager.default.temporaryDirectory
            .appendingPathComponent("SnapTests/persist-\(UUID().uuidString)")
        let store1 = LayoutStore(directoryURL: dir)
        store1.save(SnapLayout(name: "Persistent"))
        let store2 = LayoutStore(directoryURL: dir)
        #expect(store2.layouts.count == 1)
        #expect(store2.layouts[0].name == "Persistent")
        try? FileManager.default.removeItem(at: dir)
    }
}
