import AppKit
import BreweryCore
import SwiftUI

struct SidebarView: View {
    @ObservedObject var viewModel: BreweryViewModel

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
        .navigationTitle("Brewery")
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

    private var groupedSections: [(group: BreweryViewModel.Section.Group, sections: [BreweryViewModel.Section])] {
        [
            (.applications, [.apps]),
            (.homebrew, [.discover, .installed, .updates, .services]),
        ]
    }

    private func openSettings() {
        NSApp.sendAction(Selector(("showSettingsWindow:")), to: nil, from: nil)
        NSApp.activate(ignoringOtherApps: true)
    }
}
