import XCTest
@testable import jack

final class BrowserTests: XCTestCase {
    func testBrowser_structExists() {
        XCTAssertNotNil(Browser.self)
    }
}
