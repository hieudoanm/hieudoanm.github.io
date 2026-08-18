import SnapCore
import SwiftUI

struct PermissionView: View {
    @State private var isAccessibilityEnabled = false
    @State private var hasRequestedPermission = false

    var body: some View {
        VStack(spacing: 24) {
            Image(systemName: "lock.shield")
                .font(.system(size: 64))
                .foregroundColor(.accentColor)

            Text("Accessibility Permission Required")
                .font(.title2)
                .fontWeight(.semibold)

            Text("Snap needs Accessibility permission to move and resize your windows.")
                .multilineTextAlignment(.center)
                .foregroundColor(.secondary)
                .frame(maxWidth: 400)

            if isAccessibilityEnabled {
                Label("Accessibility permission granted", systemImage: "checkmark.circle.fill")
                    .foregroundColor(.green)
            } else {
                Button(action: requestPermission) {
                    Label(
                        hasRequestedPermission ? "Open System Settings" : "Grant Access",
                        systemImage: "arrow.up.right"
                    )
                    .frame(maxWidth: .infinity)
                }
                .controlSize(.large)

                if hasRequestedPermission {
                    Text("If the dialog didn't appear, open System Settings > Privacy & Security > Accessibility and add Snap.")
                        .font(.caption)
                        .foregroundColor(.secondary)
                        .multilineTextAlignment(.center)
                }
            }
        }
        .padding(40)
        .frame(minWidth: 500, minHeight: 400)
        .onAppear {
            checkAccessibility()
        }
    }

    private func checkAccessibility() {
        isAccessibilityEnabled = AccessibilityManager.shared.isAccessibilityEnabled
    }

    private func requestPermission() {
        AccessibilityManager.shared.requestAccessibility()
        hasRequestedPermission = true

        DispatchQueue.main.asyncAfter(deadline: .now() + 1.0) {
            checkAccessibility()
        }
    }
}
