import XCTest
@testable import BreweryCore

final class SettingsStoreTests: XCTestCase {

    private var tempDirectory: URL!

    override func setUp() {
        super.setUp()
        tempDirectory = FileManager.default.temporaryDirectory
            .appendingPathComponent(UUID().uuidString, isDirectory: true)
    }

    override func tearDown() {
        if let tempDirectory {
            try? FileManager.default.removeItem(at: tempDirectory)
        }
        super.tearDown()
    }

    func testDefaultsWhenNoSettingsExist() {
        let store = SettingsStore(directoryURL: tempDirectory)
        XCTAssertFalse(store.launchAtLogin)
        XCTAssertTrue(store.checkForUpdatesOnLaunch)
    }

    func testPersistsChanges() {
        let store = SettingsStore(directoryURL: tempDirectory)
        store.launchAtLogin = true
        store.checkForUpdatesOnLaunch = false

        let reloaded = SettingsStore(directoryURL: tempDirectory)
        XCTAssertTrue(reloaded.launchAtLogin)
        XCTAssertFalse(reloaded.checkForUpdatesOnLaunch)
    }
}
