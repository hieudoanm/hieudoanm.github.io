import GaugeCore
import SwiftUI

struct SmallView: View {
    @ObservedObject var viewModel: GaugeViewModel
    let showDetails: () -> Void

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            header

            Divider()

            row(
                icon: "cpu",
                title: "CPU",
                percent: viewModel.cpuPercentText,
                valueText: nil,
                isAvailable: viewModel.cpuStats != nil,
                threshold: cpuThreshold
            )

            row(
                icon: "memorychip",
                title: "Memory",
                percent: viewModel.memoryPercentText,
                valueText: viewModel.memoryValueText,
                isAvailable: viewModel.memoryStats != nil,
                threshold: memoryThreshold
            )

            row(
                icon: "internaldrive",
                title: "Storage",
                percent: viewModel.diskPercentText,
                valueText: viewModel.diskValueText,
                isAvailable: viewModel.diskStats != nil,
                threshold: diskThreshold
            )

            row(
                icon: "arrow.triangle.2.circlepath",
                title: "Swap",
                percent: viewModel.swapPercentText,
                valueText: viewModel.swapValueText,
                isAvailable: swapEnabled,
                threshold: swapThreshold
            )
        }
        .padding(16)
    }

    private var header: some View {
        HStack {
            Label("Gauge", systemImage: "gauge.with.dots.needle.50percent")
                .font(.headline)
            Spacer()
            Button(action: showDetails) {
                Image(systemName: "chevron.down")
                    .accessibilityLabel("Show details")
            }
            .buttonStyle(.borderless)
            .help("Show details")
        }
    }

    private var swapEnabled: Bool {
        (viewModel.swapStats?.totalBytes ?? 0) > 0
    }

    private var memoryThreshold: UsageThreshold {
        viewModel.memoryStats.map { ThresholdMonitor.status(for: $0.usagePercentage) } ?? .normal
    }

    private var diskThreshold: UsageThreshold {
        viewModel.diskStats.map { ThresholdMonitor.status(for: $0.usagePercentage) } ?? .normal
    }

    private var cpuThreshold: UsageThreshold {
        viewModel.cpuStats.map { ThresholdMonitor.status(for: $0.usage) } ?? .normal
    }

    private var swapThreshold: UsageThreshold {
        viewModel.swapStats.map { ThresholdMonitor.status(for: $0.usagePercentage) } ?? .normal
    }

    private func row(
        icon: String,
        title: String,
        percent: String,
        valueText: String?,
        isAvailable: Bool,
        threshold: UsageThreshold
    ) -> some View {
        HStack(spacing: 12) {
            Image(systemName: icon)
                .foregroundColor(.secondary)

            VStack(alignment: .leading, spacing: 2) {
                Text(title)
                    .font(.caption)
                    .foregroundColor(.secondary)
                if let valueText {
                    Text(valueText)
                        .font(.system(.callout, design: .monospaced))
                        .monospacedDigit()
                        .foregroundColor(.primary)
                } else if !isAvailable {
                    Text("Unable to read")
                        .font(.system(.callout, design: .monospaced))
                        .foregroundColor(.secondary)
                }
            }

            Spacer()

            Text(percent)
                .font(.system(.title3, design: .rounded))
                .fontWeight(.semibold)
                .monospacedDigit()
                .foregroundColor(Color(usageThreshold: threshold))
        }
    }
}