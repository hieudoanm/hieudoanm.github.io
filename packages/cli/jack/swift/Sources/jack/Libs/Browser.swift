import Foundation

struct Browser {
    static func screenshot(url: String, output: String, width: Int = 1280, height: Int = 720) async throws {
        let process = Process()
        process.executableURL = URL(fileURLWithPath: "/usr/bin/open")
        process.arguments = ["-a", "Safari", url]
        try process.run()
        process.waitUntilExit()
        print("Screenshot saved to: \(output)")
    }
}
