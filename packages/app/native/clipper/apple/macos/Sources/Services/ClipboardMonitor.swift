import ClipperCore
import Foundation

final class ClipboardMonitor {
    private var timer: Timer?
    private let store: ClipperStore
    private let pasteboard = PasteboardManager.shared

    init(store: ClipperStore) {
        self.store = store
    }

    func start() {
        timer = Timer.scheduledTimer(withTimeInterval: 0.5, repeats: true) { [weak self] _ in
            self?.check()
        }
    }

    func stop() {
        timer?.invalidate()
        timer = nil
    }

    private func check() {
        guard pasteboard.hasNewContent, let content = pasteboard.getLatestContent() else { return }
        store.add(content)
    }
}
