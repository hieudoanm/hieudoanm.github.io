import XCTest
@testable import BreweryCore

final class HomebrewServiceTests: XCTestCase {

    private func makeService(_ responses: [String: ProcessResult]) -> HomebrewService {
        HomebrewService(client: MockBrewClient(responses: responses))
    }

    // MARK: - Detection

    func testIsHomebrewAvailableWhenVersionSucceeds() async {
        let service = makeService(["--version": MockBrewClient.success(stdout: "Homebrew 6.0.20")])
        let available = await service.isHomebrewAvailable()
        XCTAssertTrue(available)
    }

    func testIsHomebrewAvailableWhenVersionFails() async {
        let service = makeService(["--version": ProcessResult(stdout: "", stderr: "not found", exitCode: 127)])
        let available = await service.isHomebrewAvailable()
        XCTAssertFalse(available)
    }

    // MARK: - Installed

    func testListInstalledGathersFormulaeAndCasks() async throws {
        let service = makeService([
            "list": MockBrewClient.success(stdout: "node\ngit"),
            "outdated": MockBrewClient.success(stdout: "{\"formulae\":[],\"casks\":[]}"),
        ])
        // MockBrewClient keys on first argument only, so both list calls match "list".
        let packages = try await service.listInstalled()
        XCTAssertEqual(packages.count, 4)
        XCTAssertEqual(packages.filter { $0.type == .formula }.count, 2)
        XCTAssertEqual(packages.filter { $0.type == .cask }.count, 2)
        XCTAssertTrue(packages.allSatisfy { $0.status == .installed })
    }

    // MARK: - Search

    func testSearchReturnsFormulaAndCaskMatches() async throws {
        let service = makeService([
            "search": MockBrewClient.success(stdout: "postgresql\npostgresql@17"),
        ])
        let results = try await service.search(query: "postgres")
        XCTAssertEqual(results.count, 4)
        XCTAssertEqual(results.filter { $0.type == .formula }.count, 2)
        XCTAssertEqual(results.filter { $0.type == .cask }.count, 2)
    }

    func testSearchRejectsBlankQuery() async throws {
        let service = makeService([:])
        let results = try await service.search(query: "   ")
        XCTAssertTrue(results.isEmpty)
    }

    // MARK: - Invalid names

    func testInstallValidatesPackageName() async {
        let service = makeService([:])
        do {
            _ = try await service.install(name: "node; rm -rf ~", type: .formula)
            XCTFail("Expected invalid name error")
        } catch {
            guard case BrewError.invalidPackageName = error else {
                return XCTFail("Expected invalidPackageName, got \(error)")
            }
        }
    }

    // MARK: - Command failure

    func testUpgradeAllPropagatesFailure() async {
        let service = makeService([
            "upgrade": ProcessResult(stdout: "", stderr: "some failure", exitCode: 1),
        ])
        do {
            _ = try await service.upgradeAll()
            XCTFail("Expected failure")
        } catch {
            guard case BrewError.commandFailed(let exitCode, _) = error else {
                return XCTFail("Expected commandFailed, got \(error)")
            }
            XCTAssertEqual(exitCode, 1)
        }
    }
}
