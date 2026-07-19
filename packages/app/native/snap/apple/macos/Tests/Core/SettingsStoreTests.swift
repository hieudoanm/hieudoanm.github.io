import Testing
import Foundation
@testable import SnapCore

@Suite("SettingsStore")
struct SettingsStoreTests {

    private func makeStore() -> (SettingsStore, URL) {
        let dir = FileManager.default.temporaryDirectory
            .appendingPathComponent("SnapTests/settings-\(UUID().uuidString)")
        let store = SettingsStore(directoryURL: dir)
        return (store, dir)
    }

    @Test("default settings when no file exists")
    func defaultSettings() {
        let (store, dir) = makeStore()
        #expect(store.settings == AppSettings.default)
        try? FileManager.default.removeItem(at: dir)
    }

    @Test("persist settings")
    func persistSettings() {
        let (store, dir) = makeStore()
        store.settings = AppSettings(
            launchAtLogin: true,
            showInDock: true,
            restoreOnMonitorChange: true
        )
        let loaded = store.settings
        #expect(loaded.launchAtLogin == true)
        #expect(loaded.showInDock == true)
        #expect(loaded.restoreOnMonitorChange == true)
        try? FileManager.default.removeItem(at: dir)
    }

    @Test("update via closure")
    func updateViaClosure() {
        let (store, dir) = makeStore()
        store.update { $0.launchAtLogin = true }
        #expect(store.settings.launchAtLogin == true)
        #expect(store.settings.showInDock == false)
        try? FileManager.default.removeItem(at: dir)
    }

    @Test("persistence across store instances")
    func persistenceAcrossInstances() {
        let dir = FileManager.default.temporaryDirectory
            .appendingPathComponent("SnapTests/settings-persist-\(UUID().uuidString)")
        let store1 = SettingsStore(directoryURL: dir)
        store1.settings = AppSettings(launchAtLogin: true)
        let store2 = SettingsStore(directoryURL: dir)
        #expect(store2.settings.launchAtLogin == true)
        try? FileManager.default.removeItem(at: dir)
    }
}
