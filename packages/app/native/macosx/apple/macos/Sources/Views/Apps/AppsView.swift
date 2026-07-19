import MacOSXCore
import SwiftUI

/// The Apps tab: running apps and saved workspaces.
struct AppsView: View {
    @ObservedObject var appsViewModel: AppsViewModel
    @ObservedObject var workspacesViewModel: WorkspacesViewModel

    private enum Section: Hashable {
        case running
        case workspaces
    }

    @State private var section: Section = .running

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            header

            Divider()

            sectionPicker

            Divider()

            content
                .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .top)
        }
        .padding(14)
        .task {
            appsViewModel.start()
        }
        .onDisappear {
            appsViewModel.stop()
        }
    }

    private var header: some View {
        HStack {
            Label("Apps", systemImage: "macwindow")
                .font(.headline)
                .accessibilityElement(children: .combine)
            Spacer()
            Button(action: refreshAll) {
                Image(systemName: "arrow.clockwise")
                    .frame(width: 24, height: 24)
                    .contentShape(Rectangle())
                    .accessibilityLabel("Refresh")
            }
            .buttonStyle(.borderless)
            .help("Refresh")
        }
        .padding(.bottom, 16)
    }

    private var sectionPicker: some View {
        Picker("Section", selection: $section) {
            Text("Running").tag(Section.running)
            Text("Workspaces").tag(Section.workspaces)
        }
        .pickerStyle(.segmented)
        .labelsHidden()
        .accessibilityLabel("Apps section")
    }

    @ViewBuilder
    private var content: some View {
        switch section {
        case .running:
            RunningAppsSectionView(viewModel: appsViewModel)
                .transition(.opacity)
        case .workspaces:
            WorkspacesSectionView(viewModel: workspacesViewModel)
                .transition(.opacity)
        }
    }

    private func refreshAll() {
        appsViewModel.refresh()
        workspacesViewModel.refresh()
    }
}