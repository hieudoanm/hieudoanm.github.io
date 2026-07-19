import Foundation
import ArgumentParser
import Network
import os

struct PortCommand: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "port",
        abstract: "Port tools",
        subcommands: [PortCheck.self, PortFind.self, PortScan.self]
    )

    mutating func run() {}
}

struct PortCheck: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "check", abstract: "Check if a TCP port is open on a host")

    @Argument(help: "Hostname or IP address")
    var host: String

    @Argument(help: "Port number")
    var port: Int

    @Option(name: .shortAndLong, help: "Timeout in seconds")
    var timeout: TimeInterval = 5

    mutating func run() async throws {
        let start = Date()
        let isOpen = try await checkPort(host: host, port: port, timeout: timeout)
        let elapsed = String(format: "%.2fms", Date().timeIntervalSince(start) * 1000)

        if isOpen {
            print("\(green("✓")) Port \(port) on \(host) is \(green("open")) (\(elapsed))")
        } else {
            print("\(red("✗")) Port \(port) on \(host) is \(red("closed")) (\(elapsed))")
        }
    }
}

struct PortFind: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "find", abstract: "Find an available port in a range")

    @Option(name: .shortAndLong, help: "Start of port range")
    var start: Int = 1024

    @Option(name: .shortAndLong, help: "End of port range")
    var end: Int = 65535

    @Option(name: .shortAndLong, help: "Host to check")
    var host: String = "localhost"

    @Option(name: .long, help: "Number of available ports to find")
    var count: Int = 1

    mutating func run() async throws {
        var available: [Int] = []

        for port in start...end {
            if available.count >= count { break }
            let isOpen = try await checkPort(host: host, port: port, timeout: 2)
            if !isOpen {
                available.append(port)
            }
        }

        if available.isEmpty {
            print("No available ports found in range \(start)-\(end)")
        } else {
            for port in available {
                print("\(green("\(port)"))")
            }
        }
    }
}

struct PortScan: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "scan", abstract: "Scan common ports on a host")

    @Argument(help: "Hostname or IP address")
    var host: String

    @Option(name: .shortAndLong, help: "Timeout in seconds")
    var timeout: TimeInterval = 3

    @Option(name: .long, help: "Ports to scan (comma-separated)")
    var ports: String?

    @Flag(name: .long, help: "Show all ports (including closed)")
    var all = false

    mutating func run() async throws {
        let commonPorts: [Int: String] = [
            21: "FTP", 22: "SSH", 23: "Telnet", 25: "SMTP",
            53: "DNS", 80: "HTTP", 110: "POP3", 143: "IMAP",
            443: "HTTPS", 445: "SMB", 465: "SMTPS", 587: "SMTP",
            993: "IMAPS", 995: "POP3S", 1433: "MSSQL", 1521: "Oracle",
            2049: "NFS", 2375: "Docker", 2376: "Docker TLS",
            3306: "MySQL", 3389: "RDP", 5432: "PostgreSQL",
            5900: "VNC", 6379: "Redis", 8080: "HTTP-Alt",
            8443: "HTTPS-Alt", 9090: "HTTP-Alt2", 11211: "Memcached",
            27017: "MongoDB",
        ]

        let targetPorts: [Int]
        if let ports = ports {
            targetPorts = ports.split(separator: ",").compactMap { Int($0.trimmingCharacters(in: .whitespaces)) }
        } else {
            targetPorts = Array(commonPorts.keys).sorted()
        }

        print("Scanning \(host) (\(targetPorts.count) ports)...\n")

        let scanHost = host
        let scanTimeout = timeout
        await withTaskGroup(of: (Int, String, Bool).self) { group in
            for port in targetPorts {
                group.addTask { [scanHost, scanTimeout] in
                    let isOpen = (try? await checkPort(host: scanHost, port: port, timeout: scanTimeout)) ?? false
                    let service = commonPorts[port] ?? "unknown"
                    return (port, service, isOpen)
                }
            }

            var openPorts: [(Int, String)] = []
            var closedPorts: [(Int, String)] = []

            for await (port, service, isOpen) in group {
                if isOpen {
                    openPorts.append((port, service))
                } else {
                    closedPorts.append((port, service))
                }
            }

            openPorts.sort { $0.0 < $1.0 }
            closedPorts.sort { $0.0 < $1.0 }

            for (port, service) in openPorts {
                print("\(green("✓")) \(port)/tcp  \(green("open"))    \(service)")
            }

            if all {
                for (port, service) in closedPorts {
                    print("\(dim("✗")) \(port)/tcp  \(dim("closed"))  \(service)")
                }
            }

            print("\n\(openPorts.count) open / \(targetPorts.count) total ports")
        }
    }
}

private func checkPort(host: String, port: Int, timeout: TimeInterval) async throws -> Bool {
    return try await withCheckedThrowingContinuation { continuation in
        let connection = NWConnection(
            host: NWEndpoint.Host(host),
            port: NWEndpoint.Port(rawValue: UInt16(port))!,
            using: .tcp
        )
        let queue = DispatchQueue(label: "port-check-\(host)-\(port)")
        let resumed = OSAllocatedUnfairLock(initialState: false)

        connection.stateUpdateHandler = { state in
            switch state {
            case .ready:
                if !resumed.withLock({ $0 }) { resumed.withLock { $0 = true }; continuation.resume(returning: true) }
                connection.cancel()
            case .failed:
                if !resumed.withLock({ $0 }) { resumed.withLock { $0 = true }; continuation.resume(returning: false) }
                connection.cancel()
            case .cancelled:
                if !resumed.withLock({ $0 }) { resumed.withLock { $0 = true }; continuation.resume(returning: false) }
            default:
                break
            }
        }

        connection.start(queue: queue)

        DispatchQueue.global().asyncAfter(deadline: .now() + timeout) {
            if !resumed.withLock({ $0 }) {
                resumed.withLock { $0 = true }
                connection.cancel()
                continuation.resume(returning: false)
            }
        }
    }
}


