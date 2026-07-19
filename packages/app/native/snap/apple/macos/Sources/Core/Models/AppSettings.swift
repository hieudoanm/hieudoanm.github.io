import Foundation
import CoreGraphics

public struct AppSettings: Codable, Equatable {
    public var launchAtLogin: Bool
    public var showInDock: Bool
    public var restoreOnMonitorChange: Bool

    public init(
        launchAtLogin: Bool = false,
        showInDock: Bool = false,
        restoreOnMonitorChange: Bool = false
    ) {
        self.launchAtLogin = launchAtLogin
        self.showInDock = showInDock
        self.restoreOnMonitorChange = restoreOnMonitorChange
    }

    public static let `default` = AppSettings()
}
