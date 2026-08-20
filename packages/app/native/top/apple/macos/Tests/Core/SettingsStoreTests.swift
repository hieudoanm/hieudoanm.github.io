import Testing
import Foundation
@testable import TopCore

@Suite("SettingsStore")
struct SettingsStoreTests {

    private func makeStore() -> (SettingsStore, URL) {
        let dir = FileManager.default.temporaryDirectory
            .appendingPathComponent("TopTests/settings-\(UUID().uuidString)")
        let store = SettingsStore(directoryURL: dir)
        return (store, dir)
    }

    @Test("defaults when no file exists")
    func defaults() {
        let (store, dir) = makeStore()
        #expect(store.launchAtLogin == false)
        #expect(store.rePinOnAppLaunch == true)
        try? FileManager.default.removeItem(at: dir)
    }

    @Test("modifying settings persists")
    func persist() {
        let (store, dir) = makeStore()
        store.launchAtLogin = true
        store.rePinOnAppLaunch = false
        let loaded = SettingsStore(directoryURL: dir)
        #expect(loaded.launchAtLogin == true)
        #expect(loaded.rePinOnAppLaunch == false)
        try? FileManager.default.removeItem(at: dir)
    }

    @Test("persistence across instances")
    func persistence() {
        let dir = FileManager.default.temporaryDirectory
            .appendingPathComponent("TopTests/settings-persist-\(UUID().uuidString)")
        let s1 = SettingsStore(directoryURL: dir)
        s1.launchAtLogin = true
        s1.save()
        let s2 = SettingsStore(directoryURL: dir)
        #expect(s2.launchAtLogin == true)
        try? FileManager.default.removeItem(at: dir)
    }
}
