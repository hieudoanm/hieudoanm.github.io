import Testing
import Foundation
@testable import MixerCore

@Suite("SettingsStore")
struct SettingsStoreTests {

    private func makeStore() -> (SettingsStore, URL) {
        let dir = FileManager.default.temporaryDirectory
            .appendingPathComponent("MixerTests/\(UUID().uuidString)")
        let store = SettingsStore(directoryURL: dir)
        return (store, dir)
    }

    @Test("defaults when no file exists")
    func defaults() {
        let (store, dir) = makeStore()
        #expect(store.launchAtLogin == false)
        #expect(store.showInactiveApps == true)
        #expect(store.rememberVolumes == false)
        #expect(store.globalShortcut == "⌘⇧M")
        try? FileManager.default.removeItem(at: dir)
    }

    @Test("modifying settings persists to disk")
    func persistSettings() {
        let (store, dir) = makeStore()
        store.launchAtLogin = true
        store.showInactiveApps = false
        store.rememberVolumes = true
        store.globalShortcut = "⌘⇧K"
        let loaded = SettingsStore(directoryURL: dir)
        #expect(loaded.launchAtLogin == true)
        #expect(loaded.showInactiveApps == false)
        #expect(loaded.rememberVolumes == true)
        #expect(loaded.globalShortcut == "⌘⇧K")
        try? FileManager.default.removeItem(at: dir)
    }

    @Test("persistence across store instances")
    func persistenceAcrossInstances() {
        let dir = FileManager.default.temporaryDirectory
            .appendingPathComponent("MixerTests/persist-\(UUID().uuidString)")
        let store1 = SettingsStore(directoryURL: dir)
        store1.launchAtLogin = true
        store1.save()
        let store2 = SettingsStore(directoryURL: dir)
        #expect(store2.launchAtLogin == true)
        try? FileManager.default.removeItem(at: dir)
    }

    @Test("defaults restored when file missing")
    func defaultsAfterRemove() {
        let dir = FileManager.default.temporaryDirectory
            .appendingPathComponent("MixerTests/remove-\(UUID().uuidString)")
        let store1 = SettingsStore(directoryURL: dir)
        store1.launchAtLogin = true
        store1.save()
        try? FileManager.default.removeItem(at: dir)
        let store2 = SettingsStore(directoryURL: dir)
        #expect(store2.launchAtLogin == false)
    }
}
