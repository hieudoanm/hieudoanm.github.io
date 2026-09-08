import AppKit
import BreweryCore
import SwiftUI

/// A large icon tile used by the Applications grid layout.
struct AppTile: View {
    let app: InstalledApp

    var body: some View {
        VStack(spacing: 8) {
            Image(nsImage: icon)
                .resizable()
                .frame(width: 56, height: 56)
                .accessibilityHidden(true)

            VStack(spacing: 3) {
                Text(app.name)
                    .font(.caption.weight(.semibold))
                    .lineLimit(1)
                    .truncationMode(.tail)
                    .multilineTextAlignment(.center)

                if let token = app.caskToken {
                    Text(verbatim: token)
                        .font(.caption2)
                        .foregroundStyle(.secondary)
                        .lineLimit(1)
                }
            }
        }
        .frame(maxWidth: .infinity)
        .padding(12)
        .background(
            RoundedRectangle(cornerRadius: 10)
                .fill(.quaternary.opacity(0.4))
        )
        .contentShape(RoundedRectangle(cornerRadius: 10))
    }

    private var icon: NSImage {
        NSWorkspace.shared.icon(forFile: app.path)
    }
}
