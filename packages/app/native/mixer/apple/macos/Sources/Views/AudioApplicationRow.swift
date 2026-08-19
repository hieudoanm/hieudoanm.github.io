import SwiftUI

struct AudioApplicationRow: View {
    let application: AudioApplication
    let onVolumeChange: ((Float) -> Void)?
    let onMuteToggle: (() -> Void)?

    @State private var volume: Float

    init(
        application: AudioApplication,
        onVolumeChange: ((Float) -> Void)? = nil,
        onMuteToggle: (() -> Void)? = nil
    ) {
        self.application = application
        self.onVolumeChange = onVolumeChange
        self.onMuteToggle = onMuteToggle
        self._volume = State(initialValue: application.volume)
    }

    var body: some View {
        HStack(spacing: 8) {
            applicationIcon
            applicationInfo
            Spacer()
            if onVolumeChange != nil {
                volumeSlider
                volumeLabel
            }
        }
        .padding(.horizontal, 12)
        .padding(.vertical, 4)
    }

    private var applicationIcon: some View {
        Group {
            if let bundleID = application.bundleIdentifier {
                Image(nsImage: NSWorkspace.shared.icon(forFile: NSWorkspace.shared.urlForApplication(withBundleIdentifier: bundleID)?.path ?? ""))
                    .resizable()
                    .frame(width: 16, height: 16)
            } else {
                Image(systemName: "app.fill")
                    .font(.caption)
                    .foregroundColor(.secondary)
                    .frame(width: 16, height: 16)
            }
        }
    }

    private var applicationInfo: some View {
        VStack(alignment: .leading, spacing: 2) {
            Text(application.name)
                .font(.caption)
                .lineLimit(1)
        }
    }

    private var volumeSlider: some View {
        Slider(value: $volume, in: 0...1) { _ in
            onVolumeChange?(volume)
        }
        .frame(width: 100)
    }

    private var volumeLabel: some View {
        Text("\(Int(volume * 100))%")
            .font(.caption2)
            .foregroundColor(.secondary)
            .frame(width: 35, alignment: .trailing)
    }
}
