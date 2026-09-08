import AppKit
import BreweryCore
import SwiftUI

/// A row that shows a locally installed app with its icon, metadata, and
/// source-of-truth hint (Homebrew cask).
struct AppRow: View {
    let app: InstalledApp

    var body: some View {
        HStack(spacing: 12) {
            Image(nsImage: icon)
                .resizable()
                .frame(width: 28, height: 28)
                .accessibilityHidden(true)

            VStack(alignment: .leading, spacing: 2) {
                HStack(spacing: 6) {
                    Text(app.name)
                        .font(.headline)
                    if let token = app.caskToken {
                        Text(verbatim: "Homebrew cask · \(token)")
                            .font(.caption2)
                            .foregroundStyle(.secondary)
                    }
                }
                Text(subtitle)
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
                    .lineLimit(1)
            }

            Spacer()

            if let version = app.version {
                Text(version)
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
            }
        }
        .padding(.vertical, 2)
    }

    private var icon: NSImage {
        NSWorkspace.shared.icon(forFile: app.path)
    }

    private var subtitle: String {
        let path = URL(fileURLWithPath: app.path)
            .deletingLastPathComponent()
            .path
        if let identifier = app.bundleIdentifier {
            return "\(path) · \(identifier)"
        }
        return path
    }
}