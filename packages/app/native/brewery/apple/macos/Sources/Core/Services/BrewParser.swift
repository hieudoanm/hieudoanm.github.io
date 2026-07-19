import Foundation

/// Parses Homebrew JSON output (`brew info --json=v2`) into structured models.
public enum BrewParser {

    // MARK: - JSON shape (defensive: optional/missing fields tolerated)

    private struct InfoV2: Decodable {
        let formulae: [FormulaJSON]?
        let casks: [CaskJSON]?
    }

    private struct FormulaJSON: Decodable {
        let name: String?
        let desc: String?
        let homepage: String?
        let versions: VersionsJSON?
        let dependencies: [String]?
        let installed: [InstalledJSON]?

        struct VersionsJSON: Decodable {
            let stable: String?
        }

        struct InstalledJSON: Decodable {
            let version: String?
        }
    }

    private struct CaskJSON: Decodable {
        let token: String?
        let name: [String]?
        let desc: String?
        let homepage: String?
        let version: String?
        let installed: String?
    }

    // MARK: - Entry points

    /// Parses a `brew info --json=v2` document into a list of packages.
    public static func parseInfoV2(_ json: String) throws -> [Package] {
        guard let data = json.data(using: .utf8) else {
            throw BrewError.parsingFailed("Output is not valid UTF-8.")
        }
        guard let info = try? JSONDecoder().decode(InfoV2.self, from: data) else {
            throw BrewError.parsingFailed("Output is not valid JSON.")
        }

        let formulae = (info.formulae ?? []).map(formula)
        let casks = (info.casks ?? []).map(cask)
        return formulae + casks
    }

    /// Parses a `brew outdated --json=v2` document into a list of outdated packages.
    public static func parseOutdatedV2(_ json: String) throws -> [Package] {
        struct Outdated: Decodable {
            let formulae: [FormulaOutdated]?
            let casks: [CaskOutdated]?
        }
        struct FormulaOutdated: Decodable {
            let name: String?
            let installed_versions: [String]?
            let current_version: String?
        }
        struct CaskOutdated: Decodable {
            let token: String?
            let installed_versions: [String]?
            let current_version: String?
        }

        guard let data = json.data(using: .utf8) else {
            throw BrewError.parsingFailed("Output is not valid UTF-8.")
        }
        guard let outdated = try? JSONDecoder().decode(Outdated.self, from: data) else {
            throw BrewError.parsingFailed("Output is not valid JSON.")
        }

        var packages: [Package] = []
        for entry in outdated.formulae ?? [] {
            packages.append(Package(
                name: entry.name ?? "",
                type: .formula,
                currentVersion: entry.current_version ?? "",
                installedVersion: entry.installed_versions?.first,
                status: .outdated
            ))
        }
        for entry in outdated.casks ?? [] {
            packages.append(Package(
                name: entry.token ?? "",
                type: .cask,
                currentVersion: entry.current_version ?? "",
                installedVersion: entry.installed_versions?.first,
                status: .outdated
            ))
        }
        return packages
    }

    /// Parses the columnar output of `brew services list`.
    ///
    /// The first column is the service name; the second is its status (`started`,
    /// `stopped`, `error`, or another value).
    public static func parseServices(_ text: String) -> [BrewServiceInfo] {
        var services: [BrewServiceInfo] = []
        let lines = text.split(whereSeparator: \.isNewline).dropFirst()
        for line in lines {
            let columns = line.split(whereSeparator: \.isWhitespace)
            guard columns.count >= 2 else { continue }
            let name = String(columns[0])
            let status = normalizeStatus(String(columns[1]))
            services.append(BrewServiceInfo(name: name, status: status))
        }
        return services
    }

    private static func normalizeStatus(_ raw: String) -> BrewServiceInfo.ServiceStatus {
        switch raw.lowercased() {
        case "started": return .started
        case "stopped", "none": return .stopped
        case "error": return .error
        default: return .unknown
        }
    }

    /// Parses newline-separated package tokens.
    /// Homebrew returns one token per line for `brew list`, `brew outdated`, etc.
    public static func parseTokens(_ text: String) -> [String] {
        text.split(whereSeparator: \.isNewline)
            .map { $0.trimmingCharacters(in: .whitespaces) }
            .filter { !$0.isEmpty }
    }

    /// Returns the first non-empty line of the given output.
    public static func firstLine(_ text: String) -> String {
        text.split(whereSeparator: \.isNewline)
            .map { $0.trimmingCharacters(in: .whitespacesAndNewlines) }
            .first(where: { !$0.isEmpty }) ?? ""
    }

    // MARK: - Mapping

    private static func formula(_ json: FormulaJSON) -> Package {
        let installedVersion = json.installed?.compactMap(\.version).first
        return Package(
            name: json.name ?? "",
            type: .formula,
            description: json.desc ?? "",
            homepage: json.homepage,
            dependencies: json.dependencies ?? [],
            currentVersion: json.versions?.stable ?? "",
            installedVersion: installedVersion,
            status: installedVersion == nil ? .notInstalled : .installed
        )
    }

    private static func cask(_ json: CaskJSON) -> Package {
        let installedVersion = nonEmpty(json.installed)
        let displayName = json.name?.first ?? json.token ?? ""
        return Package(
            name: displayName,
            type: .cask,
            description: json.desc ?? "",
            homepage: json.homepage,
            dependencies: [],
            currentVersion: json.version ?? "",
            installedVersion: installedVersion,
            status: installedVersion == nil ? .notInstalled : .installed
        )
    }

    private static func nonEmpty(_ value: String?) -> String? {
        guard let value, !value.isEmpty, value != "N/A" else { return nil }
        return value
    }
}
