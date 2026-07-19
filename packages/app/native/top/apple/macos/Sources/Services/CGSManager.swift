import Foundation
import ApplicationServices
import CoreGraphics

private let skyLightHandle = dlopen(
    "/System/Library/PrivateFrameworks/SkyLight.framework/SkyLight",
    RTLD_NOW
)

private typealias CGSConnection = UInt32
private typealias CGSWindowID = UInt32
private typealias CGSWindowLevel = Int32

public final class CGSManager {
    public static let shared = CGSManager()

    public var isAvailable: Bool {
        skyLightHandle != nil
    }

    private var _mainConnection: CGSConnection?
    private var _setWindowLevel: (@convention(c) (CGSConnection, CGSWindowID, CGSWindowLevel) -> Int32)?

    private init() {
        guard let handle = skyLightHandle else { return }

        if let sym = dlsym(handle, "CGSMainConnectionID") {
            _mainConnection = unsafeBitCast(
                sym,
                to: (@convention(c) () -> CGSConnection).self
            )()
        }

        if let sym = dlsym(handle, "CGSSetWindowLevel") {
            _setWindowLevel = unsafeBitCast(
                sym,
                to: (@convention(c) (CGSConnection, CGSWindowID, CGSWindowLevel) -> Int32).self
            )
        }
    }

    public func setWindowLevel(windowID: UInt32, level: Int32) -> Bool {
        guard let connection = _mainConnection,
              let setLevel = _setWindowLevel else {
            return false
        }
        let result = setLevel(connection, windowID, level)
        return result == 0
    }

    public func findWindowID(pid: pid_t, title: String) -> UInt32? {
        guard let windowList = CGWindowListCopyWindowInfo(
            [.optionAll],
            kCGNullWindowID
        ) as? [[String: Any]] else {
            return nil
        }

        for info in windowList {
            guard let windowPID = info[kCGWindowOwnerPID as String] as? pid_t,
                  windowPID == pid,
                  let windowTitle = info[kCGWindowName as String] as? String,
                  windowTitle == title,
                  let layer = info[kCGWindowLayer as String] as? Int,
                  layer == 0,
                  let windowID = info[kCGWindowNumber as String] as? UInt32 else {
                continue
            }
            return windowID
        }

        return nil
    }
}
