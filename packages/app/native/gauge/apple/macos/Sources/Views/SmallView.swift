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
                valueText: viewModel.cpuValueText,
                threshold: cpuThreshold
            )

            row(
                icon: "memorychip",
                title: "Memory",
                percent: viewModel.memoryPercentText,
                valueText: viewModel.memoryValueText,
                threshold: memoryThreshold
            )

            row(
                icon: "internaldrive",
                title: "Storage",
                percent: viewModel.diskPercentText,
                valueText: viewModel.diskValueText,
                threshold: diskThreshold
            )

            row(
                icon: "arrow.triangle.2.circlepath",
                title: "Swap",
                percent: viewModel.swapPercentText,
                valueText: viewModel.swapValueText,
                threshold: swapThreshold
            )
        }
        .padding(16)
    }

    private var header: some View {
        HStack {
            Label("Gauge", systemImage: "gauge.with.dots.needle.50percent")
                .font(.headline)
                .accessibilityElement(children: .combine)
            Spacer()
            Button(action: showDetails) {
                Image(systemName: "chevron.down")
                    .frame(width: 24, height: 24)
                    .contentShape(Rectangle())
                    .accessibilityLabel("Show details")
            }
            .buttonStyle(.borderless)
            .help("Show details")
        }
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
        threshold: UsageThreshold
    ) -> some View {
        HStack(spacing: 12) {
            Image(systemName: icon)
                .foregroundColor(.secondary)
                .accessibilityHidden(true)

            VStack(alignment: .leading, spacing: 2) {
                Text(title)
                    .font(.caption)
                    .foregroundColor(.secondary)
                Text(valueText ?? "Unable to read")
                    .font(.system(.callout, design: .monospaced))
                    .monospacedDigit()
                    .foregroundColor(valueText == nil ? .secondary : .primary)
            }

            Spacer()

            Text(percent)
                .font(.system(.title3, design: .rounded))
                .fontWeight(.semibold)
                .monospacedDigit()
                .foregroundColor(Color(usageThreshold: threshold))
        }
        .accessibilityElement(children: .ignore)
        .accessibilityLabel(accessibilityText(title: title, percent: percent, valueText: valueText))
        .accessibilityAddTraits(.updatesFrequently)
    }

    private func accessibilityText(title: String, percent: String, valueText: String?) -> String {
        if let valueText {
            return "\(title), \(percent), \(valueText)"
        }
        return "\(title), \(percent), unable to read"
    }
}