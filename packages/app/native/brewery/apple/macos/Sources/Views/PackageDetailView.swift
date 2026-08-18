import BreweryCore
import SwiftUI

struct PackageDetailView: View {
    let package: Package
    let isLoading: Bool
    let onInstall: () -> Void
    let onUpgrade: () -> Void
    let onUninstall: () -> Void

    @State private var confirmUninstall = false

    var body: some View {
        VStack(alignment: .leading, spacing: 20) {
            HStack(alignment: .top, spacing: 14) {
                Image(systemName: package.type == .formula ? "terminal" : "app.dashed")
                    .font(.system(size: 40))
                    .foregroundStyle(.tint)
                    .accessibilityHidden(true)
                VStack(alignment: .leading, spacing: 4) {
                    Text(package.name)
                        .font(.largeTitle.bold())
                    Text(typeDescription)
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                }
                Spacer()
            }

            if !package.description.isEmpty {
                Text(package.description)
                    .font(.body)
            }

            infoGrid

            if !package.dependencies.isEmpty {
                VStack(alignment: .leading, spacing: 6) {
                    Text("Dependencies")
                        .font(.headline)
                    Text(package.dependencies.joined(separator: ", "))
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                }
            }

            if let homepage = package.homepage, !homepage.isEmpty {
                Link("Homepage", destination: URL(string: homepage)!)
            }

            Spacer()

            actionBar
        }
        .padding(24)
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
        .confirmationDialog(
            "Uninstall \(package.name)?",
            isPresented: $confirmUninstall,
            titleVisibility: .visible
        ) {
            Button("Uninstall", role: .destructive) { onUninstall() }
            Button("Cancel", role: .cancel) {}
        } message: {
            Text("This will remove the Homebrew package from your system.")
        }
    }

    private var typeDescription: String {
        package.type == .formula
            ? "Command-line tool (Formula)"
            : "macOS application (Cask)"
    }

    private var infoGrid: some View {
        Grid(alignment: .leading, horizontalSpacing: 24, verticalSpacing: 8) {
            GridRow {
                fieldLabel("Status")
                Text(statusText)
            }
            GridRow {
                fieldLabel("Installed")
                Text(package.installedVersionString)
            }
            if !package.currentVersion.isEmpty {
                GridRow {
                    fieldLabel("Latest")
                    Text(package.currentVersion)
                }
            }
        }
        .font(.body)
    }

    private func fieldLabel(_ text: String) -> some View {
        Text(text)
            .foregroundStyle(.secondary)
            .frame(minWidth: 90, alignment: .leading)
    }

    private var statusText: String {
        switch package.status {
        case .installed: return "Installed"
        case .outdated: return "Update available"
        case .notInstalled: return "Not installed"
        }
    }

    @ViewBuilder
    private var actionBar: some View {
        HStack {
            Spacer()
            if isLoading {
                ProgressView()
                    .controlSize(.small)
            }
            switch package.status {
            case .notInstalled:
                Button {
                    onInstall()
                } label: {
                    Label("Install", systemImage: "plus")
                }
                .keyboardShortcut(.defaultAction)
            case .installed:
                Button("Uninstall", role: .destructive) {
                    confirmUninstall = true
                }
            case .outdated:
                Button {
                    onUpgrade()
                } label: {
                    Label("Upgrade", systemImage: "arrow.up")
                }
                .keyboardShortcut(.defaultAction)
                Button("Uninstall", role: .destructive) {
                    confirmUninstall = true
                }
            }
        }
    }
}
