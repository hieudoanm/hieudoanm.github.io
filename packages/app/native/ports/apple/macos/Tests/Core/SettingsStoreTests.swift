import Testing
import Foundation
@testable import PortsCore

@Suite("SettingsStore")
struct SettingsStoreTests {

    private func makeStore() -> (SettingsStore, URL) {
        let dir = FileManager.default.temporaryDirectory
            .appendingPathComponent("PortsTests/settings-\(UUID().uuidString)")
        let store = SettingsStore(directoryURL: dir)
        return (store, dir)
    }

    @Test("defaults when no file exists")
    func defaults() {
        let (store, dir) = makeStore()
        #expect(store.refreshInterval == 1.0)
        try? FileManager.default.removeItem(at: dir)
    }

    @Test("modifying settings persists")
    func persist() {
        let (store, dir) = makeStore()
        store.refreshInterval = 5.0
        let loaded = SettingsStore(directoryURL: dir)
        #expect(loaded.refreshInterval == 5.0)
        try? FileManager.default.removeItem(at: dir)
    }

    @Test("corrupt settings file falls back to defaults")
    func corruptFile() throws {
        let dir = FileManager.default.temporaryDirectory
            .appendingPathComponent("PortsTests/corrupt-\(UUID().uuidString)")
        try FileManager.default.createDirectory(at: dir, withIntermediateDirectories: true)
        try Data("not json".utf8).write(to: dir.appendingPathComponent("settings.json"))
        let store = SettingsStore(directoryURL: dir)
        #expect(store.refreshInterval == 1.0)
        try? FileManager.default.removeItem(at: dir)
    }
}