import SwiftUI

struct MenuBarView: View {
    @ObservedObject var viewModel: MixerViewModel
    @State private var showingSettings = false

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 0) {
                headerSection

                Divider()

                systemVolumeSection

                Divider()

                if !viewModel.audioApplications.isEmpty {
                    audioApplicationsList
                    Divider()
                }

                footerSection
            }
            .padding(.vertical, 8)
        }
        .frame(width: 300, height: 400)
    }

    private var headerSection: some View {
        HStack {
            Text("Mixer")
                .font(.headline)
            Spacer()
            Button(action: { viewModel.refreshAudioApplications() }) {
                Image(systemName: "arrow.clockwise")
                    .font(.caption)
            }
            .buttonStyle(.plain)
        }
        .padding(.horizontal, 12)
    }

    private var systemVolumeSection: some View {
        VStack(alignment: .leading, spacing: 8) {
            if let device = viewModel.currentDevice {
                HStack {
                    Button(action: { viewModel.toggleSystemMute() }) {
                        Image(systemName: device.isMuted ? "speaker.slash" : "speaker.wave.3")
                            .font(.title3)
                    }
                    .buttonStyle(.plain)

                    Slider(
                        value: Binding(
                            get: { device.volume },
                            set: { viewModel.setSystemVolume($0) }
                        ),
                        in: 0...1
                    )

                    Text("\(Int(device.volume * 100))%")
                        .font(.caption)
                        .frame(width: 35, alignment: .trailing)
                }
            }
        }
        .padding(.horizontal, 12)
        .padding(.vertical, 8)
    }

    private var audioApplicationsList: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text("Applications")
                .font(.caption)
                .foregroundColor(.secondary)
                .padding(.horizontal, 12)

            ForEach(viewModel.audioApplications) { app in
                AudioApplicationRow(
                    application: app,
                    onVolumeChange: nil,
                    onMuteToggle: nil
                )
            }
        }
        .padding(.top, 4)
    }

    private var footerSection: some View {
        HStack {
            if let device = viewModel.currentDevice {
                Image(systemName: "speaker.wave.2")
                    .font(.caption)
                    .foregroundColor(.secondary)
                Text(device.name)
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
            Spacer()
            Button("Settings") {
                openSettings()
            }
            .buttonStyle(.plain)
            .font(.caption)

            Divider()
                .frame(height: 12)

            Button("Quit") {
                NSApplication.shared.terminate(nil)
            }
            .buttonStyle(.plain)
            .font(.caption)
        }
        .padding(.horizontal, 12)
        .padding(.top, 8)
    }

    private func openSettings() {
        NSApp.setActivationPolicy(.regular)
        if #available(macOS 14.0, *) {
            NSApp.activate()
        } else {
            NSApp.activate(ignoringOtherApps: true)
        }
        NSApp.sendAction(Selector(("showSettingsWindow:")), to: nil, from: nil)
    }
}
