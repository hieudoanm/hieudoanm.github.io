import XCTest
@testable import hieudoanm

final class ImageTests: XCTestCase {
    func testImageErrorDescriptions() {
        XCTAssertEqual(ImageError.invalidOutput.description, "Invalid sips output")
    }

    func testCommandConfig() {
        XCTAssertEqual(ImageCommand.configuration.commandName, "image")
        XCTAssertEqual(ImageInfo.configuration.commandName, "info")
        XCTAssertEqual(ImageConvert.configuration.commandName, "convert")
        XCTAssertEqual(ImageDominant.configuration.commandName, "dominant")
    }
}
