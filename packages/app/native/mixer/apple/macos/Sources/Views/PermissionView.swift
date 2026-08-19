import SwiftUI

struct PermissionView: View {
    var body: some View {
        VStack(spacing: 20) {
            Image(systemName: "lock.shield")
                .font(.system(size: 48))
                .foregroundColor(.accentColor)

            Text("Audio Access Required")
                .font(.title2)
                .fontWeight(.semibold)

            Text("Mixer needs access to control audio volume for individual applications.")
                .multilineTextAlignment(.center)
                .foregroundColor(.secondary)

            VStack(alignment: .leading, spacing: 8) {
                PermissionRow(
                    icon: "speaker.wave.3",
                    title: "Audio Control",
                    description: "Adjust volume for each application"
                )
                PermissionRow(
                    icon: "speaker.slash",
                    title: "Mute Control",
                    description: "Mute individual applications"
                )
            }
            .padding()
            .background(RoundedRectangle(cornerRadius: 8).fill(Color.secondary.opacity(0.1)))

            Button("Open System Settings") {
                if let url = URL(string: "x-apple.systempreferences:com.apple.preference.security?Privacy_AudioCapture") {
                    NSWorkspace.shared.open(url)
                }
            }
            .buttonStyle(.borderedProminent)
        }
        .padding(40)
        .frame(width: 500, height: 400)
    }
}

private struct PermissionRow: View {
    let icon: String
    let title: String
    let description: String

    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: icon)
                .font(.title3)
                .foregroundColor(.accentColor)
                .frame(width: 24)

            VStack(alignment: .leading, spacing: 2) {
                Text(title)
                    .font(.subheadline)
                    .fontWeight(.medium)
                Text(description)
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
        }
    }
}
