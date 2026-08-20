import SnapCore
import Foundation

final class WorkspaceManager {
    static let shared = WorkspaceManager()

    private let layoutStore = LayoutStore.shared

    var layouts: [SnapLayout] {
        layoutStore.layouts
    }

    func saveLayout(_ layout: SnapLayout) {
        layoutStore.save(layout)
    }

    func updateLayout(_ layout: SnapLayout) {
        layoutStore.update(layout)
    }

    func deleteLayout(id: UUID) {
        layoutStore.delete(id: id)
    }

    func restoreLayout(id: UUID) {
        guard let layout = layoutStore.layouts.first(where: { $0.id == id }) else {
            return
        }
        LayoutManager.shared.restoreLayout(layout)
    }

    func renameLayout(id: UUID, to newName: String) {
        guard var layout = layoutStore.layouts.first(where: { $0.id == id }) else {
            return
        }
        layout.name = newName
        layoutStore.update(layout)
    }
}
