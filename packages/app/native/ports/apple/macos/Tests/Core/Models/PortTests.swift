import Testing
import Foundation
@testable import PortsCore

@Suite("NetworkEndpoint")
struct NetworkEndpointTests {

    @Test("formats IPv4 address string")
    func ipv4AddressString() {
        let endpoint = NetworkEndpoint(port: 3000, protocolType: .tcp, address: "127.0.0.1")
        #expect(endpoint.addressString == "127.0.0.1:3000")
    }

    @Test("brackets IPv6 addresses")
    func ipv6AddressString() {
        let endpoint = NetworkEndpoint(port: 3000, protocolType: .tcp, address: "::1")
        #expect(endpoint.addressString == "[::1]:3000")
    }

    @Test("builds HTTP URL for an endpoint")
    func httpURL() {
        let endpoint = NetworkEndpoint(port: 3000, protocolType: .tcp, address: "127.0.0.1")
        #expect(endpoint.url?.absoluteString == "http://127.0.0.1:3000")
    }

    @Test("builds HTTP URL for an IPv6 endpoint")
    func ipv6URL() {
        let endpoint = NetworkEndpoint(port: 3000, protocolType: .tcp, address: "::1")
        #expect(endpoint.url?.absoluteString == "http://[::1]:3000")
    }

    @Test("treats localhost like an IPv4 host")
    func localhostAddressString() {
        let endpoint = NetworkEndpoint(port: 3000, protocolType: .tcp, address: "localhost")
        #expect(endpoint.addressString == "localhost:3000")
    }
}

@Suite("Port")
struct PortTests {

    private func makePort(
        portNumber: UInt16 = 3000,
        protocolType: NetworkProtocol = .tcp,
        address: String = "127.0.0.1",
        pid: Int32 = 18234,
        processName: String = "node"
    ) -> PortInfo {
        let endpoint = NetworkEndpoint(port: portNumber, protocolType: protocolType, address: address)
        return PortInfo(
            endpoint: endpoint,
            pid: pid,
            processName: processName,
            command: "next dev",
            executablePath: "/opt/homebrew/bin/node",
            workingDirectory: "/Users/me/Code/my-project"
        )
    }

    @Test("id is stable and unique across endpoint and pid")
    func idUniqueness() {
        let a = makePort()
        let b = makePort(portNumber: 4000)
        #expect(a.id != b.id)
        #expect(a.id == a.id)
    }

    @Test("matches by port number")
    func matchesPort() {
        #expect(makePort().matches("3000"))
    }

    @Test("matches by process name")
    func matchesProcessName() {
        #expect(makePort().matches("node"))
        #expect(makePort().matches("NODE"))
    }

    @Test("matches by pid")
    func matchesPID() {
        #expect(makePort().matches("18234"))
    }

    @Test("matches by project command")
    func matchesCommand() {
        #expect(makePort().matches("next dev"))
    }

    @Test("does not match unrelated query")
    func rejectsUnrelated() {
        #expect(!makePort().matches("postgres"))
    }

    @Test("matches UDP ports")
    func matchesUDP() {
        let udp = makePort(portNumber: 53, protocolType: .udp, processName: "mDNSResponder")
        #expect(udp.matches("udp"))
        #expect(udp.matches("mDNSResponder"))
    }
}