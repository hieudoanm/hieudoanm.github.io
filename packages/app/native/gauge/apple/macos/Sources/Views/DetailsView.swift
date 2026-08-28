import GaugeCore
import SwiftUI

struct DetailsView: View {
    @ObservedObject var viewModel: GaugeViewModel
    let showSmall: () -> Void

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
            Spacer()
            Button(action: showSmall) {
                Image(systemName: "chevron.up")
                    .accessibilityLabel("Show compact view")
            }
            .buttonStyle(.borderless)
            .help("Show compact view")
            Button(action: { viewModel.refresh() }) {
                Image(systemName: "arrow.clockwise")
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
            Text(viewModel.memoryPressure.rawValue.capitalized)
                .font(.caption)
                .fontWeight(.medium)
                .foregroundColor(pressureColor)
        }
    }

    private var pressureColor: Color {
        switch viewModel.memoryPressure {
        case .normal: return Color.secondary
        case .elevated: return Color.orange
        case .high: return Color.red
        case .unknown: return Color.secondary
        }
    }

    private var footer: some View {
        HStack {
            Button(action: openSettings) {
                Label("Settings", systemImage: "gear")
                    .font(.caption)
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
        NSApp.activate(ignoringOtherApps: true)
        NSApp.sendAction(Selector(("showSettingsWindow:")), to: nil, from: nil)
    }
}