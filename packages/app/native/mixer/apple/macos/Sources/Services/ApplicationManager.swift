import MixerCore
import Foundation
import AppKit

final class ApplicationManager {
    func getApplicationName(for processID: pid_t) -> String? {
        let apps = NSWorkspace.shared.runningApplications
        return apps.first { $0.processIdentifier == processID }?.localizedName
    }

    func getBundleIdentifier(for processID: pid_t) -> String? {
        let apps = NSWorkspace.shared.runningApplications
        return apps.first { $0.processIdentifier == processID }?.bundleIdentifier
    }

    func getApplication(for processID: pid_t) -> NSRunningApplication? {
        let apps = NSWorkspace.shared.runningApplications
        return apps.first { $0.processIdentifier == processID }
    }

    func isApplicationRunning(bundleIdentifier: String) -> Bool {
        let apps = NSWorkspace.shared.runningApplications
        return apps.contains { $0.bundleIdentifier == bundleIdentifier }
    }

    func getRunningApplications() -> [NSRunningApplication] {
        return NSWorkspace.shared.runningApplications.filter {
            $0.activationPolicy == .regular
        }
    }
}
