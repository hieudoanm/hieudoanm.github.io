import SwiftUI
import Carbon.HIToolbox

final class SnapViewModel: ObservableObject {
    @Published var layouts: [SnapLayout] = []
    @Published var hasAccessibilityPermission = false
    @Published var showPermissionWindow = false
    @Published var showLayoutList = false
    @Published var showSettingsWindow = false

    private let workspaceManager = WorkspaceManager.shared
    private let accessibilityManager = AccessibilityManager.shared
    private let workspaceMonitor = WorkspaceMonitor.shared

    init() {
        layouts = workspaceManager.layouts
        hasAccessibilityPermission = accessibilityManager.isAccessibilityEnabled
        setupShortcuts()
        workspaceMonitor.start()
    }

    func saveCurrentLayout(name: String) {
        let layout = LayoutManager.shared.captureCurrentLayout(name: name)
        workspaceManager.saveLayout(layout)
        refreshLayouts()
    }

    func restoreLayout(id: UUID) {
        workspaceManager.restoreLayout(id: id)
    }

    func updateLayout(_ layout: SnapLayout) {
        workspaceManager.updateLayout(layout)
        refreshLayouts()
    }

    func deleteLayout(id: UUID) {
        workspaceManager.deleteLayout(id: id)
        refreshLayouts()
    }

    func moveLayout(from source: IndexSet, to destination: Int) {
        layouts.move(fromOffsets: source, toOffset: destination)
    }

    func snapWindow(to zone: NormalizedRect) {
        let _ = WindowManager.shared.snapCurrentWindow(zone)
    }

    func openSettings() {
        showSettingsWindow = true
    }

    func checkAccessibility() {
        hasAccessibilityPermission = accessibilityManager.isAccessibilityEnabled
        if !hasAccessibilityPermission {
            showPermissionWindow = true
        }
    }

    private func refreshLayouts() {
        layouts = workspaceManager.layouts
    }

    private func setupShortcuts() {
        let shortcutManager = ShortcutManager.shared
        let cmdShift = UInt32(cmdKey) | UInt32(shiftKey)

        let keyCodes: [UInt32] = [
            UInt32(kVK_ANSI_1), UInt32(kVK_ANSI_2), UInt32(kVK_ANSI_3),
            UInt32(kVK_ANSI_4), UInt32(kVK_ANSI_5), UInt32(kVK_ANSI_6),
            UInt32(kVK_ANSI_7), UInt32(kVK_ANSI_8), UInt32(kVK_ANSI_9),
            UInt32(kVK_ANSI_0)
        ]

        let layoutIDs: [UInt32] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

        let pairCount = min(layouts.count, keyCodes.count)
        for index in 0..<pairCount {
            let shortcut = Shortcut(
                keyCode: keyCodes[index],
                modifiers: cmdShift
            )
            let layoutID = layoutIDs[index]
            shortcutManager.register(
                shortcut: shortcut,
                handler: { [weak self] in
                    DispatchQueue.main.async {
                        guard let self = self,
                              index < self.layouts.count else { return }
                        self.restoreLayout(id: self.layouts[index].id)
                    }
                },
                id: layoutID
            )
        }

        let saveShortcut = Shortcut(
            keyCode: UInt32(kVK_ANSI_S),
            modifiers: cmdShift
        )
        shortcutManager.register(
            shortcut: saveShortcut,
            handler: { [weak self] in
                DispatchQueue.main.async {
                    let timestamp = ISO8601DateFormatter().string(from: Date())
                    self?.saveCurrentLayout(name: "Layout \(timestamp)")
                }
            },
            id: 100
        )
    }
}
