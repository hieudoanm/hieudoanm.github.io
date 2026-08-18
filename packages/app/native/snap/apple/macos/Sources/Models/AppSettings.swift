import Foundation
import CoreGraphics

struct AppSettings: Codable, Equatable {
    var launchAtLogin: Bool
    var showInDock: Bool
    var restoreOnMonitorChange: Bool

    init(
        launchAtLogin: Bool = false,
        showInDock: Bool = false,
        restoreOnMonitorChange: Bool = false
    ) {
        self.launchAtLogin = launchAtLogin
        self.showInDock = showInDock
        self.restoreOnMonitorChange = restoreOnMonitorChange
    }

    static let `default` = AppSettings()
}
