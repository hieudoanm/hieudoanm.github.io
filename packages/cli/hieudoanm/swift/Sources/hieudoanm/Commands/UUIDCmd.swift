import Foundation
import ArgumentParser

struct UUID: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "uuid",
        abstract: "Generate UUIDs"
    )

    @Flag(name: .long, help: "Generate UUID v7 instead of v4")
    var v7 = false

    mutating func run() {
        if v7 {
            print(generateUUIDv7())
        } else {
            print(Foundation.UUID().uuidString)
        }
    }
}

func generateUUIDv7() -> String {
    let timestamp = Int(Date().timeIntervalSince1970 * 1000)
    var uuid = [UInt8](repeating: 0, count: 16)

    uuid[0] = UInt8((timestamp >> 40) & 0xFF)
    uuid[1] = UInt8((timestamp >> 32) & 0xFF)
    uuid[2] = UInt8((timestamp >> 24) & 0xFF)
    uuid[3] = UInt8((timestamp >> 16) & 0xFF)
    uuid[4] = UInt8((timestamp >> 8) & 0xFF)
    uuid[5] = UInt8(timestamp & 0xFF)
    uuid[6] = UInt8((timestamp >> 40) & 0xFF)

    uuid[6] = (uuid[6] & 0x0F) | 0x70
    uuid[8] = (uuid[8] & 0x3F) | 0x80

    for i in 0..<16 {
        if uuid[i] == 0 {
            uuid[i] = UInt8.random(in: 0...255)
        }
    }

    return String(format: "%02X%02X%02X%02X-%02X%02X-%02X%02X-%02X%02X-%02X%02X%02X%02X%02X%02X",
                  uuid[0], uuid[1], uuid[2], uuid[3],
                  uuid[4], uuid[5], uuid[6], uuid[7],
                  uuid[8], uuid[9], uuid[10], uuid[11],
                  uuid[12], uuid[13], uuid[14], uuid[15])
}
