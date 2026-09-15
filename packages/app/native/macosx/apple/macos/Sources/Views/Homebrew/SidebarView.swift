import MacOSXCore
import SwiftUI

struct SidebarView: View {
    @ObservedObject var viewModel: HomebrewViewModel
    @Environment(\.openWindow) private var openWindow

    var body: some View {
        List(selection: $viewModel.selectedSection) {
            ForEach(groupedSections, id: \.group) { group in
                Section(group.group.title) {
                    ForEach(group.sections) { section in
                        Label(section.title, systemImage: section.systemImage)
                            .tag(section)
                    }
                }
            }
        }
        .listStyle(.sidebar)
        .navigationTitle("Homebrew")
        .toolbar {
            ToolbarItemGroup {
                Button {
                    Task { await viewModel.refreshAll() }
                } label: {
                    Label("Refresh", systemImage: "arrow.clockwise")
                }
                .help("Refresh")
                .keyboardShortcut("r", modifiers: .command)

                Button {
                    openSettings()
                } label: {
                    Image(systemName: "gearshape")
                        .accessibilityLabel("Settings")
                }
                .help("Settings")
                .keyboardShortcut(",", modifiers: .command)
            }
        }
    }

    private var groupedSections: [(group: HomebrewViewModel.Section.Group, sections: [HomebrewViewModel.Section])] {
        [
            (.applications, [.apps]),
            (.homebrew, [.discover, .installed, .updates, .services]),
        ]
    }

    private func openSettings() {
        openWindow(id: SettingsView.windowID)
    }
}
