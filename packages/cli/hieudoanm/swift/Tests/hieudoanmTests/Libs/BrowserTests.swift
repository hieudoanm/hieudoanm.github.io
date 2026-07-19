import XCTest
@testable import hieudoanm

final class BrowserTests: XCTestCase {
    func testBrowser_structExists() {
        XCTAssertNotNil(Browser.self)
    }
}
