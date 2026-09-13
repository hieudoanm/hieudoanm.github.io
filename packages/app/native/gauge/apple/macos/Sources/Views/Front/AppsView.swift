import GaugeCore
import SwiftUI

/// The Apps tab: bring all of a running app's windows to the front.
struct AppsView: View {
    @ObservedObject var viewModel: AppsViewModel

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            header

            Divider()

            searchField

            Divider()

            if viewModel.filteredApps.isEmpty {
                emptyState
            } else {
                AppsListView(
                    apps: viewModel.filteredApps,
                    onSelect: { viewModel.bringAllWindowsToFront($0) }
                )
            }
        }
        .padding(14)
        .onAppear { viewModel.start() }
        .onDisappear { viewModel.stop() }
    }

    private var header: some View {
        HStack {
            Label("Front", systemImage: "macwindow")
                .font(.headline)
                .accessibilityElement(children: .combine)
            Spacer()
            Text("\(viewModel.apps.count) running")
                .font(.caption)
                .monospacedDigit()
                .foregroundColor(.secondary)
            Button {
                viewModel.refresh()
            } label: {
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

    private var searchField: some View {
        HStack(spacing: 6) {
            Image(systemName: "magnifyingglass")
                .foregroundColor(.secondary)
                .accessibilityHidden(true)
            TextField("Search apps", text: $viewModel.searchQuery)
                .textFieldStyle(.plain)
                .font(.system(.body, design: .monospaced))
            if !viewModel.searchQuery.isEmpty {
                Button {
                    viewModel.searchQuery = ""
                } label: {
                    Image(systemName: "xmark.circle.fill")
                        .foregroundColor(.secondary)
                        .accessibilityLabel("Clear search")
                }
                .buttonStyle(.borderless)
                .help("Clear search")
            }
        }
        .padding(.vertical, 8)
    }

    private var emptyState: some View {
        VStack(spacing: 8) {
            Image(systemName: "macwindow")
                .font(.system(size: 28, weight: .regular))
                .foregroundColor(.secondary)
                .accessibilityHidden(true)
            Text(title)
                .font(.headline)
            Text(detail)
                .font(.caption)
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 40)
        .accessibilityElement(children: .combine)
    }

    private var title: String {
        viewModel.isFiltering ? "No matching apps" : "No running apps"
    }

    private var detail: String {
        viewModel.isFiltering
            ? "Try a different app name or bundle ID."
            : "Open apps with a Dock icon will appear here."
    }
}