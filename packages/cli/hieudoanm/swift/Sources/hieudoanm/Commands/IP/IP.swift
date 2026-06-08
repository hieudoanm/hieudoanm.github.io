import Foundation
import ArgumentParser

struct IP: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "ip",
        abstract: "IP address tools",
        subcommands: [IPInfo.self, IPDNS.self]
    )

    mutating func run() {}
}

struct IPInfo: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "info", abstract: "Show IP information")

    @Flag(name: .long, help: "Raw JSON output")
    var raw = false

    mutating func run() async throws {
        let ipData = try await requestsFetch(method: "GET", url: "https://api.ipify.org?format=json")
        let ipJSON = try JSONSerialization.jsonObject(with: ipData) as? [String: Any]
        let ip = ipJSON?["ip"] as? String ?? ""

        // Try IPinfo.io
        var locData: Data?
        do {
            locData = try await requestsFetch(method: "GET", url: "https://ipinfo.io/\(ip)/json")
        } catch {
            // Fallback to ipapi.co
            locData = try? await requestsFetch(method: "GET", url: "https://ipapi.co/\(ip)/json")
        }

        if raw {
            print(String(data: locData ?? ipData, encoding: .utf8) ?? "{}")
        } else {
            print("IP: \(ip)")
            if let loc = locData, let json = try? JSONSerialization.jsonObject(with: loc) as? [String: Any] {
                if let city = json["city"] as? String { print("City: \(city)") }
                if let region = json["region"] as? String { print("Region: \(region)") }
                if let country = json["country"] as? String { print("Country: \(country)") }
                if let org = json["org"] as? String { print("ISP: \(org)") }
                if let loc = json["loc"] as? String { print("Location: \(loc)") }
                if let vpn = json["vpn"] as? Bool { print("VPN: \(vpn)") }
                if let proxy = json["proxy"] as? Bool { print("Proxy: \(proxy)") }
            }
        }
    }
}

struct IPDNS: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "dns", abstract: "DNS lookup")

    @Argument(help: "Domain name")
    var domain: String

    mutating func run() async throws {
        let data = try await requestsFetch(method: "GET", url: "https://cloudflare-dns.com/dns-query?name=\(domain)&type=A",
                                          options: RequestsOptions(headers: ["Accept": "application/dns-json"]))
        let json = try JSONSerialization.jsonObject(with: data) as? [String: Any]
        if let answers = json?["Answer"] as? [[String: Any]] {
            for answer in answers {
                if answer["type"] as? Int == 1 {
                    print(answer["data"] as? String ?? "")
                }
            }
        } else {
            print("No DNS records found")
        }
    }
}

private extension RequestsOptions {
    init(headers: [String: String]) {
        self.init()
        self.headers = headers
    }
}
