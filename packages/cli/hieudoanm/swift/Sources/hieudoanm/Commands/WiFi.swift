import Foundation
import ArgumentParser
import CoreWLAN

struct WiFi: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "wifi",
        abstract: "Scan WiFi networks"
    )

    mutating func run() {
        #if os(macOS)
        let client = CWWiFiClient.shared()

        guard let interface = client.interface() else {
            print("[]")
            return
        }

        do {
            let networks = try interface.scanForNetworks(withSSID: nil)

            let results = networks.map { network -> WifiNetwork in
                var secure = false

                if network.responds(to: NSSelectorFromString("supportedSecurityTypes")) {
                    if let securityTypes = network.value(forKey: "supportedSecurityTypes") as? Set<Int> {
                        secure = !securityTypes.isEmpty
                    }
                } else if network.responds(to: NSSelectorFromString("security")) {
                    if let securityNumber = network.value(forKey: "security") as? Int {
                        secure = securityNumber != 0
                    }
                }

                let channelNumber = network.wlanChannel?.channelNumber ?? 0
                let ssidName = network.ssid?.trimmingCharacters(in: .whitespacesAndNewlines) ?? "<Hidden>"

                return WifiNetwork(
                    ssid: ssidName,
                    bssid: network.bssid ?? "",
                    rssi: network.rssiValue,
                    channel: channelNumber,
                    secure: secure
                )
            }

            let jsonData = try JSONEncoder().encode(results)
            if let jsonString = String(data: jsonData, encoding: .utf8) {
                print(jsonString)
            }
        } catch {
            print("[]")
        }
        #else
        print("WiFi scanning not supported on this platform")
        #endif
    }
}

private struct WifiNetwork: Codable {
    let ssid: String
    let bssid: String
    let rssi: Int
    let channel: Int
    let secure: Bool
}
