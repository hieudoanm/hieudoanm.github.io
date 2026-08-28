import GaugeCore
import SwiftUI

struct MenuBarView: View {
    @ObservedObject var viewModel: GaugeViewModel

    var body: some View {
        VStack(alignment: .leading, spacing: 14) {
            header

            Divider()

            MemoryView(stats: viewModel.memoryStats)

            DiskView(stats: viewModel.diskStats)

            pressureRow

            Divider()

            footer
        }
        .padding(16)
        .frame(width: 280)
        .onAppear {
            viewModel.refresh()
        }
    }

    private var header: some View {
        HStack {
            Label("Gauge", systemImage: "gauge.with.dots.needle.50percent")
                .font(.headline)
            Spacer()
            Button(action: { viewModel.refresh() }) {
                Image(systemName: "arrow.clockwise")
            }
            .buttonStyle(.borderless)
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