import GaugeCore
import SwiftUI

/// A single saved workspace with a restore action.
struct WorkspaceRow: View {
    let workspace: Workspace
    let onRestore: () -> Void

    var body: some View {
        HStack(spacing: 12) {
            VStack(alignment: .leading, spacing: 2) {
                Text(workspace.name)
                    .font(.callout)
                    .foregroundColor(.primary)
                    .lineLimit(1)
                Text(subtitle)
                    .font(.caption)
                    .foregroundColor(.secondary)
                    .lineLimit(1)
            }

            Spacer()

            Button(action: onRestore) {
                Label("Restore", systemImage: "arrow.counterclockwise")
            }
            .buttonStyle(.borderless)
            .disabled(!restorable)
            .help(restorable ? "Restore \(workspace.name)" : "Nothing to restore")
        }
        .padding(.vertical, 6)
        .padding(.horizontal, 10)
        .accessibilityElement(children: .combine)
        .accessibilityLabel("\(workspace.name), \(workspace.windows.count) windows")
        .accessibilityHint("Restores this workspace")
    }

    private var restorable: Bool {
        workspace.windows.isEmpty == false
    }

    private var subtitle: String {
        let windows = workspace.windows.count
        let apps = workspace.appCount
        let date = workspace.updatedAt.formatted(date: .abbreviated, time: .omitted)
        return "\(windows) window\(windows == 1 ? "" : "s") · \(apps) app\(apps == 1 ? "" : "s") · \(date)"
    }
}