import Foundation
import AppKit
import CoreGraphics

final class AudioProcessDiscovery {
    func getAudioApplications() -> [AudioApplication] {
        var seenPIDs = Set<pid_t>()
        var applications: [AudioApplication] = []

        if let windowInfoList = CGWindowListCopyWindowInfo([.optionOnScreenOnly, .excludeDesktopElements], kCGNullWindowID) as? [[String: Any]] {
            for windowInfo in windowInfoList {
                guard let layer = windowInfo[kCGWindowLayer as String] as? Int,
                      layer == 0,
                      let pid = windowInfo[kCGWindowOwnerPID as String] as? pid_t,
                      !seenPIDs.contains(pid) else { continue }

                seenPIDs.insert(pid)

                guard let app = NSRunningApplication(processIdentifier: pid),
                      app.activationPolicy == .regular else { continue }

                let audioApp = AudioApplication(
                    processID: pid,
                    bundleIdentifier: app.bundleIdentifier,
                    name: app.localizedName ?? "Unknown",
                    volume: 1.0,
                    isMuted: false,
                    isPlaying: false
                )
                applications.append(audioApp)
            }
        }

        for app in NSWorkspace.shared.runningApplications {
            guard app.activationPolicy == .regular,
                  !seenPIDs.contains(app.processIdentifier) else { continue }

            seenPIDs.insert(app.processIdentifier)

            let audioApp = AudioApplication(
                processID: app.processIdentifier,
                bundleIdentifier: app.bundleIdentifier,
                name: app.localizedName ?? "Unknown",
                volume: 1.0,
                isMuted: false,
                isPlaying: false
            )
            applications.append(audioApp)
        }

        return applications.sorted { $0.name.localizedCaseInsensitiveCompare($1.name) == .orderedAscending }
    }

    func setProcessVolume(processID: pid_t, volume: Float) {
    }

    func setProcessMuted(processID: pid_t, muted: Bool) {
    }
}
