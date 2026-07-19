import AppKit
import BreweryCore
import SwiftUI

struct SidebarView: View {
    @ObservedObject var viewModel: BreweryViewModel

    var body: some View {
        List(BreweryViewModel.Section.allCases, selection: $viewModel.selectedSection) { section in
            Label(section.title, systemImage: section.systemImage)
                .tag(section)
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

    private func openSettings() {
        NSApp.sendAction(Selector(("showSettingsWindow:")), to: nil, from: nil)
        NSApp.activate(ignoringOtherApps: true)
    }
}
