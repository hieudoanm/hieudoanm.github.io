import Foundation
import ArgumentParser

struct SemverCommand: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "semver",
        abstract: "Semver tools",
        subcommands: [
            SemverValidate.self, SemverCompare.self, SemverSort.self,
            SemverBump.self, SemverRange.self,
        ]
    )

    mutating func run() {}
}

struct SemverBump: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "bump", abstract: "Bump semver version")

    @Argument(help: "Version string")
    var version: String

    @Argument(help: "Part to bump: major, minor, or patch")
    var part: String

    mutating func run() {
        guard let v = SemVer.parse(version) else {
            print("Error: invalid semver: \(version)")
            return
        }
        let bumped: SemVer
        switch part.lowercased() {
        case "major": bumped = SemVer(major: v.major + 1, minor: 0, patch: 0, prerelease: nil, build: nil)
        case "minor": bumped = SemVer(major: v.major, minor: v.minor + 1, patch: 0, prerelease: nil, build: nil)
        case "patch": bumped = SemVer(major: v.major, minor: v.minor, patch: v.patch + 1, prerelease: nil, build: nil)
        default:
            print("Error: part must be major, minor, or patch")
            return
        }
        print(bumped.description)
    }
}

struct SemverRange: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "range", abstract: "Check if version satisfies a range")

    @Argument(help: "Version string")
    var version: String

    @Argument(help: "Range expression (e.g. ^1.2.3, ~1.2.3, >=1.0.0 <2.0.0)")
    var range: String

    mutating func run() {
        guard let v = SemVer.parse(version) else {
            print("Error: invalid semver: \(version)")
            return
        }
        let satisfied = checkRange(v, range: range)
        print(satisfied ? "satisfied" : "not satisfied")
    }
}

struct SemverValidate: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "validate", abstract: "Validate a semver string")

    @Argument(help: "Version string to validate")
    var version: String

    mutating func run() {
        if SemVer.parse(version) != nil {
            print("\(green("✓")) \(version) is valid semver")
        } else {
            print("\(red("✗")) \(version) is \(red("not")) valid semver")
        }
    }
}

struct SemverCompare: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "compare", abstract: "Compare two semver versions")

    @Argument(help: "First version")
    var v1: String

    @Argument(help: "Second version")
    var v2: String

    @Flag(name: .long, help: "JSON output")
    var json = false

    mutating func run() {
        guard let a = SemVer.parse(v1), let b = SemVer.parse(v2) else {
            print("Error: invalid semver string")
            return
        }

        let cmp = a.compare(b)
        if json {
            let result: [String: Any] = [
                "v1": v1, "v2": v2,
                "comparison": cmp.rawValue,
            ]
            if let data = try? JSONSerialization.data(withJSONObject: result, options: .prettyPrinted) {
                print(String(data: data, encoding: .utf8) ?? "")
            }
        } else {
            let op: String
            switch cmp {
            case .less: op = "<"
            case .equal: op = "="
            case .greater: op = ">"
            }
            print("\(v1) \(op) \(v2)")
        }
    }
}

struct SemverSort: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "sort", abstract: "Sort a list of semver strings")

    @Argument(help: "Version strings to sort")
    var versions: [String]

    @Flag(name: .long, help: "JSON output")
    var json = false

    @Flag(name: .long, help: "Reverse sort (descending)")
    var reverse = false

    mutating func run() {
        let parsed: [(String, SemVer)] = versions.compactMap { v in
            SemVer.parse(v).map { (v, $0) }
        }

        let sorted = parsed.sorted { a, b in
            reverse ? a.1.compare(b.1) == .greater : a.1.compare(b.1) == .less
        }

        if json {
            let result: [String] = sorted.map { $0.0 }
            if let data = try? JSONSerialization.data(withJSONObject: result, options: .prettyPrinted) {
                print(String(data: data, encoding: .utf8) ?? "[]")
            }
        } else {
            for (v, _) in sorted {
                print(v)
            }
        }

        let skipped = versions.count - parsed.count
        if skipped > 0 {
            print("(skipped \(skipped) invalid version(s))", to: &stderr)
        }
    }
}

private struct SemVer: CustomStringConvertible, Equatable {
    let major: Int
    let minor: Int
    let patch: Int
    let prerelease: String?
    let build: String?

    static func == (lhs: SemVer, rhs: SemVer) -> Bool {
        lhs.compare(rhs) == .equal
    }

    enum Comparison: String { case less = "-1"; case equal = "0"; case greater = "1" }

    func compare(_ other: SemVer) -> Comparison {
        if major != other.major { return major < other.major ? .less : .greater }
        if minor != other.minor { return minor < other.minor ? .less : .greater }
        if patch != other.patch { return patch < other.patch ? .less : .greater }

        switch (prerelease, other.prerelease) {
        case (nil, nil): return .equal
        case (nil, _): return .greater
        case (_, nil): return .less
        case let (a?, b?):
            let aParts = a.split(separator: ".").map(String.init)
            let bParts = b.split(separator: ".").map(String.init)
            for i in 0..<min(aParts.count, bParts.count) {
                let aInt = Int(aParts[i])
                let bInt = Int(bParts[i])
                if let aInt = aInt, let bInt = bInt {
                    if aInt != bInt { return aInt < bInt ? .less : .greater }
                } else {
                    if aParts[i] != bParts[i] { return aParts[i] < bParts[i] ? .less : .greater }
                }
            }
            if aParts.count != bParts.count { return aParts.count < bParts.count ? .less : .greater }
            return .equal
        }
    }

    var description: String {
        var s = "\(major).\(minor).\(patch)"
        if let pre = prerelease { s += "-\(pre)" }
        if let b = build { s += "+\(b)" }
        return s
    }

    static func parse(_ s: String) -> SemVer? {
        let pattern = #"^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([0-9A-Za-z.-]+))?(?:\+([0-9A-Za-z.-]+))?$"#
        guard let regex = try? NSRegularExpression(pattern: pattern, options: []),
              let match = regex.firstMatch(in: s, options: [], range: NSRange(s.startIndex..<s.endIndex, in: s)),
              match.numberOfRanges >= 4,
              let majorRange = Range(match.range(at: 1), in: s),
              let minorRange = Range(match.range(at: 2), in: s),
              let patchRange = Range(match.range(at: 3), in: s) else {
            return nil
        }
        let major = Int(s[majorRange]) ?? 0
        let minor = Int(s[minorRange]) ?? 0
        let patch = Int(s[patchRange]) ?? 0
        let prerelease = match.numberOfRanges > 4 && match.range(at: 4).location != NSNotFound ? String(s[Range(match.range(at: 4), in: s)!]) : nil
        let build = match.numberOfRanges > 5 && match.range(at: 5).location != NSNotFound ? String(s[Range(match.range(at: 5), in: s)!]) : nil
        return SemVer(major: major, minor: minor, patch: patch, prerelease: prerelease, build: build)
    }
}

private func checkRange(_ v: SemVer, range: String) -> Bool {
    let range = range.trimmingCharacters(in: .whitespaces)

    if range.hasPrefix("^") {
        let target = SemVer.parse(String(range.dropFirst())) ?? v
        return v.major == target.major && v >= target
    }
    if range.hasPrefix("~") {
        let target = SemVer.parse(String(range.dropFirst())) ?? v
        return v.major == target.major && v.minor == target.minor && v >= target
    }
    if range.hasPrefix(">=") || range.hasPrefix("<=") || range.hasPrefix(">") || range.hasPrefix("<") {
        let parts = range.split(separator: " ", maxSplits: 1).map(String.init)
        for part in parts {
            let trimmed = part.trimmingCharacters(in: .whitespaces)
            if trimmed.hasPrefix(">=") {
                guard let t = SemVer.parse(String(trimmed.dropFirst(2))) else { return false }
                if v < t { return false }
            } else if trimmed.hasPrefix("<=") {
                guard let t = SemVer.parse(String(trimmed.dropFirst(2))) else { return false }
                if v > t { return false }
            } else if trimmed.hasPrefix(">") {
                guard let t = SemVer.parse(String(trimmed.dropFirst(1))) else { return false }
                if v <= t { return false }
            } else if trimmed.hasPrefix("<") {
                guard let t = SemVer.parse(String(trimmed.dropFirst(1))) else { return false }
                if v >= t { return false }
            } else if let t = SemVer.parse(trimmed) {
                if v != t { return false }
            }
        }
        return true
    }
    if let target = SemVer.parse(range) {
        return v >= target
    }
    return false
}

private func >= (lhs: SemVer, rhs: SemVer) -> Bool { lhs.compare(rhs) != .less }
private func > (lhs: SemVer, rhs: SemVer) -> Bool { lhs.compare(rhs) == .greater }
private func <= (lhs: SemVer, rhs: SemVer) -> Bool { lhs.compare(rhs) != .greater }
private func < (lhs: SemVer, rhs: SemVer) -> Bool { lhs.compare(rhs) == .less }


var stderr = FileHandle.standardError

extension FileHandle: @retroactive TextOutputStream {
    public func write(_ string: String) {
        write(Data(string.utf8))
    }
}
