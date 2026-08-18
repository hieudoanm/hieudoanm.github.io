import SwiftUI

final class ClipperViewModel: ObservableObject {
    @Published var store = ClipperStore()
    @Published var showHistory = false
    @Published var showSettings = false

    private var monitor: ClipboardMonitor?

    init() {
        monitor = ClipboardMonitor(store: store)
        monitor?.start()
    }

    func openHistory() {
        showHistory = true
        NSApp.activate(ignoringOtherApps: true)
    }

    func openSettings() {
        showSettings = true
        NSApp.activate(ignoringOtherApps: true)
    }
}
