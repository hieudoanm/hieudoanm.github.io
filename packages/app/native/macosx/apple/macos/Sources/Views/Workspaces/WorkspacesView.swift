import MacOSXCore
import SwiftUI

/// The Workspaces tab: save the current apps and window positions, then
/// restore them later (launching missing apps) with one click.
struct WorkspacesView: View {
    @ObservedObject var viewModel: WorkspacesViewModel

    @State private var showingSaveDialog = false
    @State private var newWorkspaceName = ""

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            header

            Divider()

            if !viewModel.hasAccessibilityPermission {
                permissionBanner
                Divider()
            }

            if viewModel.isRestoring {
                restoringBanner
                Divider()
            } else if let message = viewModel.restoreMessage {
                messageBanner(message)
                Divider()
            }

            if viewModel.workspaces.isEmpty {
                emptyState
            } else {
                workspaceList
            }
        }
        .padding(14)
        .onAppear {
            viewModel.refresh()
            viewModel.checkAccessibilityPermission()
        }
        .alert("Save Workspace", isPresented: $showingSaveDialog) {
            TextField("Workspace name", text: $newWorkspaceName)
            Button("Save") {
                viewModel.saveCurrentWorkspace(name: newWorkspaceName)
                newWorkspaceName = ""
            }
            Button("Cancel", role: .cancel) {
                newWorkspaceName = ""
            }
        } message: {
            Text("Captures running apps and their window positions on all displays.")
        }
    }

    private var header: some View {
        HStack {
            Label("Workspaces", systemImage: "square.grid.2x2")
                .font(.headline)
                .accessibilityElement(children: .combine)
            Spacer()
            Text("\(viewModel.workspaces.count) saved")
                .font(.caption)
                .monospacedDigit()
                .foregroundColor(.secondary)
            Button {
                showingSaveDialog = true
            } label: {
                Image(systemName: "square.and.arrow.down")
                    .frame(width: 24, height: 24)
                    .contentShape(Rectangle())
                    .accessibilityLabel("Save Current Workspace")
            }
            .buttonStyle(.borderless)
            .help("Save Current Workspace")
        }
        .padding(.bottom, 16)
    }

    private var permissionBanner: some View {
        HStack(spacing: 8) {
            Image(systemName: "hand.raised.fill")
                .foregroundColor(.orange)
                .accessibilityHidden(true)
            Text("Accessibility permission is needed to arrange windows.")
                .font(.caption)
                .foregroundColor(.secondary)
            Spacer()
            Button("Grant") {
                viewModel.requestAccessibilityPermission()
            }
            .controlSize(.small)
        }
        .padding(.vertical, 8)
    }

    private var restoringBanner: some View {
        HStack(spacing: 8) {
            ProgressView()
                .controlSize(.small)
            Text("Restoring workspace…")
                .font(.caption)
                .foregroundColor(.secondary)
        }
        .padding(.vertical, 8)
    }

    private func messageBanner(_ message: String) -> some View {
        HStack(spacing: 8) {
            Image(systemName: "info.circle")
                .foregroundColor(.secondary)
                .accessibilityHidden(true)
            Text(message)
                .font(.caption)
                .foregroundColor(.secondary)
        }
        .padding(.vertical, 8)
    }

    private var workspaceList: some View {
        ScrollView {
            LazyVStack(alignment: .leading, spacing: 0) {
                ForEach(viewModel.workspaces) { workspace in
                    WorkspaceRow(
                        workspace: workspace,
                        onRestore: { viewModel.restore(workspace) }
                    )
                    .contextMenu {
                        Button("Restore") {
                            viewModel.restore(workspace)
                        }
                        Divider()
                        Button("Delete", role: .destructive) {
                            viewModel.remove(workspace)
                        }
                    }
                    if workspace.id != viewModel.workspaces.last?.id {
                        Divider()
                    }
                }
            }
        }
        .frame(maxHeight: 420)
    }

    private var emptyState: some View {
        VStack(spacing: 8) {
            Image(systemName: "square.grid.2x2")
                .font(.system(size: 28, weight: .regular))
                .foregroundColor(.secondary)
                .accessibilityHidden(true)
            Text("No saved workspaces")
                .font(.headline)
            Text("Save your current apps and window positions, then restore them with one click.")
                .font(.caption)
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 40)
        .accessibilityElement(children: .combine)
    }
}