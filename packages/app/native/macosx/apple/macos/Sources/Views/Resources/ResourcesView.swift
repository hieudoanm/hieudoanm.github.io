import AppKit
import MacOSXCore
import SwiftUI

/// The Resources tab: CPU, Memory, Storage, Swap, Battery, and System Info.
struct ResourcesView: View {
    @ObservedObject var memoryViewModel: MemoryViewModel
    @ObservedObject var batteryViewModel: BatteryViewModel

    @Environment(\.openWindow) private var openWindow

    private enum Section: Hashable {
        case overview
        case memory
        case disk
        case cpu
        case swap
        case battery
        case system
    }

    @State private var section: Section = .overview

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            header

            Divider()

            sectionPicker

            Divider()

            content
                .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .top)

            Divider()

            footer
        }
        .padding(14)
    }

    private var header: some View {
        HStack {
            Label("Resources", systemImage: "gauge.with.dots.needle.50percent")
                .font(.headline)
                .accessibilityElement(children: .combine)
            Spacer()
            Button(action: refreshAll) {
                Image(systemName: "arrow.clockwise")
                    .frame(width: 24, height: 24)
                    .contentShape(Rectangle())
                    .accessibilityLabel("Refresh")
            }
            .buttonStyle(.borderless)
            .help("Refresh")
        }
        .padding(.bottom, 16)
    }

    private var sectionPicker: some View {
        Picker("Section", selection: $section) {
            Text("Overview").tag(Section.overview)
            Text("Memory").tag(Section.memory)
            Text("Disk").tag(Section.disk)
            Text("CPU").tag(Section.cpu)
            Text("Swap").tag(Section.swap)
            Text("Battery").tag(Section.battery)
            Text("System").tag(Section.system)
        }
        .pickerStyle(.segmented)
        .labelsHidden()
        .accessibilityLabel("Resources section")
    }

    @ViewBuilder
    private var content: some View {
        switch section {
        case .overview:
            OverviewView(
                memoryViewModel: memoryViewModel,
                batteryViewModel: batteryViewModel
            )
            .transition(.opacity)
        case .memory:
            memorySection
                .transition(.opacity)
        case .disk:
            DiskView(stats: memoryViewModel.diskStats)
                .transition(.opacity)
        case .cpu:
            CPUView(stats: memoryViewModel.cpuStats)
                .transition(.opacity)
        case .swap:
            SwapView(stats: memoryViewModel.swapStats)
                .transition(.opacity)
        case .battery:
            BatterySectionView(viewModel: batteryViewModel)
                .transition(.opacity)
        case .system:
            SystemInfoView(info: memoryViewModel.systemInfo)
                .transition(.opacity)
        }
    }

    private var memorySection: some View {
        VStack(alignment: .leading, spacing: 14) {
            MemoryView(stats: memoryViewModel.memoryStats)

            pressureRow
        }
        .frame(maxWidth: .infinity, alignment: .leading)
    }

    private var pressureRow: some View {
        HStack {
            Text("Memory Pressure")
                .font(.caption)
                .foregroundColor(.secondary)
            Spacer()
            Text(memoryViewModel.memoryPressure.displayText)
                .font(.caption)
                .fontWeight(.medium)
                .monospacedDigit()
                .foregroundColor(pressureColor)
        }
        .accessibilityElement(children: .combine)
    }

    private var pressureColor: Color {
        switch memoryViewModel.memoryPressure {
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
        .padding(.top, 10)
    }

    private func refreshAll() {
        memoryViewModel.refresh()
        batteryViewModel.refresh()
    }

    private func openSettings() {
        NSApp.setActivationPolicy(.regular)
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.1) {
            NSApp.activate(ignoringOtherApps: true)
            openWindow(id: SettingsView.windowID)
        }
    }
}