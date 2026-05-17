import XCTest
@testable import hieudoanm

final class NetTests: XCTestCase {
    func testNetErrorDescriptions() {
        let timeout = NetError.timeout("dig")
        XCTAssertEqual(timeout.description, "dig timed out")
        XCTAssertEqual(NetError.invalidOutput.description, "Invalid command output")
    }

    func testCommandConfig() {
        XCTAssertEqual(NetCommand.configuration.commandName, "net")
        XCTAssertEqual(NetIP.configuration.commandName, "ip")
        XCTAssertEqual(NetDNS.configuration.commandName, "dns")
        XCTAssertEqual(NetPing.configuration.commandName, "ping")
        XCTAssertEqual(NetWhois.configuration.commandName, "whois")
        XCTAssertEqual(NetHTTP.configuration.commandName, "http")
        XCTAssertEqual(NetServe.configuration.commandName, "serve")
        XCTAssertEqual(NetCert.configuration.commandName, "cert")
    }
}
