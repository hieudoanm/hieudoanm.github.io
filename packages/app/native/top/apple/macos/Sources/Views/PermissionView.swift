import TopCore
import SwiftUI

struct PermissionView: View {
    @ObservedObject var viewModel: TopViewModel

    var body: some View {
        VStack(spacing: 12) {
            Image(systemName: "lock.shield")
                .font(.title2)
                .foregroundColor(.orange)

            Text("Accessibility Permission Required")
                .font(.subheadline)
                .fontWeight(.medium)

            Text("Top needs Accessibility access to pin windows on top of others.")
                .font(.caption)
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)

            Button("Open System Settings") {
                if let url = URL(string: "x-apple.systempreferences:com.apple.preference.security?Privacy_Accessibility") {
                    NSWorkspace.shared.open(url)
                }
            }
            .buttonStyle(.bordered)
            .controlSize(.small)

            Button("Check Again") {
                viewModel.checkPermission()
            }
            .buttonStyle(.borderless)
            .font(.caption)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 16)
        .padding(.horizontal, 12)
    }
}
