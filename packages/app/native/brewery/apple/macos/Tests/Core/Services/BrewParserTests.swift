import XCTest
@testable import BreweryCore

final class BrewParserTests: XCTestCase {

    // MARK: - Info JSON (formula)

    func testParseFormula() throws {
        let json = """
        {
          "formulae": [
            {
              "name": "node",
              "desc": "Platform built on V8 to build network applications",
              "homepage": "https://nodejs.org/",
              "versions": { "stable": "22.15.0" },
              "dependencies": ["openssl@3", "icu4c"],
              "installed": [{ "version": "22.14.0" }]
            }
          ],
          "casks": []
        }
        """
        let packages = try BrewParser.parseInfoV2(json)
        XCTAssertEqual(packages.count, 1)
        let node = try XCTUnwrap(packages.first)
        XCTAssertEqual(node.type, .formula)
        XCTAssertEqual(node.name, "node")
        XCTAssertEqual(node.currentVersion, "22.15.0")
        XCTAssertEqual(node.installedVersion, "22.14.0")
        XCTAssertEqual(node.status, .installed)
        XCTAssertEqual(node.dependencies, ["openssl@3", "icu4c"])
        XCTAssertEqual(node.homepage, "https://nodejs.org/")
    }

    func testParseFormulaNotInstalledWhenMissingInstalledArray() throws {
        let json = """
        {
          "formulae": [
            {
              "name": "jq",
              "desc": "Lightweight JSON processor",
              "versions": { "stable": "1.7.1" }
            }
          ],
          "casks": []
        }
        """
        let packages = try BrewParser.parseInfoV2(json)
        let jq = try XCTUnwrap(packages.first)
        XCTAssertEqual(jq.status, .notInstalled)
        XCTAssertNil(jq.installedVersion)
        XCTAssertEqual(jq.dependencies, [])
    }

    // MARK: - Info JSON (cask)

    func testParseCask() throws {
        let json = """
        {
          "formulae": [],
          "casks": [
            {
              "token": "firefox",
              "name": ["Firefox"],
              "desc": "Web browser",
              "homepage": "https://www.mozilla.org/firefox/",
              "version": "141.0",
              "installed": "140.0"
            }
          ]
        }
        """
        let packages = try BrewParser.parseInfoV2(json)
        XCTAssertEqual(packages.count, 1)
        let firefox = try XCTUnwrap(packages.first)
        XCTAssertEqual(firefox.type, .cask)
        XCTAssertEqual(firefox.name, "Firefox")
        XCTAssertEqual(firefox.currentVersion, "141.0")
        XCTAssertEqual(firefox.installedVersion, "140.0")
        XCTAssertEqual(firefox.status, .installed)
    }

    func testParseFormulaeAndCasksTogether() throws {
        let json = """
        {
          "formulae": [{ "name": "git", "versions": { "stable": "2.50.1" } }],
          "casks": [{ "token": "docker", "version": "27.0" }]
        }
        """
        let packages = try BrewParser.parseInfoV2(json)
        XCTAssertEqual(packages.count, 2)
        XCTAssertTrue(packages.contains { $0.type == .formula && $0.name == "git" })
        XCTAssertTrue(packages.contains { $0.type == .cask && $0.name == "docker" })
    }

    // MARK: - Missing optional fields

    func testParseFormulaMissingOptionalFields() throws {
        let json = """
        {
          "formulae": [{ "name": "wget" }],
          "casks": []
        }
        """
        let packages = try BrewParser.parseInfoV2(json)
        XCTAssertEqual(packages.count, 1)
        XCTAssertEqual(packages.first?.name, "wget")
        XCTAssertEqual(packages.first?.description, "")
        XCTAssertEqual(packages.first?.currentVersion, "")
    }

    // MARK: - Malformed JSON

    func testParseMalformedJSONThrows() {
        XCTAssertThrowsError(try BrewParser.parseInfoV2("not json")) { error in
            guard case BrewError.parsingFailed = error else {
                return XCTFail("Expected parsingFailed, got \(error)")
            }
        }
    }

    func testParseEmptyJSONReturnsNoPackages() throws {
        let packages = try BrewParser.parseInfoV2("{}")
        XCTAssertTrue(packages.isEmpty)
    }

    // MARK: - Tokens

    func testParseTokensSplitsLinesAndFiltersBlanks() {
        let tokens = BrewParser.parseTokens("node\n\ngit\n\n\njq\n")
        XCTAssertEqual(tokens, ["node", "git", "jq"])
    }

    func testParseTokensEmpty() {
        XCTAssertEqual(BrewParser.parseTokens(""), [])
    }

    func testFirstLine() {
        XCTAssertEqual(BrewParser.firstLine("\nHomebrew 6.0.20\nHomebrew/homebrew-core"), "Homebrew 6.0.20")
    }

    // MARK: - Outdated

    func testParseOutdatedV2() throws {
        let json = """
        {
          "formulae": [
            {"name": "node", "installed_versions": ["22.14.0"], "current_version": "22.15.0"}
          ],
          "casks": [
            {"token": "firefox", "installed_versions": ["140.0"], "current_version": "141.0"}
          ]
        }
        """
        let packages = try BrewParser.parseOutdatedV2(json)
        XCTAssertEqual(packages.count, 2)
        let node = try XCTUnwrap(packages.first { $0.name == "node" })
        XCTAssertEqual(node.type, .formula)
        XCTAssertEqual(node.status, .outdated)
        XCTAssertEqual(node.installedVersion, "22.14.0")
        XCTAssertEqual(node.currentVersion, "22.15.0")
    }

    // MARK: - Services

    func testParseServices() {
        let output = """
        Name       Status  User       File
        postgresql started hieudoan    ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist
        redis      stopped
        mysql      error
        """
        let services = BrewParser.parseServices(output)
        XCTAssertEqual(services.count, 3)
        XCTAssertEqual(services[0].name, "postgresql")
        XCTAssertEqual(services[0].status, .started)
        XCTAssertTrue(services[0].status.running)
        XCTAssertEqual(services[1].status, .stopped)
        XCTAssertEqual(services[2].status, .error)
    }

    func testParseServicesIgnoresHeaderAndBlankLines() {
        let output = """
        Name       Status
        nginx      started
        """
        let services = BrewParser.parseServices(output)
        XCTAssertEqual(services.map(\.name), ["nginx"])
    }
}
