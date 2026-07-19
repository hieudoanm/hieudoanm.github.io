import BreweryCore
import SwiftUI

struct UpdatesView: View {
    @ObservedObject var viewModel: BreweryViewModel

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            header

            Divider()

            if viewModel.outdatedPackages.isEmpty {
                upToDateView
            } else {
                outdatedList
            }
        }
        .navigationTitle("Updates")
    }

    private var header: some View {
        HStack {
            VStack(alignment: .leading, spacing: 4) {
                Text("Updates")
                    .font(.largeTitle.bold())
                Text(summaryText)
                    .foregroundStyle(.secondary)
            }
            Spacer()
            Button {
                Task { await viewModel.refreshHomebrew() }
            } label: {
                Label("Check for Updates", systemImage: "arrow.clockwise.circle")
            }
            .disabled(viewModel.isLoading)
            if case let count = viewModel.outdatedPackages.count, count > 0 {
                Button {
                    Task { await viewModel.upgradeAll() }
                } label: {
                    Label("Upgrade All", systemImage: "arrow.up.circle")
                }
                .disabled(viewModel.isLoading)
            }
        }
        .padding(20)
    }

    private var summaryText: String {
        let count = viewModel.outdatedPackages.count
        return count == 1 ? "1 package can be upgraded" : "\(count) packages can be upgraded"
    }

    private var outdatedList: some View {
        List(viewModel.outdatedPackages) { package in
            HStack {
                VStack(alignment: .leading, spacing: 2) {
                    Text(package.name)
                        .font(.headline)
                    HStack(spacing: 6) {
                        Text(package.installedVersion ?? "unknown")
                            .strikethrough()
                            .foregroundStyle(.secondary)
                        Image(systemName: "arrow.right")
                            .foregroundStyle(.secondary)
                            .font(.caption)
                        Text(package.currentVersion)
                    }
                    .font(.subheadline)
                }
                Spacer()
                Button {
                    Task { await viewModel.upgrade(package) }
                } label: {
                    Image(systemName: "arrow.up")
                        .accessibilityLabel("Upgrade \(package.name)")
                }
                .disabled(viewModel.isLoading)
            }
            .padding(.vertical, 4)
        }
    }

    private var upToDateView: some View {
        VStack(spacing: 12) {
            Image(systemName: "checkmark.seal")
                .font(.system(size: 44))
                .foregroundStyle(.green)
            Text("All packages are up to date")
                .font(.headline)
            Text("Use Check for Updates to refresh Homebrew metadata.")
                .foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }
}
