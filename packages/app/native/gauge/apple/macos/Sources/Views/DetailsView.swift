import GaugeCore
import SwiftUI

struct DetailsView: View {
    @ObservedObject var viewModel: GaugeViewModel
    let showSmall: () -> Void
    @Environment(\.openWindow) private var openWindow

    var body: some View {
        VStack(alignment: .leading, spacing: 14) {
            header

            Divider()

            CPUView(stats: viewModel.cpuStats)

            MemoryView(stats: viewModel.memoryStats)

            pressureRow

            DiskView(stats: viewModel.diskStats)

            SwapView(stats: viewModel.swapStats)

            SystemInfoView(info: viewModel.systemInfo)

            Divider()

            footer
        }
        .padding(16)
    }

    private var header: some View {
        HStack {
            Label("Gauge", systemImage: "gauge.with.dots.needle.50percent")
                .font(.headline)
                .accessibilityElement(children: .combine)
            Spacer()
            Button(action: showSmall) {
                Image(systemName: "chevron.up")
                    .frame(width: 24, height: 24)
                    .contentShape(Rectangle())
                    .accessibilityLabel("Show compact view")
            }
            .buttonStyle(.borderless)
            .help("Show compact view")
            Button(action: { viewModel.refresh() }) {
                Image(systemName: "arrow.clockwise")
                    .frame(width: 24, height: 24)
                    .contentShape(Rectangle())
                    .accessibilityLabel("Refresh")
            }
            .buttonStyle(.borderless)
            .help("Refresh")
        }
    }

    private var pressureRow: some View {
        HStack {
            Text("Memory Pressure")
                .font(.caption)
                .foregroundColor(.secondary)
            Spacer()
            Text(viewModel.memoryPressure.displayText)
                .font(.caption)
                .fontWeight(.medium)
                .monospacedDigit()
                .foregroundColor(pressureColor)
        }
        .accessibilityElement(children: .combine)
    }

    private var pressureColor: Color {
        switch viewModel.memoryPressure {
        case .normal: return Color.secondary
        case .warn: return Color.orange
        case .critical: return Color.red
        case .unknown: return Color.secondary
        }
    }

    private var footer: some View {
        HStack {
            Button(action: openSettings) {
                Label("Settings", systemImage: "gear")
                    .font(.caption)
                    .frame(height: 24)
                    .contentShape(Rectangle())
            }
            .buttonStyle(.borderless)
            Spacer()
            Button("Quit") {
                NSApplication.shared.terminate(nil)
            }
            .buttonStyle(.borderless)
            .font(.caption)
        }
    }

    private func openSettings() {
        NSApp.setActivationPolicy(.regular)
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.1) {
            NSApp.activate(ignoringOtherApps: true)
            openWindow(id: SettingsView.windowID)
        }
    }
}