import ClipperCore
import Cocoa

final class PasteboardManager {
    static let shared = PasteboardManager()

    private let pasteboard = NSPasteboard.general
    private var lastChangeCount: Int

    private init() {
        lastChangeCount = pasteboard.changeCount
    }

    var hasNewContent: Bool {
        pasteboard.changeCount != lastChangeCount
    }

    func getLatestContent() -> String? {
        lastChangeCount = pasteboard.changeCount
        return pasteboard.string(forType: .string)
    }

    func copyToClipboard(_ content: String) {
        pasteboard.clearContents()
        pasteboard.setString(content, forType: .string)
    }
}
