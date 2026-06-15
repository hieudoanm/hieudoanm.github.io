import Foundation
import ArgumentParser
import Network
import Security

struct NetCommand: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "net",
        abstract: "Network tools",
        subcommands: [
            NetCert.self, NetCertCheck.self, NetCertInfo.self,
            NetDNS.self, NetHTTP.self, NetIP.self,
            NetPing.self, NetServe.self, NetStatus.self,
            NetWhois.self, NetWifi.self,
        ]
    )

    mutating func run() {}
}

// MARK: - IP

struct NetIP: AsyncParsableCommand {
    static let configuration = CommandConfiguration(commandName: "ip", abstract: "Geolocate an IP address")

    @Argument(help: "IP address (default: your public IP)")
    var ip: String?

    @Flag(name: .long, help: "JSON output")
    var json = false

    mutating func run() async throws {
        let targetIP: String
        if let ip = ip {
            targetIP = ip
        } else {
            let data = try await Requests.fetch("https://api.ipify.org?format=json")
            guard let json = try JSONSerialization.jsonObject(with: data.data) as? [String: Any],
                  let myIP = json["ip"] as? String else {
                print("Could not determine public IP")
                return
            }
            targetIP = myIP
        }

        var locData: Data?
        var source = ""

        if let data = try? await Requests.fetch("http://ip-api.com/json/\(targetIP)").data,
           let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
           json["status"] as? String == "success" {
            locData = data
            source = "ip-api.com"
        } else if let data = try? await Requests.fetch("https://ipapi.co/\(targetIP)/json").data {
            locData = data
            source = "ipapi.co"
        }

        if json {
            if let locData = locData {
                print(String(data: locData, encoding: .utf8) ?? "{}")
            } else {
                print("{\"ip\": \"\(targetIP)\", \"error\": \"location unavailable\"}")
            }
        } else {
            print("IP: \(targetIP)")
            if let locData = locData, let json = try? JSONSerialization.jsonObject(with: locData) as? [String: Any] {
                print("Source: \(source)")
                if let city = json["city"] as? String { print("City: \(city)") }
                if let region = json["region"] as? String ?? json["regionName"] as? String { print("Region: \(region)") }
                if let country = json["country"] as? String { print("Country: \(country)") }
                if let org = json["org"] as? String ?? json["isp"] as? String { print("ISP: \(org)") }
                if let lat = json["lat"] as? Double, let lon = json["lon"] as? Double {
                    print("Location: \(lat), \(lon)")
                }
                if let timezone = json["timezone"] as? String { print("Timezone: \(timezone)") }
            } else {
                print("Location data unavailable")
            }
        }
    }
}

// MARK: - Status

struct NetStatus: AsyncParsableCommand {
    static let configuration = CommandConfiguration(commandName: "status", abstract: "Check service uptime")

    @Argument(help: "Service names to check (default: all)")
    var services: [String]

    @Flag(name: .long, help: "Check all services in parallel")
    var all = false

    mutating func run() async throws {
        let builtIn: [(String, String)] = [
            ("GitHub", "https://www.githubstatus.com/api/v2/status.json"),
            ("OpenAI", "https://status.openai.com/api/v2/status.json"),
            ("Cloudflare", "https://www.cloudflarestatus.com/api/v2/status.json"),
            ("Google", "https://www.google.com"),
            ("GitHub API", "https://api.github.com"),
            ("Apple", "https://apple.com"),
            ("Vercel", "https://www.vercelstatus.com/api/v2/status.json"),
        ]

        let targets: [(String, String)]
        if all || services.isEmpty {
            targets = builtIn
        } else {
            targets = services.map { ($0, $0.hasPrefix("http") ? $0 : "https://\($0)") }
        }

        await withTaskGroup(of: (String, String, Double?).self) { group in
            for (name, url) in targets {
                group.addTask {
                    let start = Date()
                    do {
                        let resp = try await Requests.fetch(url, timeout: 10)
                        let elapsed = Date().timeIntervalSince(start)
                        if resp.statusCode < 400 {
                            return (name, "UP", elapsed)
                        } else {
                            return (name, "DOWN", elapsed)
                        }
                    } catch {
                        let elapsed = Date().timeIntervalSince(start)
                        return (name, "DOWN", elapsed)
                    }
                }
            }

            for await (name, status, latency) in group {
                let icon = status == "UP" ? "✓" : "✗"
                let color: (String) -> String = status == "UP" ? green : red
                let latStr = latency.map { String(format: "%.2fs", $0) } ?? "N/A"
                print("\(color(icon)) \(name): \(color(status)) (\(latStr))")
            }
        }
    }
}

// MARK: - WiFi

struct NetWifi: AsyncParsableCommand {
    static let configuration = CommandConfiguration(commandName: "wifi", abstract: "Scan WiFi networks")

    @Flag(name: .long, help: "JSON output")
    var json = false

    mutating func run() throws {
        let airportPath = "/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport"

        guard FileManager.default.isExecutableFile(atPath: airportPath) else {
            print("airport command not found")
            return
        }

        let output = try runProcess(executable: airportPath, args: ["-s"])
        let lines = output.components(separatedBy: .newlines).filter { !$0.isEmpty }

        guard lines.count > 1 else {
            print(json ? "[]" : "No networks found")
            return
        }

        let headerLine = lines[0]
        let ssidRange = headerLine.range(of: "SSID") ?? headerLine.range(of: "SSID")!
        let bssidRange = headerLine.range(of: "BSSID") ?? headerLine.range(of: "BSSID") ?? headerLine.range(of: "BSSID")!
        let rssiRange = headerLine.range(of: "RSSI") ?? headerLine.range(of: "RSSI")!
        let channelRange = headerLine.range(of: "CHANNEL") ?? headerLine.range(of: "CH")!
        let secRange = headerLine.range(of: "SECURITY") ?? headerLine.range(of: "SEC")!

        struct WifiEntry: Codable {
            let ssid: String
            let bssid: String
            let rssi: Int
            let channel: String
            let security: String
        }

        var entries: [WifiEntry] = []

        for line in lines.dropFirst() {
            let ssid = line.prefix(32).trimmingCharacters(in: .whitespaces)
            let bssidStart = line.index(line.startIndex, offsetBy: 33)
            let bssid: String
            if line.count > 48 { bssid = String(line[line.index(line.startIndex, offsetBy: 33)..<line.index(line.startIndex, offsetBy: 50)]).trimmingCharacters(in: .whitespaces) }
            else { bssid = "" }
            let parts = line.split(separator: " ", maxSplits: 5, omittingEmptySubsequences: true)
            if parts.count >= 5 {
                let rssi = Int(parts[parts.count - 4].trimmingCharacters(in: .whitespaces)) ?? 0
                let channel = String(parts[parts.count - 3])
                let security = String(parts[parts.count - 1])
                entries.append(WifiEntry(ssid: ssid, bssid: bssid, rssi: rssi, channel: channel, security: security))
            }
        }

        if json {
            let enc = JSONEncoder()
            enc.outputFormatting = .prettyPrinted
            let data = try enc.encode(entries)
            print(String(data: data, encoding: .utf8) ?? "[]")
        } else {
            for entry in entries {
                print("\(entry.ssid): \(entry.rssi) dBm [\(entry.channel)] \(entry.security)")
            }
        }
    }
}

// MARK: - DNS

struct NetDNS: AsyncParsableCommand {
    static let configuration = CommandConfiguration(commandName: "dns", abstract: "DNS lookup")

    @Argument(help: "Domain name")
    var domain: String

    @Option(name: .shortAndLong, help: "Record type (A, AAAA, MX, NS, CNAME, TXT)")
    var type: String = "A"

    mutating func run() throws {
        let output = try runProcess(executable: "/usr/bin/dig", args: ["+short", "-t", type, domain])
        let lines = output.trimmingCharacters(in: .whitespacesAndNewlines)
        if lines.isEmpty {
            print("No \(type) records found for \(domain)")
        } else {
            print(lines)
        }
    }
}

// MARK: - TLS Cert

struct NetCert: AsyncParsableCommand {
    static let configuration = CommandConfiguration(commandName: "cert", abstract: "Inspect TLS certificate of a domain")

    @Argument(help: "Domain name")
    var domain: String

    @Option(name: .shortAndLong, help: "Port")
    var port: Int = 443

    mutating func run() throws {
        let output = try runProcess(executable: "/usr/bin/openssl", args: [
            "s_client", "-connect", "\(domain):\(port)",
            "-servername", domain, "-showcerts",
        ], input: "QUIT\n", timeout: 10)

        var parsed = output
        if let range = parsed.range(of: "-----BEGIN CERTIFICATE-----") {
            parsed = String(parsed[range.lowerBound...])
        }
        if let endRange = parsed.range(of: "-----END CERTIFICATE-----") {
            parsed = String(parsed[...endRange.upperBound])
        }

        let info = try runProcess(executable: "/usr/bin/openssl", args: ["x509", "-text", "-noout"], input: parsed, timeout: 5)
        print("Certificate for \(domain):\(port)\n")
        if let subject = info.range(of: "Subject: ") {
            let start = subject.upperBound
            let end = info[start...].firstIndex(of: "\n") ?? info.endIndex
            print("Subject: \(info[start..<end])")
        }
        if let issuer = info.range(of: "Issuer: ") {
            let start = issuer.upperBound
            let end = info[start...].firstIndex(of: "\n") ?? info.endIndex
            print("Issuer: \(info[start..<end])")
        }
        if let notBefore = info.range(of: "Not Before: ") {
            let start = notBefore.upperBound
            let end = info[start...].firstIndex(of: "\n") ?? info.endIndex
            print("Valid from: \(info[start..<end])")
        }
        if let notAfter = info.range(of: "Not After : ") {
            let start = notAfter.upperBound
            let end = info[start...].firstIndex(of: "\n") ?? info.endIndex
            print("Valid until: \(info[start..<end])")
        }
    }
}

// MARK: - Cert Check

struct NetCertCheck: AsyncParsableCommand {
    static let configuration = CommandConfiguration(commandName: "cert-check", abstract: "Check TLS certificate validity")

    @Argument(help: "Domain name")
    var domain: String

    @Option(name: .shortAndLong, help: "Port")
    var port: Int = 443

    mutating func run() async throws {
        let policy = SecPolicyCreateSSL(true, domain as CFString)
        var trust: SecTrust?
        let result = SecTrustCreateWithCertificates([] as CFArray, policy, &trust)
        guard result == errSecSuccess, let trust = trust else {
            print(red("Could not create trust evaluation for \(domain)"))
            return
        }

        var error: CFError?
        let isTrusted = SecTrustEvaluateWithError(trust, &error)

        if isTrusted {
            print(green("✓ Certificate for \(domain) is valid"))
        } else {
            let errMsg = (error as Error?)?.localizedDescription ?? "unknown error"
            print(red("✗ Certificate invalid: \(errMsg)"))
        }
    }
}

// MARK: - Cert Info

struct NetCertInfo: AsyncParsableCommand {
    static let configuration = CommandConfiguration(commandName: "cert-info", abstract: "Show detailed TLS certificate info")

    @Argument(help: "Domain name")
    var domain: String

    @Option(name: .shortAndLong, help: "Port")
    var port: Int = 443

    mutating func run() throws {
        let output = try runProcess(executable: "/usr/bin/openssl", args: [
            "s_client", "-connect", "\(domain):\(port)",
            "-servername", domain, "-showcerts",
        ], input: "QUIT\n", timeout: 10)

        var certBlock = ""
        if let start = output.range(of: "-----BEGIN CERTIFICATE-----"),
           let end = output.range(of: "-----END CERTIFICATE-----") {
            certBlock = String(output[start.lowerBound...end.upperBound])
        }

        guard !certBlock.isEmpty else {
            print("No certificate found for \(domain):\(port)")
            return
        }

        let text = try runProcess(executable: "/usr/bin/openssl", args: ["x509", "-text", "-noout"], input: certBlock, timeout: 5)

        let cleanText = text.trimmingCharacters(in: .whitespacesAndNewlines)
        print("TLS Certificate for \(domain):\(port)")
        print(String(repeating: "-", count: 50))

        var inExtensions = false
        for line in cleanText.components(separatedBy: .newlines) where !line.isEmpty {
            if line.contains("X509v3 extensions:") { inExtensions = true; continue }
            if inExtensions && (line.hasPrefix("Signature") || line.hasPrefix("-----")) {
                inExtensions = false
                continue
            }
            if inExtensions {
                if line.hasPrefix("    ") || line.hasPrefix("X509v3") {
                    print(line.trimmingCharacters(in: .whitespaces))
                }
            } else if !line.hasPrefix(" ") || line.contains(":") {
                print(line.trimmingCharacters(in: .whitespaces))
            }
        }
    }
}

// MARK: - Ping

struct NetPing: AsyncParsableCommand {
    static let configuration = CommandConfiguration(commandName: "ping", abstract: "Ping a host")

    @Argument(help: "Host to ping")
    var host: String

    @Option(name: .shortAndLong, help: "Number of pings")
    var count: Int = 4

    mutating func run() throws {
        let output = try runProcess(executable: "/sbin/ping", args: ["-c", "\(count)", host], timeout: 30)
        print(output.trimmingCharacters(in: .whitespacesAndNewlines))
    }
}

// MARK: - Whois

struct NetWhois: AsyncParsableCommand {
    static let configuration = CommandConfiguration(commandName: "whois", abstract: "WHOIS lookup")

    @Argument(help: "Domain name")
    var domain: String

    mutating func run() throws {
        let output = try runProcess(executable: "/usr/bin/whois", args: [domain], timeout: 15)
        let filtered = output.components(separatedBy: .newlines).filter { line in
            let lower = line.lowercased()
            return lower.contains("domain") || lower.contains("registrar") || lower.contains("creation") ||
                   lower.contains("expir") || lower.contains("name server") || lower.contains("status") ||
                   lower.contains("registrant") || lower.contains("admin") || lower.contains("tech")
        }
        if filtered.isEmpty {
            print(output.trimmingCharacters(in: .whitespacesAndNewlines))
        } else {
            print(filtered.joined(separator: "\n"))
        }
    }
}

// MARK: - Serve

struct NetServe: AsyncParsableCommand {
    static let configuration = CommandConfiguration(commandName: "serve", abstract: "Serve current directory over HTTP")

    @Option(name: .shortAndLong, help: "Port")
    var port: Int = 8080

    @Option(name: .long, help: "Directory to serve")
    var directory: String = "."

    mutating func run() throws {
        let absDir = URL(fileURLWithPath: directory).standardized.path
        print("Serving \(absDir) at http://localhost:\(port)")
        print("Press Ctrl+C to stop")

        let process = Process()
        process.executableURL = URL(fileURLWithPath: "/usr/bin/python3")
        process.arguments = ["-m", "http.server", "\(port)", "--directory", absDir]
        try process.run()
        process.waitUntilExit()
    }
}

// MARK: - HTTP

struct NetHTTP: AsyncParsableCommand {
    static let configuration = CommandConfiguration(commandName: "http", abstract: "Make HTTP request and show response")

    @Argument(help: "URL")
    var url: String

    @Option(name: .shortAndLong, help: "HTTP method (GET, POST, PUT, DELETE, PATCH)")
    var method: String = "GET"

    @Option(name: .shortAndLong, help: "Request body (JSON string)")
    var data: String?

    @Option(name: .long, help: "Header in key:value format (repeatable)")
    var header: [String] = []

    @Flag(name: .long, help: "Show only response body")
    var body = false

    @Flag(name: .long, help: "Show only status code")
    var status = false

    mutating func run() async throws {
        guard let httpMethod = HTTPMethod(rawValue: method.uppercased()) else {
            print("Invalid method: \(method). Use GET, POST, PUT, DELETE, PATCH")
            return
        }

        var headers: [String: String] = [:]
        for h in header {
            let parts = h.split(separator: ":", maxSplits: 1).map(String.init)
            if parts.count == 2 {
                headers[parts[0].trimmingCharacters(in: .whitespaces)] = parts[1].trimmingCharacters(in: .whitespaces)
            }
        }

        var bodyData: Data?
        if let data = data {
            bodyData = data.data(using: .utf8)
            if headers["Content-Type"] == nil {
                headers["Content-Type"] = "application/json"
            }
        }

        let resp = try await Requests.fetch(
            url, method: httpMethod,
            headers: headers, body: bodyData, timeout: 30
        )

        if status {
            print(resp.statusCode)
        } else if body {
            print(String(data: resp.data, encoding: .utf8) ?? "<binary>")
        } else {
            print("HTTP \(resp.statusCode)")
            for (key, value) in resp.headers.prefix(20) {
                print("\(key): \(value)")
            }
            if !resp.data.isEmpty {
                print()
                print(String(data: resp.data, encoding: .utf8) ?? "<binary>")
            }
        }
    }
}

// MARK: - Process Helper

@discardableResult
private func runProcess(executable: String, args: [String], input: String? = nil, timeout: TimeInterval = 30) throws -> String {
    let process = Process()
    process.executableURL = URL(fileURLWithPath: executable)
    process.arguments = args

    let outPipe = Pipe()
    let inPipe = Pipe()
    process.standardOutput = outPipe
    process.standardError = outPipe
    process.standardInput = inPipe

    try process.run()

    if let input = input {
        inPipe.fileHandleForWriting.write(input.data(using: .utf8)!)
        inPipe.fileHandleForWriting.closeFile()
    }

    let start = Date()
    while process.isRunning && Date().timeIntervalSince(start) < timeout {
        usleep(100_000)
    }
    if process.isRunning {
        process.terminate()
        throw NetError.timeout(executable)
    }

    let data = outPipe.fileHandleForReading.readDataToEndOfFile()
    guard let output = String(data: data, encoding: .utf8) else {
        throw NetError.invalidOutput
    }

    return output
}

private enum NetError: Error, CustomStringConvertible {
    case timeout(String)
    case invalidOutput

    var description: String {
        switch self {
        case .timeout(let cmd): return "\(cmd) timed out"
        case .invalidOutput: return "Invalid command output"
        }
    }
}
