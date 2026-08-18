import Foundation
import ApplicationServices

public final class AccessibilityManager {
    public static let shared = AccessibilityManager()

    public var isPermissionGranted: Bool {
        AXIsProcessTrusted()
    }

    public func requestPermission() {
        let options = [kAXTrustedCheckOptionPrompt.takeUnretainedValue(): true] as CFDictionary
        AXIsProcessTrustedWithOptions(options)
    }

    public func getWindows(for pid: pid_t) -> [AXUIElement] {
        let app = AXUIElementCreateApplication(pid)
        var value: CFTypeRef?
        let result = AXUIElementCopyAttributeValue(app, kAXWindowsAttribute as CFString, &value)
        guard result == .success else {
            NSLog("[Top] AX getWindows failed for pid \(pid): \(result.rawValue)")
            return []
        }
        guard let windows = value as? [AXUIElement] else {
            NSLog("[Top] AX getWindows: value not castable for pid \(pid)")
            return []
        }
        return windows
    }

    public func getWindowTitle(_ window: AXUIElement) -> String? {
        var value: CFTypeRef?
        let result = AXUIElementCopyAttributeValue(window, kAXTitleAttribute as CFString, &value)
        guard result == .success else { return nil }
        return value as? String
    }

    public func getWindowPID(_ window: AXUIElement) -> pid_t? {
        var pid: pid_t = 0
        let result = AXUIElementGetPid(window, &pid)
        guard result == .success else { return nil }
        return pid
    }
}
