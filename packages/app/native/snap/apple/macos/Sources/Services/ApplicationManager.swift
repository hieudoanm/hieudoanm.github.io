import Foundation
import AppKit

struct RunningApplication {
    let pid: pid_t
    let name: String
    let bundleIdentifier: String

    init?(processIdentifier pid: pid_t) {
        guard let app = NSRunningApplication(processIdentifier: pid),
              let name = app.localizedName,
              let bundleID = app.bundleIdentifier else {
            return nil
        }
        self.pid = pid
        self.name = name
        self.bundleIdentifier = bundleID
    }
}

final class ApplicationManager {
    static let shared = ApplicationManager()

    func runningApplications() -> [RunningApplication] {
        NSWorkspace.shared.runningApplications
            .compactMap { RunningApplication(processIdentifier: $0.processIdentifier) }
    }

    func findApplication(bundleIdentifier: String) -> RunningApplication? {
        runningApplications().first { $0.bundleIdentifier == bundleIdentifier }
    }

    func findApplication(name: String) -> RunningApplication? {
        runningApplications().first { $0.name.lowercased() == name.lowercased() }
    }

    func isApplicationRunning(bundleIdentifier: String) -> Bool {
        NSWorkspace.shared.runningApplications.contains {
            $0.bundleIdentifier == bundleIdentifier
        }
    }

    func launchApplication(bundleIdentifier: String) -> Bool {
        guard let url = NSWorkspace.shared.urlForApplication(withBundleIdentifier: bundleIdentifier) else {
            return false
        }
        let configuration = NSWorkspace.OpenConfiguration()
        configuration.activates = false
        NSWorkspace.shared.openApplication(at: url, configuration: configuration)
        return true
    }

    func waitUntilRunning(bundleIdentifier: String, timeout: TimeInterval = 10.0) -> Bool {
        let startTime = Date()
        while Date().timeIntervalSince(startTime) < timeout {
            if isApplicationRunning(bundleIdentifier: bundleIdentifier) {
                return true
            }
            Thread.sleep(forTimeInterval: 0.2)
        }
        return false
    }
}
